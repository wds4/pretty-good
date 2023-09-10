import { secsToTime } from 'renderer/window1/lib/pg';

const CreatedAtCell = (props) => {
  const created_at = props.value.created_at;
  const howLongAgo = secsToTime(created_at);
  return (
    <>
      {howLongAgo} ago
    </>
  )
}
export default CreatedAtCell;
