import { useDispatch } from 'react-redux';
import { setCurrentPage } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Faq = () => {
  const dispatch = useDispatch();
  dispatch(setCurrentPage('curatedListsFaq'));
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

      <br />

      <div className="h4">General Questions</div>

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

      <div className="h4">relationship to nostr</div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="101"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            Does Pretty Good Apps use nostr?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_101"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          Yes, it does. Lists, list items, and ratings are packaged into notes
          and published over nostr.
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="101b"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            What NIPs are utilized by Pretty Good Apps? (also what kinds and
            what tag system?)
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_101b"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          The ones of note are:{' '}
          <a
            href="https://github.com/nostr-protocol/nips/blob/master/16.md"
            target="_blank"
            rel="noreferrer"
          >
            NIP-16: Event Treatment
          </a>{' '}
          and{' '}
          <a
            href="https://github.com/nostr-protocol/nips/blob/master/33.md"
            target="_blank"
            rel="noreferrer"
          >
            NIP-33: Parameterized Replaceable Events
          </a>
          <p>
            Regular events are used for publication of lists and list items;
            specifically, kinds 9900 - 9999. Kind 9901 is currently being used
            for testnet-1.
          </p>
          <p>
            Replaceable events are used for ratings (endorsements of users as
            curators and endorsements of list items); speficically, kinds
            39900-39999. Kind 39901 is currently being used in testnet-1.
          </p>
          <p>
            Potentially, a NIP could be created to reserve the above numbers.
            However, it may not be necessary to add a NIP.
          </p>
          <p>
            A tag system is also being developed. See:{' '}
            <a
              target="_blank"
              href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/101.md"
              rel="noreferrer"
            >
              DIP-101: publication of a word over nostr
            </a>{' '}
            and{' '}
            <a
              target="_blank"
              href="https://github.com/wds4/DCoSL/blob/main/dips/conceptGraph/101.md"
              rel="noreferrer"
            >
              DIP-200: publication of an attestation over nostr
            </a>
            . (These are subject to change.)
          </p>
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="102"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            Does DCoSL require nostr?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_102"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          No, not necessarily. Most DIPs are completely independent of nostr,
          other than the few which outline publication of words (DIP-101) and ratings (DIP-200) over
          nostr. Other DIPs could certainly be created for publication of words
          and ratings in a nostr-independent fashion.
        </div>
      </div>

      <div className="curatedListsFaqContainer">
        <div className="curatedListsFaqButtonAndQuestionContainer">
          <button
            type="button"
            className="curatedListsFaqButton"
            data-questionnumber="103"
            data-status="closed"
            onClick={(e) => toggleAnswer(e)}
          >
            +
          </button>
          <div className="curatedListsFaqQuestionContainer">
            Does Pretty Good Apps use NIP-51?
          </div>
        </div>
        <div
          id="curatedListFaqAnswerContainer_103"
          className="curatedListFaqAnswerContainer"
          style={{ display: 'none' }}
        >
          <p>
            No, it does not.{' '}
            <a
              href="https://github.com/nostr-protocol/nips/blob/master/51.md"
              target="_blank"
              rel="noreferrer"
            >
              NIP-51
            </a>{' '}
            allows users to create and publish various lists to the nostr
            network, but does not provide a method to <i>curate</i> those lists
            from multiple sources.
          </p>
          <p>
            Suppose one wanted to use NIP-51 to curate a list of "trolls" from
            multiple sources. Could that be done? Yes, but with several issues.
            One could, for example, cycle through one's follow list, find
            everyone who publishes a list called "troll," and compile them all
            together into one big list. This might be useful, but there would be
            several issues, all of which are handled better (I think) by DCoSL:
            <li>
              What if different users have different ideas of what constitutes a
              troll? With DCoSL, multiple lists can exist, all called "troll,"
              but each with its own definition of troll (in the description
              field).
            </li>
            <li>
              What if you don't necessarily trust your follow list to point out
              the trolls? These are not the same thing. Not even close. DCoSL
              allows you to distinguish users whom to want to follow from users
              whom you trust in any given context.
            </li>
            <li />
          </p>
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
