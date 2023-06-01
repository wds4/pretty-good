import React from 'react';

const Faq = () => {
  const toggleAnswer = (event) => {
    const answerID = "curatedListFaqAnswerContainer_"+event.target.dataset.questionnumber;
    console.log("toggleAnswer; answerID: "+answerID)
    const e = document.getElementById(answerID)
    if (e) {
      const currentStatus = event.target.dataset.status;
      if (currentStatus == "closed") {
        e.style.display = "block";
        event.target.dataset.status = "open"
      }
      if (currentStatus == "open") {
        e.style.display = "none";
        event.target.dataset.status = "closed"
      }
    }
  }
  return (
    <>
      <div className="h2">FAQ</div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber = "1"
            data-status = "closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are new lists added?
          </div>
        </div>
        <div id="curatedListFaqAnswerContainer_1" className="curatedListFaqAnswerContainer" style={{display: 'none'}}>
          <p>Anyone can create a new list and sumbit it to the nostr network.</p>
          <p>To create a new list, navigate to the "create a new list" button on the left.</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber = "2"
            data-status = "closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are list items added?
          </div>
        </div>
        <div id="curatedListFaqAnswerContainer_2" className="curatedListFaqAnswerContainer" style={{display: 'none'}}>
          <p>Anyone can add an item to any list.</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber = "3"
            data-status = "closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How do item ratings work?
          </div>
        </div>
        <div id="curatedListFaqAnswerContainer_3" className="curatedListFaqAnswerContainer" style={{display: 'none'}}>
          <p>Anyone can endorse an item as either BELONGING or NOT BELONGING to a list.</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber = "4"
            data-status = "closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            What is a curator and how do I select them?
          </div>
        </div>
        <div id="curatedListFaqAnswerContainer_4" className="curatedListFaqAnswerContainer" style={{display: 'none'}}>
          <p>...</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber = "5"
            data-status = "closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are lists curated?
          </div>
        </div>
        <div id="curatedListFaqAnswerContainer_5" className="curatedListFaqAnswerContainer" style={{display: 'none'}}>
          <p>...</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber = "6"
            data-status = "closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are curator trust scores calculated?
          </div>
        </div>
        <div id="curatedListFaqAnswerContainer_6" className="curatedListFaqAnswerContainer" style={{display: 'none'}}>
          <p>...</p>
        </div>
      </div>
    </>
  );
}

export default Faq;
