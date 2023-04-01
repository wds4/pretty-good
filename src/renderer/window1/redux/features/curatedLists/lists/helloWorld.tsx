import { useSelector } from 'react-redux';

export default function CuratedLists() {
  const curatedLists = useSelector((state) => state.curatedLists);

  return (
    <div className="reduxStoreOverviewContainer">
      <div className="h4">curatedLists</div>
      <div style={{fontSize:'10px'}}>{JSON.stringify(curatedLists,null,4)}
      </div>
    </div>
  );
}
