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

/*  FIRST MAIN BLOCK  */
function HomeSplash() { //} extends React.Component {
  const {siteConfig} = useDocusaurusContext();
  const docUrl = doc => `${useBaseUrl("wiki")}/${doc}`

  const FlexContainer = props => ( <div className="container"> {props.children} </div> );
  const FlexItem = props => ( <div className={`col${props.size} ${props.className}`}>{props.children}</div> );

  const Button = props => (
    <a className={props.className} href={props.href} target={props.target} style={{fontSize: "24px", margin: "0 .5em"}} >
        {props.children}
      </a>
  );

  return (
    <div>

      <div className="row firstLine">
        <FlexItem className="" size="--12 col">
            <div className="" style={{textAlign: "center"}} >

              <a href={`${useBaseUrl("download")}`} >
                <img id="imgSoft" src="/img/gama-logo.png" alt="GAMA-Platform Software" style={{maxHeight: "280px"}} />
              </a>
            </div>
        </FlexItem>
        <FlexItem className="" size="--12 col">
          <div style={{paddingTop: "4em", textAlign: "center"}} >
            <h1 className="hero__title">{siteConfig.title}</h1>
            <p className="hero__subtitle" >GAMA is a modeling and simulation development environment<br/>for building spatially explicit agent-based simulations.</p>
          </div>
        </FlexItem>

          <div className="col col--12" style={{"textAlign": "center", margin: "3em auto"}} >
            <Button href={`${useBaseUrl("download")}`}  className="button button--warning">Download</Button>
            <Button href={docUrl('Home')} className="button button--outline button--danger">Documentation</Button>
              <Button href={docUrl('Tutorials')} className="button button--outline button--primary">Tutorials</Button>
          </div>
       </div>

    </div>
  );
}

export default function Hello() {
  const {siteConfig} = useDocusaurusContext();

  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `
      .row { padding-top: 10vh; }
      .firstLine .col{ margin: 0 3em; }
      footer { display: none; }
      .button { border-width: 2px;font-weight: bold; }
      #back-to-top { display: none; }
      body{ overflow: hidden; }
      #background.container { position: relative; }
      .bgGif {
        opacity: 0.6;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        display: block;
        margin-bottom:auto;
        margin-top: 10vh;
      }
      #background > .row {
        position: relative;
        paddingTop: "0";
        z-index = 2;
      }

      @media only screen and (max-width: 600px) {
        img.bgGif {
          display: none;
        }
        #background > .row {
          z-index = 0;
        }
      }

    `}} />
  );

  return (
    <Layout>
      <Design/>

      <div id="background" className="container">
        <img className="bgGif" src="/img/GAMA_1.8.2_transparent.gif" alt="" />
        <div className="row">
          <HomeSplash />
        </div>
      </div>  
    </Layout>
  );
}