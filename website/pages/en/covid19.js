/**
 * Copyright (c) 2020-present, Arthur Brugiere, GAMA-Platform
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

const FAQ = ({question, answer, subSection = false}) => {
  return (
    <div class="accordion-item">
      <a dangerouslySetInnerHTML={{ __html: question}}/>
      <div class="content">
        <MarkdownBlock>
          {answer}
        </MarkdownBlock>
      </div>
    </div>
  );
};

class FAQs extends React.Component {
  renderFaq(qaArray) {
      var result = [];

      for (var i = 0; i < qaArray.length; i++) {
        var q = qaArray[i].match(/^\#.*/gm);
        if (q != null){

          var faqQuestion = q[0];
          var faqAnswer = qaArray[i].replace(q[0],'')

          if ( faqAnswer.split("##").length > 1 ){

            result.push(<MarkdownBlock>{faqQuestion}</MarkdownBlock>);
            result.push(<MarkdownBlock>{faqAnswer.split("##")[0]}</MarkdownBlock>);
      
            for (var j = 1; j <= faqAnswer.split("##").length - 1; j++) {
              if (faqAnswer.split("##")[j].replace(/\s/g, '') != "")
                result.push(<FAQ question={faqAnswer.split("##")[j].split("\n")[0]} answer={faqAnswer.split("##")[j].replace(faqAnswer.split("##")[j].split("\n")[0], "")}/>);
            }
      
          }else{
            result.push(<MarkdownBlock>{qaArray[i]}</MarkdownBlock>);
          }

        }
      }
      
      return result;
  }

  render() {
      return(
        <div class="accordion">
          { this.renderFaq(dataMD.split("---")) }
        </div>
      )
    }
}

function displayPage(props) {
  const {config: siteConfig} = props;

  const FlexContainer = props => (<div className="gridBlock">{props.children}</div>);

  const Design = props => (    
    <style dangerouslySetInnerHTML={{__html: `
      .container {
        display:  inline-flex;
        align-items: center;
      }
      a.disabled {
        pointer-events: none;
      }

      .accordion > .accordion-item > a {
        position: relative;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
        width: 100%;
        padding: 1rem 3rem 1rem 1rem;
        color: #7288a2;
        font-size: 1.15rem;
        font-weight: 400;
        border-bottom: 1px solid #e5e5e5;
      }

      .accordion a:hover {
        cursor: pointer;
        color: #3670A0;
      }

      .accordion a.active {
        color: #3670A0;
        border-bottom: 1px solid #3670A0;
      }

      .accordion .content {
        opacity: 0;
        padding: 0 1rem;
        max-height: 0;
        border-bottom: 1px solid #e5e5e5;
        overflow: hidden;
        clear: both;
        -webkit-transition: all 0.2s ease 0.15s;
        -o-transition: all 0.2s ease 0.15s;
        transition: all 0.2s ease 0.15s;
      }

      .accordion .content p {
        font-size: 1rem;
        font-weight: 300;
      }

      .accordion .content.active {
        opacity: 1;
        padding: 1rem;
        max-height: 100%;
        -webkit-transition: all 0.35s ease 0.15s;
        -o-transition: all 0.35s ease 0.15s;
        transition: all 0.35s ease 0.15s;
      }

      img, iframe {
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
            <h1 id="covid19">CoViD19</h1>
          </header>
          <p>IRD, the GAMA developers and their partners in Vietnam are collaborating to support Vietnamese authorities in fighting and containing the COVID-19 pandemics.</p>
          
          <FlexContainer>

            <FAQs/>

          <script type="text/javascript" dangerouslySetInnerHTML={{__html: `
            const items = document.querySelectorAll(".accordion a");

            function toggleAccordion(){
              this.classList.toggle('active');
              this.nextElementSibling.classList.toggle('active');
            }

            items.forEach(item => item.addEventListener('click', toggleAccordion));
           `}} />
          </FlexContainer>
        </div>
      </Container>
    </div>
  );
}

module.exports = displayPage;
