/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

/*	FIRST MAIN BLOCK	*/
class HomeSplash extends React.Component {
  render() {
    const {siteConfig, language = ''} = this.props;
    const {baseUrl, docsUrl} = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const FlexContainer = props => ( <div className="section container"> {props.children} </div> );
    const FlexItem = props => ( <div className={`item ${props.className}`}>{props.children}</div> );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <h2 className="projectTitle">
        {siteConfig.tagline}
        <small>{siteConfig.frontPagePresentation}</small>
      </h2>
    );

    const PromoSection = props => (
      <div id="promo" className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className={props.className} href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    const ImgSoftware = props => (
      <div className="pluginWrapper">

        <a href={`${baseUrl}${siteConfig.frontPageImgLink}`} >
          <img id="imgSoft" src={`${baseUrl}${siteConfig.frontPageImg}`} alt="GAMA-Platform Software" />
        </a>

      </div>
    );

    return (
      <SplashContainer>
        <div className="inner">
          <FlexContainer>
            <FlexItem className="logoItem">
              <Logo src={`${baseUrl}${siteConfig.footerIcon}`} />
            </FlexItem>
            <FlexItem className="">
              <ProjectTitle siteConfig={siteConfig} />
            </FlexItem>
          </FlexContainer>
          <FlexContainer>
            <FlexItem className="fRight">
              <Button href={`${baseUrl}download`}  className="button buttonWhiteActive">Download</Button>
            </FlexItem>
            <FlexItem className="fLeft">
              <PromoSection>
                <Button href={docUrl('Home')} className="button buttonOrange">Discover</Button>
                <Button href={docUrl('Tutorials')} className="button buttonRed">Learn</Button>
                <Button href={'blog'} className="button buttonBlue">Blog</Button>
              </PromoSection>
            </FlexItem>
          </FlexContainer>
          <ImgSoftware />
        </div>
      </SplashContainer>
    );
  }
}

class Index extends React.Component {
  render() {
    const {config: siteConfig, language = ''} = this.props;

    const Design = props => (    
      <style dangerouslySetInnerHTML={{__html: `
        .container {
          display:  inline-flex;
          align-items: center;
          width: 100%;
        }
        .item{
          width: 50%;
          margin: 0 3em;
        }
        /*  One Screen  */
        .fixedHeaderContainer, footer{ display: none; }
        .navPusher{ padding: 0; }

        .homeSplashFade {
            height: 100vh;
            position: relative;
        }
        body { background-color: black; }
        .projectTitle {
          text-align: left;
          color: white;
        }
        .projectTitle > small {
          margin: 1.5em 0;
          text-align: justify;
        }
        .promoSection { margin: 3em 0; }

        .projectLogo {
          position: inherit !important;
          padding: 0 !important;
        }

        .projectLogo img{ 
          width: auto; 
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

          .inner {
            padding-top: 5vh;
          }

        @media only screen and (max-width: 1200px) {
          .homeContainer .homeWrapper .projectLogo {
            display: block;
          }
          .homeContainer .homeWrapper .projectLogo img {
            height: 100%;
            max-height: 250px;
          }
        }

        @media only screen and (max-device-width: 736px) {
          .logoItem {
            display: none;
          }
          .item {
            width: 100%
          }
          h2, h2 small {
            text-align: center !important;
            text-justify: inherit;
          }
          .container{
            flex-wrap: wrap;
          }
          .fLeft,   .fRight {
            padding: 0;
            width: auto;
            margin: 0 auto;
          }

          .inner {
            padding-top: 0;
          }
        }
      `}} />
    );

  const Script = props => (
    <script type="text/javascript" src="./js/index.js"></script>
  );

    return (
      <div>
        <Design/>
        <Script/>

        <div className="section container" style={{backgroundColor: "#3670A0"}}>
          <a href="covid19" class="item" style={{ color: "white", textAlign: "center", width: "100%", padding: "10px 0"}}>
            😷 The GAMA Team is helping to prevent COVID19 contamination. <u>Click here</u> to see more about models we are working on. 😷
          </a>
        </div>

        <HomeSplash siteConfig={siteConfig} language={language} />
      </div>
    );
  }
}

module.exports = Index;
