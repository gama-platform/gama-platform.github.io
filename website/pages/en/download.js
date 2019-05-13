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

  const FlexContainer = props => ( <div class="gridBlock"> {props.children} </div> );
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
      <div class="blockImage">
        <img src={props.src} alt={props.os} ></img>
      </div>
      <div class="blockContent">
        <h2>{props.os}</h2>
            <Button href={`https://github.com/gama-platform/gama/releases/download/v${props.version}/${props.zipName}_${props.zipOS}.zip`} className="button buttonBlue">Download</Button>
            <Button href={`https://github.com/gama-platform/gama/releases/download/v${props.version}/${props.zipName}_EmbeddedJDK_${props.zipOS}.zip`} className="button buttonRed">with JDK</Button>
            <Button href="https://github.com/gama-platform/gama/releases/tag/latest" className="button buttonOrange">git version</Button>
      </div>
    </div>
  );

  const OsGrid = props => (
    <FlexContainer>
      <OsBlock src="img/windows-logo.svg" os="Windows" version={props.version} zipName={props.zipName} zipOS='Win' />
      <OsBlock src="img/apple-logo.svg" os="Apple" version={props.version} zipName={props.zipName} zipOS='MacOS' />
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
      }
      @media only screen and (min-width: 1024px) {
        .button { width: 50%; }
      }
      @media only screen and (max-width: 1023px) { 
        .button { width: 100%; }
      }
      .buttonGray:hover{ background: #bbb; }
      .buttonGray {
        border-color: #bbb;
        color: #bbb;
      }
    `}} />
  );

  return (
    <div className="docMainWrapper wrapper">
      <Design />
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Download <i>GAMA latest Release</i></h1>
          </header>
          <p>Choose the version that fits you the best !</p>
          <p>You can download the GAMA software with or without an embedded JDK or the Git version from GitHub.</p>
          <OsGrid version={siteConfig.downloadVersion} zipName={siteConfig.zipName} />
          <div className="blockElement imageAlignTop threeByGridBlock">
            <div class="blockContent">
              <h2>Previous version</h2>
                  <Button href="https://github.com/gama-platform/gama/releases" className="button buttonGray">Previous version</Button>
            </div>
          </div>
        </div>
        <div className="post">
          <header className="postHeader">
            <h1>Download the PDF documentation</h1>
          </header>
          <Button href={`${baseUrl}resources/pdf/docGAMAv${siteConfig.downloadVersion}.pdf`} className="button">GAMA {siteConfig.downloadVersion}</Button>
        </div>
      </Container>
    </div>
  );
}

module.exports = Download;
