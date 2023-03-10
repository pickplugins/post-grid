import PGTemplates from './components/templates'

import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { image } from '@wordpress/icons';

const PluginSidebarTest = () => (
    <PluginSidebar name="plugin-sidebar-test" title="My Plugin" icon={image}>
        <p>Plugin Sidebar</p>
    </PluginSidebar>
);

registerPlugin('plugin-sidebar-test', { render: PluginSidebarTest });