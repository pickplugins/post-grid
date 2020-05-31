<?php
if ( ! defined('ABSPATH')) exit;  // if direct access


add_action('post_grid_layout_builder', 'post_grid_layout_builder');


function post_grid_layout_builder(){
    wp_enqueue_script('layout-builder');
    wp_enqueue_style('bootstrap');
    //wp_enqueue_style('bootstrap-grid');


    wp_enqueue_style('font-awesome-5');

?>

    <div class="pglb">
        <div class="" id="template-tools"></div>
        <div class="" id="template-preview"></div>
    </div>





<?php


}




add_action('post_grid_layout_builder', 'post_grid_layout_builder_css');


function post_grid_layout_builder_css(){

    ?>
    <style type="text/css">
        #template-tools{}
        #template-preview{}





        /*pglb-container*/

        .pglb .pglb-container.active, .pglb .pglb-row.active,.pglb .pglb-column.active, .pglb .pglb-element.active {
            border: 1px dashed #007bff;
        }

        .pglb .pglb-container, .pglb .pglb-row,.pglb .pglb-column{
            border: 1px dashed rgba(0,0,0,0);
        }
        .pglb .pglb-container{
            position: relative;
        }

        .pglb .pglb-container:hover{
            border: 1px dashed #007bff;
        }
        .pglb .pglb-container:hover .containerSettings{
            display: inline-block;
        }
        .pglb .containerSettings{
            position: absolute;
            top: -25px;
            left: 0;
            background: #3a5673;
            color: #fff;
            display: none;
            z-index: 99999;
        }


        .pglb .containerSettings span{
            padding: 2px 7px;
            border-left: 1px solid #46617b;
            cursor: pointer;
        }

        /*pglb-row*/
        .pglb .pglb-row{
            position: relative;
        }
        .pglb .pglb-row:hover{
            border: 1px dashed #007bff;
        }

        .pglb .pglb-row:hover .rowSettings{
            display: inline-block;
        }
        .pglb .rowSettings{
            position: absolute;
            top: 0;
            left: 0;
            background: #3a5673;
            color: #fff;
            display: none;
            z-index: 99999;
        }


        .pglb .rowSettings span{
            padding: 2px 7px;
            border-left: 1px solid #46617b;
            cursor: pointer;
        }





        /*pglb-column*/
        .pglb .pglb-column{
            background: #f9f9f9;
        }


        .pglb .pglb-column:hover{
            border: 1px dashed #007bff;
        }
        .pglb .pglb-column:hover  .columnSettings{
            display: inline-block;
        }
        .pglb .columnSettings{
            position: absolute;
            top: 0;
            right: 0;
            background: #3a5673;
            color: #fff;
            display: none;
            z-index: 99999;
        }


        .pglb .columnSettings span{
            padding: 2px 7px;
            border-left: 1px solid #46617b;
            cursor: pointer;
        }

        .pglb .remove:hover{
            background: #ff4b03;
        }








    </style>
    <?php


}


add_action('post_grid_layout_builder', 'post_grid_layout_builder_script');


function post_grid_layout_builder_script(){

    ?>
    <script>


    </script>
    <?php


}



