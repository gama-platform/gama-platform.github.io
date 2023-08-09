import React from 'react';
import Giscus from "@giscus/react";
import { useColorMode } from '@docusaurus/theme-common';

export default function GiscusComponent() {
  const { colorMode } = useColorMode();

  return (
    <Giscus
      id="comments"
      repo="gama-platform/gama-platform.github.io"
      repoId="MDEwOlJlcG9zaXRvcnk4MzEwMzQ0MA=="
      category="General"
      categoryId="DIC_kwDOBPQO0M4CYb4-"
      mapping="pathname"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="top"
      theme={colorMode}
      lang="en"
      loading="lazy"
    />
  );
}