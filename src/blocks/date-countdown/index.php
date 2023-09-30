<?php
if (!defined('ABSPATH'))
  exit();



class PGBlockDateCountdown
{
  function __construct()
  {
    add_action('init', array($this, 'register_scripts'));
    add_action('wp_enqueue_scripts', array($this, 'front_scripts'));
  }


  // loading src files in the gutenberg editor screen
  function register_scripts()
  {
    //wp_register_style('editor_style', post_grid_plugin_url . 'src/blocks/date-countdown/index.css');
    //wp_register_script('editor_script', post_grid_plugin_url . 'src/blocks/date-countdown/index.js', array('wp-blocks', 'wp-element'));


    register_block_type(
      'post-grid/date-countdown',
      array(
        // 'editor_script' => 'editor_script',
        //'editor_style' => 'editor_style',
        //'script' => 'front_script',
        'uses_context' => [],
        'style' => 'front_style',
        'render_callback' => array($this, 'theHTML'),
        'attributes' => array(
          'wrapper' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'tag' => 'div',
                      'class' => '',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'backgroundColor' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'setting' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'startDate' => '',
                      'endDate' => '',
                    ),
                ),
            ),
          'second' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'tag' => 'div',
                      'class' => 'second-countdown',
                      'label' => '',
                      'prefix' => '',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'fontSize' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'minute' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'tag' => 'div',
                      'class' => 'minute-countdown',
                      'label' => '',
                      'prefix' => '',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'fontSize' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'hour' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'tag' => 'div',
                      'class' => 'hour-countdown',
                      'label' => '',
                      'prefix' => '',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'fontSize' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'day' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'tag' => 'div',
                      'class' => 'day-countdown',
                      'label' => '',
                      'prefix' => '',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'fontSize' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'numberCount' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'tag' => 'div',
                      'start' => 0,
                      'end' => 500,
                      'duration' => 1000,
                      'class' => 'number-count',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'fontSize' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'icon' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'library' => 'fontAwesome',
                      'srcType' => 'class',
                      'iconSrc' => 'far fa-calendar-alt',
                      'position' => 'beforeCommentCount',
                      'class' => 'number-count-icon',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'backgroundColor' =>
                        array(
                          'Desktop' => '',
                        ),
                      'fontSize' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'label' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'text' => '',
                      'class' => 'label',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'backgroundColor' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'prefix' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'text' => '',
                      'class' => 'prefix',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'backgroundColor' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'postfix' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'options' =>
                    array(
                      'text' => '',
                      'class' => 'postfix',
                    ),
                  'styles' =>
                    array(
                      'color' =>
                        array(
                          'Desktop' => '',
                        ),
                      'backgroundColor' =>
                        array(
                          'Desktop' => '',
                        ),
                    ),
                ),
            ),
          'customCss' =>
            array(
              'type' => 'string',
              'default' => '',
            ),
          'blockId' =>
            array(
              'type' => 'string',
              'default' => '',
            ),
          'blockCssY' =>
            array(
              'type' => 'object',
              'default' =>
                array(
                  'items' =>
                    array(
                    ),
                ),
            ),
        )


      )
    );
  }

  function front_scripts($attributes)
  {

    wp_register_script('pg-date-countdown', post_grid_plugin_url . 'src/blocks/date-countdown/front-scripts.js', [], '', true);

    if (has_block('post-grid/date-countdown')) {

      wp_enqueue_script('pg-date-countdown');
    }
  }
  function front_style($attributes)
  {

    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];
    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
  }

  // front-end output from the gutenberg editor 
  function theHTML($attributes, $content, $block)
  {


    global $postGridCss;
    global $postGridCustomCss;
    global $postGridCssY;



    $post_ID = isset($block->context['postId']) ? $block->context['postId'] : '';


    $blockId = isset($attributes['blockId']) ? $attributes['blockId'] : '';
    $blockAlign = isset($attributes['align']) ? 'align' . $attributes['align'] : '';
    $customCss = isset($attributes['customCss']) ? $attributes['customCss'] : '';

    $wrapper = isset($attributes['wrapper']) ? $attributes['wrapper'] : [];
    $wrapperOptions = isset($wrapper['options']) ? $wrapper['options'] : [];

    $wrapperTag = isset($wrapperOptions['tag']) ? $wrapperOptions['tag'] : 'div';

    // date countdown 

    $setting = isset($attributes['setting']) ? $attributes['setting'] : [];
    $settingOptions = isset($setting['options']) ? $setting['options'] : [];
    $settingStartDate = isset($settingOptions['startDate']) ? $settingOptions['startDate'] : "";
    $settingEndDate = isset($settingOptions['endDate']) ? $settingOptions['endDate'] : "";
    $second = isset($attributes['second']) ? $attributes['second'] : [];
    $secondOptions = isset($second['options']) ? $second['options'] : [];
    $secondLabel = isset($secondOptions['label']) ? $secondOptions['label'] : "";
    $secondPrefix = isset($secondOptions['prefix']) ? $secondOptions['prefix'] : "";
    $secondPostfix = isset($secondOptions['postfix']) ? $secondOptions['postfix'] : "";


    $minute = isset($attributes['minute']) ? $attributes['minute'] : [];
    $minuteOptions = isset($minute['options']) ? $minute['options'] : [];
    $minuteLabel = isset($minuteOptions['label']) ? $minuteOptions['label'] : "";
    $minutePrefix = isset($minuteOptions['prefix']) ? $minuteOptions['prefix'] : "";
    $minutePostfix = isset($minuteOptions['postfix']) ? $minuteOptions['postfix'] : "";


    $hour = isset($attributes['hour']) ? $attributes['hour'] : [];
    $hourOptions = isset($hour['options']) ? $hour['options'] : [];
    $hourLabel = isset($hourOptions['label']) ? $hourOptions['label'] : "";
    $hourPrefix = isset($hourOptions['prefix']) ? $hourOptions['prefix'] : "";
    $hourPostfix = isset($hourOptions['postfix']) ? $hourOptions['postfix'] : "";

    $day = isset($attributes['day']) ? $attributes['day'] : [];
    $dayOptions = isset($day['options']) ? $day['options'] : [];
    $dayLabel = isset($dayOptions['label']) ? $dayOptions['label'] : "";
    $dayPrefix = isset($dayOptions['prefix']) ? $dayOptions['prefix'] : "";
    $dayPostfix = isset($dayOptions['postfix']) ? $dayOptions['postfix'] : "";




    // Set your target end date and time (in this example, September 30, 2023, at 00:00:00 UTC).
$endDate = strtotime($settingEndDate);

// Get the current server time (you may need to adjust the time zone).
$currentDate = time();

// Get the start date, choosing the maximum of the current date and date1.
$date1 = strtotime($settingStartDate); // Replace this with your date1 value
$startDate = max($currentDate, $date1);

// Calculate the time difference between the start date and the end date.
$timeDifference = $endDate - $startDate;

// Calculate days, hours, minutes, and seconds.
$days = floor($timeDifference / (60 * 60 * 24));
$hours = floor(($timeDifference % (60 * 60 * 24)) / (60 * 60));
$minutes = floor(($timeDifference % (60 * 60)) / 60);
$seconds = $timeDifference % 60;

// Format values to always display as two digits.
$formattedDays = str_pad($days, 2, '0', STR_PAD_LEFT);
$formattedHours = str_pad($hours, 2, '0', STR_PAD_LEFT);
$formattedMinutes = str_pad($minutes, 2, '0', STR_PAD_LEFT);
$formattedSeconds = str_pad($seconds, 2, '0', STR_PAD_LEFT);

    



    // date countdown 












    


    $icon = isset($attributes['icon']) ? $attributes['icon'] : '';
    $iconOptions = isset($icon['options']) ? $icon['options'] : [];

    $iconLibrary = isset($iconOptions['library']) ? $iconOptions['library'] : '';
    $iconSrcType = isset($iconOptions['srcType']) ? $iconOptions['srcType'] : '';
    $iconSrc = isset($iconOptions['iconSrc']) ? $iconOptions['iconSrc'] : '';
    $iconPosition = isset($iconOptions['position']) ? $iconOptions['position'] : '';
    $iconClass = isset($iconOptions['class']) ? $iconOptions['class'] : '';


    $prefix = isset($attributes['prefix']) ? $attributes['prefix'] : '';
    $prefixOptions = isset($prefix['options']) ? $prefix['options'] : '';


    $prefixText = isset($prefixOptions['text']) ? _wp_specialchars($prefixOptions['text']) : '';
    $prefixClass = isset($prefixOptions['class']) ? $prefixOptions['class'] : 'prefix';

    $postfix = isset($attributes['postfix']) ? $attributes['postfix'] : '';
    $postfixOptions = isset($postfix['options']) ? $postfix['options'] : '';

    $postfixText = isset($postfixOptions['text']) ? _wp_specialchars($postfixOptions['text']) : '';

    $postfixClass = isset($postfixOptions['class']) ? $postfixOptions['class'] : 'postfix';

    $blockCssY = isset($attributes['blockCssY']) ? $attributes['blockCssY'] : [];
    $postGridCssY[] = isset($blockCssY['items']) ? $blockCssY['items'] : [];





    if ($iconLibrary == 'fontAwesome') {
      wp_enqueue_style('fontawesome-icons');
    } else if ($iconLibrary == 'iconFont') {
      wp_enqueue_style('icofont-icons');
    } else if ($iconLibrary == 'bootstrap') {
      wp_enqueue_style('bootstrap-icons');
    }




    $postGridCustomCss .= $customCss;


    $fontIconHtml = '<span class="' . $iconClass . ' ' . $iconSrc . '"></span>';

    $dataAtts = [
      "startDate" => $settingStartDate,
      "endDate" => $settingEndDate,
      "blockId" => $blockId,

    ];


    ob_start();


    if (!empty($wrapperTag)):

      ?>
      <<?php echo esc_attr($wrapperTag); ?> class="PGBlockDateCountdown
        <?php echo esc_attr($blockId); ?>
        <?php echo esc_attr($blockAlign); ?>" data-date-countdown="<?php echo esc_attr(json_encode($dataAtts)) ?>">


        <?php if ($iconPosition == 'beforePrefix'): ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

        <?php if ($prefixText): ?>
          <span class="<?php echo esc_attr($prefixClass); ?>">
            <?php echo wp_kses_post($prefixText); ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPrefix'): ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>



        <div>
          <span class="label">
            <?php echo wp_kses_post($dayLabel); ?>
          </span>
          <span class="day-countdown">
            <span class="prefix">
              <?php echo wp_kses_post($dayPrefix); ?>
            </span>
            <span class="day"><?php echo wp_kses_post($formattedDays); ?></span>
            <span class="postfix">
              <?php echo wp_kses_post($dayPostfix); ?>
            </span>
          </span>
        </div>
        <div>
          <span class="label">
            <?php echo wp_kses_post($hourLabel); ?>
          </span>
          <span class="hour-countdown">
            <span class="prefix">
              <?php echo wp_kses_post($hourPrefix); ?>
            </span>
            <span class="hour"><?php echo wp_kses_post($formattedHours); ?></span>
            <span class="postfix">
              <?php echo wp_kses_post($hourPostfix); ?>
            </span>
          </span>
        </div>
        <div>
          <span class="label">
            <?php echo wp_kses_post($minuteLabel); ?>
          </span>
          <span class="minute-countdown">
            <span class="prefix">
              <?php echo wp_kses_post($minutePrefix); ?>
            </span>
            <span class="minute"><?php echo wp_kses_post($formattedMinutes); ?></span>
            <span class="postfix">
              <?php echo wp_kses_post($minutePostfix); ?>
            </span>
          </span>
        </div>
        <div>
          <span class="label">
            <?php echo wp_kses_post($secondLabel); ?>
          </span>
          <span class="second-countdown">
            <span class="prefix">
              <?php echo wp_kses_post($secondPrefix); ?>
            </span>
            <span class="second"><?php echo wp_kses_post($formattedSeconds); ?></span>
            <span class="postfix">
              <?php echo wp_kses_post($secondPostfix); ?>
            </span>
          </span>
        </div>





        


        <?php if ($iconPosition == 'beforePostfix'): ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>
        <?php if ($postfixText): ?>
          <span class="<?php echo $postfixClass; ?>">
            <?php echo $postfixText; ?>
          </span>
        <?php endif; ?>

        <?php if ($iconPosition == 'afterPostfix'): ?>
          <?php echo wp_kses_post($fontIconHtml); ?>
        <?php endif; ?>

      </<?php echo esc_attr($wrapperTag); ?>>
      <?php

    endif;



    ?>









    <?php return ob_get_clean();
  }
}

$PGBlockDateCountdown = new PGBlockDateCountdown();