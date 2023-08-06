import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { image } from '@wordpress/icons';

import PGsidebars from './components/sidebars'


var iconPostGrid = <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><path fill="#1d4ed8" d="M15.41,15.41H0V0H15.41ZM3,12.41h9.41V3H3Z" /><path fill="#1d4ed8" d="M15.41,36H0V20.59H15.41ZM3,33h9.41V23.59H3Z" /><path fill="#1d4ed8" d="M36,36H20.59V20.59H36ZM23.59,33H33V23.59H23.59Z" /><rect fill="#1d4ed8" x="25.15" y="3.87" width="10.85" height="2.35" /><rect fill="#1d4ed8" x="25.15" y="9.19" width="10.85" height="2.35" /></svg>


const PostGridSidebar = () => (


// hello


    <PluginSidebar name="post-grid-sidebar" title="Post Grid Combo" icon={iconPostGrid}>
        <PGsidebars />
    </PluginSidebar>
);

registerPlugin('post-grid-sidebar', { render: PostGridSidebar });






