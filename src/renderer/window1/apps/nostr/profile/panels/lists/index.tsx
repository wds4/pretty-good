import AllLists from "./allLists";
import Kind10000Lists from './kind10000Lists';
import Kind10001Lists from './kind10001Lists';
import Kind30000Lists from './kind30000Lists';
import Kind30001Lists from './kind30001Lists';

const Lists = ({pubkey}) => {
  return (
    <>
      <AllLists pubkey={pubkey} />
    </>
  );
};

export default Lists;
