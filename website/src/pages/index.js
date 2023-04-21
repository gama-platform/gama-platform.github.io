/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './index.module.css';

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig} = context;

  return (
    <Layout
      title={siteConfig.title}
      description="A modern styling framework for content-driven websites">
      <header className={clsx('hero', styles.heroBanner)}>
        <div className="container">
          <img
            className={clsx(styles.heroBannerLogo, 'margin-vert--md')}
            src={useBaseUrl('/img/gama-logo.png')}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">GAMA is a modeling and simulation development environment for building spatially explicit agent-based simulations</p>
          <div className="row buttons_src-pages-index-module">
            <div className="col col--4" style={{margin: "1em auto"}}>
              <a sytle={{margin: "0 auto"}} className="button button--warning button--lg" href="/download">Download</a>
            </div>
            <div className="col col--4" style={{margin: "1em auto"}}>
              <a sytle={{margin: "0 auto"}} className="button button--outline button--danger button--lg" href="wiki/Home">Documentation</a>
            </div>
            <div className="col col--4" style={{margin: "1em auto"}}>
              <a sytle={{margin: "0 auto"}} className="button button--outline button--primary button--lg" href="wiki/Tutorials">Tutorials</a>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className={styles.sectionDark}>
          <div className="container padding-vert--md">
            <div className="row">
              <div className="col col--8 col--offset-2">
                <div className="margin-vert--lg text--center">
                  <h2 className={styles.sectionDarkTitle}>GAMA Platform 1.9 is out</h2>
                  <h3 style={{color: "white"}}><a href="/download" style={{color: "white", textDecoration: "underline"}}>Download it now</a> and check <a href="/wiki/Changelog" style={{color: "white", textDecoration: "underline"}}>the changelog</a>!!</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="padding-vert--xl">
          <p className="container">
            <p className="row">
              <p className="col col--10 col--offset-1">
                <h2 className="text--center margin-bottom--xl">Why the GAMA platform?</h2>
                <div className="row margin-vert--lg">
                  <div className="col">
                    <h3><i class="fa-brands fa-osi"></i> Open Source</h3>
                    <p>We are entirely dedicated to Free and Open Source Software. All of our utilities are licensed under the GNU General Public License (v3).</p>
                  </div>
                  <div className="col">
                    <h3><i class="fa-solid fa-flask"></i> Scientific Tools</h3>
                    <p>GAMA is used by multiple scientific projects and cited in hundreds of scientific articles.</p>
                  </div>
                  <div className="col">
                    <h3><i class="fa-solid fa-map"></i> GIS support</h3>
                    <p>
                      GAMA have a native GIS support to easily apply your model on real life geographic data.
                    </p>
                  </div>
                </div>
                <div className="row margin-vert--lg">
                  <div className="col">
                    <h3><i class="fa-solid fa-rocket"></i> Simply powerful</h3>
                    <p>GAMA uses an intuitive programming language (GAML)  developed to be used by non-computer scientists.<br/><a href="https://www.youtube.com/watch?v=YGHw1LSzd-E" target="_blank">Discover it in 10 minutes!</a></p>
                  </div>
                  <div className="col">
                    <h3><i class="fa-solid fa-download"></i> Cross Platform</h3>
                    <p>GAMA can be <a href="download">installed on all operating systems</a> that support Java, i.e, Windows, Linux and Mac OSX.<br/>Write Once, Run Anywhere.</p>
                  </div>
                </div>
              </p>
            </p>
          </p>
        </p>
      </main>
      <style dangerouslySetInnerHTML={{__html: `
        footer.footer {
          display: none;
        }
      `}} />
    </Layout>
  );
}

export default Home;
