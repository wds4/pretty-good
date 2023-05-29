import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateCuratedListFocus } from 'renderer/window1/redux/features/prettyGood/settings/slice';

const Header = ({ oListData }) => {
  const dispatch = useDispatch();
  let name_singular = '';
  let name_plural = '';
  let title_singular = '';
  let title_plural = '';
  let slug_singular = '';
  let slug_plural = '';
  let description = '';
  let oWord = {};
  let sqlID = '';
  let oEvent = {};

  let pubkey = '';
  let event_id = '';
  let propertyPath = '';
  let sEvent = '';

  if (oListData) {
    pubkey = oListData.pubkey;
    event_id = oListData.event_id;
    sqlID = oListData.id;

    sEvent = oListData.event;
    if (sEvent) {
      oEvent = JSON.parse(sEvent);
      const sWord = oEvent.content;

      oWord = JSON.parse(sWord);
      if (oWord.nostrCuratedListData) {
        if (oWord.nostrCuratedListData.name) {
          name_singular = oWord.nostrCuratedListData.name?.singular;
          name_plural = oWord.nostrCuratedListData.name?.plural;
        }
        if (oWord.nostrCuratedListData.title) {
          title_singular = oWord.nostrCuratedListData.title?.singular;
          title_plural = oWord.nostrCuratedListData.title?.plural;
        }
        if (oWord.nostrCuratedListData.slug) {
          slug_singular = oWord.nostrCuratedListData.slug?.singular;
          slug_plural = oWord.nostrCuratedListData.slug?.plural;
        }
        if (oWord.nostrCuratedListData.description) {
          description = oWord.nostrCuratedListData?.description;
        }
        if (oWord.nostrCuratedListData.propertyPath) {
          propertyPath = oWord.nostrCuratedListData?.propertyPath;
        }
      }
    }
  }

  return (
    <>
      <div
        className="h4"
        style={{ marginBottom: '10px', position: 'relative' }}
      >
        <div style={{ color: 'purple', fontSize: '32px' }}>
          <NavLink
            onClick={() => {
              dispatch(updateCuratedListFocus(event_id));
            }}
            end
            to="/CuratedListsHome/SingleListGraphOfInstances"
            style={{ textDecoration: 'none' }}
          >
            {name_plural}
          </NavLink>
        </div>

        <div style={{position: 'absolute', left: '10px', top: '10px', fontSize: '10px', textAlign: 'left'}}>
          CURATION OF<br/>
          THE LIST OF:
        </div>

        <div style={{ display: 'none', position: 'absolute', right: '5px', top: '0px' }}>
          <NavLink
            onClick={() => {
              dispatch(updateCuratedListFocus(event_id));
            }}
            end
            to="/CuratedListsHome/SingleListGraphOfInstances"
            style={{ textDecoration: 'none' }}
          >
            <div
              className="curatedListMainPageLink"
              style={{  }}
            >
              VIEW WEB of TRUST
            </div>
          </NavLink>
        </div>

        <div
          style={{
            maxHeight: '100px',
            scroll: 'auto',
            fontSize: '14px',
            padding: '5px',
            margin: '5px',
            textAlign: 'left',
            color: 'grey',
          }}
        >
          {description}
        </div>
      </div>
    </>
  );
};

export default Header;
