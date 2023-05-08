import { Link } from 'react-router-dom';

const ActionButtons = ({ event }) => {
  // var randomNumber = Math.random();
  if (!window.linkToReply_base) {
    window.linkToReply_base = 'Reply';
  }
  // const linkToReply = `/${window.linkToReply_base}/${event.id}`;
  const linkToReply = `/NostrHome/NostrThread`;
  return (
    <>
      <div style={{ fontSize: '18px' }}>
        <span className="singleActionButtonContainer">
          <Link
            className="eventContentContainer"
            to={linkToReply}
            event={event}
          >
            &#x1F4AC;
          </Link>
        </span>
      </div>
    </>
  );
};
export default ActionButtons;
