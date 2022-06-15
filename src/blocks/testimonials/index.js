import { registerBlockType } from '@wordpress/blocks'
import { __ } from '@wordpress/i18n'

import { createElement } from '@wordpress/element'
import { PanelBody, RangeControl, Button, Panel, PanelRow } from '@wordpress/components'
import { InspectorControls, BlockControls, AlignmentToolbar, RichText } from '@wordpress/block-editor'

//var el = element.createElement;


registerBlockType('post-grid/testimonials', {
    title: __('testimonials Block dfgfg'),
    icon: 'editor-testimonials',
    category: 'common',
    keywords: ['testimonials'],
    attributes: {

        paragraphText: {
            type: 'string',
            default: 'Write sd ...',
        },


    },
    edit: ({ attributes, setAttributes }) => {

        const {
            paragraphText

        } = attributes;


        var heart = 'format-quote';


        function updateparagraphText(content) {
            console.log(content);
            setAttributes({ paragraphText: content });

        }




        return (
            [


                <div>
                    <BlockControls >
                        <AlignmentToolbar title="Hello 1" value={heart} >

                        </AlignmentToolbar>
                    </BlockControls>


                    <InspectorControls key="content">

                        <PanelBody title="Content" initialOpen={false}>
                            <PanelRow>

                                <RichText key="editable" tagName="p" placeholder="Keep writing..." value={attributes.paragraphText} onChange={updateparagraphText} >
                                </RichText>

                            </PanelRow>
                        </PanelBody>
                    </InspectorControls>
                </div>
                ,



                <RichText key="editable2" tagName="p" placeholder="Keep writing..." value={attributes.paragraphText} onChange={updateparagraphText} >
                </RichText>
            ]





        )
    },
    save: ({ attributes }) => {

        const {
            paragraphText

        } = attributes;


        return (
            <p>{paragraphText}</p>
        )
    }
})