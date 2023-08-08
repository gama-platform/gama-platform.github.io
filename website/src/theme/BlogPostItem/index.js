import React from 'react';
import BlogPostItem from '@theme-original/BlogPostItem';

// Add comments
import GiscusComponent from '@site/src/components/GiscusComponent';
import { useBlogPost } from '@docusaurus/theme-common/internal';

export default function BlogPostItemWrapper(props) {
  const { metadata, isBlogPostPage } = useBlogPost();
  return (
    <>
      <BlogPostItem {...props} />

      {isBlogPostPage && (
        <GiscusComponent />
      )}
    </>
  );
}
