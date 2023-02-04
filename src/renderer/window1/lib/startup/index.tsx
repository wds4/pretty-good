import { useSelector, useDispatch } from 'react-redux';
import { fetchMyActiveNostrProfileFromSql } from '../pg/sql';
import { resetRunInitsCalledStatus } from '../../redux/features/startup/slice';
import { fetchMyProfile } from '../../redux/features/nostr/myNostrProfile/slice';

/*
export const fetchTodoById = todoId => async dispatch => {
  dispatch(resetRunInitsCalledStatus(true))
}
*/
// export const initMyNostrProfile = () => async () => {
export const initMyNostrProfile = async () => {
// export const initMyNostrProfile = todoId => async dispatch => {
  // right now, fetchMyActiveNostrProfileFromSql does everything that needs to be done at this step;
  // future: might want to pull in tasks: create new profile if needed (i.e. first time starting up); init redux sture
  console.log("initMyNostrProfile about to call fetchMyActiveNostrProfileFromSql")
  const oMyNostrProfileData = await fetchMyActiveNostrProfileFromSql(true);
  /*
  // if empty, create new profile and save it as active in sql
  if (!oMyNostrProfileData) {
    console.log(
      `startup_fxn initMyNostrProfile; oMyNostrProfileData is empty! oMyNostrProfileData: ${JSON.stringify(
        oMyNostrProfileData,
        null,
        4
      )}`
    );
  } else {
    console.log(
      `startup_fxn initMyNostrProfile; oMyNostrProfileData is not empty! oMyNostrProfileData: ${JSON.stringify(
        oMyNostrProfileData,
        null,
        4
      )}`
    );
  }
  */
};

export const initMiscGlobalVars = () => {
  console.log("startup_fxn initMiscGlobalVars")
};

export const setGrapevineDefaults = () => {
  console.log("startup_fxn setGrapevineDefaults")
};

export const runAllInitFxns = async () => {
  console.log("startup_fxn runAllInitFxns")
  initMiscGlobalVars() // not written; may deprecate
  setGrapevineDefaults() // not yet written; may deprecate
  await initMyNostrProfile()
};

export default function RunAllInitFxns() {
  const runInitsCalled = useSelector((state) => state.startup.runInitsCalled);
  const dispatch = useDispatch();

  console.log("startup_fxn runAllInitFxns; runInitsCalled: "+runInitsCalled)
  if (!runInitsCalled) {
    runAllInitFxns(); // this should get called every time on startup
    dispatch(resetRunInitsCalledStatus(true))
  }

  dispatch(fetchMyProfile()) // loads myNostrProfile in redux store from sql

  return <>runInitsCalled: ={runInitsCalled}=</>;
}
