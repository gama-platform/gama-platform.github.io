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

  const ButtonHover = props => (
    <div class="dropdown dropdown--hoverable col col--12">
      <a href={props.href} className={`button button--outline button--${props.buttonColor}`} target="_blank">{props.buttonTxt}</a>
      <ul class="dropdown__menu">
        <li>
          <span className="dropdown__link">
            {props.children}</span>
        </li>
      </ul>
    </div>
  );

  const Button = props => (
    <button className={`button button--outline button--${props.buttonColor}`}>
      <a href={`${props.href}`} target="_blank">{props.children}</a></button>
  );

  const OsBlock = props => (
    <div className="blockElement imageAlignTop col col--6" style={{marginTop:"3em", textAlign: "center"}}>
      <div className="blockImage">
        <img src={props.src} alt={props.os} ></img>
      </div>
      <div className="blockContent">
        <h2>{props.os}</h2>
            <ButtonHover href={`https://github.com/gama-platform/gama/releases/download/${props.version}/${props.zipName}_${props.zipOS}_with_JDK.${props.zipExtension}`} buttonTxt={`Default installer (${props.zipSize} MB)`} buttonColor="warning">This is the easiest version to run. Run installer and start GAMA.
            </ButtonHover>
            <ButtonHover href={`https://github.com/gama-platform/gama/releases/tag/${props.version}`} buttonColor="danger" buttonTxt="More installer" target="_blank">GAMA is distibuted in various format, feel free to check then.<br/><b>Use this only if you know what you do.</b>
            </ButtonHover>
            <ButtonHover href="https://github.com/gama-platform/gama/releases" buttonColor="primary" buttonTxt="Alpha Version">This is the <b>in-development version</b> of GAMA. It can be broken or have some issues.<br/>Install this version if you feel adventurous.
            </ButtonHover>
      </div>
    </div>
  );

  return (
    <Layout>

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
      `}} />

      <div className="container">

        <div className="row">
          <div className="col col--12">
            <header className="postHeader">
              <h1>Download stable version <span style={{fontSize: "medium"}}>(currently <a href={`https://github.com/gama-platform/gama/releases/tag/${siteConfig.customFields.downloadVersion}`} target="_blank">version {siteConfig.customFields.downloadVersion}</a>)</span></h1>
            </header>
            <p>
             The latest stable version of GAMA can be downloaded with or without an embedded JDK. If you feel adventurous, you can also try the latest alpha (unstable) release.
             If you have any trouble installing gama, you can go on the <a href={`https://gama-platform.org/wiki/Installation`}>installation page</a> of the website to check the detailed installation procedures.
            </p>
          </div>
        </div>

        <div id="release" className="row">
          <OsBlock src="/img/windows-logo.svg" os="Windows" version={siteConfig.customFields.downloadVersion} zipName={siteConfig.customFields.zipName} zipOS='Windows' zipExtension='exe' zipSize='310' />
          <OsBlock src="/img/linux-logo.svg" os="Linux" version={siteConfig.customFields.downloadVersion} zipName={siteConfig.customFields.zipName} zipOS='Linux' zipExtension='deb' zipSize='384' />
          <OsBlock src="/img/apple-logo.svg" os="MacOS (Intel)" version={siteConfig.customFields.downloadVersion} zipName={siteConfig.customFields.zipName} zipOS='MacOS' zipExtension='dmg' zipSize='360' />
          <OsBlock src="/img/apple-M1-logo.svg" os="MacOS (Apple Silicon)" version={siteConfig.customFields.downloadVersion} zipName={siteConfig.customFields.zipName} zipOS='MacOS_M1' zipExtension='dmg' zipSize='350' />

          <div className="blockElement imageAlignTop col col--6" style={{marginBottom:"3em", textAlign: "center"}}>
            <div className="blockContent">
              <h2>Documentation</h2>
              <ButtonHover href={`https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv1.8.2.pdf`} buttonTxt={`GAMA ${siteConfig.customFields.downloadVersion} PDF (20 MB)`} buttonColor="warning">This is the <b>offline GAMA {siteConfig.downloadVersion} documentation</b> ready to be download in a PDF file.
              </ButtonHover>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col col--12">
            <header className="postHeader">
              <h2>Older documentation</h2>
            </header>
            <p>Below is the list to the <strong>PDF documentations</strong> of the <strong>previous versions of GAMA</strong>.</p>
          </div>
        </div>

        <div className="row" style={{textAlign: "center"}}>
          <div className="col">
              <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv181.pdf`} buttonColor="warning">GAMA 1.8.1 (~ 22 MB)
              </Button>
              <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv1.8.0.pdf`} buttonColor="danger">GAMA 1.8.0 (~ 34 MB)
              </Button>
              <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv17.pdf`} buttonColor="primary">GAMA 1.7 (~ 17 MB)
              </Button>
          </div>

          <div className="col">
              <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/docGAMAv161.pdf`} buttonColor="warning">GAMA 1.6.1 (~ 13 MB)
              </Button>
              <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/GAMAv16.pdf`} buttonColor="danger">GAMA 1.6 (~ 13 MB)
              </Button>
              <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/GAMAv151.pdf`} buttonColor="primary">GAMA 1.5.1 (~ 2 MB)
              </Button>
          </div>

          <div className="col">
                <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/GAMAv14.pdf`} buttonColor="warning">GAMA 1.4 (> 1 MB)
                </Button>
                <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/GAMAv13.pdf`} buttonColor="danger">GAMA 1.3 (~ 2 MB)
                </Button>
                <Button href={`https://github.com/gama-platform/gama/wiki/resources/pdf/GAMAv11.pdf`} buttonColor="primary">GAMA 1.1 (~ 1 MB)
                </Button>
          </div>
        </div>

      </div>

    </Layout> 

  );
}
