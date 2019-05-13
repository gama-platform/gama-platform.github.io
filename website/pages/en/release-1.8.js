/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
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

  const FlexContainer = props => ( <div className="section container"> {props.children} </div> );
  const FlexItem = props => ( <div className={`item ${props.className}`}>{props.children}</div> );

  const Design = props => (    
      <style dangerouslySetInnerHTML={{__html: `
        .container {
          display:  inline-flex;
          align-items: center;
        }
        /*  One Screen  */
        .navPusher{ padding: 0; }

        .center { margin-right: 2em; }

        h1{ padding-left: 2em; } 

        @media only screen and (max-width: 1023px) { .container { margin-top: 30px; } }

        @media only screen and (min-device-width: 360px) and (max-device-width: 736px) { 
          h1{ padding-left: 0em; } 
          .container{ flex-wrap: wrap; } 
        }
      `}} />
  );

    const ImgSoftware = props => (
      <div className="pluginWrapper">
        <img src={props.img_src} alt="GAMA-Platform Software" />
      </div>
    );

  return (
    <div className="docMainWrapper wrapper">
      <Design />
      <Container className="mainContainer documentContainer postContainer">
      <FlexContainer>
        <FlexItem className="center">
          <ImgSoftware img_src={`${baseUrl}${siteConfig.footerIcon}`} />
        </FlexItem>
        <FlexItem>
          <h2>Dear GAMA Modellers,</h2>
          <h1>GAMA 1.8 is here !</h1>
            <p>We are excited to announce our latest release: GAMA 1.8. It is available for download right away! We have introduced many new features requested by our users and a redesigned website with documentation for both users and developers. </p>
            <p>We welcome and encourage you to download and experience all these exciting new features. </p>
            <p>The GAMA Platform team</p>
        </FlexItem>
      </FlexContainer>
      
      <h3>New features</h3>
      <ul>
        <li>Meet our new enriched <b>Graphical User Interface</b></li>
        <li>Model cognitive and emotional agents with social <b>behavior modeling</b></li>
        <li>Visualize models with improved <b>2D and 3D displays </b></li>
        <li>Learn to combine multi-disciplinary models with <b>Co-Modeling</b></li>
        <li>Import, analyse and export many <b>Data Format</b></li>
        <li>Discover our new enriched  <b>Model Library </b></li>
        <li>Run massive simulation using <b>parallel computation </b></li>
        <li>Communicate easily between computer with <b>network skills</b></li>
        <li>Explore your simulation with the <b>multi-simulations</b> and <b>batch</b> and <b>headless</b> mode</li>
        <li>Save, load and travel back and forth in your simulation with our <b>serialize</b> feature </li>
        <li>Access <b>documentation</b> within GAMA using the new <b>search window</b></li>
        <li>Receive latest builds directly in GAMA with the <b>update menu</b></li>
        <li>Click here for more information.</li>
      </ul>

      </Container>
    </div>
  );
}

module.exports = search;
