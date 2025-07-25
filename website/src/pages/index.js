/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";
import styles from "./index.module.css";

function Home() {
  const context = useDocusaurusContext();
  const { siteConfig } = context;

  return (
    <Layout
      title={siteConfig.title}
      description="GAMA is an easy-to-use open source modeling and simulation environment for creating spatially explicit agent-based simulations."
    >
      <header className={clsx("hero", styles.heroBanner)}>
        <div className="container">
          <img
            className={clsx(styles.heroBannerLogo, "margin-vert--md")}
            src={useBaseUrl("/img/gama-logo.png")}
          />
          <h1 className="hero__title">{siteConfig.title}</h1>
          <div
            className="row buttons_src-pages-index-module"
            style={{ marginTop: "3em" }}
          >
            <div className="col col--4" style={{ margin: "1em auto" }}>
              <a
                sytle={{ margin: "0 auto" }}
                className="button button--warning button--lg"
                href="/download"
              >
                Download
              </a>
            </div>
            <div className="col col--4" style={{ margin: "1em auto" }}>
              <a
                sytle={{ margin: "0 auto" }}
                className="button button--outline button--danger button--lg"
                href="wiki/Home"
              >
                Documentation
              </a>
            </div>
            <div className="col col--4" style={{ margin: "1em auto" }}>
              <a
                sytle={{ margin: "0 auto" }}
                className="button button--outline button--primary button--lg"
                href="wiki/Tutorials"
              >
                Tutorials
              </a>
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
                  <h2 className={styles.sectionDarkTitle}>
                    <a style={{ color: "white" }} href="/download">
                      Version 2025-06 of GAMA has been released
                    </a>
                  </h2>
                </div>
              </div>
              {/* <div className="col col--12 text--center">
                <iframe src="https://www.youtube-nocookie.com/embed/LvmNtsB1ytY" style={{backgroundColor: "black", maxWidth: "560px", height: "315px", width: "100%"}} title="GAMA trailer 1.9.3" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
              </div> */}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
