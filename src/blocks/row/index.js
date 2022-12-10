import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'
import { useSelect, select, useDispatch, dispatch } from '@wordpress/data';
import { useEntityRecord } from '@wordpress/core-data';
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow, Dropdown, DropdownMenu, SelectControl, ColorPicker, ColorPalette, ToolsPanelItem, ComboboxControl, ToggleControl, MenuGroup, MenuItem, TextareaControl, Popover, Spinner } from '@wordpress/components'
import { __experimentalBoxControl as BoxControl } from '@wordpress/components';
import { useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

import { InspectorControls, BlockControls, AlignmentToolbar, RichText, __experimentalLinkControl as LinkControl } from '@wordpress/block-editor'
import { __experimentalInputControl as InputControl } from '@wordpress/components';
import breakPoints from '../../breakpoints'
const { RawHTML } = wp.element;
import { store } from '../../store'
import { link, linkOff } from "@wordpress/icons";

import IconToggle from '../../components/icon-toggle'
import Typography from '../../components/typography'
import PGMailSubsctibe from '../../components/mail-subscribe'
import PGContactSupport from '../../components/contact-support'
import BreakpointToggle from '../../components/breakpoint-toggle'
import colorsPresets from '../../colors-presets'
import { InnerBlocks } from "@wordpress/block-editor"
import classnames from 'classnames';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';


var myStore = wp.data.select('postgrid-shop');

function SaveComponent() {
  return <InnerBlocks.Content />
}

function EditComponent() {
  return (
    <div style={{ backgroundColor: "#333", padding: "35px" }}>
      <InnerBlocks />
    </div>
  )
}

registerBlockType("post-grid/row", {
  title: "row",

  icon: {
    // Specifying a background color to appear with the icon e.g.: in the inserter.
    background: '#2563eb',
    // Specifying a color for the icon (optional: if not set, a readable color will be automatically defined)
    foreground: '#fff',
    // Specifying an icon for the block
    src:

      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3 2V11.5H12.5V2H3ZM14.875 6.75V13.875H7.75V16.25H17.25V6.75H14.875ZM19.625 11.5V18.625H12.5V21H22V11.5H19.625Z" />
      </svg>


    ,
  },


  attributes: {


    wrapper: {
      type: 'object',
      default: {
        options: {
          content: '',
          tag: 'div',
          class: 'pg-row',
        },

        styles:
        {
          textAlign: {},
          color: {},
          bgColor: {},
          padding: {},
          margin: {},
          display: {},
          position: {},
          overflow: {},

          width: {},
          height: {},
        },
      },
    },
    blockId: {
      "type": "string",
      "default": ''
    },
    customCss: {
      "type": "string",
      "default": ''
    },
    blockCssY: {
      "type": "object",
      "default": { items: {} }
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
    var clientId = props.clientId;


    var blockId = attributes.blockId;

    var blockIdX = attributes.blockId ? attributes.blockId : 'pg' + clientId.split('-').pop();
    var blockClass = '.' + blockIdX;

    var wrapper = attributes.wrapper;

    var customCss = attributes.customCss;
    var blockCssY = attributes.blockCssY;


    var postId = context['postId'];
    var postType = context['postType'];

    const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());
    const [isLoading, setisLoading] = useState(false);
    const [postGridData, setPostGridData] = useState(window.PostGridPluginData);


    // Wrapper CSS Class Selectors
    var wrapperSelector = blockClass;

    const ALLOWED_BLOCKS = ['core/column'];

    function ColumnsEditContainer({
      attributes,
      setAttributes,
      updateAlignment,
      updateColumns,
      clientId,
    }) {
      const { isStackedOnMobile, verticalAlignment } = attributes;

      const { count } = useSelect(
        (select) => {
          return {
            count: select(blockEditorStore).getBlockCount(clientId),
          };
        },
        [clientId]
      );

      const classes = classnames({
        [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
        [`is-not-stacked-on-mobile`]: !isStackedOnMobile,
      });

      const blockProps = useBlockProps({
        className: classes,
      });
      const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'horizontal',
        renderAppender: false,
      });

      return (
        <>
          <BlockControls>
            <BlockVerticalAlignmentToolbar
              onChange={updateAlignment}
              value={verticalAlignment}
            />
          </BlockControls>
          <InspectorControls>
            <PanelBody>
              <RangeControl
                __nextHasNoMarginBottom
                label={__('Columns')}
                value={count}
                onChange={(value) => updateColumns(count, value)}
                min={1}
                max={Math.max(6, count)}
              />
              {count > 6 && (
                <Notice status="warning" isDismissible={false}>
                  {__(
                    'This column count exceeds the recommended amount and may cause visual breakage.'
                  )}
                </Notice>
              )}
              <ToggleControl
                label={__('Stack on mobile')}
                checked={isStackedOnMobile}
                onChange={() =>
                  setAttributes({
                    isStackedOnMobile: !isStackedOnMobile,
                  })
                }
              />
            </PanelBody>
          </InspectorControls>
          <div {...innerBlocksProps} />
        </>
      );
    }

    const ColumnsEditContainerWrapper = withDispatch(
      (dispatch, ownProps, registry) => ({
        /**
         * Update all child Column blocks with a new vertical alignment setting
         * based on whatever alignment is passed in. This allows change to parent
         * to overide anything set on a individual column basis.
         *
         * @param {string} verticalAlignment the vertical alignment setting
         */
        updateAlignment(verticalAlignment) {
          const { clientId, setAttributes } = ownProps;
          const { updateBlockAttributes } = dispatch(blockEditorStore);
          const { getBlockOrder } = registry.select(blockEditorStore);

          // Update own alignment.
          setAttributes({ verticalAlignment });

          // Update all child Column Blocks to match.
          const innerBlockClientIds = getBlockOrder(clientId);
          innerBlockClientIds.forEach((innerBlockClientId) => {
            updateBlockAttributes(innerBlockClientId, {
              verticalAlignment,
            });
          });
        },

        /**
         * Updates the column count, including necessary revisions to child Column
         * blocks to grant required or redistribute available space.
         *
         * @param {number} previousColumns Previous column count.
         * @param {number} newColumns      New column count.
         */
        updateColumns(previousColumns, newColumns) {
          const { clientId } = ownProps;
          const { replaceInnerBlocks } = dispatch(blockEditorStore);
          const { getBlocks } = registry.select(blockEditorStore);

          let innerBlocks = getBlocks(clientId);
          const hasExplicitWidths =
            hasExplicitPercentColumnWidths(innerBlocks);

          // Redistribute available width for existing inner blocks.
          const isAddingColumn = newColumns > previousColumns;

          if (isAddingColumn && hasExplicitWidths) {
            // If adding a new column, assign width to the new column equal to
            // as if it were `1 / columns` of the total available space.
            const newColumnWidth = toWidthPrecision(100 / newColumns);

            // Redistribute in consideration of pending block insertion as
            // constraining the available working width.
            const widths = getRedistributedColumnWidths(
              innerBlocks,
              100 - newColumnWidth
            );

            innerBlocks = [
              ...getMappedColumnWidths(innerBlocks, widths),
              ...Array.from({
                length: newColumns - previousColumns,
              }).map(() => {
                return createBlock('core/column', {
                  width: `${newColumnWidth}%`,
                });
              }),
            ];
          } else if (isAddingColumn) {
            innerBlocks = [
              ...innerBlocks,
              ...Array.from({
                length: newColumns - previousColumns,
              }).map(() => {
                return createBlock('core/column');
              }),
            ];
          } else {
            // The removed column will be the last of the inner blocks.
            innerBlocks = innerBlocks.slice(
              0,
              -(previousColumns - newColumns)
            );

            if (hasExplicitWidths) {
              // Redistribute as if block is already removed.
              const widths = getRedistributedColumnWidths(
                innerBlocks,
                100
              );

              innerBlocks = getMappedColumnWidths(innerBlocks, widths);
            }
          }

          replaceInnerBlocks(clientId, innerBlocks);
        },
      })
    )(ColumnsEditContainer);

    function Placeholder({ clientId, name, setAttributes }) {
      const { blockType, defaultVariation, variations } = useSelect(
        (select) => {
          const {
            getBlockVariations,
            getBlockType,
            getDefaultBlockVariation,
          } = select(blocksStore);

          return {
            blockType: getBlockType(name),
            defaultVariation: getDefaultBlockVariation(name, 'block'),
            variations: getBlockVariations(name, 'block'),
          };
        },
        [name]
      );
      const { replaceInnerBlocks } = useDispatch(blockEditorStore);
      const blockProps = useBlockProps();

      return (
        <div {...blockProps}>
          <__experimentalBlockVariationPicker
            icon={get(blockType, ['icon', 'src'])}
            label={get(blockType, ['title'])}
            variations={variations}
            onSelect={(nextVariation = defaultVariation) => {
              if (nextVariation.attributes) {
                setAttributes(nextVariation.attributes);
              }
              if (nextVariation.innerBlocks) {
                replaceInnerBlocks(
                  clientId,
                  createBlocksFromInnerBlocksTemplate(
                    nextVariation.innerBlocks
                  ),
                  true
                );
              }
            }}
            allowSkip
          />
        </div>
      );
    }


    var clientId = props.clientId;
    const hasInnerBlocks = useSelect(
      (select) =>
        select(blockEditorStore).getBlocks(clientId).length > 0,
      [clientId]
    );
    const Component = hasInnerBlocks
      ? ColumnsEditContainerWrapper
      : Placeholder;

    return <Component {...props} />;
  },
  save: function (props) {
    // to make a truly dynamic block, we're handling front end by render_callback under index.php file
    const { isStackedOnMobile, verticalAlignment } = attributes;

    const className = classnames({
      [`are-vertically-aligned-${verticalAlignment}`]: verticalAlignment,
      [`is-not-stacked-on-mobile`]: !isStackedOnMobile,
    });

    const blockProps = useBlockProps.save({ className });
    const innerBlocksProps = useInnerBlocksProps.save(blockProps);

    return <div {...innerBlocksProps} />;

    //return null;

  }
})