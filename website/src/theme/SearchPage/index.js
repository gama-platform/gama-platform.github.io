import React from 'react';
import SearchPage from '@theme-original/SearchPage';
import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

ExecutionEnvironment.canUseIntersectionObserver = false;

export default function SearchPageWrapper(props) {
  ExecutionEnvironment.canUseIntersectionObserver = false;
  return (
    <>
      <SearchPage {...props} />
    </>
  );
}
