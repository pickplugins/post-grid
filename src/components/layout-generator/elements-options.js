

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'
import { applyFilters, doAction, addAction, addFilter } from "@wordpress/hooks";
import {
  __experimentalInputControl as InputControl,
  PanelBody,
  PanelRow,
  SelectControl,
  ToggleControl,
} from "@wordpress/components";
import {
  InspectorControls,
  __experimentalLinkControl as LinkControl,
  MediaUpload,
  MediaUploadCheck,
  useBlockProps,
} from "@wordpress/block-editor";

import { __ } from "@wordpress/i18n";

import CBDropdown from "../../components/dropdown";
import PGIconPicker from "../../components/icon-picker";
import PGRadioControl from "../../components/radio-control";
import CBAnimateOn from "../../components/animate-on";
import TreeViewMetaFields from "./TreeViewMetaFields";
import postMetaPrams from "./postMetaPrams";

const ALLOWED_MEDIA_TYPES = ["image"];

var thumbnailSizeArgs = {
  full: {
    label: "Full",
    value: "full",
    height: "",
    width: "",
    crop: false,
  },
  thumbnail: {
    label: "thumbnail(150*150)",
    value: "thumbnail",
    height: 150,
    width: 150,
  },
  medium: {
    label: "medium(300*300)",
    value: "medium",
    height: 300,
    width: 300,
  },
  medium_large: {
    label: "medium large(768*0)",
    value: "medium_large",
    height: 0,
    width: 768,
  },
  large: {
    label: "large(1024*1024)",
    value: "large",
    height: 1024,
    width: 1024,
  },
  "1536x1536": {
    label: "1536x1536(1536*1536)",
    value: "1536x1536",
    height: 1536,
    width: 1536,
  },
  "2048x2048": {
    label: "2048x2048(2048*2048)",
    value: "2048x2048",
    height: 2048,
    width: 2048,
  },
  woocommerce_archive_thumbnail: {
    label: "woocommerce archive thumbnail(500*500)",
    value: "woocommerce_archive_thumbnail",
    height: 500,
    width: 500,
  },
  woocommerce_thumbnail: {
    label: "woocommerce thumbnail(300*300)",
    value: "woocommerce_thumbnail",
    height: 300,
    width: 300,
  },
  woocommerce_single: {
    label: "woocommerce single(600*0)",
    value: "woocommerce_single",
    height: 0,
    width: 600,
  },
  woocommerce_gallery_thumbnail: {
    label: "woocommerce gallery thumbnail(100*100)",
    value: "woocommerce_gallery_thumbnail",
    height: 100,
    width: 100,
  },
};


var LinkToArgs = {
  none: { label: __("Choose", "post-grid"), value: "" },
  postUrl: { label: __("Post URL", "post-grid"), value: "postUrl" },
  homeUrl: { label: __("Home URL", "post-grid"), value: "homeUrl" },
  authorUrl: { label: __("Author URL", "post-grid"), value: "authorUrl" },
  authorLink: {
    label: __("Author Link", "post-grid"),
    value: "authorLink",
  },
  authorMail: {
    label: __("Author Mail", "post-grid"),
    value: "authorMail",
    isPro: true,
  },
  authorMeta: {
    label: __("Author Meta", "post-grid"),
    value: "authorMeta",
    isPro: true,
  },
  customField: {
    label: __("Custom Field", "post-grid"),
    value: "customField",
    isPro: true,
  },
  customUrl: {
    label: __("Custom URL", "post-grid"),
    value: "customUrl",
    isPro: true,
  },
};

var linkTargetArgs = {
  _self: { label: "_self", value: "_self" },
  _blank: { label: "_blank", value: "_blank" },
  _parent: { label: "_parent", value: "_parent" },
  _top: { label: "_top", value: "_top" },
};
var limitByArgs = {
  words: { label: "words", value: "words" },
  characters: { label: "characters", value: "characters" },

};


var dateFormats = {
  "Y-M-d": { label: "2022-Feb-25", value: "Y-M-d" },
  "Y-m-d": { label: "2022-05-25", value: "Y-m-d" },
  "d-m-y": { label: "25-05-2022", value: "d-m-y" },
  "d/m/y": { label: "25/05/2022", value: "d/m/y" },
  "y-m-d": { label: "2022-05-25", value: "y-m-d" },
  "y/m/d": { label: "2022/05/25", value: "y/m/d" },
  "D M y": { label: "Sun Feb 2022", value: "D M y" },
  "D M d, y": { label: "Sun Feb 11, 2022", value: "D M d, y" },
  "M D d, y": { label: "Feb Sun 11, 2022", value: "M D d, y" },
  "M d, y": { label: "Feb 11, 2022", value: "M d, y" },
  "F d, y": { label: "February 11, 2022", value: "F d, y" },
  "d M y": { label: "25 Feb 2022", value: "d M y" },
};

var numberFormats = {
  "decimal": { label: "Decimal", value: "decimal" },
  "wordForm": { label: "Word Form", value: "wordForm" },
  "scientificNotation": { label: "Scientific Notation", value: "scientificNotation" },
  "binaryBase2": { label: "Binary (Base 2)", value: "binaryBase2" },
  "octalBase8": { label: "Octal (Base 8)", value: "octalBase8" },
  "hexadecimalBase16": { label: "2022/05/25", value: "hexadecimalBase16" },
  "roman": { label: "Roman", value: "roman" },
  "engineeringNotation": { label: "Engineering Notation", value: "engineeringNotation" },
  "compactNumber": { label: "Feb Sun 11, 2022", value: "compactNumber" },

};



var tagsPrams = {
  "ul": { label: "UL", value: "ul" },
  "li": { label: "LI", value: "li" },
  "div": { label: "DIV", value: "div" },
  "span": { label: "SPAN", value: "span" },
  "p": { label: "P", value: "p" },

  "h1": { label: "H1", value: "h1" },
  "h2": { label: "H2", value: "h2" },
  "h3": { label: "H3", value: "h3" },
  "h4": { label: "H4", value: "h4" },
  "h5": { label: "H5", value: "h5" },
  "h6": { label: "H6", value: "h6" },

}
var customFieldSrcPrams = {
  "acf": { label: "ACF", value: "acf" },
  "none": { label: "Default", value: "" },
}










/*postTitle*/
addFilter('PostGridElementOptionspostTitle', 'post-grid/element', PostGridElementOptionspostTitle, 10)

function PostGridElementOptionspostTitle(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>

    </div>
  );
}




/*postThumbnail*/
addFilter('PostGridElementOptionspostThumbnail', 'post-grid/element', PostGridElementOptionspostThumbnail, 10)

function PostGridElementOptionspostThumbnail(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Default Thumbnail", "post-grid")}
        </label>
        <div>

          <MediaUpload
            className="bg-gray-700 hover:bg-gray-600"
            onSelect={(media) => {
              // media.id



              handleChange("defaultSrcId", media.id);
              handleChange("defaultSrcUrl", media.url);


            }}
            onClose={() => { }}
            allowedTypes={ALLOWED_MEDIA_TYPES}
            value={selectedElement.options.defaultSrcId}
            render={({ open }) => (
              <div
                className="flex w-full justify-center items-center bg-gray-300/30 min-h-[200px] rounded-md border border-solid border-slate-400 hover:border-black transition-all duration-300 ease-in-out cursor-pointer mt-2 "
                onClick={open}>
                <img
                  // src={MyLazy}
                  src={selectedElement.options.defaultSrcUrl}
                  alt=""
                  className=" "
                />
              </div>
            )}
          />

        </div>
      </PanelRow>




    </div>
  );
}




/*postExcerpt*/
addFilter('PostGridElementOptionspostExcerpt', 'post-grid/element', PostGridElementOptionspostExcerpt, 10)

function PostGridElementOptionspostExcerpt(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>





      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Limit By", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={limitByArgs}
          buttonTitle={
            selectedElement?.options?.limitBy == undefined ||
              selectedElement?.options?.limitBy.length == 0
              ? __("Choose", "post-grid")
              : limitByArgs[selectedElement?.options?.limitBy] == undefined
                ? __("Choose", "post-grid")
                : limitByArgs[selectedElement?.options?.limitBy].label
          }
          onChange={(option) => {
            handleChange("limitBy", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>

      {selectedElement?.options?.limitBy.length > 0 && (
        <PanelRow>
          <label htmlFor="" className="font-medium text-slate-900 ">
            {__("Limit Count", "post-grid")}
          </label>
          <InputControl
            value={selectedElement?.options?.limitCount}
            onChange={(newVal) => {
              handleChange("limitCount", newVal);
            }}
          />
        </PanelRow>
      )}

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Read More Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.readMoreText}
          onChange={(newVal) => {
            handleChange("readMoreText", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>

    </div>
  );
}

/*readMore*/
addFilter('PostGridElementOptionsreadMore', 'post-grid/element', PostGridElementOptionsreadMore, 10)

function PostGridElementOptionsreadMore(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>






      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Read More Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.readMoreText}
          onChange={(newVal) => {
            handleChange("readMoreText", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>

    </div>
  );
}

/*customText*/
addFilter('PostGridElementOptionscustomText', 'post-grid/element', PostGridElementOptionscustomText, 10)

function PostGridElementOptionscustomText(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Wrapper Tag", "post-grid")}
        </label>
        <SelectControl
          label=""
          value={selectedElement.options.customTag}
          options={[
            { label: __("Choose", "post-grid"), value: "" },
            { label: "a", value: "a" },
            { label: "H1", value: "h1" },
            { label: "H2", value: "h2" },
            { label: "H3", value: "h3" },
            { label: "H4", value: "h4" },
            { label: "H5", value: "h5" },
            { label: "H6", value: "h6" },
            { label: "SPAN", value: "span" },
            { label: "DIV", value: "div" },
            { label: "P", value: "p" },
          ]}
          onChange={(newVal) => {
            handleChange("customTag", newVal);
          }}
        />
      </PanelRow>



      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Custom Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.content}
          onChange={(newVal) => {
            handleChange("content", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}





/*container*/
addFilter('PostGridElementOptionscontainer', 'post-grid/element', PostGridElementOptionscontainer, 10)

function PostGridElementOptionscontainer(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Animate On", "post-grid")}
        </label>
        <CBAnimateOn
          animateOn={selectedElement.options?.animateOn}
          onChange={(prams) => {

            handleChange("animateOn", prams);

            //setAttributes({ animateOn: prams });
          }}
        />
      </PanelRow>










    </div>
  );
}

/*layer*/
addFilter('PostGridElementOptionslayer', 'post-grid/element', PostGridElementOptionslayer, 10)

function PostGridElementOptionslayer(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Animate On", "post-grid")}
        </label>
        <CBAnimateOn
          animateOn={selectedElement.options?.animateOn}
          onChange={(prams) => {

            handleChange("animateOn", prams);

            //setAttributes({ animateOn: prams });
          }}
        />
      </PanelRow>










    </div>
  );
}



/*postDate*/
addFilter('PostGridElementOptionspostDate', 'post-grid/element', PostGridElementOptionspostDate, 10)

function PostGridElementOptionspostDate(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>



      <PanelRow className="mb-4">
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Date Format", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          variant="secondary"
          options={dateFormats}
          // buttonTitle="Choose"
          buttonTitle={
            dateFormats[selectedElement.options.format] != undefined
              ? dateFormats[selectedElement.options.format].label
              : __("Choose", "post-grid")
          }
          onChange={(option) => {
            handleChange("format", option.value);
          }}
          values={""}></CBDropdown>
      </PanelRow>
      <PanelRow className="mb-4">
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Custom Format", "post-grid")}
        </label>
        <InputControl
          className="mr-2"
          value={selectedElement.options.format}
          onChange={(newVal) => {
            handleChange("format", newVal);
          }}
        />
      </PanelRow>






      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Choose Icon", "post-grid")}
        </label>
        <PGIconPicker
          library={selectedElement.options?.icon?.library}
          srcType={selectedElement.options?.icon?.srcType}
          iconSrc={selectedElement.options?.icon?.iconSrc}
          onChange={(arg) => {
            handleChange("icon", {
              srcType: arg.srcType,
              library: arg.library,
              iconSrc: arg.iconSrc,
            });
          }}
        />
      </PanelRow>

    </div>
  );
}


/*postAuthor*/
addFilter('PostGridElementOptionspostAuthor', 'post-grid/element', PostGridElementOptionspostAuthor, 10)

function PostGridElementOptionspostAuthor(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>



      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Choose Icon", "post-grid")}
        </label>
        <PGIconPicker
          library={selectedElement.options?.icon?.library}
          srcType={selectedElement.options?.icon?.srcType}
          iconSrc={selectedElement.options?.icon?.iconSrc}
          onChange={(arg) => {
            handleChange("icon", {
              srcType: arg.srcType,
              library: arg.library,
              iconSrc: arg.iconSrc,
            });
          }}
        />
      </PanelRow>

    </div>
  );
}

/*postAuthorAvatar*/
addFilter('PostGridElementOptionspostAuthorAvatar', 'post-grid/element', PostGridElementOptionspostAuthorAvatar, 10)

function PostGridElementOptionspostAuthorAvatar(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>



      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>



    </div>
  );
}


/*postCategories*/
addFilter('PostGridElementOptionspostCategories', 'post-grid/element', PostGridElementOptionspostCategories, 10)

function PostGridElementOptionspostCategories(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>



      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Max Count", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.maxCount}
          onChange={(newVal) => {
            handleChange("maxCount", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Separator", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.separator}
          onChange={(newVal) => {
            handleChange("separator", newVal);
          }}
        />
      </PanelRow>

      <div className="gap-2 justify-between items-center flex">
        <div className="font-medium text-slate-900">

          Enable Post Count?
        </div>
        <ToggleControl
          className='flex items-center gap-2 py-2'
          help={
            selectedElement?.options?.postCount
              ? __("Enabled", "post-grid")
              : __("Disabled.", "post-grid")
          }
          checked={selectedElement?.options?.postCount ? true : false}
          onChange={(newVal) => {
            handleChange("postCount", newVal);
          }}
        />
      </div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>



    </div>
  );
}


/*postTags*/
addFilter('PostGridElementOptionspostTags', 'post-grid/element', PostGridElementOptionspostTags, 10)

function PostGridElementOptionspostTags(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Max Count", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.maxCount}
          onChange={(newVal) => {
            handleChange("maxCount", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Separator", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.separator}
          onChange={(newVal) => {
            handleChange("separator", newVal);
          }}
        />
      </PanelRow>

      <div className="gap-2 justify-between items-center flex">
        <div className="font-medium text-slate-900">

          Enable Post Count?
        </div>
        <ToggleControl
          className='flex items-center gap-2 py-2'
          help={
            selectedElement?.options?.postCount
              ? __("Enabled", "post-grid")
              : __("Disabled.", "post-grid")
          }
          checked={selectedElement?.options?.postCount ? true : false}
          onChange={(newVal) => {
            handleChange("postCount", newVal);
          }}
        />
      </div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>



    </div>
  );
}
/*postMeta*/
addFilter('PostGridElementOptionspostMeta', 'post-grid/element', PostGridElementOptionspostMeta, 10)

function PostGridElementOptionspostMeta(html, selectedElement, handleChange) {

  var returnPrams = selectedElement?.options?.returnPrams;

  console.log(selectedElement);

  function setPrams(prams) {
    //console.log(prams);
    handleChange("returnPrams", prams);
  }


  var linkTargets = {
    _self: { label: "_self", value: "_self" },
    _blank: { label: "_blank", value: "_blank" },
    _parent: { label: "_parent", value: "_parent" },
    _top: { label: "_top", value: "_top" },
  }
  var protocolPrams = {
    "_self": { "label": "_self", "value": "_self" },
    "http": { "label": "http", "value": "http" },
    "https": { "label": "https", "value": "https" },
    "mailto": { "label": "mailto", "value": "mailto" },
    "tel": { "label": "tel", "value": "tel" },
    "sms": { "label": "sms", "value": "sms" },
    "ftp": { "label": "ftp", "value": "ftp" },
    "file": { "label": "file", "value": "file" },
    "data": { "label": "data", "value": "data" },
    "geo": { "label": "geo", "value": "geo" },
    "whatsapp": { "label": "whatsapp", "value": "whatsapp" },
    "skype": { "label": "skype", "value": "skype" },
    "zoommtg": { "label": "zoommtg", "value": "zoommtg" },
    "intent": { "label": "intent", "value": "intent" }
  }








  // const [pramsX, setPramsX] = useState(selectedElement?.options?.returnPrams);

  // useEffect(() => {
  //   console.log(prams);
  // }, [prams]);

  return (
    <div>




      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>


      <PanelRow className="mb-4">
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Wrapper tag", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          variant="secondary"
          options={tagsPrams}
          buttonTitle={
            tagsPrams[selectedElement?.options?.wrapperTag] != undefined
              ? tagsPrams[selectedElement?.options?.wrapperTag].label
              : __("Choose", "post-grid")
          }
          onChange={(option) => {

            handleChange("wrapperTag", option.value);

          }}
          values={""}></CBDropdown>
      </PanelRow>





      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Meta Key", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.metaKey}
          onChange={(newVal) => {
            handleChange("metaKey", newVal);
          }}
        />
      </PanelRow>
      {/* <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Callback", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.callback}
          onChange={(newVal) => {
            handleChange("callback", newVal);
          }}
        />
      </PanelRow> */}

      {/* {JSON.stringify(selectedElement?.options)} */}







      <PanelRow className="mb-4">
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Output Type?", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={postMetaPrams}

          buttonTitle={
            returnPrams == undefined ||
              returnPrams.length == 0
              ? __("Choose", "post-grid")
              : postMetaPrams[returnPrams?.outputType] == undefined
                ? __("Choose", "post-grid")
                : postMetaPrams[returnPrams?.outputType].label
          }


          onChange={(option) => {

            var optionX = { ...option }
            delete optionX.label;

            console.log(optionX);


            handleChange("returnPrams", optionX);




          }}
          values={[]}></CBDropdown>

      </PanelRow>

      {returnPrams?.outputType?.length > 0 && (

        <>
          <PanelRow className="mb-4">
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Custom Field Src", "post-grid")}
            </label>
            <CBDropdown
              position="bottom right"
              variant="secondary"
              options={customFieldSrcPrams}
              buttonTitle={
                customFieldSrcPrams[selectedElement?.options?.customFieldSrc] != undefined
                  ? customFieldSrcPrams[selectedElement?.options?.customFieldSrc].label
                  : __("Choose", "post-grid")
              }
              onChange={(option) => {

                handleChange("customFieldSrc", option.value);

              }}
              values={""}></CBDropdown>
          </PanelRow>

        </>

      )}



      {returnPrams.outputType == 'string' && (

        <>

          <PanelRow className="mb-4">
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Enable Shortcodes", "post-grid")}
            </label>
            <ToggleControl
              className='!mb-0'
              checked={returnPrams?.enableShortcodes ? true : false}

              onChange={(newVal) => {
                var returnPramsX = { ...returnPrams }
                returnPramsX.enableShortcodes = newVal;

                handleChange("returnPrams", returnPramsX);
              }}
            />
          </PanelRow>
          <PanelRow className="mb-4">
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Enable Embeds", "post-grid")}
            </label>
            <ToggleControl
              className='!mb-0'
              checked={returnPrams?.enableEmbeds ? true : false}

              onChange={(newVal) => {
                var returnPramsX = { ...returnPrams }
                returnPramsX.enableEmbeds = newVal;

                handleChange("returnPrams", returnPramsX);
              }}
            />
          </PanelRow>




        </>

      )}
      {returnPrams.outputType == 'strToNumber' && (

        <>

          <PanelRow>
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Decimals", "post-grid")}
            </label>
            <InputControl
              value={returnPrams?.decimals}
              onChange={(newVal) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.decimals = newVal;

                handleChange("returnPrams", returnPramsX);


              }}
            />
          </PanelRow>
          <PanelRow>
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Decimal Separator", "post-grid")}
            </label>
            <InputControl
              value={returnPrams?.decimalSeparator}
              onChange={(newVal) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.decimalSeparator = newVal;

                handleChange("returnPrams", returnPramsX);

              }}
            />
          </PanelRow>
          <PanelRow>
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Thousand Separator", "post-grid")}
            </label>
            <InputControl
              value={returnPrams?.thousandSeparator}
              onChange={(newVal) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.thousandSeparator = newVal;

                handleChange("returnPrams", returnPramsX);


              }}
            />
          </PanelRow>





        </>

      )}
      {returnPrams.outputType == 'strToLink' && (

        <>
          <PanelRow>
            <div className="flex items-center">
              <span>{__("Link Text Src?", "post-grid")}</span>
            </div>
            <SelectControl
              label=""
              value={returnPrams?.linkTextSrc}
              options={[
                { label: __("Custom", "post-grid"), value: "custom" },
                { label: __("Post Title", "post-grid"), value: 'postTitle' },
              ]}
              onChange={(newVal) => {
                var returnPramsX = { ...returnPrams }
                returnPramsX.options.linkTextSrc = newVal;

                handleChange("returnPrams", returnPramsX);
              }}
            />
          </PanelRow>

          {returnPrams?.linkTextSrc == 'custom' && (

            <>
              <PanelRow>
                <label htmlFor="" className="font-medium text-slate-900 ">
                  {__("Link Text", "post-grid")}
                </label>
                <InputControl
                  value={returnPrams?.linkText}
                  onChange={(newVal) => {

                    var returnPramsX = { ...returnPrams }
                    returnPramsX.linkText = newVal;

                    handleChange("returnPrams", returnPramsX);


                  }}
                />
              </PanelRow>

            </>

          )}


          <PanelRow>
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Target", "post-grid")}
            </label>
            <CBDropdown
              position="bottom right"
              options={linkTargets}
              buttonTitle={
                returnPrams?.target == undefined ||
                  returnPrams?.target.length == 0
                  ? __("Choose", "post-grid")
                  : linkTargets[returnPrams?.target] == undefined
                    ? __("Choose", "post-grid")
                    : linkTargets[returnPrams?.target].label
              }
              onChange={(option) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.target = option.value;

                handleChange("returnPrams", returnPramsX);
              }}
              values={[]}></CBDropdown>
          </PanelRow>
          <PanelRow>
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Protocol", "post-grid")}
            </label>
            <CBDropdown
              position="bottom right"
              options={protocolPrams}
              buttonTitle={
                returnPrams?.protocol == undefined ||
                  returnPrams?.protocol.length == 0
                  ? __("Choose", "post-grid")
                  : protocolPrams[returnPrams?.protocol] == undefined
                    ? __("Choose", "post-grid")
                    : protocolPrams[returnPrams?.protocol].label
              }
              onChange={(option) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.protocol = option.value;

                handleChange("returnPrams", returnPramsX);


              }}
              values={[]}></CBDropdown>
          </PanelRow>










        </>

      )}
      {returnPrams.outputType == 'idToImage' && (

        <>

          <PanelRow className="mb-4">
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Enable SrcSet", "post-grid")}
            </label>
            <ToggleControl
              className='!mb-0'
              checked={returnPrams?.enableSrcSet ? true : false}

              onChange={(newVal) => {
                var returnPramsX = { ...returnPrams }
                returnPramsX.enableSrcSet = newVal;

                handleChange("returnPrams", returnPramsX);
              }}
            />
          </PanelRow>



          <PanelRow>

            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Thumbnail Size?", "post-grid")}
            </label>

            <CBDropdown
              position="bottom right"
              options={thumbnailSizeArgs}
              buttonTitle={
                returnPrams?.thumbSize == undefined ||
                  returnPrams?.thumbSize.length == 0
                  ? __("Choose", "post-grid")
                  : thumbnailSizeArgs[returnPrams?.thumbSize] == undefined
                    ? __("Choose", "post-grid")
                    : thumbnailSizeArgs[returnPrams?.thumbSize].label
              }
              onChange={(option) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.thumbSize = option.value;

                handleChange("returnPrams", returnPramsX);
              }}
              values={[]}></CBDropdown>
          </PanelRow>
          <PanelRow>

            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Link To?", "post-grid")}
            </label>
            <SelectControl
              label=""
              value={returnPrams?.linkTo}
              options={[
                { label: __("Choose", "post-grid"), value: "" },
                { label: __("Custom", "post-grid"), value: "custom" },
                { label: __("Post URL", "post-grid"), value: 'postUrl' },
              ]}
              onChange={(newVal) => {
                var returnPramsX = { ...returnPrams }
                returnPramsX.linkTo = newVal;

                handleChange("returnPrams", returnPramsX);
              }}
            />
          </PanelRow>

          {returnPrams?.linkTo == 'custom' && (

            <>
              <PanelRow>
                <label htmlFor="" className="font-medium text-slate-900 ">
                  {__("Custom Link", "post-grid")}
                </label>
                <InputControl
                  value={returnPrams?.linkToUrl}
                  onChange={(newVal) => {

                    var returnPramsX = { ...returnPrams }
                    returnPramsX.linkToUrl = newVal;

                    handleChange("returnPrams", returnPramsX);


                  }}
                />
              </PanelRow>

            </>

          )}

          {returnPrams?.linkTo.length > 0 && (
            <PanelRow>
              <label htmlFor="" className="font-medium text-slate-900 ">
                {__("Target", "post-grid")}
              </label>
              <CBDropdown
                position="bottom right"
                options={linkTargets}
                buttonTitle={
                  returnPrams?.target == undefined ||
                    returnPrams?.target.length == 0
                    ? __("Choose", "post-grid")
                    : linkTargets[returnPrams?.target] == undefined
                      ? __("Choose", "post-grid")
                      : linkTargets[returnPrams?.target].label
                }
                onChange={(option) => {

                  var returnPramsX = { ...returnPrams }
                  returnPramsX.target = option.value;

                  handleChange("returnPrams", returnPramsX);
                }}
                values={[]}></CBDropdown>
            </PanelRow>

          )}












        </>

      )}













      {returnPrams.outputType == 'strToDateTime' && (

        <>


          <PanelRow className="mb-4">
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Date Format", "post-grid")}
            </label>
            <CBDropdown
              position="bottom right"
              variant="secondary"
              options={dateFormats}
              buttonTitle={
                dateFormats[returnPrams?.format] != undefined
                  ? dateFormats[returnPrams?.format].label
                  : __("Choose", "post-grid")
              }
              onChange={(option) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.format = option.value;

                handleChange("returnPrams", returnPramsX);
              }}
              values={""}></CBDropdown>
          </PanelRow>



        </>

      )}
      {returnPrams.outputType == 'arrayLoop' && (

        <>




          <PanelRow className="mb-4">
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Item tag", "post-grid")}
            </label>
            <CBDropdown
              position="bottom right"
              variant="secondary"
              options={tagsPrams}
              buttonTitle={
                tagsPrams[returnPrams?.itemTag] != undefined
                  ? tagsPrams[returnPrams?.itemTag].label
                  : __("Choose", "post-grid")
              }
              onChange={(option) => {

                var returnPramsX = { ...returnPrams }
                returnPramsX.itemTag = option.value;

                handleChange("returnPrams", returnPramsX);
              }}
              values={""}></CBDropdown>
          </PanelRow>


          <PanelRow>
            <label htmlFor="" className="font-medium text-slate-900 ">
              {__("Item Class", "post-grid")}
            </label>
            <InputControl
              value={returnPrams?.itemClass}
              onChange={(newVal) => {
                var returnPramsX = { ...returnPrams }
                returnPramsX.itemClass = newVal;
                handleChange("returnPrams", returnPramsX);
              }}
            />
          </PanelRow>






        </>

      )}




      {/* <TreeViewMetaFields
        blocks={returnPrams}
        setPrams={setPrams}
      /> */}

      {/* {JSON.stringify(returnPrams)} */}








    </div>
  );
}




/*wooPrice*/
addFilter('PostGridElementOptionswooPrice', 'post-grid/element', PostGridElementOptionswooPrice, 10)

function PostGridElementOptionswooPrice(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Currency Symbole", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.currencySymbole}
          onChange={(newVal) => {
            handleChange("currencySymbole", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Separator Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.separatorText}
          onChange={(newVal) => {
            handleChange("separatorText", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Preview for?", "post-grid")}
        </label>
        <SelectControl
          label=""
          value={selectedElement.options.previewFor}
          options={[
            {
              label: __("Choose", "post-grid"),
              value: "",
            },
            {
              label: __("Simple Product", "post-grid"),
              value: "simple",
            },
            {
              label: __("Variable Product", "post-grid"),
              value: "variable",
            },
            {
              label: __("Grouped Product", "post-grid"),
              value: "grouped",
            },
            {
              label: __("external Product", "post-grid"),
              value: "external",
            },

          ]}
          onChange={(newVal) => {
            handleChange("previewFor", newVal);
          }}
        />

      </PanelRow>


    </div>
  );
}





/*wooSaleBadge*/
addFilter('PostGridElementOptionswooSaleBadge', 'post-grid/element', PostGridElementOptionswooSaleBadge, 10)

function PostGridElementOptionswooSaleBadge(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("OnSale Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.onSaleText}
          onChange={(newVal) => {
            handleChange("onSaleText", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}



/*wooSKU*/
addFilter('PostGridElementOptionswooSKU', 'post-grid/element', PostGridElementOptionswooSKU, 10)

function PostGridElementOptionswooSKU(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Dafault SKU Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.dafaultSKUText}
          onChange={(newVal) => {
            handleChange("dafaultSKUText", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}

/*wooStockQuantity*/
addFilter('PostGridElementOptionswooStockQuantity', 'post-grid/element', PostGridElementOptionswooStockQuantity, 10)

function PostGridElementOptionswooStockQuantity(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Dafult Quantity", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.dafultQuantity}
          onChange={(newVal) => {
            handleChange("dafultQuantity", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}


/*wooInStock*/
addFilter('PostGridElementOptionswooInStock', 'post-grid/element', PostGridElementOptionswooInStock, 10)

function PostGridElementOptionswooInStock(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("In Stock Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.inStockText}
          onChange={(newVal) => {
            handleChange("inStockText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Out Of Stock Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.outOfStockText}
          onChange={(newVal) => {
            handleChange("outOfStockText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("BackOrder Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.backOrderText}
          onChange={(newVal) => {
            handleChange("backOrderText", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Preview for?", "post-grid")}
        </label>
        <SelectControl
          label=""
          value={selectedElement.options.previewFor}
          options={[
            {
              label: __("Choose", "post-grid"),
              value: "",
            },
            {
              label: __("In Stock Text", "post-grid"),
              value: "inStockText",
            },
            {
              label: __("Out Of Stock Text", "post-grid"),
              value: "outOfStockText",
            },
            {
              label: __("Back Order Text", "post-grid"),
              value: "backOrderText",
            },

          ]}
          onChange={(newVal) => {
            handleChange("previewFor", newVal);
          }}
        />

      </PanelRow>




    </div>
  );
}


/*wooTotalSales*/
addFilter('PostGridElementOptionswooTotalSales', 'post-grid/element', PostGridElementOptionswooTotalSales, 10)

function PostGridElementOptionswooTotalSales(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Default Sale Count", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.defaultSaleCount}
          onChange={(newVal) => {
            handleChange("defaultSaleCount", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}




/*wooProductRatings*/
addFilter('PostGridElementOptionswooProductRatings', 'post-grid/element', PostGridElementOptionswooProductRatings, 10)

function PostGridElementOptionswooProductRatings(html, selectedElement, handleChange) {

  var summaryTypeArgs = {
    pgNone: { label: __("None", "post-grid"), value: "" },
    pg01: {
      label: __("123 customer reviews", "post-grid"),
      value: "{review_count} customer reviews",
    },
    pg02: {
      label: __("4.50/5.00", "post-grid"),
      value: "{average_rating}/5.00",
      isPro: true,
    },
    pg03: {
      label: __("4.50 out of 5.00", "post-grid"),
      value: "{average_rating} out of 5.00",
      isPro: true,
    },
    pg04: {
      label: __("4.50(123 reviews)", "post-grid"),
      value: "{average_rating}({review_count} reviews)",
      isPro: true,
    },
    pg05: {
      label: __("Custom", "post-grid"),
      value: "custom",
      isPro: true,
    },
  };

  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Default Rating", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.defaultRating}
          onChange={(newVal) => {
            handleChange("defaultRating", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Idle Icon", "post-grid")}
        </label>
        <PGIconPicker
          library={selectedElement.options.iconsIdle.library}
          srcType={selectedElement.options.iconsIdle.srcType}
          iconSrc={selectedElement.options.iconsIdle.iconSrc}
          onChange={(arg) => {
            handleChange("iconsIdle", {
              srcType: arg.srcType,
              library: arg.library,
              iconSrc: arg.iconSrc,
            });
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Idle Icon", "post-grid")}
        </label>
        <PGIconPicker
          library={selectedElement.options.iconsFilled.library}
          srcType={selectedElement.options.iconsFilled.srcType}
          iconSrc={selectedElement.options.iconsFilled.iconSrc}
          onChange={(arg) => {
            handleChange("iconsFilled", {
              srcType: arg.srcType,
              library: arg.library,
              iconSrc: arg.iconSrc,
            });
          }}
        />
      </PanelRow>



      <PGRadioControl
        selected={selectedElement.summaryType}
        options={summaryTypeArgs}
        label="Summary Type"
        name={"summaryType"}
        onChange={(option) => {


          handleChange("summaryType", option.value);
        }} />

      {selectedElement.summaryType == "custom" && (
        <>
          <div className="my-3 relative">
            <label
              htmlFor=""
              className="font-medium text-slate-900 ">
              {__("Custom Summary", "post-grid")}
            </label>
            <InputControl
              value={selectedElement.summaryTypeCustom}
              placeholder="{average_rating} out of 5.00"
              onClick={() => {
                if (isProFeature) {
                  setIsVisible(!isVisible);
                }
              }}
              disabled={isProFeature ? true : false}
              onChange={(newVal) => {
                handleChange("summaryTypeCustom", newVal);
              }}
            />
            {isProFeature && isVisible && (
              <a
                href="https://comboblocks.com/pricing/"
                target="_blank"
                className="absolute bottom-2 right-0 bg-gray-700 text-white hover:text-white no-underline px-2 rounded-sm py-1 ">
                {__("Subscribe to use", "post-grid")}
              </a>
              // </div>
            )}
          </div>
          <p>{__("Please use following tags:", "post-grid")}</p>
          <ul>
            <li>
              <code>{"{rating_count}"}</code>
            </li>
            <li>
              <code>{"{review_count}"}</code>
            </li>
            <li>
              <code>{"{average_rating}"}</code>
            </li>
            <li>
              <code>{"{product_title}"}</code>
            </li>
          </ul>
        </>
      )}

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}



/*wooAddToCart*/
addFilter('PostGridElementOptionswooAddToCart', 'post-grid/element', PostGridElementOptionswooAddToCart, 10)

function PostGridElementOptionswooAddToCart(html, selectedElement, handleChange) {



  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Add To Cart Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.addToCartText}
          onChange={(newVal) => {
            handleChange("addToCartText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Enable Quantity", "post-grid")}
        </label>
        <ToggleControl
          className='flex items-center gap-2 py-2'
          help={
            selectedElement?.options?.quantityEnable
              ? __("Enabled", "post-grid")
              : __("Disabled.", "post-grid")
          }
          checked={selectedElement?.options?.quantityEnable ? true : false}
          onChange={(newVal) => {
            handleChange("quantityEnable", newVal);
          }}
        />
      </PanelRow>





      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Choose Icon", "post-grid")}
        </label>
        <PGIconPicker
          library={selectedElement.options.icon?.library}
          srcType={selectedElement.options.icon?.srcType}
          iconSrc={selectedElement.options.icon?.iconSrc}
          onChange={(arg) => {
            handleChange("icon", {
              srcType: arg.srcType,
              library: arg.library,
              iconSrc: arg.iconSrc,
            });
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Icon position", "post-grid")}
        </label>
        <SelectControl
          label=""
          value={selectedElement.options.iconPosition}
          options={[
            {
              label: __("Choose Position", "post-grid"),
              value: "",
            },
            {
              label: __("Before Cart Text", "post-grid"),
              value: "beforeCartText",
            },
            {
              label: __("After Cart Text", "post-grid"),
              value: "afterCartText",
            },
            {
              label: __("Before Prefix", "post-grid"),
              value: "beforePrefix",
            },
            { label: "After Prefix", value: "afterPrefix" },
            {
              label: __("Before Postfix", "post-grid"),
              value: "beforePostfix",
            },
            {
              label: __("Before Postfix", "post-grid"),
              value: "afterPostfix",
            },
          ]}
          onChange={(newVal) => {
            handleChange("iconPosition", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>



    </div>
  );
}










/*wooCategories*/
addFilter('PostGridElementOptionswooCategories', 'post-grid/element', PostGridElementOptionswooCategories, 10)

function PostGridElementOptionswooCategories(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>



      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Max Count", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.maxCount}
          onChange={(newVal) => {
            handleChange("maxCount", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Separator", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.separator}
          onChange={(newVal) => {
            handleChange("separator", newVal);
          }}
        />
      </PanelRow>

      <div className="gap-2 justify-between items-center flex">
        <div className="font-medium text-slate-900">

          Enable Post Count?
        </div>
        <ToggleControl
          className='flex items-center gap-2 py-2'
          help={
            selectedElement?.options?.postCount
              ? __("Enabled", "post-grid")
              : __("Disabled.", "post-grid")
          }
          checked={selectedElement?.options?.postCount ? true : false}
          onChange={(newVal) => {
            handleChange("postCount", newVal);
          }}
        />
      </div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>



    </div>
  );
}


/*wooTags*/
addFilter('PostGridElementOptionswooTags', 'post-grid/element', PostGridElementOptionswooTags, 10)

function PostGridElementOptionswooTags(html, selectedElement, handleChange) {


  return (
    <div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Class", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.class}
          onChange={(newVal) => {
            handleChange("class", newVal);
          }}
        />
      </PanelRow>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Max Count", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.maxCount}
          onChange={(newVal) => {
            handleChange("maxCount", newVal);
          }}
        />
      </PanelRow>


      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Separator", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.separator}
          onChange={(newVal) => {
            handleChange("separator", newVal);
          }}
        />
      </PanelRow>

      <div className="gap-2 justify-between items-center flex">
        <div className="font-medium text-slate-900">

          Enable Post Count?
        </div>
        <ToggleControl
          className='flex items-center gap-2 py-2'
          help={
            selectedElement?.options?.postCount
              ? __("Enabled", "post-grid")
              : __("Disabled.", "post-grid")
          }
          checked={selectedElement?.options?.postCount ? true : false}
          onChange={(newVal) => {
            handleChange("postCount", newVal);
          }}
        />
      </div>

      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Prefix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.prefixText}
          onChange={(newVal) => {
            handleChange("prefixText", newVal);
          }}
        />
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Postfix Text", "post-grid")}
        </label>
        <InputControl
          value={selectedElement?.options?.postfixText}
          onChange={(newVal) => {
            handleChange("postfixText", newVal);
          }}
        />
      </PanelRow>







      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link To", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={LinkToArgs}
          buttonTitle={
            selectedElement?.options?.linkTo == undefined ||
              selectedElement?.options?.linkTo.length == 0
              ? __("Choose", "post-grid")
              : LinkToArgs[selectedElement?.options?.linkTo] == undefined
                ? __("Choose", "post-grid")
                : LinkToArgs[selectedElement?.options?.linkTo].label
          }
          onChange={(option) => {
            handleChange("linkTo", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>
      <PanelRow>
        <label htmlFor="" className="font-medium text-slate-900 ">
          {__("Link Target", "post-grid")}
        </label>
        <CBDropdown
          position="bottom right"
          options={linkTargetArgs}
          buttonTitle={
            selectedElement?.options?.target == undefined ||
              selectedElement?.options?.target.length == 0
              ? __("Choose", "post-grid")
              : linkTargetArgs[selectedElement?.options?.target] == undefined
                ? __("Choose", "post-grid")
                : linkTargetArgs[selectedElement?.options?.target].label
          }
          onChange={(option) => {
            handleChange("target", option.value);
          }}
          values={[]}></CBDropdown>
      </PanelRow>



    </div>
  );
}
