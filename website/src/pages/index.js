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
  const docUrl = doc => `${useBaseUrl(siteConfig.routeBasePath)}/${doc}`

  const FlexContainer = props => ( <div className="container"> {props.children} </div> );
  const FlexItem = props => ( <div className={`col${props.size} ${props.className}`}>{props.children}</div> );

  const Logo = props => (
    <div className="projectLogo">
      <img src={props.src} alt="Project Logo" />
    </div>
  );

  const Button = props => (
    <div style={props.customStyle}>
      <a className={props.className} href={props.href} target={props.target} style={{fontSize: "24px"}} >
        {props.children}
      </a>
    </div>
  );

  return (
    <div>

      <div className="row firstLine">
        <FlexItem className="logoItem" size="--12 col">
            <div className="" style={{textAlign: "center"}} >

              <a href={`${useBaseUrl("download")}`} >
                <img id="imgSoft" src={`${useBaseUrl(siteConfig.customFields.frontPageImg)}`} alt="GAMA-Platform Software" />
              </a>
            </div>
        </FlexItem>
        <FlexItem className="" size="">
          <div style={{paddingTop: "4em", textAlign: "center", color: "white"}} >
            <h1 class="hero__title">{siteConfig.tagline}-Platform</h1>
            <p class="hero__subtitle" >GAMA is a modeling and simulation development environment<br/>for building spatially explicit agent-based simulations.</p>
          </div>
        </FlexItem>
       </div>

       <div className="row" style={{"paddingTop": "5vh"}}>
          <div className="col col--2 col--offset-3">
            <Button href={`${useBaseUrl("download")}`}  className="button button--warning" customStyle={{"textAlign": "center"}}>Download</Button>
          </div>
          <div className="col col--2" style={{display: "contents"}} >
            <Button href={docUrl('Home')} className="button button--outline button--danger" customStyle={{"textAlign": "center"}}>Documentation</Button>
          </div>
          <div className="col col--2" style={{float: "left",display: "flex"}} >
              <Button href={docUrl('Tutorials')} className="button button--outline button--primary" customStyle={{"textAlign": "center"}}>Tutorial</Button>
          </div>
        </div>
        

    </div>
  );
}

export default function Hello() {
  const {siteConfig} = useDocusaurusContext();

  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `
      :root {
        --ifm-color-warning: #eeb64f;
        --ifm-color-danger: #d36737;
        --ifm-color-primary: #3271a1;
      }

      .row {
        padding-top: 10vh;
      }

      .projectLogo img{ 
        width: auto; 
        max-height: 250px;
      }

      .firstLine .col{
        margin: 0 3em;
      }

      /*  One Screen  */
      /*.fixedHeaderContainer, footer{ display: none; }*/
      .navPusher{ padding: 0; }

      html { 
        background-color: black;
      }

      footer {
        display: none;
      }

      .projectTitle {
        text-align: left;
        color: white;
      }
      .projectTitle small {
        margin: 1.5em 0;
        text-align: justify;
      }
      .promoSection { margin: 3em 0; }

      .projectLogo {
        position: inherit !important;
        padding: 0 !important;
      }

      /*  BUTTONS */
      .button { border-width: 2px;font-weight: bold; }

      .fLeft,   .fRight  > div {
        float: right;
      }
      .promoSection .promoRow .pluginRowBlock {
        justify-content: flex-start !important;
      }
      .fRight {
        padding-right: 71px;
      }

      .logoItem {
        text-align: right;
      }

      #back-to-top {
        display: none;
      }
    `}} />
  );

  const Script = props => (
    <script type="text/javascript" src="./js/index.js"></script>
  );

  return (
    <Layout>
      <Design/>
      <Script/>

      <div className="container">
        <div className="row" style={{"padding": "2em", margingTop: "5vh", display: 'none'}}>
        </div>

        <HomeSplash />

      </div>  
    </Layout>
  );
}