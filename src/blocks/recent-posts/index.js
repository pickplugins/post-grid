import { registerBlockType } from '@wordpress/blocks';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';

registerBlockType('post-grid/recent-posts', {
  apiVersion: 2,
  title: 'Example: last post',
  icon: 'megaphone',
  category: 'widgets',

  edit: () => {
    const blockProps = useBlockProps();
    const posts = useSelect((select) => {
      return select('core').getEntityRecords('postType', 'post');
    }, []);

    return (
      <div {...blockProps}>
        {!posts && 'Loading'}
        {posts && posts.length === 0 && 'No Posts'}
        {posts && posts.length > 0 && (

          posts.map(x => {
            return (
              <div>
                <a href={x.link}>
                  {x.title.rendered}
                </a>
              </div>
            )
          })


        )}
      </div>
    );
  },
});