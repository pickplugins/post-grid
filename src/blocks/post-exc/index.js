import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'

import IconToggle from '../../components/icon-toggle'
import BreakpointToggle from '../../components/breakpoint-toggle'
import transforms from './transforms';


/**
 * WordPress dependencies
 */
import { useEntityProp } from '@wordpress/core-data';
import {
  Warning,
  useBlockProps,
} from '@wordpress/block-editor';

import { useCanEditEntity } from './hooks';



var myStore = wp.data.select('my-shop');

////console.log(wp.data.select('my-shop').getBreakPoint('food'))
//console.log(myStore.getBreakPoint());




////console.log(wp.data.select('my-shop').setPrice('food', 98))
////console.log()




registerBlockType("post-grid/post-exc", {
  title: "Post Exc",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#7e70af',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path d="M4 14.5h16V16H4zM4 18.5h9V20H4zM4 4h3c2 0 3 .86 3 2.583 0 .891-.253 1.554-.76 1.988-.505.435-1.24.652-2.204.652H5.542V12H4V4zm2.855 4c.53 0 .924-.114 1.18-.343.266-.228.398-.579.398-1.051 0-.473-.132-.82-.397-1.04-.265-.229-.67-.343-1.217-.343H5.542V8h1.313z"></path></svg>,
  },


  attributes: {

    textAlign: {
      "type": "string"
    },
    moreText: {
      "type": "string",
      "default": 'h2'
    },
    showMoreOnNewLine: {
      "type": "string",
      "default": ''
    },
    postfix: {
      "type": "string",
      "default": ''
    },

    customCss: {
      "type": "string",
      "default": ''
    },
    customUrl: {
      "type": "string",
      "default": ''
    },

    postId: {
      type: 'number',
    },
    level: {
      "type": "number",
      "default": 2
    },

    color: {
      type: 'object',
      default: { responsive: {} },
    },

    bgColor: {
      type: 'object',
      default: { responsive: {} },
    },

    padding: {
      type: 'object',
      default: {
        responsive: {}
      },
    },
    margin: {
      type: 'object',
      default: {
        responsive: {}
      },
    },

    isLink: {
      "type": "boolean",
      "default": false
    },
    rel: {
      "type": "string",
      "attribute": "rel",
      "default": ""
    },

    linkAttr: {
      "type": "array",
      "default": []
    },
    blockCss: {
      "type": "object",
      "default": { items: {} }
    },

    linkTarget: {
      "type": "string",
      "default": "_self"
    },
  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],

  supports: {
    "align": ["wide", "full"],
  },
  category: "post-grid",


  edit: function (props) {

    var attributes = props.attributes;
    var setAttributes = props.setAttributes;
    var context = props.context;
    var isSelected = props.isSelected;

    var postId = context['postId'];
    var postType = context['postType'];
    var queryId = context['queryId'];

    var moreText = props.moreText;
    var textAlign = props.textAlign;
    var showMoreOnNewLine = props.showMoreOnNewLine;


    const asdasd = useEntityProp('postType', postType, 'tags', postId);;

    console.log(asdasd);


    const isDescendentOfQueryLoop = Number.isFinite(queryId);
    const userCanEdit = useCanEditEntity('postType', postType, postId);
    const isEditable = userCanEdit && !isDescendentOfQueryLoop;
    const [
      rawExcerpt,
      setExcerpt,
      { rendered: renderedExcerpt, protected: isProtected } = {},
    ] = useEntityProp('postType', postType, 'excerpt', postId);

    /**
     * When excerpt is editable, strip the html tags from
     * rendered excerpt. This will be used if the entity's
     * excerpt has been produced from the content.
     */
    const strippedRenderedExcerpt = useMemo(() => {
      if (!renderedExcerpt) return '';
      const document = new window.DOMParser().parseFromString(
        renderedExcerpt,
        'text/html'
      );



      return document.body.textContent || document.body.innerText || '';
    }, [renderedExcerpt]);




    if (!postType || !postId) {
      return (
        <div >
          <p>
            {__(
              'This is the Post Excerpt block, it will display the excerpt from single posts.'
            )}
          </p>
          <p>
            {__(
              'If there are any Custom Post Types with support for excerpts, the Post Excerpt block can display the excerpts of those entries as well.'
            )}
          </p>
        </div>
      );
    }
    if (isProtected && !userCanEdit) {
      return (
        <div >
          <Warning>
            {__(
              'There is no excerpt because this is a protected post.'
            )}
          </Warning>
        </div>
      );
    }
    const readMoreLink = (
      <RichText
        className="wp-block-post-excerpt__more-link"
        tagName="a"
        aria-label={__('"Read more" link text')}
        placeholder={__('Add "read more" link text')}
        value={moreText}
        onChange={(newMoreText) =>
          setAttributes({ moreText: newMoreText })
        }
        withoutInteractiveFormatting={true}
      />
    );

    const excerptContent = isEditable ? (
      <RichText

        aria-label={__('Post excerpt text')}
        value={
          rawExcerpt ||
          strippedRenderedExcerpt ||
          (isSelected ? '' : __('No post excerpt found'))
        }
        onChange={setExcerpt}
        tagName="p"
      />
    ) : (
      <p >
        {strippedRenderedExcerpt || __('No post excerpt found')}
      </p>
    );
    return (
      <>
        <BlockControls>
          <AlignmentToolbar
            value={textAlign}
            onChange={(newAlign) =>
              setAttributes({ textAlign: newAlign })
            }
          />
        </BlockControls>
        <InspectorControls>
          <PanelBody title={__('Settings')}>
            <ToggleControl
              label={__('Show link on new line')}
              checked={showMoreOnNewLine}
              onChange={(newShowMoreOnNewLine) =>
                setAttributes({
                  showMoreOnNewLine: newShowMoreOnNewLine,
                })
              }
            />
          </PanelBody>
        </InspectorControls>
        <div >
          {excerptContent}
          {!showMoreOnNewLine && ' '}
          {showMoreOnNewLine ? (
            <p className="wp-block-post-excerpt__more-text">
              {readMoreLink}
            </p>
          ) : (
            readMoreLink
          )}
        </div>
      </>
    );



  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    return null;
  }
})