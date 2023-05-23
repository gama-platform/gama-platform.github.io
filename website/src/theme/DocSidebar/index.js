import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import DocsVersionDropdownNavbarItem from '@theme-original/NavbarItem/DocsVersionDropdownNavbarItem';

export default function DocSidebarWrapper(props) {
  return (
    <>
      <div className="custom-sidebarVersion">
        <p><u style={{ "paddingTop": "4px", "display": "inline-block" }}><b>Version:</b></u> <DocsVersionDropdownNavbarItem dropdownItemsBefore={[]} dropdownItemsAfter={[]} /></p>
      </div>
      <hr />
      <DocSidebar {...props} />
    </>
  );
}
