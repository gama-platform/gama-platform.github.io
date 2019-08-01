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

function Download(props) {
  const {config: siteConfig, language = ''} = props;
  const {baseUrl, docsUrl} = siteConfig;
  const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
  const langPart = `${language ? `${language}/` : ''}`;
  const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

  const FlexContainer = props => ( <div className="gridBlock"> {props.children} </div> );
  const FlexItem = props => ( <div className="blockElement imageAlignTop threeByGridBlock">{props.children}</div> );

  const Button = props => (
    <div className="pluginWrapper buttonWrapper">
      <a className={props.className} href={props.href} target={props.target}>
        {props.children}
      </a>
    </div>
  );

  const OsBlock = props => (
    <div className="blockElement imageAlignTop threeByGridBlock">
      <div className="blockImage">
        <img src={props.src} alt={props.os} ></img>
      </div>
      <div className="blockContent">
        <h2>{props.os}</h2>
            <Button href={`https://github.com/gama-platform/gama/releases/download/${props.version}/${props.zipName}.${props.zipOS}.with.JDK.zip`} className="button buttonRed">with JDK (~ 275MB)
              <span class="tooltiptext">This is the easiest version to run. No need to install anything more.<br/><b>Note that the embedded JDK should not be used to run other softwares</b></span>
            </Button>
            <Button href={`https://github.com/gama-platform/gama/releases/download/${props.version}/${props.zipName}.${props.zipOS}.zip`} className="button buttonBlue">Without JDK (&lt; 100MB)
              <span class="tooltiptext">Install this version if you <b>already installed Oracle JDK 8</b> on your computer.</span>
            </Button>
            <Button href="https://github.com/gama-platform/gama/releases" className="button buttonOrange">Daily Build
              <span class="tooltiptext">Install this version if you feel adventurous.</span>
            </Button>
      </div>
    </div>
  );

  const OsGrid = props => (
    <FlexContainer>
      <OsBlock src="img/windows-logo.svg" os="Windows" version={props.version} zipName={props.zipName} zipOS='Win' />
      <OsBlock src="img/apple-logo.svg" os="MacOS" version={props.version} zipName={props.zipName} zipOS='Mac' />
      <OsBlock src="img/linux-logo.svg" os="Linux" version={props.version} zipName={props.zipName} zipOS='Linux' />
    </FlexContainer>
  );

  const release = [
    {
      title: `Windows`,
      content: 'Learn how to use this project',
      image: siteConfig.baseUrl + 'img/windows-logo.svg',
      imageAlt: 'windows logo',
      imageAlign: 'top',
    },
    {
      title: 'Frequently Asked Questions',
      content: 'Questions gathered from the community',
      image: 'img/apple-logo.svg',
      imageAlign: 'top',
    },
    {
      title: 'More',
      content: 'Lots of documentation is on this site',
    },
  ];


  const ImgSoftware = props => (
          <div className="pluginWrapper">
            <img src={props.img_src} alt="GAMA-Platform Software" />
          </div>
  );


  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `
      .container {
        display:  inline-flex;
        align-items: center;
      }
      .button {
        margin-bottom: 1em;
        text-align: center;

        /* Tooltip */
        position: relative;
        display: inline-block;
      }
      /* Tooltip text */
      .button .tooltiptext {
        visibility: hidden;
        width: 100%;
        background-color: #555;
        color: #fff;
        text-align: center;
        padding: 5px 0;
        border-radius: 6px;
        text-transform: none;

        /* Position the tooltip text */
        position: absolute;
        z-index: 1;
        bottom: 125%;
        left: 0%;

        /* Fade in tooltip */
        opacity: 0;
        transition: opacity 0.3s;
        padding: 1em;
      }

      /* Tooltip arrow */
      .button .tooltiptext::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: #555 transparent transparent transparent;
      }

      /* Show the tooltip text when you mouse over the tooltip container */
      .button:hover .tooltiptext {
        visibility: visible;
        opacity: 1;
      }
      .gridBlock {
        text-align: center;
      }
      .blockImage {
        margin: 0 auto 20px auto;
      }
      @media only screen and (min-width: 1024px) {
        .button { width: 75%; }
        .gridBlock { padding-top: 1.5em; }
      }
      @media only screen and (max-width: 1023px) { 
        .button { width: 100%; }
      }
      .buttonGray:hover{ background: #bbb; }
      .buttonGray {
        border-color: #bbb;
        color: #bbb;
      }
      .smallButton {
        width: auto;
      }
      a.disabled {
        pointer-events: none;
      }
    `}} />
  );

  return (
    <div className="docMainWrapper wrapper">
      <Design />
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Download</h1>
          </header>
          <p>The latest stable version of GAMA can be downloaded with or without an embedded JDK. If you feel adventurous, you can also try the daily release.</p>
          <OsGrid version={siteConfig.downloadVersion} zipName={siteConfig.zipName} />

        </div>
        <div className="post">
            <FlexContainer>
              <div className="blockElement imageAlignTop threeByGridBlock">
		      <div className="blockContent">
			    <h2>Documentation</h2>
				<Button href="#" className="button disabled">PDF</Button>
		      </div>
              </div>
              <div className="blockElement imageAlignTop threeByGridBlock"></div>
              <div className="blockElement imageAlignTop threeByGridBlock"></div>
            </FlexContainer>
        </div>
      </Container>
    </div>
  );
}

module.exports = Download;
