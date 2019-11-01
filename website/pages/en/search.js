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

  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `

    `}} />
  );

  return (
    <div className="docMainWrapper wrapper">
      <Design />
      <Container className="mainContainer documentContainer postContainer">
        <h1>Please wait, work in progress...</h1>
      </Container>
    </div>
  );
}

module.exports = search;
