

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
      postTitleX,

    } = this.props;


    return (
      <div>




        <PanelRow>
          <label for="">Font Family</label>

        </PanelRow>
        <PanelRow>

          <div>


            <InputControl
              value={(typo.fontFamily[breakPointX] != undefined) ? typo.fontFamily[breakPointX] : ''}
              onChange={(newVal) => {

                var newValuesObj = {};
                if (Object.keys(postTitleX.typo.fontFamily).length == 0) {
                  newValuesObj[breakPointX] = newVal;
                } else {
                  newValuesObj = postTitleX.typo.fontFamily;
                  newValuesObj[breakPointX] = newVal;
                }
                var typoX = { ...postTitleX.typo, fontFamily: newValuesObj };

                onChange(typoX)






              }
              }
            />


          </div>
        </PanelRow>


        <PanelRow>
          <label for="">Font Size</label>

        </PanelRow>
        <PanelRow>
          <InputControl type="number"
            value={(typo.fontSize[breakPointX] != undefined) ? typo.fontSize[breakPointX].val : ''}
            onChange={(newVal) => {

              var newValuesObj = {};
              if (Object.keys(postTitleX.typo.fontSize).length == 0) {
                newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX], val: newVal };
              } else {
                newValuesObj = postTitleX.typo.fontSize;
                newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX], val: newVal };
              }
              var typoX = { ...postTitleX.typo, fontSize: newValuesObj };

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
              if (Object.keys(postTitleX.typo.fontSize).length == 0) {
                newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX], unit: newVal };
              } else {
                newValuesObj = postTitleX.typo.fontSize;
                newValuesObj[breakPointX] = { ...postTitleX.typo.fontSize[breakPointX], unit: newVal };
              }
              var typoX = { ...postTitleX.typo, fontSize: newValuesObj };
              onChange(typoX)



            }
            }
          />
        </PanelRow>


        <PanelRow>
          <label for="">Line Height</label>

        </PanelRow>
        <PanelRow>
          <InputControl
            type="number"
            value={(typo.lineHeight[breakPointX] != undefined) ? typo.lineHeight[breakPointX].val : ''}

            onChange={(newVal) => {
              var newValuesObj = {};
              if (Object.keys(postTitleX.typo.lineHeight).length == 0) {
                newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX], val: newVal };
              } else {
                newValuesObj = postTitleX.typo.lineHeight;
                newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX], val: newVal };
              }
              var typoX = { ...postTitleX.typo, lineHeight: newValuesObj };

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
              if (Object.keys(postTitleX.typo.lineHeight).length == 0) {
                newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX], unit: newVal };
              } else {
                newValuesObj = postTitleX.typo.lineHeight;
                newValuesObj[breakPointX] = { ...postTitleX.typo.lineHeight[breakPointX], unit: newVal };
              }
              var typoX = { ...postTitleX.typo, lineHeight: newValuesObj };

              onChange(typoX)


            }
            }
          />
        </PanelRow>

        <PanelRow>
          <label for="">Letter Spacing</label>

        </PanelRow>


        <PanelRow>
          <InputControl
            type="number"
            value={(typo.letterSpacing[breakPointX] != undefined) ? typo.letterSpacing[breakPointX].val : ''}

            onChange={(newVal) => {


              var newValuesObj = {};
              if (Object.keys(postTitleX.typo.letterSpacing).length == 0) {
                newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX], val: newVal };
              } else {
                newValuesObj = postTitleX.typo.letterSpacing;
                newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX], val: newVal };
              }
              var typoX = { ...postTitleX.typo, letterSpacing: newValuesObj };

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
              if (Object.keys(postTitleX.typo.letterSpacing).length == 0) {
                newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX], unit: newVal };
              } else {
                newValuesObj = postTitleX.typo.letterSpacing;
                newValuesObj[breakPointX] = { ...postTitleX.typo.letterSpacing[breakPointX], unit: newVal };
              }
              var typoX = { ...postTitleX.typo, letterSpacing: newValuesObj };

              onChange(typoX)

            }
            }
          />
        </PanelRow>

        <PanelRow>
          <label for="">Font Weight</label>

        </PanelRow>
        <PanelRow>

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
              if (Object.keys(postTitleX.typo.fontWeight).length == 0) {
                newValuesObj[breakPointX] = newVal;
              } else {
                newValuesObj = postTitleX.typo.fontWeight;
                newValuesObj[breakPointX] = newVal;
              }
              var typoX = { ...postTitleX.typo, fontWeight: newValuesObj };

              onChange(typoX)

            }
            }
          />
        </PanelRow>


        <PanelRow>
          <label for="">Text Transform</label>

        </PanelRow>


        <PanelRow>

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
              if (Object.keys(postTitleX.typo.textTransform).length == 0) {
                newValuesObj[breakPointX] = newVal;
              } else {
                newValuesObj = postTitleX.typo.textTransform;
                newValuesObj[breakPointX] = newVal;
              }
              var typoX = { ...postTitleX.typo, textTransform: newValuesObj };

              onChange(typoX)

            }
            }
          />
        </PanelRow>




        <PanelRow>
          <label for="">Text Decoration</label>

        </PanelRow>


        <PanelRow>

          <SelectControl
            label=""
            value={typo.textDecoration[breakPointX]}
            options={[
              { label: 'Select...', value: '' },

              { label: 'Overline', value: 'overline' },
              { label: 'Line-through', value: 'line-through' },
              { label: 'Underline', value: 'underline' },

            ]}
            onChange={(newVal) => {

              var newValuesObj = {};
              if (Object.keys(postTitleX.typo.textDecoration).length == 0) {
                newValuesObj[breakPointX] = newVal;
              } else {
                newValuesObj = postTitleX.typo.textDecoration;
                newValuesObj[breakPointX] = newVal;
              }
              var typoX = { ...postTitleX.typo, textDecoration: newValuesObj };

              onChange(typoX)

            }
            }
          />
        </PanelRow>






      </div>

    )
  }
}


export default Typography;