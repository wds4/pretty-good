import { useSelector } from 'react-redux';
import CreateNewRating1 from './createNewRating1';
// import CreateNewRating2 from './createNewRating2';
// import CreateNewRating3 from './createNewRating3';
import CreateNewRating2Redo from './createNewRating2TopicSelector';
import CreateNewRating3Redo from './createNewRating3TopicSelector';
// import TopicSelector from './topicSelector';

const CuratedChannelsBox = ({pubkey, userData}) => {
  const isNostrGrapevineOn = useSelector(
    (state) => state.nostrSettings.nostrGrapevineSettings.active
  );

  if (isNostrGrapevineOn) {
    return (
      <>
        <div style={{ border: '1px solid purple', padding: '5px' }}>
          <div style={{ textAlign: 'center', color: 'grey' }}>
            Curated Channels stuff
          </div>

          <div style={{border: '1px dashed grey'}}>
            <div style={{ color: 'grey' }}>
              Endorse this user to curate the topic graph (accept topics & organize them into subcategories)
            </div>
            <div>
              <CreateNewRating1
                pubkeyFocusID={pubkey}
                userData={userData}
              />
            </div>
          </div>
          <div style={{border: '1px dashed grey'}}>
            <div>
              <div style={{ color: 'grey' }}>Endorse this user to associate content to a given topic (redo)</div>
              <div>
                <CreateNewRating2Redo
                  pubkeyFocusID={pubkey}
                  userData={userData}
                  selectorID="contentCuratorTopicSelector"
                />
              </div>
            </div>
          </div>
          <div style={{border: '1px dashed grey'}}>
            <div>
              <div style={{ color: 'grey' }}>Endorse this user as a content creator for a given topic (redo)</div>
              <div>
                <CreateNewRating3Redo
                  pubkeyFocusID={pubkey}
                  userData={userData}
                  selectorID="contentCreatorTopicSelector"
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return <></>;
};
export default CuratedChannelsBox;
