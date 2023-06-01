import React from 'react';

const Faq = () => {
  const toggleAnswer = (event) => {
    const answerID = `curatedListFaqAnswerContainer_${event.target.dataset.questionnumber}`;
    console.log(`toggleAnswer; answerID: ${answerID}`);
    const e = document.getElementById(answerID);
    if (e) {
      const currentStatus = event.target.dataset.status;
      if (currentStatus == 'closed') {
        e.style.display = 'block';
        event.target.dataset.status = 'open';
      }
      if (currentStatus == 'open') {
        e.style.display = 'none';
        event.target.dataset.status = 'closed';
      }
    }
  };
  return (
    <>
      <div className="h2">FAQ</div>

      <div className="h4">General</div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="1"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are new lists added?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_1"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>
            Anyone can create a new list and sumbit it to the nostr network.
          </p>
          <p>
            To create a new list, navigate to the "create a new list" button on
            the left.
          </p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="2"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are list items added?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_2"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>Anyone can add an item to any list.</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="3"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            What are the different ways to leave ratings?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_3"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <div>ITEMS:</div>
          <p>
            Anyone can endorse an item as either BELONGING or NOT BELONGING to a
            particular list.
          </p>
          <div>CURATORS:</div>
          <p>
            Anyone can endorse a user as either TRUSTED or NOT TRUSTED to be a
            curator of a particular list.
          </p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="4"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            What are curators and how do I select them?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_4"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>
            Curators are other users who help to curate your lists for you. They
            do this by endorsing items as either belonging or not belonging to
            the list to which it has been submitted. The amount of influence
            that any given user has on any given list is determined by
            endorsements of those users as curators.
          </p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="4b"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are sybil attacks mitigated?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_4b"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>
            Multiple strategies. Multiple parameters, adjustable by the end user
            along a continuum of restrictive versus permissive. Each of these
            parameters has a default setting that is anticipated to work in most
            settings.
          </p>

          <p>
            (list here, but also see below)
            <li>Default user trust scores</li>
            <li>Attenuation factor</li>
            <li>...</li>
          </p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="4c"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            Does this rating system take context into account?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_4c"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>Yes! (explanation in progress)</p>
        </div>
      </div>

      <div className="h4">Calculations</div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="5"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are items partitioned into the ACCEPTED, REJECTED, or PENDING
            bins?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_5"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>...</p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="6"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            How are curator trust scores calculated?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_6"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>...</p>
        </div>
      </div>
    </>
  );
};

export default Faq;
