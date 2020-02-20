/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

class Footer extends React.Component {
  docUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    const docsUrl = this.props.config.docsUrl;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ''}`;
    const langPart = `${language ? `${language}/` : ''}`;
    return `${baseUrl}${docsPart}${langPart}${doc}`;
  }

  pageUrl(doc, language) {
    const baseUrl = this.props.config.baseUrl;
    return baseUrl + (language ? `${language}/` : '') + doc;
  }

  render() {
    return (
      <footer className="nav-footer" id="footer">
        <section className="sitemap" style={{marginBottom: '0'}}>
          <a href={this.props.config.baseUrl} className="nav-home">
            {this.props.config.footerIcon && (
              <img
                src={this.props.config.baseUrl + this.props.config.footerIcon}
                alt={this.props.config.title}
                width="66"
                height="58"
              />
            )}
          </a>
          <div>
            <h5>Networks</h5>
            <a href="https://github.com/gama-platform">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a href="https://www.facebook.com/GamaPlatform/" target="_blank">
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a href="https://twitter.com/gamaplatform" target="_blank">
              <i className="fab fa-twitter"></i> Twitter
            </a>
            <a href="https://www.linkedin.com/company/gama-platform" target="_blank">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
            <a href="https://www.youtube.com/channel/UCWJ1kWGDDI-9u2f2uD0gcaQ" target="_blank">
              <i className="fab fa-youtube"></i> Youtube
            </a>
            <a href="https://gama-platform.github.io/blog/feed" target="_blank">
              <i className="fa fa-rss"></i> Blog RSS
            </a>
          </div>
          <div style={{flexGrow: '2'}}>
            <h5>Mailing list</h5>
            <a href="https://groups.google.com/forum/#!forum/gama-platform" target="_blank">
          		<i className="fas fa-envelope"></i> For Users<br />
          		gama-platform@googlegroups.com
            </a>
            <a href="https://groups.google.com/forum/#!forum/gama-dev" target="_blank">
          		<i className="fas fa-envelope"></i> For Developers<br />
          		gama-dev@googlegroups.com
            </a>
          </div>
          <div style={{color: 'hsla(0,0%,100%,.4)', flexGrow: '3'}}>
            <h5>License</h5>
            <p>Copyright (C) - {this.props.config.copyright}.</p>
            <p>Permission is granted to copy, distribute and/or modify this document under the terms of the GNU Free Documentation License, Version 1.3 or any later version published by the Free Software Foundation; with no Invariant Sections, no Front-Cover Texts, and no Back-Cover Texts.</p>
            <p>A copy of the license is included <a href="https://github.com/gama-platform/gama/wiki/LICENSE.md" style={{display: 'initial'}}>here</a>, in the repository of the wiki content.</p>
          </div>
        </section>
      </footer>
    );
  }
}

module.exports = Footer;
