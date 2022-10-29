const el = wp.element.createElement;
import { useSelect, useDispatch } from '@wordpress/data';
import { memo, useMemo, useState } from '@wordpress/element';

const { registerBlockType, createBlocksFromInnerBlocksTemplate } = wp.blocks;
import {
  BlockContextProvider, InnerBlocks, useBlockProps, useInnerBlocksProps, __experimentalBlockVariationPicker, store as blockEditorStore,
  __experimentalUseBlockPreview as useBlockPreview,

} from '@wordpress/block-editor';
import variations from './variations';
import { __ } from '@wordpress/i18n';


var select = wp.data.select('core/block-editor')


registerBlockType('post-grid/post-grid-holder', {
  title: 'post-grid-holder',
  category: "post-grid",
  variations,

  icon: {
    background: '#2563eb',
    foreground: '#2563eb',
    src:

      <svg width="500" height="500" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M438 352.518C438 355.279 435.761 357.518 433 357.518L68 357.518C65.2386 357.518 63 355.279 63 352.518L63 326C63 323.239 65.2386 321 68 321L433 321C435.761 321 438 323.239 438 326L438 352.518Z" fill="#ffffff" />
        <path d="M395 422.518C395 425.279 392.761 427.518 390 427.518L110 427.518C107.239 427.518 105 425.279 105 422.518L105 396C105 393.239 107.239 391 110 391L390 391C392.761 391 395 393.239 395 396L395 422.518Z" fill="#ffffff" />
        <path d="M381.417 39H119.25C102.543 39 89 52.5432 89 69.25V250.75C89 267.457 102.543 281 119.25 281H381.417C398.123 281 411.667 267.457 411.667 250.75V69.25C411.667 52.5432 398.123 39 381.417 39ZM377.635 250.75H123.031C122.028 250.75 121.067 250.352 120.358 249.642C119.648 248.933 119.25 247.972 119.25 246.969V73.0312C119.25 72.0284 119.648 71.0666 120.358 70.3575C121.067 69.6484 122.028 69.25 123.031 69.25H377.635C378.638 69.25 379.6 69.6484 380.309 70.3575C381.018 71.0666 381.417 72.0284 381.417 73.0312V246.969C381.417 247.972 381.018 248.933 380.309 249.642C379.6 250.352 378.638 250.75 377.635 250.75V250.75ZM169.667 94.4583C155.745 94.4583 144.458 105.745 144.458 119.667C144.458 133.589 155.745 144.875 169.667 144.875C183.589 144.875 194.875 133.589 194.875 119.667C194.875 105.745 183.589 94.4583 169.667 94.4583ZM149.5 220.5H351.167V170.083L296.014 114.931C293.061 111.977 288.273 111.977 285.319 114.931L210 190.25L185.097 165.347C182.144 162.394 177.356 162.394 174.402 165.347L149.5 190.25V220.5Z" fill="#ffffff" />
      </svg>


    ,
  },

  attributes: {

    blockId: {
      "type": "string",
      "default": ''
    },




  },
  usesContext: ["postId", "loopIndex", "postType", "queryId"],

  edit: (props) => {

    const { replaceInnerBlocks } = useDispatch('core/block-editor');
    var icon = '';
    var setAttributes = props.setAttributes;
    var clientId = props.clientId;

    var blocks = select.getBlocks(clientId)


    const TEMPLATE = [
      ['core/post-title'],
      ['core/post-date'],
      ['core/post-excerpt'],
    ];


    function PostTemplateInnerBlocks() {
      const innerBlocksProps = useInnerBlocksProps(
        { className: 'wp-block-post' },
        { template: TEMPLATE }
      );
      return <div {...innerBlocksProps} />;
    }

    const [bloksssss, setBloksssss] = useState(TEMPLATE);
    const [activeBlockContextId, setActiveBlockContextId] = useState();

    var posts = [{ postId: 1031, postType: 'post', }, { postId: 1027, postType: 'post', }, { postId: 1016, postType: 'post', },];





    function PostTemplateBlockPreview({
      blocks,
      blockContextId,
      isHidden,
      setActiveBlockContextId,
    }) {


      console.log(blockContextId);

      const blockPreviewProps = useBlockPreview({
        blocks,
        props: {
          className: 'wp-block-post',
        },
      });

      const handleOnClick = () => {
        setActiveBlockContextId(blockContextId);
      };

      const style = {
        display: isHidden ? 'none' : undefined,
      };

      return (
        <div
          {...blockPreviewProps}
          tabIndex={0}
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
          role="button"
          onClick={handleOnClick}
          onKeyPress={handleOnClick}
          style={style}
        />
      );
    }


    const MemoizedPostTemplateBlockPreview = memo(PostTemplateBlockPreview);







    return <>



      <__experimentalBlockVariationPicker
        icon={icon}
        label={__('Block Grid', 'pb')}
        variations={variations}
        onSelect={(nextVariation = defaultVariation) => {
          if (nextVariation.attributes) {
            setAttributes(nextVariation.attributes);
          }

          setBloksssss(nextVariation.innerBlocks)


        }}
      />




      {posts.map(post => {

        return (

          <>
            <BlockContextProvider
              key={post.postId}
              value={post}
            >
              {post.postId ===
                (activeBlockContextId ||
                  posts[0]?.postId) ? (

                <>
                  <div>activeBlockContextId: {JSON.stringify(activeBlockContextId)}</div>
                  <PostTemplateInnerBlocks />
                </>


              ) : null}


              <MemoizedPostTemplateBlockPreview
                blocks={blocks}
                blockContextId={post.postId}
                setActiveBlockContextId={setActiveBlockContextId}
                isHidden={
                  post.postId ===
                  (activeBlockContextId ||
                    posts[0]?.postId)
                }
              />



            </BlockContextProvider>
          </>


        )
      })}

    </>;
  },
  save: (props) => {
    return el(InnerBlocks.Content, {});
  },
});