/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import ReactDom from 'react-dom'
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import DataMD from '../../_faq.mdx' // Assumes an integration is used to compile MDX -> JS.


export default function displayFAQ(props) {

  return (
    <Layout>


      <div className="container">

        <div className="row">
          <div className="col col--12" >
            <h1 style={{margin: "3em 0"}}><u>F</u>requently <u>A</u>sked <u>Q</u>uestions 🤔</h1>
          </div>
        </div>

        <DataMD/>
          
      </div>

    </Layout>
  );
}
