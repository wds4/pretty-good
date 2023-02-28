import { useSelector, useDispatch } from 'react-redux';
import { resetRunInitsCalledStatus } from 'renderer/window1/redux/features/startup/slice';

// export const initMyNostrProfile = () => async () => {
export const initMyNostrProfile = async () => {
// export const initMyNostrProfile = todoId => async dispatch => {
  // right now, fetchMyActiveNostrProfileFromSql does everything that needs to be done at this step;
  // future: might want to pull in tasks: create new profile if needed (i.e. first time starting up); init redux sture
  console.log("initMyNostrProfile about to call fetchMyActiveNostrProfileFromSql")
  // const oMyNostrProfileData = await fetchMyActiveNostrProfileFromSql(true);

};

export const runAllInitFxns = async () => {
  console.log("startup_fxn runAllInitFxns")
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

  return <>runInitsCalled: ={runInitsCalled}=</>;
}
