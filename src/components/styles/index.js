

const { Component, RawHTML } = wp.element;
import { Panel, PanelBody, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'
import { applyFilters } from '@wordpress/hooks';

import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';
import { Icon, close, arrowRight } from '@wordpress/icons';

import PGDropdown from '../../components/dropdown'
import BreakpointToggle from '../../components/breakpoint-toggle'
import PGDropdownSudoSelector from '../../components/dropdown-sudo-selector'

import PGcssAlignContent from '../../components/css-align-content'
import PGcssAlignItems from '../../components/css-align-items'
import PGcssAlignSelf from '../../components/css-align-self'
import PGcssBackfaceVisibility from '../../components/css-backface-visibility'
import PGcssBackgroundAttachment from '../../components/css-background-attachment'
import PGcssBackgroundBlendMode from '../../components/css-background-blend-mode'
import PGcssBackgroundClip from '../../components/css-background-clip'
import PGcssBackgroundColor from '../../components/css-background-color'
import PGcssBgColor from '../../components/css-bg-color'

import PGcssBackgroundImage from '../../components/css-background-image'
import PGcssBackgroundOrigin from '../../components/css-background-origin'
import PGcssBackgroundPosition from '../../components/css-background-position'
import PGcssBackgroundRepeat from '../../components/css-background-repeat'
import PGcssBackgroundSize from '../../components/css-background-size'
import PGcssBorder from '../../components/css-border'
import PGcssBorderTop from '../../components/css-border-top'
import PGcssBorderRight from '../../components/css-border-right'
import PGcssBorderBottom from '../../components/css-border-bottom'
import PGcssBorderLeft from '../../components/css-border-left'
import PGcssBorderRadius from '../../components/css-border-radius'
import PGcssBorderImage from '../../components/css-border-image'

import PGcssBottom from '../../components/css-bottom'
import PGcssBorderCollapse from '../../components/css-border-collapse'
import PGcssBorderSpacing from '../../components/css-border-spacing'



import PGcssBackdropFilter from '../../components/css-backdrop-filter'

import PGcssBoxShadow from '../../components/css-box-shadow'
import PGcssBoxSizing from '../../components/css-box-sizing'
import PGcssClear from '../../components/css-clear'
// import PGcssClip from '../../components/css-clip'
// import PGcssClipPath from '../../components/css-clip-path'
import PGcssColor from '../../components/css-color'
import PGcssCursor from '../../components/css-cursor'
import PGcssContent from '../../components/css-content'
import PGcssColumnCount from '../../components/css-column-count'
import PGcssColumnRule from '../../components/css-column-rule'


import PGcssDisplay from '../../components/css-display'
import PGcssDirection from '../../components/css-direction'

import PGcssFilter from '../../components/css-filter'
import PGcssFloat from '../../components/css-float'
// import PGcssFontFamily from '../../components/css-font-family'
import PGcssFontSize from '../../components/css-font-size'
import PGcssFontStretch from '../../components/css-font-stretch'
import PGcssFontStyle from '../../components/css-font-style'
import PGcssFontWeight from '../../components/css-font-weight'
import PGcssFontVariantCaps from '../../components/css-font-variant-caps'

import PGcssHeight from '../../components/css-height'
import PGcssLeft from '../../components/css-left'
import PGcssLetterSpacing from '../../components/css-letter-spacing'
import PGcssLineHeight from '../../components/css-line-height'
import PGcssListStyle from '../../components/css-list-style'
import PGcssMargin from '../../components/css-margin'
import PGcssMaxHeight from '../../components/css-max-height'
import PGcssMaxWidth from '../../components/css-max-width'

import PGcssMinHeight from '../../components/css-min-height'
import PGcssMinWidth from '../../components/css-min-width'



import PGcssPerspective from '../../components/css-perspective'


import PGcssObjectFit from '../../components/css-object-fit'
import PGcssOpacity from '../../components/css-opacity'
import PGcssOutline from '../../components/css-outline'
import PGcssOutlineOffset from '../../components/css-outline-offset'

import PGcssOverflow from '../../components/css-overflow'
import PGcssOverflowX from '../../components/css-overflow-x'
import PGcssOverflowY from '../../components/css-overflow-y'
import PGcssPadding from '../../components/css-padding'


import PGcssPosition from '../../components/css-position'
import PGcssRight from '../../components/css-right'
import PGcssTextAlign from '../../components/css-text-align'

import PGcssTextDecoration from '../../components/css-text-decoration'
import PGcssTextIndent from '../../components/css-text-indent'
import PGcssTextJustify from '../../components/css-text-justify'
import PGcssTextOverflow from '../../components/css-text-overflow'
import PGcssTextShadow from '../../components/css-text-shadow'
import PGcssTextTransform from '../../components/css-text-transform'
import PGcssTop from '../../components/css-top'
import PGcssTextAlignLast from '../../components/css-text-align-last'
import PGcssTableLayout from '../../components/css-table-layout'


import PGcssTransform from '../../components/css-transform'
import PGcssTransition from '../../components/css-transition'
import PGcssVerticalAlign from '../../components/css-vertical-align'
import PGcssVisibility from '../../components/css-visibility'
import PGcssWidth from '../../components/css-width'
import PGcssWhiteSpace from '../../components/css-white-space'

import PGcssWordBreak from '../../components/css-word-break'
import PGcssWordSpacing from '../../components/css-word-spacing'
import PGcssWritingMode from '../../components/css-writing-mode'
import PGcssWordWrap from '../../components/css-word-wrap'

import PGcssZIndex from '../../components/css-z-index'


var myStore = wp.data.select('postgrid-shop');
import breakPoints from '../../breakpoints'
import IconToggle from '../../components/icon-toggle'




function Html(props) {
  if (!props.warn) {
    return null;
  }



  var sudoScourceArgsBasic = {

    styles: { label: 'Idle', value: 'styles' },
    hover: { label: 'Hover', value: 'hover' },
    after: { label: 'After', value: 'after', isPro: true },
    before: { label: 'Before', value: 'before', isPro: true },
    'first-child': { label: 'First-child', value: 'first-child', isPro: true },
    'last-child': { label: 'Last-child', value: 'last-child', isPro: true },
    visited: { label: 'Visited', value: 'visited', isPro: true },
    selection: { label: 'Selection', value: 'selection', isPro: true },
    'first-letter': { label: 'First-letter', value: 'first-letter', isPro: true },
    'first-line': { label: 'First-line', value: 'first-line', isPro: true },
    //custom: { label: 'Custom', value: '', isPro: true },

  };

  let sudoScourceArgs = applyFilters('sudoScourceArgs', sudoScourceArgsBasic);



  const [sudoScources, setSudoScources] = useState(sudoScourceArgs);

  const [sudoScource, setSudoScource] = useState('styles');
  const [styles, setStyles] = useState({});

  const [cssAtts, setcssAtts] = useState({});
  const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());




  var cssPropsBasic = {
    alignContent: { id: 'alignContent', label: 'Align Content' },
    alignItems: { id: 'alignItems', label: 'Align Items' },
    alignSelf: { id: 'alignSelf', label: 'Align Self' },
    backfaceVisibility: { id: 'backfaceVisibility', label: 'Backface Visibility' },
    //background: { id: 'background', label: 'Background' },
    backgroundAttachment: { id: 'backgroundAttachment', label: 'Background Attachment', isPro: true },
    backgroundBlendMode: { id: 'backgroundBlendMode', label: 'Background Blend Mode', isPro: true },
    backgroundClip: { id: 'backgroundClip', label: 'Background Clip', isPro: true },
    backgroundColor: { id: 'backgroundColor', label: 'Background Color' },
    // bgColor: { id: 'bgColor', label: 'Background Color' },
    backgroundImage: { id: 'backgroundImage', label: 'Background Image' },
    backgroundOrigin: { id: 'backgroundOrigin', label: 'Background Origin' },
    backgroundRepeat: { id: 'backgroundRepeat', label: 'Background Repeat' },
    backgroundPosition: { id: 'backgroundPosition', label: 'Background Position' },
    backgroundSize: { id: 'backgroundSize', label: 'Background Size' },
    border: { id: 'border', label: 'Border' },
    borderTop: { id: 'borderTop', label: 'Border Top' },
    borderRight: { id: 'borderRight', label: 'Border Right' },
    borderBottom: { id: 'borderBottom', label: 'Border Bottom' },
    borderLeft: { id: 'borderLeft', label: 'Border Left' },


    borderCollapse: { id: 'borderCollapse', label: 'Border Collapse', isPro: true },
    borderImage: { id: 'borderImage', label: 'Border Image', isPro: true },
    borderRadius: { id: 'borderRadius', label: 'Border Radius' },
    borderSpacing: { id: 'borderSpacing', label: 'Border Spacing', isPro: true },
    backdropFilter: { id: 'backdropFilter', label: 'Backdrop Filter', },

    bottom: { id: 'bottom', label: 'Bottom' },
    boxShadow: { id: 'boxShadow', label: 'Box Shadow' },
    boxSizing: { id: 'boxSizing', label: 'Box Sizing', isPro: true },
    clear: { id: 'clear', label: 'Clear' },
    // clip: { id: 'clip', label: 'Clip', isPro: true },
    // clipPath: { id: 'clipPath', label: 'Clip Path', isPro: true },
    color: { id: 'color', label: 'Color' },
    columnCount: { id: 'columnCount', label: 'Column Count', isPro: true },
    columnRule: { id: 'columnRule', label: 'Column Rule', isPro: true },

    content: { id: 'content', label: 'Content', isPro: true },
    cursor: { id: 'cursor', label: 'Cursor', isPro: true },
    display: { id: 'display', label: 'Display' },
    direction: { id: 'direction', label: 'Direction' },
    float: { id: 'float', label: 'Float' },
    filter: { id: 'filter', label: 'Filter', isPro: true },
    fontSize: { id: 'fontSize', label: 'Font Size' },
    fontFamily: { id: 'fontFamily', label: 'Font Family' },
    fontStretch: { id: 'fontStretch', label: 'Font Stretch', isPro: true },
    fontStyle: { id: 'fontStyle', label: 'Font Style' },
    fontVariantCaps: { id: 'fontVariantCaps', label: 'Font VariantCaps', isPro: true },
    fontWeight: { id: 'fontWeight', label: 'Font Weight' },
    height: { id: 'height', label: 'Height' },
    left: { id: 'left', label: 'Left' },
    letterSpacing: { id: 'letterSpacing', label: 'Letter Spacing', isPro: true },
    lineHeight: { id: 'lineHeight', label: 'Line Height' },
    listStyle: { id: 'listStyle', label: 'List Style' },
    margin: { id: 'margin', label: 'Margin' },
    maxHeight: { id: 'maxHeight', label: 'Max Height' },
    maxWidth: { id: 'maxWidth', label: 'Max Width' },
    minHeight: { id: 'minHeight', label: 'Min Height' },
    minWidth: { id: 'minWidth', label: 'Min Width' },
    opacity: { id: 'opacity', label: 'Opacity' },
    objectFit: { id: 'objectFit', label: 'Object Fit' },

    outline: { id: 'outline', label: 'Outline', isPro: true },
    overflow: { id: 'overflow', label: 'Overflow' },
    overflowX: { id: 'overflowX', label: 'OverflowX', isPro: true },
    overflowY: { id: 'overflowY', label: 'OverflowY', isPro: true },
    padding: { id: 'padding', label: 'Padding' },
    perspective: { id: 'perspective', label: 'Perspective', isPro: true },
    position: { id: 'position', label: 'Position' },
    right: { id: 'right', label: 'Right' },
    textAlign: { id: 'textAlign', label: 'Text Align' },
    top: { id: 'top', label: 'Top' },
    transform: { id: 'transform', label: 'Transform', isPro: true },
    transition: { id: 'transition', label: 'Transition', isPro: true },
    verticalAlign: { id: 'verticalAlign', label: 'Vertical Align' },
    visibility: { id: 'visibility', label: 'Visibility' },
    width: { id: 'width', label: 'Width' },
    zIndex: { id: 'zIndex', label: 'Z-Index' },
    textDecoration: { id: 'textDecoration', label: 'Text Decoration', isPro: true },
    textIndent: { id: 'textIndent', label: 'Text Indent', isPro: true },
    textJustify: { id: 'textJustify', label: 'Text Justify', isPro: true },
    textOverflow: { id: 'textOverflow', label: 'Text Overflow' },
    textShadow: { id: 'textShadow', label: 'Text Shadow', isPro: true },
    textTransform: { id: 'textTransform', label: 'Text Transform', isPro: true },
    wordBreak: { id: 'wordBreak', label: 'Word Break', isPro: true },
    wordSpacing: { id: 'wordSpacing', label: 'Word Spacing', isPro: true },
    wordWrap: { id: 'wordWrap', label: 'Word Wrap', isPro: true },
    writingMode: { id: 'writingMode', label: 'Writing Mode', isPro: true },
  };
  let cssProps = applyFilters('cssProps', cssPropsBasic);


  useEffect(() => {


  }, [props.obj]);



  useEffect(() => {
    if (props.obj[sudoScource] == undefined) {
      props.obj[sudoScource] = {};
    }

  }, [sudoScource]);


  function sudoScourceUpdate(args) {
    setSudoScources(args)


  }



  var RemoveQueryPram = function ({ title, sudoScource, keyX }) {

    return (

      <>
        <span className='cursor-pointer hover:bg-red-500 hover:text-white px-1 py-1' onClick={ev => {

          props.onRemove(sudoScource, keyX)



        }}><Icon icon={close} /></span>
        <span className='mx-2'>{title}</span>
      </>




    )

  }



  function setCssAttr(option, index) {

    if (props.obj[sudoScource][option.id] == undefined) {
      props.obj[sudoScource][option.id] = {};
    }

    props.onAdd(sudoScource, option.id)


  }

  function onChangeCssVal(newVal, attr) {


    props.onChange(sudoScource, newVal, attr);

  }

  const {
    __experimentalSetPreviewDeviceType: setPreviewDeviceType,

  } = wp.data.dispatch('core/edit-post')

  var breakPointList = [];

  for (var x in breakPoints) {

    var item = breakPoints[x];
    breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

  }




  return (
    <div >



      <PanelRow className='bg-gray-200 p-2'>
        <PGDropdownSudoSelector position="bottom right" variant="secondary" options={sudoScources} sudoScourceUpdate={sudoScourceUpdate} buttonTitle={(sudoScources[sudoScource] != undefined) ? sudoScources[sudoScource].label : 'Choose'} onChange={(option, index) => {

          setSudoScource(option.value)

        }} values=""></PGDropdownSudoSelector>

        <div>
          <Icon icon={arrowRight} />
        </div>

        <PGDropdown position="bottom right" variant="secondary" options={cssProps} buttonTitle="Add Style" onChange={setCssAttr} values=""></PGDropdown>
        <div>
          <div className='inline-block'>
            <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={(x, index) => {
              setPreviewDeviceType(x.value)
              var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

              asdsdsd.then((res) => {

                setBreakPointX(res.breakpoint);

              });

            }} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
          </div>


        </div>
      </PanelRow>


      <div className='my-5'>



        {
          //Object.entries(cssAtts).map(([key, value]) => (
          props.obj[sudoScource] != undefined && Object.entries(props.obj[sudoScource]).reverse().map(([key, value]) => (

            <>


              {/* value[breakPointX] != undefined && ()} */}

              <PanelBody
                title={<RemoveQueryPram title={(cssProps[key] != undefined) ? cssProps[key].label : key} sudoScource={sudoScource} keyX={key} />}

                initialOpen={false} key={key}>


                {(key == 'alignContent') && (
                  <PGcssAlignContent val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'alignItems') && (
                  <PGcssAlignItems val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'alignSelf') && (
                  <PGcssAlignSelf val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'backfaceVisibility') && (
                  <PGcssBackfaceVisibility val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'backgroundAttachment') && (
                  <PGcssBackgroundAttachment val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'backgroundBlendMode') && (
                  <PGcssBackgroundBlendMode val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'backgroundImage') && (
                  <PGcssBackgroundImage val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'backgroundClip') && (
                  <PGcssBackgroundClip val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'bgColor') && (
                  <PGcssBgColor val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'backgroundColor') && (
                  <PGcssBackgroundColor val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'backgroundOrigin') && (
                  <PGcssBackgroundOrigin val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'backgroundRepeat') && (
                  <PGcssBackgroundRepeat val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'backgroundSize') && (
                  <PGcssBackgroundSize val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'backgroundPosition') && (
                  <PGcssBackgroundPosition val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'boxShadow') && (
                  <PGcssBoxShadow val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'border') && (
                  <PGcssBorder val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'borderTop') && (
                  <PGcssBorderTop val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'borderRight') && (
                  <PGcssBorderRight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'borderBottom') && (
                  <PGcssBorderBottom val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'borderLeft') && (
                  <PGcssBorderLeft val={value[breakPointX]} onChange={onChangeCssVal} />
                )}




                {(key == 'borderRadius') && (
                  <PGcssBorderRadius val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'borderCollapse') && (
                  <PGcssBorderCollapse val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'borderSpacing') && (
                  <PGcssBorderSpacing val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'borderImage') && (
                  <PGcssBorderImage val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'backdropFilter') && (
                  <PGcssBackdropFilter val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'bottom') && (
                  <PGcssBottom val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'cursor') && (
                  <PGcssCursor val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'content') && (
                  <PGcssContent val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'columnCount') && (
                  <PGcssColumnCount val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'columnRule') && (
                  <PGcssColumnRule val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'top') && (
                  <PGcssTop val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'left') && (
                  <PGcssLeft val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'right') && (
                  <PGcssRight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'boxSizing') && (
                  <PGcssBoxSizing val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'clear') && (
                  <PGcssClear val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'direction') && (
                  <PGcssDirection val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'color') && (
                  <PGcssColor val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'filter') && (
                  <PGcssFilter val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'float') && (
                  <PGcssFloat val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'fontSize') && (
                  <PGcssFontSize val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'fontStyle') && (
                  <PGcssFontStyle val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'fontStretch') && (
                  <PGcssFontStretch val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'fontWeight') && (
                  <PGcssFontWeight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'fontVariantCaps') && (
                  <PGcssFontVariantCaps val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'letterSpacing') && (
                  <PGcssLetterSpacing val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'lineHeight') && (
                  <PGcssLineHeight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'listStyle') && (
                  <PGcssListStyle val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'objectFit') && (
                  <PGcssObjectFit val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'opacity') && (
                  <PGcssOpacity val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'outline') && (
                  <PGcssOutline val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'outlineOffset') && (
                  <PGcssOutlineOffset val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'position') && (
                  <PGcssPosition val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'tableLayout') && (
                  <PGcssTableLayout val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'transition') && (
                  <PGcssTransition val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'transform') && (
                  <PGcssTransform val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'textIndent') && (
                  <PGcssTextIndent val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'textJustify') && (
                  <PGcssTextJustify val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'textOverflow') && (
                  <PGcssTextOverflow val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'textTransform') && (
                  <PGcssTextTransform val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'textDecoration') && (
                  <PGcssTextDecoration val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'textShadow') && (
                  <PGcssTextShadow val={value[breakPointX]} onChange={onChangeCssVal} />
                )}









                {(key == 'textAlign') && (
                  <PGcssTextAlign val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'textAlignLast') && (
                  <PGcssTextAlignLast val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'visibility') && (
                  <PGcssVisibility val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'wordBreak') && (
                  <PGcssWordBreak val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'wordSpacing') && (
                  <PGcssWordSpacing val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'zIndex') && (
                  <PGcssZIndex val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'padding') && (
                  <PGcssPadding val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'margin') && (
                  <PGcssMargin val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'maxHeight') && (
                  <PGcssMaxHeight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'maxWidth') && (
                  <PGcssMaxWidth val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'minHeight') && (
                  <PGcssMinHeight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'minWidth') && (
                  <PGcssMinWidth val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'display') && (
                  <PGcssDisplay val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'width') && (
                  <PGcssWidth val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'height') && (
                  <PGcssHeight val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'verticalAlign') && (
                  <PGcssVerticalAlign val={value[breakPointX]} onChange={onChangeCssVal} />
                )}



                {(key == 'overflow') && (
                  <PGcssOverflow val={value[breakPointX]} onChange={onChangeCssVal} />
                )}



                {(key == 'overflowX') && (
                  <PGcssOverflowX val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'overflowY') && (
                  <PGcssOverflowY val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'writingMode') && (
                  <PGcssWritingMode val={value[breakPointX]} onChange={onChangeCssVal} />
                )}

                {(key == 'wordWrap') && (
                  <PGcssWordWrap val={value[breakPointX]} onChange={onChangeCssVal} />
                )}


                {(key == 'perspective') && (
                  <PGcssPerspective val={value[breakPointX]} onChange={onChangeCssVal} />
                )}
                {(key == 'whiteSpace') && (
                  <PGcssWhiteSpace val={value[breakPointX]} onChange={onChangeCssVal} />
                )}



              </PanelBody>


            </>


          ))

        }
      </div>




    </div>
  );
}


class PGStyles extends Component {


  constructor(props) {
    super(props);

    this.state = { showWarning: true };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }



  componentDidMount(props) {





  }

  render() {

    var {
      blockId,
      obj,
      onChange,
      onAdd,
      onRemove,


    } = this.props;




    return (

      <>



        <Html blockId={blockId} obj={obj} onAdd={onAdd} onRemove={onRemove} onChange={onChange} warn={this.state.showWarning} />

      </>



    )
  }
}


export default PGStyles;