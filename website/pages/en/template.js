/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/*
 *  TEMPLATE PAGE FOR GAMA-PLATFORM
 *  /!\ Remove all HTML comments before releasing page /!\
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

function search(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  /* Custom simple container */
  const FlexContainer = props => ( <div className="section container"> {props.children} </div> );
  const FlexItem = props => ( <div className={`item ${props.className}`}>{props.children}</div> );

  /* Custom CSS Object */
  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `
      /* ADD ALL YOU CSS FOR THIS UNIQUE WEBPAGE HERE */
    `}} />
  );

  // Exemple Object
  const ImgSoftware = props => (
    <div className="pluginWrapper">
      <img src={props.img_src} alt="GAMA-Platform Software" />
    </div>
  );

  // Webpage which will be generated
  return (
    <!-- React-HTML tag -->
    <div className="docMainWrapper wrapper">
      <!-- React object -->
      <Design />

      <FlexContainer>
        <FlexItem className="center">
          <ImgSoftware img_src={`${baseUrl}${siteConfig.footerIcon}`} />
        </FlexItem>
        <FlexItem>
          <h2>Dear GAMA Modellers,</h2>
          <h1>GAMA 1.8 is here !</h1>
          <p>We are excited to announce our latest release: GAMA 1.8. It is available for download right away! We have introduced many new features requested by our users and a redesigned website with documentation for both users and developers. </p>
        </FlexItem>
      </FlexContainer>
      
      <!-- Classic HTML -->
      <h3>New features</h3>
      <ul>
        <li>Meet our new enriched <b>Graphical User Interface</b></li>
        <li>Model cognitive and emotional agents with social <b>behavior modeling</b></li>
      </ul>

      </Container>
    </div>
  );
}

module.exports = search;
