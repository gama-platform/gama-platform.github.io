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

var data = require('json!../../../faq.json');

const FAQ = ({faqs}) => {
  // Quick, hacky way to set key.
  // More on keys in React https://facebook.github.io/react/docs/lists-and-keys.html#keys
  let key = 1;
  const questionsAndAnswers = faqs.map(child =>
    <div class="accordion-item" key={key++}>
      <a>{child.question}</a>
      <div class="content"><p dangerouslySetInnerHTML={{ __html: child.answer}}/></div>
    </div>
  );

  return (<div class="accordion">{questionsAndAnswers}</div>);
};

class FAQs extends React.Component {
  render() {
      return(
        <div>
          <FAQ faqs={data.faq}/>
        </div>
      )
    }
}

function displayFAQ(props) {
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

      .accordion a {
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
    `}} />
  );

  return (
    <div className="docMainWrapper wrapper">
      <Design />
      <Container className="mainContainer documentContainer postContainer">
        <div className="post">
          <header className="postHeader">
            <h1>Frequently Asked Questions</h1>
          </header>
          <p>You will find here almost all the answers for your most current questions !</p>

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

module.exports = displayFAQ;
