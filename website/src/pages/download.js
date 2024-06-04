/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */
 
import React from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Download() {
  const {siteConfig} = useDocusaurusContext();
  const docUrl = doc => `${useBaseUrl(siteConfig.routeBasePath)}/${doc}`;

  const Button = props => (
    <div className={`col col--${props.col}`}>
      <a className={`button button button--${props.buttonColor}`} style={{width: "85%"}} href={`${props.href}`} target="_blank">{props.children}</a>
    </div>
  );

  return (
    <Layout
      description="GAMA is an easy-to-use open source modeling and simulation environment for creating spatially explicit agent-based simulations.">

      <style dangerouslySetInnerHTML={{__html: `
        .row {
          margin-top: 1.5em;
        }
        .main-wrapper {
          padding: 40px 0;
        }
        .blockImage {
          max-width: 100%;
          margin: 0 auto 20px auto;
        }
        .blockImage img {
          max-height: 80px;
        }
        .dropdown__link:hover {
          background-color: inherit;
        }
        .button {
          width: 65%;;
          margin: .5em auto;
        }
        .button a { color: inherit }
        .row img {
          -webkit-filter: drop-shadow( 0px 0px 5px rgb(255, 255, 255));
          filter: drop-shadow( 0px 0px 5px rgb(255, 255, 255));
        }

        #release > .col {
          margin-top: 3em;
        }

        [data-theme="light"] :where(.button-dyn-color) {
        --ifm-button-border-color: var(--ifm-color-primary);
        }

        [data-theme="dark"] :where(.button-dyn-color) {
        --ifm-button-border-color: var(--ifm-color-warning) !important;
      `}} />

      <div className="container">

        <div className="row">
          <div className="col col--12">
            <header className="postHeader">
              <h1>Download GAMA <a href={`https://github.com/gama-platform/gama/releases/tag/${siteConfig.customFields.downloadVersion}`} target="_blank">version {siteConfig.customFields.downloadVersion}</a></h1>
            </header>
          </div>
        </div>

        <div id="release" className="row">
        
          <div className="blockElement imageAlignTop col col--4" style={{marginTop:"3em", textAlign: "center"}}>
            <a href={`https://github.com/gama-platform/gama/releases/download/${siteConfig.customFields.downloadVersion}/${siteConfig.customFields.zipName}_Windows_with_JDK.exe`} target="_blank">
              <div className="blockImage">
                <img src="/img/windows-logo.svg" alt="Windows" ></img>
                </div>
                <div className="blockContent">
                <Button href={`https://github.com/gama-platform/gama/releases/download/${siteConfig.customFields.downloadVersion}/${siteConfig.customFields.zipName}_Windows_with_JDK.exe`} buttonColor="outline button-dyn-color" col="12">Windows</Button>
              </div>
            </a>
          </div>
          <div className="blockElement imageAlignTop col col--4" style={{marginTop:"3em", textAlign: "center"}}>
            <div className="blockImage">
              <img src="/img/apple-logo.svg" alt="Apple" ></img>
              </div>
              <div className="blockContent">
              <Button href={`https://github.com/gama-platform/gama/releases/download/${siteConfig.customFields.downloadVersion}/${siteConfig.customFields.zipName}_MacOS_M1_with_JDK.dmg`} buttonColor="outline button-dyn-color" col="12">macOS Apple Silicon</Button>
              <Button href={`https://github.com/gama-platform/gama/releases/download/${siteConfig.customFields.downloadVersion}/${siteConfig.customFields.zipName}_MacOS_with_JDK.dmg`} buttonColor="outline button-dyn-color" col="12">macOS Intel (Older)</Button>
            </div>
          </div>
          <div className="blockElement imageAlignTop col col--4" style={{marginTop:"3em", textAlign: "center"}}>
            <a href={`https://github.com/gama-platform/gama/releases/download/${siteConfig.customFields.downloadVersion}/${siteConfig.customFields.zipName}_Linux_with_JDK.deb`} target="_blank">
              <div className="blockImage">
                <img src="/img/linux-logo.svg" alt="Linux" ></img>
                </div>
                <div className="blockContent">
                <Button href={`https://github.com/gama-platform/gama/releases/download/${siteConfig.customFields.downloadVersion}/${siteConfig.customFields.zipName}_Linux_with_JDK.deb`} buttonColor="outline button-dyn-color" col="12">Linux</Button>
              </div>
            </a>
          </div>

      </div>
      <div style={{ marginBottom: "3em", marginTop: "3em"}}>
        <h2>This major release of GAMA contains many new features and fixes, including:</h2>

        <ul>
        <li><strong>A much more fluid and powerful IDE</strong></li>
        <li><strong>A new server mode of GAMA</strong>, which revolutionizes the way to interact with the platform from R, Python or web clients.</li>
        <li><strong>Increased model exploration possibilities</strong>.</li>
        <li><strong>The addition of the two new data types <code>field</code> and <code>image</code></strong>, to better manage raster data</li>
        <li><strong>A more powerful graph manipulation</strong></li>
        <li><strong>A focus on urban mobility applications</strong>, with the <code>advanced_driving</code> and <code>pedestrian</code>, which make it much easier to produce realistic large-scale mobility models.</li>
        <li><strong>The possibility to simulate physical interactions between agents</strong> thanks to the addition of the native <code>bullet</code> library.</li>
        <li><strong>New and faster display capabilities</strong>, making it easier than ever to build interactive simulations, serious games or advanced scientific visualisations.</li>
        </ul>

      </div>

      <div className="row" style={{textAlign: "center"}}>

          <Button href={`/wiki/Changelog`} col="4" buttonColor="warning">What's new?</Button>
          <Button href={`https://github.com/gama-platform/gama/releases/tag/${siteConfig.customFields.downloadVersion}`} col="4" buttonColor="danger">Other installation versions</Button>
          <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv193.pdf`} col="4" buttonColor="primary">PDF Documentation</Button>
          <Button col="4"/><Button col="4"/>
          <Button href={`https://docs.google.com/document/d/1n4-l6VmqSi6lFPyhdeCnowK9pG5gM773/edit?usp=sharing&ouid=101392264667256926559&rtpof=true&sd=true`} col="4" buttonColor="primary">Cheat Sheet GAML Documentation</Button>
      </div>

      </div>

    </Layout> 

  );
}
