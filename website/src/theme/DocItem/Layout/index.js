import React from 'react';
import Layout from '@theme-original/DocItem/Layout';

// Add comments
import GiscusComponent from '@site/src/components/GiscusComponent';

export default function LayoutWrapper(props) {
  return (
    <>
      <Layout {...props} />
      <br />
      <GiscusComponent />
    </>
  );
}
