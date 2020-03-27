/**
 * Copyright (c) 2019-present, Arthur Brugiere, GAMA-Platform
 *
 * This source code is licensed under the GPL3 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const CompLibrary = require('../../core/CompLibrary.js');
const MarkdownBlock = CompLibrary.MarkdownBlock;

const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

var dataMD = require("../../../../../covid19.md");

function displayFAQ(props) {
  const {config: siteConfig} = props;

  const FlexContainer = props => (<div className="gridBlock">{props.children}</div>);

  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `
      img {
        display: block;
        margin-left: auto;
        margin-right: auto;
      }
    `}} />
  );

  return (
    <div className="docMainWrapper wrapper">
      <Design />
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>CoViD19</h1>
          </header>
          
          <FlexContainer>

          <div class="content">
            <MarkdownBlock>
              {dataMD}
            </MarkdownBlock>
          </div>

          </FlexContainer>

        </div>
      </Container>
    </div>
  );
}

module.exports = displayFAQ;
