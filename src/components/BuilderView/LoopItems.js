

const { Component } = wp.element;
import { Button, Dropdown, } from '@wordpress/components'
import { useState, } from '@wordpress/element'
import { applyFilters, doAction, addAction, addFilter } from "@wordpress/hooks";

import { __experimentalInputControl as InputControl, ColorPalette } from '@wordpress/components';



function Html(props) {
  if (!props.warn) {
    return null;
  }

  var loopLayout = props.loopLayout;
  var itemData = props.itemData

  const LoopItemsNode = ({ node, itemData }) => {
    var nodeType = node.type;

    if (nodeType == "root" || nodeType == "container" || nodeType == "layer") {



      var animateOn = node?.options?.animateOn
      var animateOnRules = animateOn?.rules



      return (
        <div id={`element-${node.id}`} className={`${node.type}`} data-animateon={animateOnRules?.length > 0 ? JSON.stringify(animateOnRules) : null}>
          {node.children && (
            <>
              {node.children.map((child) => (
                <LoopItemsNode key={child?.id} node={child} itemData={itemData} />
              ))}
            </>
          )}
        </div>
      );
    } else {
      return <GenerateNodeHtml node={node} itemData={itemData} />;
    }
  };



  const GenerateNodeHtml = ({ node, itemData }) => {
    var nodeType = node.type;

    var html = applyFilters("PostGridElementHtml" + nodeType, '', itemData, node);

    return html;

  };


  return (
    <>
      {loopLayout.map((node) => (
        <>

          <LoopItemsNode key={node.id} node={node} itemData={itemData} />
        </>
      ))}
    </>
  )

}


class LoopItems extends Component {

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
      loopLayout,
      itemData,

    } = this.props;







    return (


      <Html loopLayout={loopLayout} itemData={itemData} warn={this.state.showWarning} />


    )
  }
}


export default LoopItems;