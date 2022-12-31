

const { Component, RawHTML } = wp.element;
import { Panel, PanelBody, PanelRow, PanelItem, Button, Dropdown, SelectControl, Popover, Spinner } from '@wordpress/components'
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { link, linkOff } from "@wordpress/icons";
import apiFetch from '@wordpress/api-fetch';
import { Icon, close } from '@wordpress/icons';

import PGDropdown from '../../components/dropdown'
import BreakpointToggle from '../../components/breakpoint-toggle'


import PGcssAlignContent from '../../components/css-align-content'
import PGcssAlignItems from '../../components/css-align-items'
import PGcssAlignSelf from '../../components/css-align-self'
import PGcssBackfaceVisibility from '../../components/css-backface-visibility'
import PGcssBackgroundAttachment from '../../components/css-background-attachment'
import PGcssBackgroundBlendMode from '../../components/css-background-blend-mode'
import PGcssBackgroundClip from '../../components/css-background-clip'
import PGcssBackgroundColor from '../../components/css-background-color'
// import PGcssBackgroundImage from '../../components/css-background-image'
import PGcssBackgroundOrigin from '../../components/css-background-origin'
import PGcssBackgroundPosition from '../../components/css-background-position'
import PGcssBackgroundRepeat from '../../components/css-background-repeat'
import PGcssBackgroundSize from '../../components/css-background-size'
// import PGcssBorder from '../../components/css-border'
import PGcssBorderRadius from '../../components/css-border-radius'
import PGcssBottom from '../../components/css-bottom'
// import PGcssBoxShadow from '../../components/css-box-shadow'
import PGcssBoxSizing from '../../components/css-box-sizing'
import PGcssClear from '../../components/css-clear'
// import PGcssClip from '../../components/css-clip'
// import PGcssClipPath from '../../components/css-clip-path'
import PGcssColor from '../../components/css-color'
// import PGcssCursor from '../../components/css-cursor'
// import PGcssDirection from '../../components/css-direction'
import PGcssDisplay from '../../components/css-display'

import PGcssFilter from '../../components/css-filter'
import PGcssFloat from '../../components/css-float'
// import PGcssFontFamily from '../../components/css-font-family'
import PGcssFontSize from '../../components/css-font-size'
import PGcssFontStretch from '../../components/css-font-stretch'
import PGcssFontStyle from '../../components/css-font-style'
import PGcssFontWeight from '../../components/css-font-weight'
import PGcssHeight from '../../components/css-height'
import PGcssLeft from '../../components/css-left'
import PGcssLetterSpacing from '../../components/css-letter-spacing'
import PGcssLineHeight from '../../components/css-line-height'
// import PGcssListStyle from '../../components/css-list-style'
import PGcssMargin from '../../components/css-margin'

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
// import PGcssTextOverflow from '../../components/css-text-overflow'
import PGcssTextShadow from '../../components/css-text-shadow'
import PGcssTextTransform from '../../components/css-text-transform'
import PGcssTop from '../../components/css-top'

// import PGcssTransform from '../../components/css-transform'
// import PGcssTransition from '../../components/css-transition'
import PGcssVerticalAlign from '../../components/css-vertical-align'
import PGcssVisibility from '../../components/css-visibility'
import PGcssWidth from '../../components/css-width'

import PGcssWordBreak from '../../components/css-word-break'
import PGcssWordSpacing from '../../components/css-word-spacing'
import PGcssZIndex from '../../components/css-z-index'


var myStore = wp.data.select('postgrid-shop');
import breakPoints from '../../breakpoints'
import IconToggle from '../../components/icon-toggle'




class PGStyles extends Component {


  render() {

    var {
      obj,
      onChange,
      onAdd,
      onRemove,


    } = this.props;


    function Html() {


      var sudoScourceArgs = [
        { label: 'Select..', value: '' },

        { label: 'Idle', value: 'styles' },
        { label: 'Hover', value: 'hover' },
        { label: 'Typo', value: 'typo' },
        { label: 'After', value: 'after' },
        { label: 'Before', value: 'before' },
        { label: 'First-child', value: 'first-child' },
        { label: 'Last-child', value: 'last-child' },
        { label: 'Visited', value: 'visited' },
        { label: 'Selection', value: 'selection' },
        { label: 'First-letter', value: 'first-letter' },
        { label: 'First-line', value: 'first-line' },


      ];
      const [sudoScources, setSudoScources] = useState([]);

      const [sudoScource, setSudoScource] = useState('styles');
      const [styles, setStyles] = useState({});

      const [cssAtts, setcssAtts] = useState({});
      const [breakPointX, setBreakPointX] = useState(myStore.getBreakPoint());

      var cssProps = {
        alignContent: { id: 'alignContent', label: 'Align Content' },
        alignItems: { id: 'alignItems', label: 'Align Items' },
        alignSelf: { id: 'alignSelf', label: 'Align Self' },
        backfaceVisibility: { id: 'backfaceVisibility', label: 'Backface Visibility' },
        background: { id: 'background', label: 'Background' },
        backgroundAttachment: { id: 'backgroundAttachment', label: 'Background Attachment' },
        backgroundBlendMode: { id: 'backgroundBlendMode', label: 'Background Blend Mode' },
        backgroundClip: { id: 'backgroundClip', label: 'Background Clip' },
        backgroundColor: { id: 'backgroundColor', label: 'BackgroundColor' },
        backgroundImage: { id: 'backgroundImage', label: 'Background Image' },
        backgroundOrigin: { id: 'backgroundOrigin', label: 'Background Origin' },
        backgroundRepeat: { id: 'backgroundRepeat', label: 'Background Repeat' },
        backgroundPosition: { id: 'backgroundPosition', label: 'Background Position' },
        backgroundSize: { id: 'backgroundSize', label: 'Background Size' },


        border: { id: 'border', label: 'Border' },
        borderCollapse: { id: 'borderCollapse', label: 'Border Collapse' },
        borderImage: { id: 'borderImage', label: 'Border Image' },
        borderRadius: { id: 'borderRadius', label: 'Border Radius' },
        borderSpacing: { id: 'borderSpacing', label: 'Border Spacing' },
        bottom: { id: 'bottom', label: 'Bottom' },
        boxShadow: { id: 'boxShadow', label: 'Box Shadow' },
        boxSizing: { id: 'boxSizing', label: 'Box Sizing' },
        clear: { id: 'clear', label: 'Clear' },
        clip: { id: 'clip', label: 'Clip' },
        clipPath: { id: 'clipPath', label: 'Clip Path' },

        color: { id: 'color', label: 'Color' },
        columnCount: { id: 'columnCount', label: 'Column Count' },

        content: { id: 'content', label: 'Content' },
        cursor: { id: 'cursor', label: 'Cursor' },
        display: { id: 'display', label: 'Display' },
        direction: { id: 'direction', label: 'Direction' },
        float: { id: 'float', label: 'Float' },
        filter: { id: 'filter', label: 'Filter' },
        fontSize: { id: 'fontSize', label: 'Font Size' },
        fontFamily: { id: 'fontFamily', label: 'Font Family' },
        fontStretch: { id: 'fontStretch', label: 'Font Stretch' },
        fontStyle: { id: 'fontStyle', label: 'Font Style' },
        fontVariantCaps: { id: 'fontVariantCaps', label: 'Font VariantCaps' },
        fontWeight: { id: 'fontWeight', label: 'Font Weight' },
        height: { id: 'height', label: 'Height' },
        left: { id: 'left', label: 'Left' },
        letterSpacing: { id: 'letterSpacing', label: 'Letter Spacing' },
        lineHeight: { id: 'lineHeight', label: 'Line Height' },
        listStyle: { id: 'listStyle', label: 'ListStyle' },
        margin: { id: 'margin', label: 'Margin' },
        maxHeight: { id: 'maxHeight', label: 'Max Height' },
        maxWidth: { id: 'maxWidth', label: 'Max Width' },
        minHeight: { id: 'minHeight', label: 'Min Height' },
        minWidth: { id: 'minWidth', label: 'Min Width' },
        opacity: { id: 'opacity', label: 'Opacity' },
        outline: { id: 'outline', label: 'Outline' },
        overflow: { id: 'overflow', label: 'Overflow' },
        overflowX: { id: 'overflowX', label: 'OverflowX' },
        overflowY: { id: 'overflowY', label: 'OverflowY' },
        padding: { id: 'padding', label: 'Padding' },
        perspective: { id: 'perspective', label: 'Perspective' },
        position: { id: 'position', label: 'Position' },
        right: { id: 'right', label: 'Right' },
        textAlign: { id: 'textAlign', label: 'Text Align' },

        top: { id: 'top', label: 'Top' },
        transform: { id: 'transform', label: 'Transform' },
        transition: { id: 'transition', label: 'Transition' },
        verticalAlign: { id: 'verticalAlign', label: 'Vertical Align' },
        visibility: { id: 'visibility', label: 'Visibility' },
        width: { id: 'width', label: 'Width' },
        zIndex: { id: 'zIndex', label: 'Z-Index' },


        textDecoration: { id: 'textDecoration', label: 'Text Decoration' },
        textIndent: { id: 'textIndent', label: 'Text Indent' },
        textJustify: { id: 'textJustify', label: 'Text Indent' },
        textOverflow: { id: 'textOverflow', label: 'Text Overflow' },
        textShadow: { id: 'textShadow', label: 'Text Shadow' },
        textTransform: { id: 'textTransform', label: 'Text Transform' },
        wordBreak: { id: 'wordBreak', label: 'Word Break' },
        wordSpacing: { id: 'wordSpacing', label: 'Word Spacing' },
        wordWrap: { id: 'wordWrap', label: 'Word Wrap' },
        writingMode: { id: 'writingMode', label: 'Writing Mode' },


      };


      useEffect(() => {

        sudoScourceArgs.map(sudo => {

          if (obj[sudo.value] != undefined) {
            sudoScources.push(sudo);
          }

        })


      }, [obj]);



      useEffect(() => {


        setcssAtts(obj[sudoScource]);




      }, [sudoScource]);


      function setCssAttr(option, index) {

        //console.log(option);
        //console.log(cssAtts);

        if (cssAtts[option.id] == undefined) {
          cssAtts[option.id] = {};
        }
        //console.log(cssAtts);

        onAdd(sudoScource, option.id)


      }

      function onChangeCssVal(newVal, attr) {

        //console.log(newVal);
        onChange(sudoScource, newVal, attr);


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

        <>
          <PanelBody className="my-5" title="Style" initialOpen={true}>
            <PanelRow>
              <div>Style Source</div>
              <SelectControl
                label=""

                value={sudoScource}
                options={sudoScources}
                onChange={(newVal) => {
                  setSudoScource(newVal)

                }}
              />
            </PanelRow>


            <PanelRow>
              <div>Add Style</div>
              <PGDropdown position="bottom right" variant="secondary" options={cssProps} buttonTitle="Choose" onChange={setCssAttr} values=""></PGDropdown>
            </PanelRow>

            {JSON.stringify(cssAtts)}

            <div>
              {
                Object.entries(cssAtts).map(([key, value]) => (
                  <div className='border-b-2 border-solid py-4 hover:border-gray-600 border-t-2 hover:border-t-2 hover:border-b-2 border-t-transparent' key={key}>

                    {JSON.stringify(value)}

                    <PanelRow className=''>
                      <label>{(cssProps[key] != undefined) ? cssProps[key].label : key}</label>
                      <div>
                        <div className='inline-block bg-blue-500 text-white'>
                          <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={(x, index) => {
                            setPreviewDeviceType(x.value)
                            var asdsdsd = wp.data.dispatch('postgrid-shop').setBreakPoint(x.value)

                            asdsdsd.then((res) => {

                              setBreakPointX(res.breakpoint);

                            });

                          }} activeIcon={breakPoints[breakPointX].icon} value={breakPointX} />
                        </div>

                        <div className='hover:bg-red-500 bg-red-400 text-white m-1 inline-block p-1 cursor-pointer' onClick={ev => {


                          onRemove(sudoScource, key)
                        }}><span class="dashicons dashicons-no-alt"></span></div>
                      </div>



                    </PanelRow>




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

                    {(key == 'backgroundClip') && (
                      <PGcssBackgroundClip val={value[breakPointX]} onChange={onChangeCssVal} />
                    )}
                    {(key == 'bgColor') && (
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


                    {(key == 'borderRadius') && (
                      <PGcssBorderRadius val={value[breakPointX]} onChange={onChangeCssVal} />
                    )}

                    {(key == 'bottom') && (
                      <PGcssBottom val={value[breakPointX]} onChange={onChangeCssVal} />
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


                    {(key == 'letterSpacing') && (
                      <PGcssLetterSpacing val={value[breakPointX]} onChange={onChangeCssVal} />
                    )}


                    {(key == 'lineHeight') && (
                      <PGcssLineHeight val={value[breakPointX]} onChange={onChangeCssVal} />
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

                    {(key == 'textIndent') && (
                      <PGcssTextIndent val={value[breakPointX]} onChange={onChangeCssVal} />
                    )}

                    {(key == 'textJustify') && (
                      <PGcssTextJustify val={value[breakPointX]} onChange={onChangeCssVal} />
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


                  </div>
                ))

              }
            </div>

          </PanelBody>




        </>




      )

    }


    return (


      <Html />


    )
  }
}


export default PGStyles;