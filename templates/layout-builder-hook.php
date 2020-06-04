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
        <div class="" id="template-tools">
            <div class="tools-tabs">
                <ul class="tab-navs">
                    <li class="nav" data-id="1">Elements</li>
                    <li class="nav" data-id="2">Settings</li>
                    <li class="nav" data-id="3">Library</li>
                </ul>

                <div class="tab-content  data-id-1" >

                    <div class="tools-toggle">
                        <div class="toggle-header">Layout</div>
                        <div class="toggle-content">
                            <div class="element-list">
                                <div class="layoutElement" onclick="addElement(event, {elType:'container'})" >Container</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'row'})" >Row</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'column'})" >Column</div>
                            </div>

                        </div>
                    </div>


                    <div class="tools-toggle">
                        <div class="toggle-header">General</div>
                        <div class="toggle-content">
                            <div class="element-list">
                                <div class="layoutElement" onclick="addElement(event, {elType:'heading'})">Heading</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'text'})">Text</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'image'})">Image</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'link'})">Link</div>
                            </div>

                        </div>
                    </div>

                    <div class="tools-toggle">
                        <div class="toggle-header">Post Elements</div>
                        <div class="toggle-content">
                            <div class="element-list">
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_title'})" >Post Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_featured_image'})" >Post Thumbnail</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_excerpt'})" >Post Excerpt</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_date'})" >Post Date</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_author'})">Post Author</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_categories'})">Post Categories</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_tags'})">Post Tags</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_terms'})">Post Terms</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_comments_count'})">Comments Count</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_comments'})">Post Comments</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_edit_link'})" >Post Edit Link</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'next_post_link'})">Next Post Link</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'previous_post_link'})">Previous Post Link</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'related_posts'})">Related posts</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'post_id'})" >Post ID</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_is_sticky'})" >Post Sticky</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_status'})" >Post Status</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_format'})" >Post Format</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'post_type'})" >Post Type</div>

                            </div>

                        </div>

                    </div>

                    <div class="tools-toggle">
                        <div class="toggle-header">Archive Elements</div>
                        <div class="toggle-content">
                            <div class="element-list">
                                <div class="layoutElement" onclick="addElement(event, {elType:'author_name'})" >Author Name</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'author_avatar'})" >Author Avatar</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'term_title'})" >Term Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'term_id'})" >Term ID</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'term_edit_link'})" >Term Edit Link</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'term_description'})" >Term Description</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'date_title'})">Date Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'month_title'})">Month Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'year_title'})">Year Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'search_query'})">Search Query</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'next_posts_link'})">Next Posts Link</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'previous_posts_link'})">Previous Posts Link</div>

                            </div>

                        </div>

                    </div>

                    <div class="tools-toggle">
                        <div class="toggle-header">Global Elements</div>
                        <div class="toggle-content">
                            <div class="element-list">
                                <div class="layoutElement" onclick="addElement(event, {elType:'site_header'})" >Site header</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'site_footer'})" >Site footer</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'site_title'})" >Site Tile</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'search_form'})" >Search form</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'breadcrumb'})" >Breadcrumb</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'nav_menu'})" >Nav  Menu</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'term_edit_link'})" >Term Edit Link</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'term_description'})" >Term Description</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'date_title'})">Date Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'month_title'})">Month Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'year_title'})">Year Title</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'search_query'})">Search Query</div>

                                <div class="layoutElement" onclick="addElement(event, {elType:'next_posts_link'})">Next Posts Link</div>
                                <div class="layoutElement" onclick="addElement(event, {elType:'previous_posts_link'})">Previous Posts Link</div>

                            </div>

                        </div>

                    </div>







                </div>
                <div class="tab-content data-id-2" >

                    <div id="selectedObjectSettings">
                    </div>

                </div>

                <div class="tab-content data-id-3" >

                    <div class="tools-toggle">
                        <div class="toggle-header">General</div>
                        <div class="toggle-content">

                            General content

                        </div>

                    </div>

                </div>

            </div>
        </div>
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

        /*.pglb .pglb-container.active, .pglb .pglb-row.active,.pglb .pglb-column.active, .pglb .pglb-element.active {*/
        /*    border: 1px dashed #007bff;*/
        /*}*/

        /*.pglb .pglb-container[isactive="active"], .pglb .pglb-row[isactive="active"],.pglb .pglb-column[isactive="active"], .pglb .pglb-element[isactive="active"] {*/
        /*    border: 1px dashed #007bff;*/
        /*}*/

        .pglb .pglb-container, .pglb .pglb-row,.pglb .pglb-column, .pglb .pglb-element{
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
            border-left: 1px solid #7892ab;
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
            border-left: 1px solid #7892ab;
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
            border-left: 1px solid #7892ab;
            cursor: pointer;
        }

        .pglb .remove:hover{
            background: #ff4b03;
        }





        /*pglb-elementSettings*/
        .pglb .pglb-element{
            background: #f9f9f9;
            position: relative;
        }


        .pglb .pglb-element:hover{
            border: 1px dashed #007bff;
        }
        .pglb .pglb-element:hover  .elementSettings{
            display: inline-block;
        }
        .pglb .elementSettings{
            position: absolute;
            bottom: 0;
            right: 50%;
            background: #3a5673;
            color: #fff;
            display: none;
            z-index: 99999;
            transform: translate(50%, 0);
        }


        .pglb .elementSettings span{
            padding: 2px 7px;
            border-left: 1px solid #7892ab;
            cursor: pointer;
        }

        .pglb .remove:hover{
            background: #ff4b03;
        }

        .pglb .selectElement:hover{
            background: #22af61;
        }
        .pglb .customizeElement:hover{
            background: #308ad2;
        }




        /*Tools*/


        #template-tools {
            position: fixed;
            top: 0px;
            width: 380px;
            background: #f3f9ff;
            z-index: 999999999999999999999;
            height: 100%;
            left: 0;
            box-shadow: 0 0 6px -3px rgba(0, 0, 0, 0.43);
            overflow-y: scroll;

        }

        .admin-bar #template-tools{
            top: 32px;
        }


        body{
            margin-left: 380px !important;
        }



        #template-tools .tab-navs{
            margin: 0;
            padding: 0;
        }
        #template-tools .tab-navs .nav{
            display: inline-block;
            width: 33%;
            padding: 15px 0px;
            background: #3a5673;
            margin: 0;
            float: left;
            color: #fff;
            border-right: 1px solid #46617b;
            text-align: center;
            cursor: pointer;
            font-size: 14px;

        }

        #template-tools .tab-navs .nav.active{
            background: #314861;
        }
        #template-tools .tab-content{
            clear: both;
            padding: 10px;
        }

        #template-tools .tab-content.inactive{
            display: none;
        }

        #template-tools .element-list{
            margin: 0;
            padding: 15px 13px;
            display: block;
        }

        #template-tools .element-list .layoutElement{
            display: inline-block;
            width: 49.1%;
            text-align: center;
            padding: 10px 0px;
            background: #48617982;
            margin: 2px 0;
            cursor: pointer;
            color: #fff;
            font-size: 14px;
            border-radius: 3px;
        }


        #template-tools .tools-toggle{
            clear: both;
        }
        #template-tools .toggle-header{
            padding: 10px 10px;
            background: #6c7d8e;
            color: #fff;
            margin: 0px 0 7px 0;
            cursor: pointer;
        }
        #template-tools .toggle-content{
            display: none;
        }

        #template-tools .tools-toggle.active .toggle-content{
            display: block;
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



