import { useSelector, useDispatch } from 'react-redux';

const ProfileManagement = () => {
  return (
    <>
      <div className="h2">Profile Management</div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">Multiple profiles</div>
        <div className="profileManagementFaqText">
          Pretty Good Apps automatically creates a new profile upon initial
          startup, but also allows you to manage as many profiles as you would
          like and to switch seamlessly from one to another.
        </div>
      </div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">
          Import your primary profile
        </div>
        <div className="profileManagementFaqText">
          Pretty Good Apps gives you the option to import your main profile that
          you created from an external client. To do this, you will need your
          private key, either in bech32 format (starts with npub) or hex format.
        </div>
      </div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">Shadow profiles</div>
        <div className="profileManagementFaqText">
          An alternative to downloading your primary profile would be to create
          a shadow profile. To do this, follow these steps:
          <li>
            find your profile (possibly using the search feature in the
            masthead)
          </li>
          <li>backup that profile (see below)</li>
          <li>
            create a new profile here, or use the one auto-created at startup
          </li>
          <li>import the backup of choice</li>
          <li>
            suggested convention: rename your cloned profile "clone of ..."
          </li>
        </div>
      </div>

      <div className="profileManagementFaqContainer">
        <div className="profileManagementFaqTitle">
          Profile backups and cloning
        </div>
        <div
          className="profileManagementFaqText"
          style={{ marginBottom: '10px' }}
        >
          Because Pretty Good Apps is experimental software, we recommend the
          use of a backup tool such as{' '}
          <a href="https://nostryfied.online" target="_blank" rel="noreferrer">
            Nostrified
          </a>{' '}
          prior to importing your profile to this app.
        </div>

        <div className="profileManagementFaqText">
          We are considering implementation of a tool to make it easy for you to
          clone a profile. This could be useful for setting up a shadow profile
          in Pretty Good Apps. Let us know if this is something you would like
          to see!
        </div>
      </div>
    </>
  );
};

export default ProfileManagement;
