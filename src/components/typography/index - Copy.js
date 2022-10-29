

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

            </PanelRow>
            <PanelRow>

              <div>

                <InputControl
                  value={(typo.fontFamily[breakPointX] != undefined) ? typo.fontFamily[breakPointX] : ''}
                  onChange={(newVal) => {

                    var newValuesObj = {};
                    if (Object.keys(obj.typo.fontFamily).length == 0) {
                      newValuesObj[breakPointX] = newVal;

                    } else {

                      newValuesObj = obj.typo.fontFamily;
                      newValuesObj[breakPointX] = newVal;

                    }
                    var typoX = { ...obj.typo, fontFamily: newValuesObj };



                    onChange(typoX)






                  }
                  }
                />


              </div>
            </PanelRow>

          </>

        )}




        {typo.fontSize != undefined && (

          <>

            <PanelRow>
              <label for="">Font Size</label>

            </PanelRow>
            <PanelRow>
              <InputControl type="number"
                value={(typo.fontSize[breakPointX] != undefined) ? typo.fontSize[breakPointX].val : ''}
                onChange={(newVal) => {

                  var newValuesObj = {};
                  if (Object.keys(obj.typo.fontSize).length == 0) {
                    newValuesObj[breakPointX] = { ...obj.typo.fontSize[breakPointX], val: newVal };
                  } else {
                    newValuesObj = obj.typo.fontSize;
                    newValuesObj[breakPointX] = { ...obj.typo.fontSize[breakPointX], val: newVal };
                  }
                  var typoX = { ...obj.typo, fontSize: newValuesObj };

                  console.log(obj.typo);

                  console.log(newValuesObj);
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
                  if (Object.keys(obj.typo.fontSize).length == 0) {
                    newValuesObj[breakPointX] = { ...obj.typo.fontSize[breakPointX], unit: newVal };
                  } else {
                    newValuesObj = obj.typo.fontSize;
                    newValuesObj[breakPointX] = { ...obj.typo.fontSize[breakPointX], unit: newVal };
                  }
                  var typoX = { ...obj.typo, fontSize: newValuesObj };
                  onChange(typoX)



                }
                }
              />
            </PanelRow>

          </>

        )}





        {typo.lineHeight != undefined && (

          <>
            <PanelRow>
              <label for="">Line Height</label>

            </PanelRow>
            <PanelRow>
              <InputControl
                type="number"
                value={(typo.lineHeight[breakPointX] != undefined) ? typo.lineHeight[breakPointX].val : ''}

                onChange={(newVal) => {
                  var newValuesObj = {};
                  if (Object.keys(obj.typo.lineHeight).length == 0) {
                    newValuesObj[breakPointX] = { ...obj.typo.lineHeight[breakPointX], val: newVal };
                  } else {
                    newValuesObj = obj.typo.lineHeight;
                    newValuesObj[breakPointX] = { ...obj.typo.lineHeight[breakPointX], val: newVal };
                  }
                  var typoX = { ...obj.typo, lineHeight: newValuesObj };

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
                  if (Object.keys(obj.typo.lineHeight).length == 0) {
                    newValuesObj[breakPointX] = { ...obj.typo.lineHeight[breakPointX], unit: newVal };
                  } else {
                    newValuesObj = obj.typo.lineHeight;
                    newValuesObj[breakPointX] = { ...obj.typo.lineHeight[breakPointX], unit: newVal };
                  }
                  var typoX = { ...obj.typo, lineHeight: newValuesObj };

                  onChange(typoX)


                }
                }
              />
            </PanelRow>


          </>

        )}




        {typo.letterSpacing != undefined && (

          <>

            <PanelRow>
              <label for="">Letter Spacing</label>

            </PanelRow>


            <PanelRow>
              <InputControl
                type="number"
                value={(typo.letterSpacing[breakPointX] != undefined) ? typo.letterSpacing[breakPointX].val : ''}

                onChange={(newVal) => {


                  var newValuesObj = {};
                  if (Object.keys(obj.typo.letterSpacing).length == 0) {
                    newValuesObj[breakPointX] = { ...obj.typo.letterSpacing[breakPointX], val: newVal };
                  } else {
                    newValuesObj = obj.typo.letterSpacing;
                    newValuesObj[breakPointX] = { ...obj.typo.letterSpacing[breakPointX], val: newVal };
                  }
                  var typoX = { ...obj.typo, letterSpacing: newValuesObj };

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
                  if (Object.keys(obj.typo.letterSpacing).length == 0) {
                    newValuesObj[breakPointX] = { ...obj.typo.letterSpacing[breakPointX], unit: newVal };
                  } else {
                    newValuesObj = obj.typo.letterSpacing;
                    newValuesObj[breakPointX] = { ...obj.typo.letterSpacing[breakPointX], unit: newVal };
                  }
                  var typoX = { ...obj.typo, letterSpacing: newValuesObj };

                  onChange(typoX)

                }
                }
              />
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
                  if (Object.keys(obj.typo.fontWeight).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = obj.typo.fontWeight;
                    newValuesObj[breakPointX] = newVal;
                  }
                  var typoX = { ...obj.typo, fontWeight: newValuesObj };

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
                  if (Object.keys(obj.typo.textTransform).length == 0) {
                    newValuesObj[breakPointX] = newVal;
                  } else {
                    newValuesObj = obj.typo.textTransform;
                    newValuesObj[breakPointX] = newVal;
                  }
                  var typoX = { ...obj.typo, textTransform: newValuesObj };

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
            </PanelRow>

            <div className='flex justify-between'>

              <Button className={(obj.typo.textDecoration[breakPointX] != undefined && obj.typo.textDecoration[breakPointX].indexOf('underline') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {


                var newVal = 'underline';

                var newValuesObj = {};
                if (Object.keys(obj.typo.textDecoration).length == 0) {

                  newValuesObj[breakPointX] = [newVal];
                } else {
                  newValuesObj = obj.typo.textDecoration;

                  if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                    var arr = newValuesObj[breakPointX].filter(item => item !== newVal)

                    newValuesObj[breakPointX] = arr;

                  } else {
                    newValuesObj[breakPointX].push(newVal)
                  }

                }
                var typoX = { ...obj.typo, textDecoration: newValuesObj };

                onChange(typoX)



              }}><span class="icon-underline"></span></Button>

              <Button className={(obj.typo.textDecoration[breakPointX] != undefined && obj.typo.textDecoration[breakPointX].indexOf('line-through') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {


                var newVal = 'line-through';

                var newValuesObj = {};
                if (Object.keys(obj.typo.textDecoration).length == 0) {

                  newValuesObj[breakPointX] = [newVal];
                } else {
                  newValuesObj = obj.typo.textDecoration;

                  if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                    var arr = newValuesObj[breakPointX].filter(item => item !== newVal)

                    newValuesObj[breakPointX] = arr;

                  } else {
                    newValuesObj[breakPointX].push(newVal)
                  }

                }
                var typoX = { ...obj.typo, textDecoration: newValuesObj };

                onChange(typoX)



              }}><span class="icon-strikethrough"></span></Button>

              <Button className={(obj.typo.textDecoration[breakPointX] != undefined && obj.typo.textDecoration[breakPointX].indexOf('overline') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {


                var newVal = 'overline';

                var newValuesObj = {};
                if (Object.keys(obj.typo.textDecoration).length == 0) {

                  newValuesObj[breakPointX] = [newVal];
                } else {
                  newValuesObj = obj.typo.textDecoration;

                  if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                    var arr = newValuesObj[breakPointX].filter(item => item !== newVal)

                    newValuesObj[breakPointX] = arr;

                  } else {
                    newValuesObj[breakPointX].push(newVal)
                  }

                }
                var typoX = { ...obj.typo, textDecoration: newValuesObj };

                onChange(typoX)


              }}><span class="icon-overline"></span></Button>




              <Button className={(obj.typo.textDecoration[breakPointX] != undefined && obj.typo.textDecoration[breakPointX].indexOf('none') !== -1) ? '!bg-blue-300 ' : ''} variant="secondary" onClick={(ev) => {
                var newVal = 'none';
                var newValuesObj = {};
                if (Object.keys(obj.typo.textDecoration).length == 0) {
                  newValuesObj[breakPointX] = [newVal];
                } else {
                  newValuesObj = obj.typo.textDecoration;

                  if (newValuesObj[breakPointX].indexOf(newVal) !== -1) {
                    var arr = newValuesObj[breakPointX].filter(item => item !== newVal)
                    newValuesObj[breakPointX] = arr;
                  } else {
                    newValuesObj[breakPointX] = [newVal];
                  }
                }
                var typoX = { ...obj.typo, textDecoration: newValuesObj };
                onChange(typoX)
              }}><span class="icon-close"></span></Button>
            </div>



          </>

        )}



      </div>

    )
  }
}


export default Typography;