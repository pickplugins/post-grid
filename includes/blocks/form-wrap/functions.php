<?php
if (!defined('ABSPATH'))
    exit();

add_filter('form_wrap_process_postSubmitForm', 'form_wrap_process_postSubmitForm', 99, 2);

function form_wrap_process_postSubmitForm($formFields, $onprocessargs)
{

    $response = [];
    $entryData = [];

    $post_title = isset($formFields['post_title']) ? sanitize_text_field($formFields['post_title']) : '';
    $post_content = isset($formFields['post_content']) ? wp_kses_post($formFields['post_content']) : '';
    $post_excerpt = isset($formFields['post_excerpt']) ? wp_kses_post($formFields['post_excerpt']) : '';

    $post_tags = isset($formFields['post_tags']) ? wp_kses_post($formFields['post_tags']) : '';
    $post_thumbnail = isset($formFields['post_thumbnail']) ? wp_kses_post($formFields['post_thumbnail']) : '';
    $post_categories = isset($formFields['post_categories']) ? wp_kses_post($formFields['post_categories']) : '';
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
                //$taxonomies = isset($arg->taxonomies) ? $arg->taxonomies :  [];
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


                $status = wp_insert_post($postData);


                if (is_wp_error($status)) {
                    $error_string = $status->get_error_message();
                    $response['errors']['postSubmitFailed'] = $error_string;
                } else {
                    $response['success']['postSubmitted'] = __('Post Submitted', 'post-grid');

                    // if (!empty($metaFields)) {
                    //     foreach ($metaFields as $metaField) {
                    //         update_post_meta($status, $metaField, ${$metaField});
                    //     }
                    // }

                    // if (!empty($taxonomies)) {
                    //     foreach ($taxonomies as $taxonomy) {
                    //         wp_set_post_terms($status, ${$taxonomy}, $taxonomy, true);
                    //     }
                    // }
                }
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


add_filter('form_wrap_process_termSubmitForm', 'form_wrap_process_termSubmitForm', 99, 2);

function form_wrap_process_termSubmitForm($formFields, $onprocessargs)
{

    $response = [];
    $entryData = [];

    $term_title = isset($formFields['term_title']) ? sanitize_text_field($formFields['term_title']) : '';
    $term_slug = isset($formFields['term_slug']) ? sanitize_text_field($formFields['term_slug']) : '';
    $term_description = isset($formFields['term_description']) ? wp_kses_post($formFields['term_description']) : '';
    $term_parent = isset($formFields['term_parent']) ? wp_kses_post($formFields['term_parent']) : '';

    $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';




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

                $taxonomy = $arg->taxonomy;
                $termData = [];
                $termData['slug'] = $term_slug;
                //$termData['parent'] = $term_parent;
                $termData['description'] = $term_description;
                $status = wp_insert_term($term_title, $taxonomy, $termData);

                if (is_wp_error($status)) {
                    $error_string = $status->get_error_message();
                    $response['errors']['termSubmitFailed'] = $error_string;
                } else {
                    $response['success']['termSubmitted'] = __('Term Submitted', 'post-grid');
                }
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






add_filter('form_wrap_process_optInForm', 'form_wrap_process_optInForm', 99, 2);

function form_wrap_process_optInForm($formFields, $onprocessargs)
{


    $response = [];
    $entryData = [];

    $first_name = isset($formFields['first_name']) ? sanitize_text_field($formFields['first_name']) : '';
    $last_name = isset($formFields['last_name']) ? sanitize_text_field($formFields['last_name']) : '';
    $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
    $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
    $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';




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

















add_filter('form_wrap_process_commentSubmit', 'form_wrap_process_commentSubmit', 99, 2);

function form_wrap_process_commentSubmit($formFields, $onprocessargs)
{

    $response = [];
    $entryData = [];

    $name = isset($formFields['name']) ? sanitize_text_field($formFields['name']) : '';
    $url = isset($formFields['url']) ? esc_url_raw($formFields['url']) : '';
    $comment = isset($formFields['comment']) ? wp_kses_post($formFields['comment']) : '';
    $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
    $post_id = isset($formFields['post_id']) ? sanitize_text_field($formFields['post_id']) : '';
    $rate = isset($formFields['rate']) ? sanitize_text_field($formFields['rate']) : '';



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
                $user_login = isset($currentUser->user_login) ? $currentUser->user_login : $name;


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

                    foreach ($metaFields as $metaField) {

                        $fieldValue = isset($formFields[$metaField]) ? $formFields[$metaField] : '';
                        update_comment_meta($status, $metaField, $fieldValue);
                    }


                    $response['success']['loggedInUser'] = __('Comment Submitted', 'post-grid');
                } else {
                    $response['errors']['loggedInUser'] = __('Comment Submission Failed', 'post-grid');
                }
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


add_filter('form_wrap_process_loginForm', 'form_wrap_process_loginForm', 99, 2);

function form_wrap_process_loginForm($formFields, $onprocessargs)
{

    $response = [];

    $username = isset($formFields['username']) ? sanitize_text_field($formFields['username']) : '';
    $password = isset($formFields['password']) ? sanitize_text_field($formFields['password']) : '';
    $remember = isset($formFields['remember']) ? sanitize_text_field($formFields['remember']) : '';


    $email_data = [];

    $user = get_user_by('email', $username);
    if (empty($user))
        $user = get_user_by('login', $username);


    if (!$user) {
        // $response['loginUsernotExist'] = 'User not exist';
        $response['errors']['loginUsernotExist'] = __('User not exist', 'post-grid');

        return $response;
    }


    $email = isset($user->user_email) ? $user->user_email : '';
    $full_name = isset($user->display_name) ? $user->display_name : '';


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
            }
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






add_filter('form_wrap_process_registerForm', 'form_wrap_process_registerForm', 99, 2);

function form_wrap_process_registerForm($formFields, $onprocessargs)
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

            $status = form_wrap_process_register_user($credentials);


            if ($status) {
                //$response['registerUser'] = 'User register Success';
                $response['success']['registerUserExist'] = __('User register Success', 'post-grid');
            } else {
                // $response['registerUser'] = 'User register Failed';
                $response['errors']['registerUserExist'] = __('User register Failed', 'post-grid');
            }
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
    $user = get_user_by('login', $credentials['user_login']);
    $user_id = $user->ID;


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


add_filter('form_wrap_process_appointmentForm', 'form_wrap_process_appointmentForm', 99, 2);

function form_wrap_process_appointmentForm($formFields, $onprocessargs)
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




add_filter('form_wrap_process_contactForm', 'form_wrap_process_contactForm', 99, 2);

function form_wrap_process_contactForm($formFields, $onprocessargs)
{

    $response = [];

    $full_name = isset($formFields['full_name']) ? sanitize_text_field($formFields['full_name']) : '';
    $email = isset($formFields['email']) ? sanitize_email($formFields['email']) : '';
    $message = isset($formFields['message']) ? wp_kses_post($formFields['message']) : '';
    $subject = isset($formFields['subject']) ? wp_kses_post($formFields['subject']) : '';

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


    //////var_dump($headers);

    $status = wp_mail($email_to, $subject, $email_body, $headers, $attachments);

    return $status;
}
