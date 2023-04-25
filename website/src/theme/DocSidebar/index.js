import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';

export default function DocSidebarWrapper(props) {
  return (
    <>
      <div className="custom-sidebarVersion">
        <p><u><b>Version:</b></u> <DocsVersionDropdownNavbarItem /></p>
      </div>
      <hr />
      <DocSidebar {...props} />
    </>
  );
}
