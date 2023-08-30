

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { Icon, styles, settings, link, linkOff, close } from "@wordpress/icons";
import { createElement, useCallback, memo, useMemo, useState, useEffect } from '@wordpress/element'

import { __experimentalInputControl as InputControl, PanelBody, PanelRow, ColorPalette, RangeControl } from '@wordpress/components';


function Html(props) {
  if (!props.warn) {
    return null;
  }
  var [debounce, setDebounce] = useState(null); // Using the hook.
  var [keyframesX, setkeyframesX] = useState(props.keyframes); // Using the hook.

  useEffect(() => {

    console.log('useEffect');
    console.log(keyframesX);
    props.onChange(keyframesX);

  }, [keyframesX]);

  useEffect(() => {

    console.log('useEffect');
    console.log(props.keyframes);

  }, [props.keyframes]);




  function FrameTitle({ entryIndex, frameIndex }) {

    return (
      <>
        <span className='bg-red-500 text-white p-1 mr-1 rounded-sm ' onClick={ev => {
          console.log(frameIndex);

          var keyframes = { ...keyframesX };
          delete keyframes[entryIndex].frames[frameIndex]
          setkeyframesX(keyframes);


        }}><Icon fill='#fff' icon={close} /></span>
        <span>{frameIndex}</span>%
      </>

    )
  }


  function EntryTitle({ entryIndex, name }) {

    return (
      <>
        <span className='bg-red-500 text-white p-1 mr-1 rounded-sm '
          onClick={ev => {

            var keyframes = { ...keyframesX };
            delete keyframes[entryIndex]
            setkeyframesX(keyframes);


          }}
        ><Icon fill='#fff' icon={close} /></span>
        <span>{name}</span>
      </>

    )
  }



















  return (

    <div className=' mt-4'>

      <div className='bg-blue-500 inline-block cursor-pointer my-3 text-white px-3 py-2' onClick={ev => {
        var length = (keyframesX == null) ? 0 : Object.entries(keyframesX).length;
        const d = new Date();
        let time = d.getTime();
        var keyframes = { ...keyframesX };
        keyframes[time] = {
          name: 'pgAnimate' + (length + 1),
          frames: {
            '0': { 'background-color': 'red' },
            '100': { 'background-color': 'yellow', left: '0px', top: '0px' }
          }
        };

        setkeyframesX(keyframes);

      }}>Add</div>

      {keyframesX != null && Object.entries(keyframesX).map(entry => {

        var entryIndex = entry[0];
        var args = entry[1];


        return (

          <PanelBody title={<EntryTitle name={args.name} entryIndex={entryIndex} />} initialOpen={false}>

            <PanelRow>
              <label for="">Animation Name</label>
              <InputControl
                type="text"
                className='mr-2'
                value={args.name}
                onChange={(newVal) => {

                  var keyframes = { ...keyframesX };
                  keyframes[entryIndex]['name'] = newVal;
                  setkeyframesX(keyframes);

                }}
              />
            </PanelRow>

            <div className='bg-blue-500 inline-block cursor-pointer my-2 text-white px-3 py-2' onClick={ev => {



              var keyframes = { ...keyframesX };
              var frames = keyframes[entryIndex].frames;

              console.log(frames);

              // var num = Math.random() * 100;
              // var numX = Math.floor(num);
              // console.log(numX);


              //frames[40] = { 'background-color': 'red' }

              //setkeyframesX(keyframes);




            }}>Add</div>

            <div className='my-5'>

              {Object.entries(args.frames).map(x => {
                var frameIndex = x[0];
                var frameAttr = x[1];
                return (

                  <PanelBody title={<FrameTitle entryIndex={entryIndex} frameIndex={frameIndex} />} initialOpen={false}>


                    <PanelRow>
                      <label for="">Frame Step</label>
                      <InputControl
                        type="number"
                        className='mr-2'
                        value={frameIndex}
                        onChange={(newVal) => {


                          var keyframes = { ...keyframesX };
                          var framesArgs = keyframes[entryIndex].frames[frameIndex]

                          keyframes[entryIndex].frames[newVal] = framesArgs;
                          delete keyframes[entryIndex].frames[frameIndex];
                          setkeyframesX(keyframes);

                        }}
                      />%
                    </PanelRow>


                    {Object.entries(frameAttr).map(attr => {

                      var attrIndex = attr[0];
                      var attrVal = attr[1];

                      return (

                        <div>{attrIndex}</div>

                      )


                    })}
                  </PanelBody>




                )


              })}


            </div>

          </PanelBody>


        )

      })}



    </div>




  )

}


class PGcssKeyframes extends Component {

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



  render() {

    var {
      keyframes,
      onChange,


    } = this.props;








    return (


      <Html keyframes={keyframes} onChange={onChange} warn={this.state.showWarning} />


    )
  }
}


export default PGcssKeyframes;