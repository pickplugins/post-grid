

const { Component, RawHTML } = wp.element;
import { Panel, PanelRow, PanelItem, Button, Dropdown, SelectControl } from '@wordpress/components'
import { __experimentalInputControl as InputControl } from '@wordpress/components';


class Typography extends Component {
  render() {


    var {
      typo,
      breakPointX,
      onChange,
      setAttributes,
      obj,

    } = this.props;


    return (
      <div>


        {typo.fontFamily != undefined && (

          <>

            <PanelRow>
              <label for="">Font Family</label>
              <InputControl
                value={(typo.fontFamily[breakPointX] != undefined) ? typo.fontFamily[breakPointX] : ''}
                onChange={(newVal) => {

                  var newValuesObj = {};
                  if (Object.keys(obj.styles.fontFamily).length == 0) {
                    newValuesObj[breakPointX] = newVal;

                  } else {

                    newValuesObj = obj.styles.fontFamily;
                    newValuesObj[breakPointX] = newVal;

                  }
                  var typoX = { ...obj.styles, fontFamily: newValuesObj };



                  onChange(typoX)






                }
                }
              />
            </PanelRow>


          </>

        )}




        {typo.fontSize != undefined && (

          <>

            <PanelRow>
              <label for="">Font Size</label>
              <div className='flex'>
                <InputControl type="number"
                  value={(typo.fontSize[breakPointX] != undefined) ? typo.fontSize[breakPointX].val : ''}
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(obj.styles.fontSize).length == 0) {
                      newValuesObj[breakPointX] = { ...obj.styles.fontSize[breakPointX], val: newVal };
                    } else {
                      newValuesObj = obj.styles.fontSize;
                      newValuesObj[breakPointX] = { ...obj.styles.fontSize[breakPointX], val: newVal };
                    }
                    var typoX = { ...obj.styles, fontSize: newValuesObj };


                    onChange(typoX)


                  }
                  }
                />
                <SelectControl
                  label=""
                  value={(typo.fontSize[breakPointX] != undefined) ? typo.fontSize[breakPointX].unit : ''}

                  options={[
                    { label: 'Select Unit', value: '' },

                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                    { label: 'ex', value: 'ex' },
                    { label: 'rem', value: 'rem' },
                    { label: 'vh', value: 'vh' },
                    { label: 'vw', value: 'vw' },
                    { label: 'pt', value: 'pt' },
                    { label: 'pc', value: 'pc' },
                    { label: 'ch', value: 'ch' },

                  ]}
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(obj.styles.fontSize).length == 0) {
                      newValuesObj[breakPointX] = { ...obj.styles.fontSize[breakPointX], unit: newVal };
                    } else {
                      newValuesObj = obj.styles.fontSize;
                      newValuesObj[breakPointX] = { ...obj.styles.fontSize[breakPointX], unit: newVal };
                    }
                    var typoX = { ...obj.styles, fontSize: newValuesObj };
                    onChange(typoX)



                  }
                  }
                />
              </div>

            </PanelRow>


          </>

        )}





        {typo.lineHeight != undefined && (

          <>
            <PanelRow>
              <label for="">Line Height</label>

              <div className='flex'>


                <InputControl
                  type="number"
                  value={(typo.lineHeight[breakPointX] != undefined) ? typo.lineHeight[breakPointX].val : ''}

                  onChange={(newVal) => {
                    var newValuesObj = {};
                    if (Object.keys(obj.styles.lineHeight).length == 0) {
                      newValuesObj[breakPointX] = { ...obj.styles.lineHeight[breakPointX], val: newVal };
                    } else {
                      newValuesObj = obj.styles.lineHeight;
                      newValuesObj[breakPointX] = { ...obj.styles.lineHeight[breakPointX], val: newVal };
                    }
                    var typoX = { ...obj.styles, lineHeight: newValuesObj };

                    onChange(typoX)


                  }
                  }
                />
                <SelectControl
                  label=""
                  value={(typo.lineHeight[breakPointX] != undefined) ? typo.lineHeight[breakPointX].unit : ''}

                  options={[
                    { label: 'Select Unit', value: '' },

                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                    { label: 'ex', value: 'ex' },
                    { label: 'rem', value: 'rem' },
                    { label: 'vh', value: 'vh' },
                    { label: 'vw', value: 'vw' },
                    { label: 'pt', value: 'pt' },
                    { label: 'pc', value: 'pc' },
                    { label: 'ch', value: 'ch' },

                  ]}
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(obj.styles.lineHeight).length == 0) {
                      newValuesObj[breakPointX] = { ...obj.styles.lineHeight[breakPointX], unit: newVal };
                    } else {
                      newValuesObj = obj.styles.lineHeight;
                      newValuesObj[breakPointX] = { ...obj.styles.lineHeight[breakPointX], unit: newVal };
                    }
                    var typoX = { ...obj.styles, lineHeight: newValuesObj };

                    onChange(typoX)


                  }
                  }
                />

              </div>

            </PanelRow>



          </>

        )}




        {typo.letterSpacing != undefined && (

          <>

            <PanelRow>
              <label for="">Letter Spacing</label>
              <div className='flex'>

                <InputControl
                  type="number"
                  value={(typo.letterSpacing[breakPointX] != undefined) ? typo.letterSpacing[breakPointX].val : ''}

                  onChange={(newVal) => {


                    var newValuesObj = {};
                    if (Object.keys(obj.styles.letterSpacing).length == 0) {
                      newValuesObj[breakPointX] = { ...obj.styles.letterSpacing[breakPointX], val: newVal };
                    } else {
                      newValuesObj = obj.styles.letterSpacing;
                      newValuesObj[breakPointX] = { ...obj.styles.letterSpacing[breakPointX], val: newVal };
                    }
                    var typoX = { ...obj.styles, letterSpacing: newValuesObj };

                    onChange(typoX)



                  }
                  }
                />
                <SelectControl
                  label=""
                  value={(typo.letterSpacing[breakPointX] != undefined) ? typo.letterSpacing[breakPointX].unit : ''}

                  options={[
                    { label: 'Select Unit', value: '' },

                    { label: 'px', value: 'px' },
                    { label: '%', value: '%' },
                    { label: 'em', value: 'em' },
                    { label: 'ex', value: 'ex' },
                    { label: 'rem', value: 'rem' },
                    { label: 'vh', value: 'vh' },
                    { label: 'vw', value: 'vw' },
                    { label: 'pt', value: 'pt' },
                    { label: 'pc', value: 'pc' },
                    { label: 'ch', value: 'ch' },

                  ]}
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(obj.styles.letterSpacing).length == 0) {
                      newValuesObj[breakPointX] = { ...obj.styles.letterSpacing[breakPointX], unit: newVal };
                    } else {
                      newValuesObj = obj.styles.letterSpacing;
                      newValuesObj[breakPointX] = { ...obj.styles.letterSpacing[breakPointX], unit: newVal };
                    }
                    var typoX = { ...obj.styles, letterSpacing: newValuesObj };

                    onChange(typoX)

                  }
                  }
                />
              </div>

            </PanelRow>



          </>

        )}





        {typo.fontWeight != undefined && (

          <>

            <PanelRow>
              <label for="">Font Weight</label>

              <SelectControl
                label=""
                value={(typo.fontWeight[breakPointX] != undefined) ? typo.fontWeight[breakPointX] : ''}

                options={[
                  { label: 'Select...', value: '' },

                  { label: 'bold', value: 'bold' },
                  { label: 'bolder', value: 'bolder' },
                  { label: 'lighter', value: 'lighter' },
                  { label: '100', value: '100' },
                  { label: '200', value: '200' },
                  { label: '300', value: '300' },
                  { label: '400', value: '400' },
                  { label: '500', value: '500' },
                  { label: '600', value: '600' },
                  { label: '700', value: '700' },
                  { label: '800', value: '800' },
                  { label: '900', value: '900' },




                ]}
                onChange={(newVal) => {

                  var newValuesObj = {};
                  if (Object.keys(obj.styles.fontWeight).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = obj.styles.fontWeight;
                    newValuesObj[breakPointX] = newVal;
                  }
                  var typoX = { ...obj.styles, fontWeight: newValuesObj };

                  onChange(typoX)

                }
                }
              />
            </PanelRow>

          </>

        )}




        {typo.textTransform != undefined && (

          <>

            <PanelRow>
              <label for="">Text Transform</label>

              <SelectControl
                label=""
                value={(typo.textTransform[breakPointX] != undefined) ? typo.textTransform[breakPointX] : ''}

                options={[
                  { label: 'Select...', value: '' },

                  { label: 'Uppercase', value: 'uppercase' },
                  { label: 'Lowercase', value: 'lowercase' },
                  { label: 'Capitalize', value: 'capitalize' },

                ]}
                onChange={(newVal) => {

                  var newValuesObj = {};
                  if (Object.keys(obj.styles.textTransform).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = obj.styles.textTransform;
                    newValuesObj[breakPointX] = newVal;
                  }
                  var typoX = { ...obj.styles, textTransform: newValuesObj };

                  onChange(typoX)

                }
                }
              />
            </PanelRow>

          </>

        )}





        {typo.textDecoration != undefined && (

          <>

            <PanelRow>
              <label for="">Text Decoration</label>
              <div className='flex justify-between'>

                <Button className={(obj.styles.textDecoration[breakPointX] != undefined && obj.styles.textDecoration[breakPointX].indexOf('underline') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {


                  var newVal = 'underline';

                  var newValuesObj = {};
                  if (Object.keys(obj.styles.textDecoration).length == 0) {

                    newValuesObj[breakPointX] = [newVal];
                  } else {
                    newValuesObj = obj.styles.textDecoration;

                    if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                      var arr = newValuesObj[breakPointX].filter(item => item !== newVal)

                      newValuesObj[breakPointX] = arr;

                    } else {
                      newValuesObj[breakPointX].push(newVal)
                    }

                  }
                  var typoX = { ...obj.styles, textDecoration: newValuesObj };

                  onChange(typoX)



                }}><span class="icon-underline"></span></Button>

                <Button className={(obj.styles.textDecoration[breakPointX] != undefined && obj.styles.textDecoration[breakPointX].indexOf('line-through') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {


                  var newVal = 'line-through';

                  var newValuesObj = {};
                  if (Object.keys(obj.styles.textDecoration).length == 0) {

                    newValuesObj[breakPointX] = [newVal];
                  } else {
                    newValuesObj = obj.styles.textDecoration;

                    if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                      var arr = newValuesObj[breakPointX].filter(item => item !== newVal)

                      newValuesObj[breakPointX] = arr;

                    } else {
                      newValuesObj[breakPointX].push(newVal)
                    }

                  }
                  var typoX = { ...obj.styles, textDecoration: newValuesObj };

                  onChange(typoX)



                }}><span class="icon-strikethrough"></span></Button>

                <Button className={(obj.styles.textDecoration[breakPointX] != undefined && obj.styles.textDecoration[breakPointX].indexOf('overline') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {


                  var newVal = 'overline';

                  var newValuesObj = {};
                  if (Object.keys(obj.styles.textDecoration).length == 0) {

                    newValuesObj[breakPointX] = [newVal];
                  } else {
                    newValuesObj = obj.styles.textDecoration;

                    if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                      var arr = newValuesObj[breakPointX].filter(item => item !== newVal)

                      newValuesObj[breakPointX] = arr;

                    } else {
                      newValuesObj[breakPointX].push(newVal)
                    }

                  }
                  var typoX = { ...obj.styles, textDecoration: newValuesObj };

                  onChange(typoX)


                }}><span class="icon-overline"></span></Button>




                <Button className={(obj.styles.textDecoration[breakPointX] != undefined && obj.styles.textDecoration[breakPointX].indexOf('none') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {
                  var newVal = 'none';
                  var newValuesObj = {};
                  if (Object.keys(obj.styles.textDecoration).length == 0) {
                    newValuesObj[breakPointX] = [newVal];
                  } else {
                    newValuesObj = obj.styles.textDecoration;

                    if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                      var arr = newValuesObj[breakPointX].filter(item => item !== newVal)
                      newValuesObj[breakPointX] = arr;
                    } else {
                      newValuesObj[breakPointX] = [newVal];
                    }
                  }
                  var typoX = { ...obj.styles, textDecoration: newValuesObj };
                  onChange(typoX)
                }}><span class="icon-close"></span></Button>
              </div>

            </PanelRow>





          </>

        )}



      </div>

    )
  }
}


export default Typography;