

const { Component, RawHTML } = wp.element;
import { Button, Dropdown } from '@wordpress/components'
import IconToggle from '../../components/icon-toggle'
import breakPoints from '../../breakpoints'
import { useState, useEffect } from '@wordpress/element'

var myStore = wp.data.select('my-shop');



class BreakpointToggle extends Component {




  state = {
    breakPointX: myStore.getBreakPoint()
  }


  setBreakPoint = (x) => {

    console.log(x)
    //setPreviewDeviceType(x.value)
    var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)


    this.setState({

      breakPointX: x.value
    })

  }

  render() {
    var that = this;


    const {
      position,
      variant,
      iconList, //[{"label":"Select..","icon":"","value":""}]
      buttonTitle,
      onChange,
      activeIcon,
      value,


    } = this.props;



    function onChangeX(x) {

      console.log(x);

    }


    var breakPointList = [{ label: 'Select..', icon: '', value: '' }];

    for (var x in breakPoints) {

      var item = breakPoints[x];
      breakPointList.push({ label: item.name, icon: item.icon, value: item.id })

    }

    const {
      __experimentalSetPreviewDeviceType: setPreviewDeviceType,

    } = wp.data.dispatch('core/edit-post')








    // function onChangeBreakPoint(x, index) {

    //   console.log(x);
    //   console.log(index);

    //   that.setBreakPoint(x);
    //   console.log('Brekapoint Toggle');


    //   setPreviewDeviceType(x.value)
    //   // var asdsdsd = wp.data.dispatch('my-shop').setBreakPoint(x.value)


    //   // asdsdsd.then((res) => {


    //   //   console.log(res);

    //   //   that.setBreakPoint(res);



    //   //   //setBreakPointX(res.breakpoint);
    //   //   //generateBlockCss();

    //   // });



    // }



    return (
      <div>


        {this.state.breakPointX}
        <IconToggle position="bottom" variant="secondary" iconList={breakPointList} buttonTitle="Break Point Switch" onChange={onChange} activeIcon={breakPoints[this.state.breakPointX].icon} value={value} />
      </div>

    )
  }
}


export default BreakpointToggle;