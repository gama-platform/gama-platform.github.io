/**
 * Copyright (c) 2023-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import ReactDom from 'react-dom'
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function displayFAQ(props) {

  return (
    <Layout>


      <div className="container">

        <div className="row">
          <div className="col col--12" >
            <h1 style={{margin: "3em 0"}}><u>Q</u>uestions & <u>A</u>nswers</h1>
          </div>
        </div>

        <div className="row" style={{height: "70vh"}}>
          <div className="col col--6" >
            <h2>Ask to the <u>Developpers</u></h2>
            <p>If you have any questions or need to contact GAMA developers, we recommend using <a href="https://github.com/gama-platform/gama/discussions">Github Discussions</a>. This platform allows you to start threaded conversations with us and other developers, making it easy to ask questions, suggest new features, and provide feedback. Using Github Discussions can help you get faster and more accurate responses from our team, and it also allows other users to benefit from the conversation.</p>
            <p>To get started, simply navigate to the <a href="https://github.com/gama-platform/gama/discussions">Discussions tab</a> on our <a href="https://github.com/gama-platform/gama">Github repository</a> and start a new discussion. We encourage you to search for existing discussions on similar topics to avoid duplicating efforts. By using Github Discussions, you can ensure that your questions and feedback are visible to our entire community, making it easier for everyone to contribute.</p>
            <ul>
            <li>Link to the <a href="https://github.com/gama-platform/gama/discussions">Github Discussions</a></li>
            </ul>
            <iframe height="100%" width="100%" src="https://github.com/gama-platform/gama/discussions" title="Github's Gama Discussion"></iframe>
          </div>
          <div className="col col--6" >
            <h2>Ask to the <u>Community</u></h2>
            <iframe height="100%" width="100%" src="https://groups.google.com/forum/embed/?place=forum/gama-platform" title="Google Group's Gama Mailing List"></iframe>


          </div>
        </div>
          
      </div>

    </Layout>
  );
}
