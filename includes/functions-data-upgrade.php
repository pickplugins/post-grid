<?php
if ( ! defined('ABSPATH')) exit;  // if direct access

function post_grid_layout_css($layout){

    $css = array();
    $css['flat'] = '.__ID__ a{text-decoration:none}
.__ID__ {
  vertical-align: top;
}
.__ID__ .layer-media{}
.__ID__ .layer-content {
}';

    $css['flip-x'] = '.__ID__ a{text-decoration:none}
.__ID__ {
  overflow: hidden;
  padding: 0;
  -webkit-perspective: 600px;
  perspective: 600px;
  position: relative;
  vertical-align: top;
  width: 100%;
}
.__ID__:hover .layer-media {
  background: rgb(255, 255, 255) none repeat scroll 0 0;
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
  z-index: 900;
}
.__ID__ .layer-media {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: rgb(255, 255, 255) none repeat scroll 0 0;
  float: none;
  height: inherit;
  left: 0;
  text-align: center;
  top: 0;
  -webkit-transform: rotateX(0deg) rotateY(0deg);
  transform: rotateX(0deg) rotateY(0deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
  width: inherit;
  z-index: 900;
}
.__ID__:hover .layer-content  {
  background: rgb(255, 255, 255) none repeat scroll 0 0;
  -webkit-transform: rotateX(0deg) rotateY(0deg);
  transform: rotateX(0deg) rotateY(0deg);
  z-index: 1000;
}
.__ID__ .layer-content {
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: rgb(255, 255, 255) none repeat scroll 0 0;
  float: none;
  height: inherit;
  left: 0;
  padding: 0;
  position: absolute;
  top: 0;
  -webkit-transform: rotateX(-179deg);
  transform: rotateX(-179deg);
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-transition: all 0.4s ease-in-out 0s;
  transition: all 0.4s ease-in-out 0s;
  width: inherit;
  z-index: 800;
  padding:10px;
}
';

    $css['thumbgoleft'] = '.__ID__ a{text-decoration:none}
.__ID__ {
  overflow: hidden;
  position: relative;
  vertical-align: top;
}
.__ID__:hover .layer-media {
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transform: scale(0.5) translateX(-100%);
  -ms-transform: scale(0.5) translateX(-100%);
  transform: scale(0.5) translateX(-100%);
}
.__ID__ .layer-media {
  -webkit-transition: all 1s ease 0s;
  transition: all 1s ease 0s;
  width: 100%;
}
.__ID__:hover .layer-content{
  opacity: 1;
  filter: alpha(opacity=100);
}
.__ID__ .layer-content {
  left: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  position: absolute;
  top: 0;
  -webkit-transition: all 1s ease 0s;
  transition: all 1s ease 0s;
}
.__ID__ .layer-hover {
  display: none;
}';
    $css['thumbrounded'] = '.__ID__ a{text-decoration:none}
.__ID__ .layer-media {
  background: rgb(255, 255, 255) none repeat scroll 0 0;
  border-radius: 50%;
  overflow: hidden;
}
.__ID__ .layer-media .thumb {

}';
    $css['contentbottom'] = '.__ID__ a{text-decoration:none}
.__ID__ {
  overflow: hidden;
  position: relative;
  vertical-align: top;
}
.__ID__:hover .layer-media {
  z-index:9;
}
.__ID__ .layer-media {
  -webkit-transition: all 0.4s ease 0s;
  transition: all 0.4s ease 0s;
  left: 0;
  top: 0;
  width: 100%;
}
.__ID__:hover .layer-content{

}
.__ID__ .layer-content {
  background: rgba(0, 0, 0, 0.3) none repeat scroll 0 0;
  bottom: 0;
  color: rgb(255, 255, 255);
  left: 0;
  position: absolute;
  -webkit-transition: all 1s ease 0s;
  transition: all 1s ease 0s;
  width: 100%;
	padding: 10px;
}
';
    $css['spinright'] = '.__ID__ a{text-decoration:none}
.__ID__ {
  overflow: hidden;
  position: relative;
  vertical-align: top;
}
.__ID__:hover .layer-media {
  -webkit-transform: rotate(30deg);
  -ms-transform: rotate(30deg);
  transform: rotate(30deg);
  opacity: 0;
  filter: alpha(opacity=0);
}
.__ID__ .layer-media {
  -webkit-transition: all 1s ease 0s;
  transition: all 1s ease 0s;
  left: 0;
  top: 0;
  width: 100%;
}
.__ID__:hover .layer-content{
  opacity: 1;
  filter: alpha(opacity=100);
}
.__ID__ .layer-content {
  left: 0;
  opacity: 0;
  filter: alpha(opacity=0);
  position: absolute;
  top: 0;
  width: 100%;
  -webkit-transition: all 1s ease 0s;
  transition: all 1s ease 0s;
}
';


    return isset($css[$layout]) ? $css[$layout] : '';


}


