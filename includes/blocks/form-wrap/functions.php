<?php
if (!defined('ABSPATH'))
  exit();

add_filter('form_wrap_process_postSubmitForm', 'form_wrap_process_postSubmitForm', 99, 3);

function form_wrap_process_postSubmitForm($formFields, $onprocessargs, $request)
{

  $response = [];
  $entryData = [];

  $post_title = isset($formFields['post_title']) ? sanitize_text_field($formFields['post_title']) : '';
  $post_content = isset($formFields['post_content']) ? wp_kses_post($formFields['post_content']) : '';
  $post_excerpt = isset($formFields['post_excerpt']) ? wp_kses_post($formFields['post_excerpt']) : '';
  // $post_thumbnail = isset($formFields['post_thumbnail']) ? wp_kses_post($formFields['post_thumbnail']) : '';
  $to_ping = isset($formFields['to_ping']) ? wp_kses_post($formFields['to_ping']) : '';
  $post_parent = isset($formFields['post_parent']) ? wp_kses_post($formFields['post_parent']) : '';
  $menu_order = isset($formFields['menu_order']) ? wp_kses_post($formFields['menu_order']) : '';
  $post_password = isset($formFields['post_password']) ? sanitize_text_field($formFields['post_password']) : '';




  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';


  if (empty($post_title)) {
    $response['errors']['postTitleEmpty'] = __('Post title should not empty', 'post-grid');
  }


  if (empty($post_content)) {
    $response['errors']['postContentEmpty'] = __('Post content should not empty', 'post-grid');
  }


  if (!empty($response['errors'])) {
    return $response;
  }


  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);

  $currentUser = wp_get_current_user();



  // Collect entry data
  $entryData['id'] = 'postSubmit';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;



  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;


      if ($id == 'postSubmit') {

        $postType = isset($arg->postType) ? $arg->postType : 'post';
        $pingStatus = isset($arg->pingStatus) ? $arg->pingStatus : '';
        $commentStatus = isset($arg->commentStatus) ? $arg->commentStatus : '';
        $postStatus = isset($arg->postStatus) ? $arg->postStatus : '';
        $postParent = isset($arg->postParent) ? $arg->postParent : '';
        $menuOrder = isset($arg->menuOrder) ? $arg->menuOrder : '';
        $postPassword = isset($arg->postPassword) ? $arg->postPassword : '';
        $authorByEmail = isset($arg->authorByEmail) ? $arg->authorByEmail : false;


        $post_thumbnail = $request->get_file_params()['post_thumbnail'];

        $post_term = $request->get_param('post_term');
        $post_meta = $request->get_param('post_meta');
        //$metaFields = isset($arg->metaFields) ? $arg->metaFields :  ['email'];






        $postParent = (!empty($post_parent)) ? $post_parent : $postParent;
        $menuOrder = (!empty($menu_order)) ? $menu_order : $menuOrder;
        $postPassword = (!empty($post_password)) ? $post_password : $postPassword;

        $createUserByEmail = '';


        if ($authorByEmail) {
          $createUserByEmail = form_wrap_create_post_author_by_email($email);
        }



        $authorId = ($currentUser->ID) ? $currentUser->ID : $createUserByEmail;






        $postData = [];
        $postData['post_title'] = $post_title;
        $postData['post_content'] = $post_content;
        $postData['post_author'] = $authorId;
        $postData['post_excerpt'] = $post_excerpt;
        $postData['post_status'] = $postStatus;
        $postData['post_type'] = $postType;
        $postData['comment_status'] = $commentStatus;
        $postData['ping_status'] = $pingStatus;
        $postData['post_password'] = $postPassword;
        //$postData['post_name'] = $post_content;
        $postData['to_ping'] = $to_ping;
        $postData['post_parent'] = $postParent;
        $postData['menu_order'] = $menuOrder;


        $new_post_id = wp_insert_post($postData);


        if (is_wp_error($new_post_id)) {
          $error_string = $new_post_id->get_error_message();
          $response['errors']['postSubmitFailed'] = $error_string;
        } else {
          $response['success']['postSubmitted'] = __('Post Submitted', 'post-grid');

          if (!empty($post_meta)) {
            foreach ($post_meta as $key => $metaValue) {

              if (!empty($metaValue))
                update_post_meta($new_post_id, $key, $metaValue);
            }
          }



          if (!empty($post_term)) {
            foreach ($post_term as $taxonomy => $taxIds) {


              wp_set_post_terms($new_post_id, $taxIds, $taxonomy, true);
            }
          }


          $file_response = post_grid_upload_file($post_thumbnail);

          if ($file_response['id']) {
            set_post_thumbnail($new_post_id, $file_response['id']);
          }
        }
      }

      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }


      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }





      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($entryData);


        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }









  return $response;
}



function form_wrap_create_post_author_by_email($email)
{

  $user = get_user_by('email', $email);

  if ($user) {

    $userId = $user->ID;
  } else {
    $emailArr = explode(',', $email);
    $username = isset($emailArr[0]) ? $emailArr[0] : '';
    $username = form_wrap_process_regenerate_username($username);
    $password = wp_generate_password();
    $user_id = wp_create_user($username, $password, $email);

    return $user_id;
  }


  return $userId;
}


add_filter('form_wrap_process_termSubmitForm', 'form_wrap_process_termSubmitForm', 99, 3);

function form_wrap_process_termSubmitForm($formFields, $onprocessargs, $request)
{

  $response = [];
  $entryData = [];

  $term_title = isset($formFields['term_title']) ? sanitize_text_field($formFields['term_title']) : '';
  $term_slug = isset($formFields['term_slug']) ? sanitize_text_field($formFields['term_slug']) : '';
  $term_description = isset($formFields['term_description']) ? wp_kses_post($formFields['term_description']) : '';
  $term_parent = isset($formFields['term_parent']) ? wp_kses_post($formFields['term_parent']) : '';

  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';

  if (empty($term_title)) {
    $response['errors']['termTitleEmpty'] = __('Term title should not empty', 'post-grid');
  }


  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);

  $currentUser = wp_get_current_user();


  // Collect entry data
  $entryData['id'] = 'termSubmitForm';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;



  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;
      if ($id == 'termSubmit') {

        $taxonomy = isset($arg->taxonomy) ? $arg->taxonomy : '';
        $showOnResponse = $arg->showOnResponse;
        $successMessage = $arg->successMessage;
        $errorMessage = $arg->errorMessage;
        $termData = [];
        $termData['slug'] = $term_slug;
        //$termData['parent'] = $term_parent;
        $termData['description'] = $term_description;
        $new_term = wp_insert_term($term_title, $taxonomy, $termData);


        if (is_wp_error($new_term)) {
          $error_string = $new_term->get_error_message();
          $response['errors']['termSubmitFailed'] = !empty($errorMessage) ? $errorMessage : $error_string;
          return $response;
        }


        $new_term_id = isset($new_term['term_id']) ? $new_term['term_id'] : '';
        $thumbnail_id = isset($request->get_file_params()['thumbnail_id']) ? $request->get_file_params()['thumbnail_id'] : "";



        if ($thumbnail_id) {
          $file_response = post_grid_upload_file($thumbnail_id);

          if ($file_response['id']) {
            update_term_meta($new_term_id, 'thumbnail_id', $file_response['id']);
          }
        }

        $term_meta = $request->get_param('term_meta');


        if (!empty($term_meta)) {
          foreach ($term_meta as $metaKey => $metavalue) {
            update_term_meta($new_term_id, $metaKey, $metavalue);
          }
        }


        if ($showOnResponse) {
          if (is_wp_error($new_term_id)) {
            $error_string = $new_term_id->get_error_message();
            $response['errors']['termSubmitFailed'] = !empty($errorMessage) ? $errorMessage : $error_string;
          } else {
            $response['success']['termSubmitted'] = !empty($successMessage) ? $successMessage :  __('Term Submitted', 'post-grid');
          }
        }
      }

      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }

      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }





      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($entryData);

        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }

  return $response;
}






add_filter('form_wrap_process_optInForm', 'form_wrap_process_optInForm', 99, 3);

function form_wrap_process_optInForm($formFields, $onprocessargs, $request)
{


  $response = [];
  $entryData = [];

  $first_name = isset($formFields['first_name']) ? sanitize_text_field($formFields['first_name']) : '';
  $last_name = isset($formFields['last_name']) ? sanitize_text_field($formFields['last_name']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
  $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';

  $post_grid_block_editor = get_option("post_grid_block_editor");

  $apiKeys = isset($post_grid_block_editor['apiKeys']) ? $post_grid_block_editor['apiKeys'] : [];




  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);

  $currentUser = wp_get_current_user();


  // Collect entry data
  $entryData['id'] = 'optInForm';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;



  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {



      $id = isset($arg->id) ? $arg->id : "";



      if ($id == 'sendMail') {
        $fromEmail = $email;
        $fromName = $full_name;
        $replyTo = $email;
        $replyToName = $full_name;

        $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
        $bcc = isset($arg->bcc) ? $arg->bcc : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';

        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Send mail success', 'post-grid');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Send mail failed', 'post-grid');


        $email_data['email_to'] = $mailTo;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $email;
        $email_data['email_from_name'] = $full_name;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];


        $status = form_wrap_process_send_email($email_data);

        if ($showOnResponse) {
          if ($status) {
            $response['success']['sendMail'] = $successMessage;
          } else {
            $response['errors']['sendMail'] = $errorMessage;
          }
        }
      }



      if ($id == 'emailCopyUser') {

        $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
        $fromName = isset($arg->fromName) ? $arg->fromName : '';
        $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
        $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';

        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Email copy user success', 'post-grid');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Email copy user failed', 'post-grid');



        $email_data['email_to'] = $email;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $fromEmail;
        $email_data['email_from_name'] = $fromName;
        $email_data['reply_to'] = $replyTo;
        $email_data['reply_to_name'] = $replyToName;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];

        $status = form_wrap_process_send_email($email_data);

        if ($showOnResponse) {
          if ($status) {
            $response['success']['emailCopyUser'] = $successMessage;
          } else {
            $response['errors']['emailCopyUser'] = $errorMessage;
          }
        }
      }

      if ($id == 'emailBcc') {
        $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';

        $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
        $fromName = isset($arg->fromName) ? $arg->fromName : '';
        $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
        $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';

        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Email Bcc success', 'post-grid');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Email Bcc failed', 'post-grid');

        $email_data['email_to'] = $mailTo;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $fromEmail;
        $email_data['email_from_name'] = $fromName;
        $email_data['reply_to'] = $replyTo;
        $email_data['reply_to_name'] = $replyToName;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];


        $status = form_wrap_process_send_email($email_data);

        if ($showOnResponse) {
          if ($status) {
            $response['success']['emailBcc'] = $successMessage;
          } else {
            $response['errors']['emailBcc'] = $errorMessage;
          }
        }
      }

      if ($id == 'autoReply') {
        $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
        $fromName = isset($arg->fromName) ? $arg->fromName : '';
        $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
        $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
        $footer = isset($arg->footer) ? $arg->footer : '';
        $subject = isset($arg->subject) ? $arg->subject : '';

        $message = isset($arg->message) ? $arg->message : '';
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :
          __('Auto Reply success', 'post-grid');
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
          __('Auto Reply failed', 'post-grid');

        $email_data['email_to'] = $email;
        $email_data['email_bcc'] = $bcc;
        $email_data['email_from'] = $fromEmail;
        $email_data['email_from_name'] = $fromName;
        $email_data['reply_to'] = $replyTo;
        $email_data['reply_to_name'] = $replyToName;
        $email_data['subject'] = $subject;
        $email_data['html'] = $message . $footer;
        $email_data['attachments'] = [];

        $status = form_wrap_process_send_email($email_data);

        if ($showOnResponse) {
          if ($status) {
            $response['success']['autoReply'] = $successMessage;
          } else {
            $response['errors']['autoReply'] = $errorMessage;
          }
        }
      }



      if ($id == 'fluentcrmAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : [];
        $tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";



        $subscriber = FluentCrm\App\Models\Subscriber::create([
          'first_name' => $first_name,
          'last_name' => $last_name,
          'email' => $email,
          'status' => 'subscribed',


        ]);

        $status = $subscriber->save();



        if (!empty($lists)) {
          $listIds = [];
          foreach ($lists as $list) {

            $id = $list->id;
            $listIds[] = $id;
          }
          $subscriber->attachLists($listIds);
        }

        if (!empty($tags)) {
          $tagIds = [];
          foreach ($tags as $tag) {

            $id = $tag->id;
            $tagIds[] = $id;
          }
          $subscriber->attachTags($tagIds);
        }



        // $status = true;


        if ($showOnResponse) {
          if (is_wp_error($status)) {
            //$error_string = $status->get_error_message();
            $response['errors']['fluentcrmAddContactFailed'] = $errorMessage;
          } else {
            $response['success']['fluentcrmAddContactSuccess'] = $successMessage;
          }
        }
      }
      if ($id == 'mailpickerAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : [];
        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";




        if (!class_exists("Mailpicker_Subscribers")) {
          $response['errors']['mailpickerAddContactFailed'] = __("Mail Picker plugin not active", "");
          continue;
        }


        $Mailpicker_Subscribers = new Mailpicker_Subscribers();




        $listIds = "";

        if (!empty($lists)) {
          foreach ($lists as $list) {

            $id = $list->id;
            $listIds .= $id . ",";
          }
        }

        $mpResponse = $Mailpicker_Subscribers->add_subscriber(
          [
            'first_name' => $first_name,
            'last_name' => $last_name,
            'email' => $email,
            'status' => 'active',
            'subscriber_list' => $listIds,
          ]
        );





        if ($showOnResponse) {


          if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
            $response['errors']['mailpickerAddContactExist'] = $existMessage;
          }

          if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
            $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
          }



          if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
            $response['success']['mailpickerAddContactSuccess'] = $successMessage;
          }
        }
      }
      if ($id == 'brevoAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);

        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $brevoApiKeys = isset($apiKeys['brevo']['args']['apikey']) ? $apiKeys['brevo']['args']['apikey'] : "";


        $url = 'https://api.brevo.com/v3/contacts';
        $headers = array(
          'accept: application/json',
          "api-key: $brevoApiKeys",
          'content-type: application/json'
        );

        $data = array(
          "email" => $email,
          "ext_id" => "",
          "attributes" => array(
            "FNAME" => $first_name,
            "LNAME" => $last_name
          ),
          "emailBlacklisted" => false,
          "smsBlacklisted" => false,
          "listIds" => $lists,
          "updateEnabled" => false,
          "smtpBlacklistSender" => array()
        );


        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $curl_response = curl_exec($ch);

        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['brevoAddContactErrorCurl'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {

          $curl_response = json_decode($curl_response);

          if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

            $response['errors']['brevoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          }
          if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {

            $response['errors']['brevoAddContactError'] = !empty($errorMessage) ? $errorMessage : curl_error($ch);
          }
          if (isset($curl_response->code) && $curl_response->code == 'invalid_parameter') {

            $response['errors']['brevoAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $errorMessage;
          }

          if (isset($curl_response->id)) {
            $response['success']['brevoAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }
      if ($id == 'mailjetAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);

        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKeyPublic = isset($apiKeys['mailjet']['args']['apikeyPublic']) ? $apiKeys['mailjet']['args']['apikeyPublic'] : "";
        $apiKeyPrivate = isset($apiKeys['mailjet']['args']['apikeyPrivate']) ? $apiKeys['mailjet']['args']['apikeyPrivate'] : "";



        $url = 'https://api.mailjet.com/v3/REST/contact';
        $data = array(
          'Name' => $first_name,
          'Email' => $email
        );

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_USERPWD, "$apiKeyPublic:$apiKeyPrivate");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json'));
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $curl_response = curl_exec($ch);



        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {



          $curl_response = json_decode($curl_response);



          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['brevoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {

          //   $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
          // }
          if (isset($curl_response->ErrorInfo)) {

            $response['errors']['brevoAddContactExist'] = empty($errorMessage) ? $curl_response->ErrorMessage : $errorMessage;
          }

          if (isset($curl_response->Data)) {
            $response['success']['brevoAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }
      if ($id == 'mailchimpAddContact') {

        $status = isset($arg->status) ? $arg->status : 'subscribed';
        $lists = isset($arg->lists) ? $arg->lists : '';


        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);


        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['mailchimp']['args']['apikey']) ? $apiKeys['mailchimp']['args']['apikey'] : "";
        $dc = isset($apiKeys['mailchimp']['args']['dc']) ? $apiKeys['mailchimp']['args']['dc'] : "";



        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = 'https://' . $dc . '.api.mailchimp.com/3.0/lists/' . $lists . '/members?skip_merge_validation=1';


        // Create the data array
        $data = [
          "email_address" => $email,
          "status" => $status,
          "tags" => $tags
        ];

        // Convert the data array to JSON format
        $jsonData = json_encode($data);


        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_USERPWD, 'key:' . $apiKey);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $curl_response = curl_exec($ch);



        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {



          $curl_response = json_decode($curl_response);



          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['brevoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {

          //   $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
          // }
          if (isset($curl_response->status) && $curl_response->status == '404') {

            $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $curl_response->detail : $errorMessage;
          }
          if (isset($curl_response->status) && $curl_response->status == '400') {

            $response['errors']['brevoAddContactExist'] = empty($errorMessage) ? $curl_response->detail : $existMessage;
          }

          if (isset($curl_response->id)) {
            $response['success']['brevoAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }
      if ($id == 'mailmodoAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';

        // $lists = explode(',', $lists);
        // $lists = array_map('intval', $lists);

        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['mailmodo']['args']['apikey']) ? $apiKeys['mailmodo']['args']['apikey'] : "";

        //https://www.mailmodo.com/developers/f1669952fdba0-add-contact-to-a-list/

        $url = "https://api.mailmodo.com/api/v1/addToList";

        $data = [
          "email" => $email,
          "data" => [
            "first_name" => $first_name,
            "last_name" => $last_name,
          ],
          "listName" => $lists,

        ];

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          "Accept: application/json, application/xml",
          "Content-Type: application/json",
          "mmApiKey: $apiKey"
        ]);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $curl_response = curl_exec($ch);




        if ($curl_response === false) {
          $error = curl_error($ch);
          $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $errorMessage : $error;


          curl_close($ch);
          die('Curl error: ' . $error);
        } else {



          $curl_response = json_decode($curl_response);




          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['brevoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          if (isset($curl_response->error) && $curl_response->error == 'ValidationError') {
            $response['errors']['brevoAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          }



          // if (isset($curl_response->ErrorInfo)) {

          //   $response['errors']['brevoAddContactExist'] = empty($errorMessage) ? $curl_response->ErrorMessage : $errorMessage;
          // }

          if (isset($curl_response->success)) {
            $response['success']['brevoAddContactSuccess'] = empty($errorMessage) ? $curl_response->message : $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }










      if ($id == 'dripAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);

        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['drip']['args']['apikey']) ? $apiKeys['drip']['args']['apikey'] : "";
        $accountId = isset($apiKeys['drip']['args']['accountId']) ? $apiKeys['drip']['args']['accountId'] : "";



        $url = "https://api.getdrip.com/v2/{$accountId}/subscribers";

        $data = array(
          "subscribers" => array(
            array(
              "email" => $email,
              "first_name" => $first_name,
              "last_name" => $last_name,

            )
          )
        );

        $data_string = json_encode($data);

        $ch = curl_init($url);

        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
          'User-Agent: Your App Name (www.yourapp.com)',
          'Content-Type: application/json',
          'Authorization: Basic ' . base64_encode($apiKey . ":")
        ));

        //$result = curl_exec($ch);

        if (curl_errno($ch)) {
          echo 'Error:' . curl_error($ch);
        }


        $curl_response = curl_exec($ch);





        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['dripAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {

          $curl_response = json_decode($curl_response);


          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['dripAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          if (isset($curl_response->errors) && $curl_response->errors[0]->code == 'authentication_error') {

            $response['errors']['dripAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->errors[0]->message;
          }
          if (isset($curl_response->errors) && $curl_response->errors[0]->code == 'email_error') {

            $response['errors']['dripAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->errors[0]->message;
          }



          if (isset($curl_response->subscribers)) {
            $response['success']['dripAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);









        // if ($showOnResponse) {


        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }

        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }



        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }








      if ($id == 'klaviyoAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        // $lists = explode(',', $lists);
        // $lists = array_map('intval', $lists);


        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";











        $klaviyoApiKeys = isset($apiKeys['klaviyo']['args']['apikey']) ? $apiKeys['klaviyo']['args']['apikey'] : "";




        $url = "https://a.klaviyo.com/api/v2/list/" . $lists . "/members?api_key=" . $klaviyoApiKeys;





        $headers = array(
          'accept: application/json',
          'content-type: application/json'
        );
        //https://developers.klaviyo.com/en/v1-2/reference/get-profile
        $data = array(

          "profiles" => [
            "email" => $email,
            "first_name" => $first_name,
            "last_name" => $last_name,
          ],

        );


        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $curl_response = curl_exec($ch);

        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['klaviyoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {

          $curl_response = json_decode($curl_response);





          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['klaviyoAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          if (isset($curl_response->errors)) {

            $response['errors']['klaviyoAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
          }
          // if (isset($curl_response->errors)) {

          //   $response['errors']['klaviyoAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $errorMessage;
          // }

          if (($curl_response[0]->email == $email)) {
            $response['success']['klaviyoAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);









        // if ($showOnResponse) {


        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }

        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }



        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }
      if ($id == 'mailerliteAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);
        $lists = array_map('intval', $lists);

        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";











        $mailerliteApiKeys = isset($apiKeys['mailerlite']['args']['apikey']) ? $apiKeys['mailerlite']['args']['apikey'] : "";


        // curl -v https://api.mailerlite.com/api/v2/subscribers \
        // -H "X-MailerLite-ApiKey: fc7b8c5b32067bcd47cafb5f475d2fe9"

        $url = 'https://connect.mailerlite.com/api/subscribers';
        $headers = array(
          'accept: application/json',
          'Authorization: Bearer ' . $mailerliteApiKeys,
          'content-type: application/json'
        );

        $data = array(
          "email" => $email,
          "ext_id" => "",
          "fields" => array(
            "name" => $first_name,
            "last_name" => $last_name
          ),
          "groups" => $lists,

        );




        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));

        $curl_response = curl_exec($ch);



        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {

          $curl_response = json_decode($curl_response);

          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {

          //   $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          // }
          if (isset($curl_response->errors)) {

            $response['errors']['mailerliteAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $curl_response->message;
          }

          if (isset($curl_response->data->email) && $curl_response->data->email == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);









        // if ($showOnResponse) {


        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }

        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }



        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }
      if ($id == 'sendgridAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        $lists = explode(',', $lists);


        //$lists = array_map('intval', $lists);

        //$tags = isset($arg->tags) ? $arg->tags : [];
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";











        $sendgridApiKeys = isset($apiKeys['sendgrid']['args']['apikey']) ? $apiKeys['sendgrid']['args']['apikey'] : "";



        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = "https://api.sendgrid.com/v3/marketing/contacts";

        // Create the data array
        $contacts = [
          [
            "email" => $email,
            "first_name" => $first_name,
            "last_name" => $last_name

          ],
        ];

        $data = array('contacts' => $contacts, 'list_ids' => $lists);


        // Convert the data array to JSON format
        $jsonData = json_encode($data);

        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Authorization: Bearer ' . $sendgridApiKeys // Replace with your SendGrid API key
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);


        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {



          $curl_response = json_decode($curl_response);

          // if (isset($curl_response->code) && $curl_response->code == 'duplicate_parameter') {

          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response['message'] : $existMessage;
          // }
          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {

          //   $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          // }
          if (isset($curl_response->errors)) {

            $response['errors']['mailerliteAddContactExist'] = empty($errorMessage) ? $curl_response['message'] : $curl_response->errors[0]->message;
          }

          if (isset($curl_response->data->email) && $curl_response->data->email == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);









        // if ($showOnResponse) {


        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'exist') {
        //         $response['errors']['mailpickerAddContactExist'] = $existMessage;
        //     }

        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'fail') {
        //         $response['errors']['mailpickerAddContactFailed'] = $errorMessage;
        //     }



        //     if (isset($mpResponse['status']) && $mpResponse['status'] == 'success') {
        //         $response['success']['mailpickerAddContactSuccess'] = $successMessage;
        //     }
        // }
      }

      if ($id == 'emailoctopusAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';
        //$lists = explode(',', $lists);

        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);


        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";











        $apiKey = isset($apiKeys['emailoctopus']['args']['apikey']) ? $apiKeys['emailoctopus']['args']['apikey'] : "";



        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = "https://emailoctopus.com/api/1.6/lists/" . $lists . "/contacts";

        // Create the data array
        $data = [
          "api_key" => $apiKey,
          "email_address" => $email,
          "fields" => [
            "FirstName" => $first_name,
            "LastName" => $last_name,
          ],
          "tags" => $tags,

        ];



        // Convert the data array to JSON format
        $jsonData = json_encode($data);

        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $curl_response = curl_exec($ch);


        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {


          $curl_response = json_decode($curl_response);


          // if (isset($curl_response->code) && $curl_response->code == 'unauthorized') {

          //   $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          // }
          if (isset($curl_response->error)) {



            if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {

              $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
            }
          }

          if (isset($curl_response->id) && $curl_response->email_address == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }

      if ($id == 'senderAddContact') {

        $groups  = isset($arg->groups) ? $arg->groups  : '';
        $groups  = explode(',', $groups);

        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);


        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['sender']['args']['apikey']) ? $apiKeys['sender']['args']['apikey'] : "";



        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = "https://api.sender.net/v2/subscribers";

        // Create the data array
        $data = [
          "email" => $email,
          "firstname" => $first_name,
          "lastname" => $last_name,
          "groups" => $groups
        ];

        // Convert the data array to JSON format
        $jsonData = json_encode($data);

        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Authorization: Bearer ' . $apiKey
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $curl_response = curl_exec($ch);


        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {


          $curl_response = json_decode($curl_response);


          if (isset($curl_response->message) && $curl_response->message == 'Unauthenticated.') {

            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->message;
          }
          //if (isset($curl_response->error)) {

          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {

          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }

          if (isset($curl_response->success) && $curl_response->data->email == $email) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }
      if ($id == 'moosendAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';

        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);


        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['moosend']['args']['apikey']) ? $apiKeys['moosend']['args']['apikey'] : "";


        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = "https://api.moosend.com/v3/subscribers/" . $lists . "/subscribe.json?apikey=" . $apiKey;


        // Create the data array
        $data = [
          "Name" => $first_name,
          "Email" => $email,
          "Tags" => $tags
        ];

        // Convert the data array to JSON format
        $jsonData = json_encode($data);

        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $curl_response = curl_exec($ch);


        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {


          $curl_response = json_decode($curl_response);


          if (isset($curl_response->Error) && $curl_response->Error != null) {

            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->Error;
          }
          //if (isset($curl_response->error)) {

          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {

          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }

          if (isset($curl_response->Code) && $curl_response->Code == null) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }


      if ($id == 'getresponseAddContact') {

        $lists = isset($arg->lists) ? $arg->lists : '';

        $tags = isset($arg->tags) ? $arg->tags : '';
        $tags = explode(',', $tags);


        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['getresponse']['args']['apikey']) ? $apiKeys['getresponse']['args']['apikey'] : "";


        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = "https://api.getresponse.com/v3/contacts/" . $lists . "/subscribe.json?apikey=" . $apiKey;


        // Create the data array
        $data = [
          "Name" => $first_name,
          "Email" => $email,
          "Tags" => $tags
        ];

        // Convert the data array to JSON format
        $jsonData = json_encode($data);

        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Content-Type: application/json',
          'Accept: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        $curl_response = curl_exec($ch);


        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {


          $curl_response = json_decode($curl_response);


          if (isset($curl_response->Error) && $curl_response->Error != null) {

            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->Error;
          }
          //if (isset($curl_response->error)) {

          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {

          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }

          if (isset($curl_response->Code) && $curl_response->Code == null) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }
      if ($id == 'activecampaignAddContact') {

        // $lists = isset($arg->lists) ? $arg->lists : '';

        // $tags = isset($arg->tags) ? $arg->tags : '';
        // $tags = explode(',', $tags);


        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";
        $existMessage = isset($arg->existMessage) ? $arg->existMessage : "";



        $apiKey = isset($apiKeys['activecampaign']['args']['apikey']) ? $apiKeys['activecampaign']['args']['apikey'] : "";
        $accountName = isset($apiKeys['activecampaign']['args']['accountName']) ? $apiKeys['activecampaign']['args']['accountName'] : "";


        // Initialize a cURL session
        $ch = curl_init();

        // Set the URL for the cURL request
        $url = "https://" . $accountName . ".api-us1.com/api/3/contacts";


        // Create the data array
        $data = [
          "contact" => [
            "email" => "johndoe@example.com",
            "firstName" => "John",
            "lastName" => "Doe",
            "phone" => "7223224241",
            "fieldValues" => [
              [
                "field" => "1",
                "value" => "The Value for First Field"
              ],
              [
                "field" => "6",
                "value" => "2008-01-20"
              ]
            ]
          ]
        ];

        // Convert the data array to JSON format
        $jsonData = json_encode($data);


        // Set the cURL options
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_POST, 1);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
          'Api-Token: ' . $apiKey,
          'Accept: application/json',
          'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        // Execute the cURL request and get the response
        $curl_response = curl_exec($ch);


        if ($curl_response === false) {
          //echo 'Error: ' . curl_error($ch);
          $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : curl_error($ch);
        } else {


          $curl_response = json_decode($curl_response);


          if (isset($curl_response->Error) && $curl_response->Error != null) {

            $response['errors']['mailerliteAddContactError'] = empty($errorMessage) ? $errorMessage : $curl_response->Error;
          }
          //if (isset($curl_response->error)) {

          // if (isset($curl_response->error->code) && $curl_response->error->code == 'MEMBER_EXISTS_WITH_EMAIL_ADDRESS') {

          //   $response['errors']['mailerliteAddContactExist'] = empty($existMessage) ? $curl_response->error->message : $existMessage;
          // }
          // }

          if (isset($curl_response->Code) && $curl_response->Code == null) {
            $response['success']['mailerliteAddContactSuccess'] = $successMessage;
          }



          //echo $curl_response;
        }

        curl_close($ch);
      }







      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }



      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }




      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($entryData);
        $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
        $successMessage = isset($arg->successMessage) ? $arg->successMessage :        "";
        $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage : "";

        if ($showOnResponse) {
          if ($status) {
            $response['success']['createEntry'] = $successMessage;
          } else {
            $response['errors']['createEntry'] = $errorMessage;
          }
        }
      }
    }


  return $response;
}

















add_filter('form_wrap_process_commentSubmit', 'form_wrap_process_commentSubmit', 99, 3);

function form_wrap_process_commentSubmit($formFields, $onprocessargs, $request)
{

  $response = [];
  $entryData = [];

  $name = isset($formFields['name']) ? sanitize_text_field($formFields['name']) : '';
  $url = isset($formFields['url']) ? esc_url_raw($formFields['url']) : '';
  $comment = isset($formFields['comment']) ? wp_kses_post($formFields['comment']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $post_id = isset($formFields['post_id']) ? sanitize_text_field($formFields['post_id']) : '';
  $rate = isset($formFields['rate']) ? sanitize_text_field($formFields['rate']) : '';

  if (empty($post_id)) {
    $response['errors']['commentPostIdMissing'] = __('Post Id missing', 'post-grid');
    return $response;
  }




  $email_data = [];

  $user = get_user_by('email', $email);
  if (empty($user))
    $user = get_user_by('login', $email);

  $currentUser = wp_get_current_user();


  // Collect entry data
  $entryData['id'] = 'commentSubmit';
  $entryData['formFields'] = $formFields;
  $entryData['user_id'] = isset($user->ID) ? $user->ID : 0;



  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;


      if ($id == 'commentSubmit') {

        $loginRequired = isset($arg->loginRequired) ? $arg->loginRequired : false;
        $status = isset($arg->status) ? $arg->status : 1;
        $type = isset($arg->type) ? $arg->type : 'comment';
        $metaFields = isset($arg->metaFields) ? $arg->metaFields : [];


        if ($loginRequired) {

          if (!$currentUser) {
            $response['errors']['loginNotLogin'] = __('User not logged in', 'post-grid');
            $entryData['errors']['loginNotLogin'] = __('User not logged in', 'post-grid');

            continue;
          }

          //return $response;
        }

        $commentData = [];

        $userId = isset($currentUser->ID) ? $currentUser->ID : 0;
        $user_login = !empty($currentUser->user_login) ? $currentUser->user_login : $name;


        $commentData['comment_post_ID'] = $post_id;
        $commentData['comment_author'] = $user_login;
        $commentData['comment_author_email'] = $email;
        $commentData['comment_content'] = $comment;
        $commentData['comment_author_url'] = $url;
        $commentData['comment_date'] = current_time('mysql');
        $commentData['comment_approved'] = $status;
        $commentData['user_id'] = $userId;
        $commentData['comment_type'] = $type;


        //$status = form_wrap_process_comment_submit($commentData);
        $status = wp_insert_comment($commentData);



        if ($status) {

          $comment_meta = $request->get_param('comment_meta');


          foreach ($comment_meta as $metaKey => $fieldValue) {

            //$fieldValue = isset($formFields[$metaField]) ? $formFields[$metaField] : '';
            update_comment_meta($status, $metaKey, $fieldValue);
          }


          $response['success']['loggedInUser'] = __('Comment Submitted', 'post-grid');
        } else {
          $response['errors']['loggedInUser'] = __('Comment Submission Failed', 'post-grid');
        }
      }


      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }


      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }


      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($entryData);


        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }









  return $response;
}

function form_wrap_process_comment_submit($commentData)
{


  $new_comment_ID = wp_insert_comment($commentData);



  if ($new_comment_ID) {

    return true;
  } else {
    return false;
  }
}


add_filter('form_wrap_process_loginForm', 'form_wrap_process_loginForm', 99, 3);

function form_wrap_process_loginForm($formFields, $onprocessargs, $request)
{

  $response = [];

  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';
  $password = isset($formFields['password']) ? sanitize_text_field($formFields['password']) : '';
  $remember = isset($formFields['remember']) ? sanitize_text_field($formFields['remember']) : '';



  $email_data = [];

  $user = get_user_by('email', $username);
  if (empty($user)) {
    $user = get_user_by('login', $username);
  }


  if (!$user) {
    // $response['loginUsernotExist'] = 'User not exist';
    $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

    return $response;
  }


  $email = isset($user->user_email) ? $user->user_email : '';
  $full_name = isset($user->display_name) ? $user->display_name : '';



  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;


      if ($id == 'loggedInUser') {

        $credentials = [];

        $credentials['user_login'] = $user->user_login;
        $credentials['password'] = $password;
        $credentials['remember'] = $remember;




        $status = form_wrap_process_logged_user($credentials);




        if ($status) {
          //$response['loggedInUser'] = 'loggedInUser Success';
          $response['success']['loggedInUser'] = __('User Login success', 'post-grid');
        } else {
          //$response['loggedInUser'] = 'loggedInUser Failed';
          $response['errors']['loggedInUser'] = __('User Login failed', 'post-grid');
          return $response;
        }
      }


      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }


      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }


      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($email_data);


        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }








  return $response;
}



function form_wrap_process_logged_user($credentials)
{
  $user = get_user_by('login', $credentials['user_login']);
  $user_id = $user->ID;


  $user = wp_authenticate($credentials['user_login'], $credentials['password']);

  if (!is_wp_error($user)) {
    wp_set_current_user($user_id, $user->user_login);
    wp_set_auth_cookie($user_id);
    do_action('wp_login', $user->user_login, $user);

    return true;
  } else {
    return false;
  }
}




add_filter('form_wrap_process_passwordResetFrom', 'form_wrap_process_passwordResetFrom', 99, 3);

function form_wrap_process_passwordResetFrom($formFields, $onprocessargs, $request)
{


  $response = [];

  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';



  $email_data = [];

  $user = get_user_by('email', $username);
  if (empty($user)) {
    $user = get_user_by('login', $username);
  }



  if (!$user) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

    return $response;
  }







  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;


      if ($id == 'resetPassword') {

        $status = retrieve_password($user->user_login);


        if ($status) {
          //$response['loggedInUser'] = 'loggedInUser Success';
          $response['success']['loggedInUser'] = __('Password reset successful', 'post-grid');
        } else {
          //$response['loggedInUser'] = 'loggedInUser Failed';
          $response['errors']['loggedInUser'] = __('Password reset failed', 'post-grid');
          return $response;
        }
      }


      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }


      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }


      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($email_data);


        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }








  return $response;
}

add_filter('form_wrap_process_passwordUpdateFrom', 'form_wrap_process_passwordUpdateFrom', 99, 3);

function form_wrap_process_passwordUpdateFrom($formFields, $onprocessargs, $request)
{


  $response = [];

  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';



  $email_data = [];

  $user = get_user_by('email', $username);
  if (empty($user)) {
    $user = get_user_by('login', $username);
  }



  if (!$user) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

    return $response;
  }
  if (isset($GET['action'])) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

    return $response;
  }

  if (isset($GET['key'])) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

    return $response;
  }
  if (isset($GET['login'])) {
    $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

    return $response;
  }






  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;


      if ($id == 'resetPassword') {

        $status = retrieve_password($user->user_login);


        if ($status) {
          //$response['loggedInUser'] = 'loggedInUser Success';
          $response['success']['loggedInUser'] = __('Password reset successful', 'post-grid');
        } else {
          //$response['loggedInUser'] = 'loggedInUser Failed';
          $response['errors']['loggedInUser'] = __('Password reset failed', 'post-grid');
          return $response;
        }
      }


      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }


      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }


      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($email_data);


        if ($status) {
          //$response['createEntry'] = 'createEntry Success';
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          //$response['createEntry'] = 'createEntry Failed';
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }








  return $response;
}













add_filter('form_wrap_process_registerForm', 'form_wrap_process_registerForm', 99, 3);

function form_wrap_process_registerForm($formFields, $onprocessargs, $request)
{

  $response = [];

  $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';

  $email = isset($formFields['email']) ? sanitize_text_field($formFields['email']) : '';
  $password = isset($formFields['password']) ? sanitize_text_field($formFields['password']) : '';
  $password_confirm = isset($formFields['password_confirm']) ? sanitize_text_field($formFields['password_confirm']) : '';



  if ($password !== $password_confirm) {
    //$response['registerUserConfirm'] = 'Password Missmatch';
    $response['errors']['registerUserConfirm'] = __('Password Missmatch', 'post-grid');

    return $response;
  }

  $user = get_user_by('email', $email);

  if ($user) {
    //$response['registerUserExist'] = 'User already exist';
    $response['errors']['registerUserExist'] = __('User already exist', 'post-grid');

    return $response;
  }

  if (empty($username)) {

    $emailArr = explode(',', $email);
    $username = isset($emailArr[0]) ? $emailArr[0] : '';
  }

  $username = form_wrap_process_regenerate_username($username);


  $email_data = [];








  foreach ($onprocessargs as $arg) {

    $id = $arg->id;


    if ($id == 'registerUser') {

      $credentials = [];

      $credentials['email'] = $email;
      $credentials['password'] = $password;
      $credentials['username'] = $username;

      $new_user_id = form_wrap_process_register_user($credentials);

      $user_meta = $request->get_param('user_meta');

      if (!empty($user_meta)) {
        foreach ($user_meta as $metaKey => $metavalue) {
          update_user_meta($new_user_id, $metaKey, $metavalue);
        }
      }


      if ($new_user_id) {
        //$response['registerUser'] = 'User register Success';
        $response['success']['registerUserExist'] = __('User register Success', 'post-grid');
      } else {
        // $response['registerUser'] = 'User register Failed';
        $response['errors']['registerUserExist'] = __('User register Failed', 'post-grid');
      }
    }


    if ($id == 'doAction') {

      $actionName = isset($arg->actionName) ? $arg->actionName : '';
      do_action($actionName, $request);
    }


    if ($id == 'webhookRequest') {

      $url = isset($arg->url) ? $arg->url : '';
      $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
      $method = isset($arg->method) ? $arg->method : 'POST';
      $format = isset($arg->format) ? $arg->format : '';
      $fields = isset($arg->fields) ? $arg->fields : [];

      $requestPrams =  $request->get_params();

      unset($requestPrams['onprocessargs']);
      unset($requestPrams['formFieldNames']);


      // Encode the data as JSON
      $payload = json_encode($requestPrams);

      // Prepare headers
      $headers = [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
      ];

      // Initialize curl session
      $ch = curl_init($url);

      // Set curl options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

      // Execute curl session
      $response = curl_exec($ch);

      // Check for errors
      if (curl_errno($ch)) {
        echo 'Webhook delivery failed: ' . curl_error($ch);
      } else {
        echo 'Webhook sent successfully. Response: ' . $response;
      }

      // Close curl session
      curl_close($ch);
    }



    if ($id == 'createEntry') {
      $status = form_wrap_process_create_entry($email_data);


      if ($status) {
        //$response['createEntry'] = 'createEntry Success';
        $response['success']['createEntry'] = __('Create entry success', 'post-grid');
      } else {
        //$response['createEntry'] = 'createEntry Failed';
        $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
      }
    }
  }









  return $response;
}



function form_wrap_process_register_user($credentials)
{

  $user_login = isset($credentials['user_login']) ? $credentials['user_login'] : '';

  $user = get_user_by('login', $user_login);
  $user_id = isset($user->ID) ? $user->ID : '';


  $user_id = wp_create_user($credentials['username'], $credentials['password'], $credentials['email']);


  if ($user_id) {

    return $user_id;
  } else {
    return false;
  }
}

function form_wrap_process_regenerate_username($username)
{

  if (username_exists($username)) {
    $x = 1;
    while (username_exists($username)) {
      $username = $username . $x;
      $x++;
    }
  }

  return $username;
}


add_filter('form_wrap_process_appointmentForm', 'form_wrap_process_appointmentForm', 99, 3);

function form_wrap_process_appointmentForm($formFields, $onprocessargs, $request)
{

  $response = [];

  $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';

  $extraFields = $formFields;

  unset($extraFields['full_name']);
  unset($extraFields['email']);
  unset($extraFields['message']);


  $email_data = [];



  foreach ($onprocessargs as $arg) {



    $id = $arg->id;




    if ($id == 'sendMail') {
      $fromEmail = $email;
      $fromName = $full_name;
      $replyTo = $email;
      $replyToName = $full_name;

      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
      $bcc = isset($arg->bcc) ? $arg->bcc : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';

      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Send mail success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Send mail failed', 'post-grid');


      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $email;
      $email_data['email_from_name'] = $full_name;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];


      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['sendMail'] = $successMessage;
        } else {
          $response['errors']['sendMail'] = $errorMessage;
        }
      }
    }

    if ($id == 'emailCopyUser') {

      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';

      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email copy user success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email copy user failed', 'post-grid');



      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];

      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailCopyUser'] = $successMessage;
        } else {
          $response['errors']['emailCopyUser'] = $errorMessage;
        }
      }
    }

    if ($id == 'emailBcc') {
      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';

      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';

      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email Bcc success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email Bcc failed', 'post-grid');

      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];


      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailBcc'] = $successMessage;
        } else {
          $response['errors']['emailBcc'] = $errorMessage;
        }
      }
    }

    if ($id == 'autoReply') {
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $subject = isset($arg->subject) ? $arg->subject : '';

      $message = isset($arg->message) ? $arg->message : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Auto Reply success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Auto Reply failed', 'post-grid');

      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];

      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['autoReply'] = $successMessage;
        } else {
          $response['errors']['autoReply'] = $errorMessage;
        }
      }
    }


    if ($id == 'doAction') {

      $actionName = isset($arg->actionName) ? $arg->actionName : '';
      do_action($actionName, $request);
    }

    if ($id == 'webhookRequest') {

      $url = isset($arg->url) ? $arg->url : '';
      $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
      $method = isset($arg->method) ? $arg->method : 'POST';
      $format = isset($arg->format) ? $arg->format : '';
      $fields = isset($arg->fields) ? $arg->fields : [];

      $requestPrams =  $request->get_params();

      unset($requestPrams['onprocessargs']);
      unset($requestPrams['formFieldNames']);


      // Encode the data as JSON
      $payload = json_encode($requestPrams);

      // Prepare headers
      $headers = [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
      ];

      // Initialize curl session
      $ch = curl_init($url);

      // Set curl options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

      // Execute curl session
      $response = curl_exec($ch);

      // Check for errors
      if (curl_errno($ch)) {
        echo 'Webhook delivery failed: ' . curl_error($ch);
      } else {
        echo 'Webhook sent successfully. Response: ' . $response;
      }

      // Close curl session
      curl_close($ch);
    }




    if ($id == 'createEntry') {
      $status = form_wrap_process_create_entry($email_data);
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Create entry success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Create entry failed', 'post-grid');

      if ($showOnResponse) {
        if ($status) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $errorMessage;
        }
      }
    }
  }









  return $response;
}


add_filter('form_wrap_process_postsFilter', 'form_wrap_process_postsFilter', 99, 3);

function form_wrap_process_postsFilter($formFields, $onprocessargs, $request)
{


  $response = [];
  $entryData = [];

  //$post_title = isset($formFields['post_title']) ? sanitize_text_field($formFields['post_title']) : '';


  if (!empty($response['errors'])) {
    return $response;
  }





  // Collect entry data
  $entryData['id'] = 'postSubmit';
  $entryData['formFields'] = $formFields;



  if (!empty($onprocessargs))
    foreach ($onprocessargs as $arg) {

      $id = $arg->id;


      if ($id == 'queryPosts') {
      }

      if ($id == 'doAction') {

        $actionName = isset($arg->actionName) ? $arg->actionName : '';
        do_action($actionName, $request);
      }


      if ($id == 'webhookRequest') {

        $url = isset($arg->url) ? $arg->url : '';
        $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
        $method = isset($arg->method) ? $arg->method : 'POST';
        $format = isset($arg->format) ? $arg->format : '';
        $fields = isset($arg->fields) ? $arg->fields : [];

        $requestPrams =  $request->get_params();

        unset($requestPrams['onprocessargs']);
        unset($requestPrams['formFieldNames']);


        // Encode the data as JSON
        $payload = json_encode($requestPrams);

        // Prepare headers
        $headers = [
          'Content-Type: application/json',
          'Content-Length: ' . strlen($payload)
        ];

        // Initialize curl session
        $ch = curl_init($url);

        // Set curl options
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

        // Execute curl session
        $response = curl_exec($ch);

        // Check for errors
        if (curl_errno($ch)) {
          echo 'Webhook delivery failed: ' . curl_error($ch);
        } else {
          echo 'Webhook sent successfully. Response: ' . $response;
        }

        // Close curl session
        curl_close($ch);
      }





      if ($id == 'createEntry') {
        $status = form_wrap_process_create_entry($entryData);


        if ($status) {
          $response['success']['createEntry'] = __('Create entry success', 'post-grid');
        } else {
          $response['errors']['createEntry'] = __('Create entry failed', 'post-grid');
        }
      }
    }









  return $response;
}



add_filter('form_wrap_process_contactForm', 'form_wrap_process_contactForm', 99, 3);

function form_wrap_process_contactForm($formFields, $onprocessargs, $request)
{

  $response = [];

  $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';
  $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
  $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
  $subject = isset($formFields['subject']) ? wp_kses_post($formFields['subject']) : '';
  $recaptchaResponse = isset($formFields['g-recaptcha-response']) ? wp_kses_post($formFields['g-recaptcha-response']) : '';

  $extraFields = $formFields;

  unset($extraFields['full_name']);
  unset($extraFields['email']);
  unset($extraFields['message']);
  unset($extraFields['subject']);


  $email_data = [];




  foreach ($onprocessargs as $arg) {



    $id = $arg->id;

    if ($id == 'sendMail') {
      $fromEmail = $email;
      $fromName = $full_name;
      $replyTo = $email;
      $replyToName = $full_name;

      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';
      $bcc = isset($arg->bcc) ? $arg->bcc : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Send mail success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Send mail failed', 'post-grid');

      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $email;
      $email_data['email_from_name'] = $full_name;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];


      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['sendMail'] = $successMessage;
        } else {
          $response['errors']['sendMail'] = $errorMessage;
        }
      }
    }

    if ($id == 'emailCopyUser') {

      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email copy user success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email copy user failed', 'post-grid');



      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];

      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailCopyUser'] = $successMessage;
        } else {
          $response['errors']['emailCopyUser'] = $errorMessage;
        }
      }
    }

    if ($id == 'emailBcc') {
      $mailTo = isset($arg->mailTo) ? $arg->mailTo : '';

      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Email Bcc success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Email Bcc failed', 'post-grid');


      $email_data['email_to'] = $mailTo;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];


      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['emailBcc'] = $successMessage;
        } else {
          $response['errors']['emailBcc'] = $errorMessage;
        }
      }
    }

    if ($id == 'autoReply') {
      $fromEmail = isset($arg->fromEmail) ? $arg->fromEmail : '';
      $fromName = isset($arg->fromName) ? $arg->fromName : '';
      $replyTo = isset($arg->replyTo) ? $arg->replyTo : '';
      $replyToName = isset($arg->replyToName) ? $arg->replyToName : '';
      $footer = isset($arg->footer) ? $arg->footer : '';
      $message = isset($arg->message) ? $arg->message : '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : true;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Auto Reply success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Auto Reply failed', 'post-grid');

      $email_data['email_to'] = $email;
      $email_data['email_bcc'] = $bcc;
      $email_data['email_from'] = $fromEmail;
      $email_data['email_from_name'] = $fromName;
      $email_data['reply_to'] = $replyTo;
      $email_data['reply_to_name'] = $replyToName;
      $email_data['subject'] = $subject;
      $email_data['html'] = $message . $footer;
      $email_data['attachments'] = [];

      $status = form_wrap_process_send_email($email_data);

      if ($showOnResponse) {
        if ($status) {
          $response['success']['autoReply'] = $successMessage;
        } else {
          $response['errors']['autoReply'] = $errorMessage;
        }
      }
    }




    if ($id == 'doAction') {

      $actionName = isset($arg->actionName) ? $arg->actionName : '';
      do_action($actionName, $request);
    }

    if ($id == 'webhookRequest') {

      $url = isset($arg->url) ? $arg->url : '';
      $requestHeader = isset($arg->requestHeader) ? $arg->requestHeader : true;
      $method = isset($arg->method) ? $arg->method : 'POST';
      $format = isset($arg->format) ? $arg->format : '';
      $fields = isset($arg->fields) ? $arg->fields : [];

      $requestPrams =  $request->get_params();

      unset($requestPrams['onprocessargs']);
      unset($requestPrams['formFieldNames']);


      // Encode the data as JSON
      $payload = json_encode($requestPrams);

      // Prepare headers
      $headers = [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
      ];

      // Initialize curl session
      $ch = curl_init($url);

      // Set curl options
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
      curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

      // Execute curl session
      $response = curl_exec($ch);

      // Check for errors
      if (curl_errno($ch)) {
        echo 'Webhook delivery failed: ' . curl_error($ch);
      } else {
        echo 'Webhook sent successfully. Response: ' . $response;
      }

      // Close curl session
      curl_close($ch);
    }



    if ($id == 'createEntry') {
      $status = form_wrap_process_create_entry($email_data);
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Create entry success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Create entry failed', 'post-grid');

      if ($showOnResponse) {
        if ($status) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $errorMessage;
        }
      }
    }


    if ($id == 'recaptchaValidation') {



      $status = '';
      $showOnResponse = isset($arg->showOnResponse) ? $arg->showOnResponse : false;
      $successMessage = isset($arg->successMessage) ? $arg->successMessage :
        __('Create entry success', 'post-grid');
      $errorMessage = isset($arg->errorMessage) ? $arg->errorMessage :
        __('Create entry failed', 'post-grid');

      if ($showOnResponse) {
        if (!empty($recaptchaResponse)) {
          $response['success']['createEntry'] = $successMessage;
        } else {
          $response['errors']['createEntry'] = $errorMessage;
        }
      }
    }
  }









  return $response;
}


function form_wrap_process_create_entry($email_data)
{

  return true;
}





function form_wrap_process_send_email($email_data)
{

  $email_to = isset($email_data['email_to']) ? $email_data['email_to'] : '';
  $email_bcc = isset($email_data['email_bcc']) ? $email_data['email_bcc'] : '';
  $email_from = !empty($email_data['email_from']) ? $email_data['email_from'] : get_option('admin_email');
  $email_from_name = !empty($email_data['email_from_name']) ? $email_data['email_from_name'] : get_bloginfo('name');
  $subject = isset($email_data['subject']) ? $email_data['subject'] : '';
  $email_body = isset($email_data['html']) ? $email_data['html'] : '';
  $attachments = isset($email_data['attachments']) ? $email_data['attachments'] : '';

  $headers = array();
  $headers[] = "From: " . $email_from_name . " <" . $email_from . ">";
  $headers[] = "Reply-To: " . $email_from_name . " <" . $email_from . ">";
  $headers[] = "MIME-Version: 1.0";
  $headers[] = "Content-Type: text/html; charset=UTF-8";

  if (!empty($email_bcc)) {
    $headers[] = "Bcc: " . $email_bcc;
  }
  $headers = apply_filters('post_grid_mail_headers', $headers);



  $status = wp_mail($email_to, $subject, $email_body, $headers, $attachments);

  return $status;
}
