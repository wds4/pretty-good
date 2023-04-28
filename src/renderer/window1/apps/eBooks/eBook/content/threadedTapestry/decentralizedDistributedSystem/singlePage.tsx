import { useSelector } from 'react-redux';

const Content = () => {
  const oCurrentFocus = useSelector((state) => state.eBooks.currentFocus);
  const oEBooks = useSelector((state) => state.eBooks.eBooks);
  const oItemTypes = useSelector((state) => state.eBooks.itemTypes);

  const eBookSlug = oCurrentFocus.eBook;
  const itemSlug = oCurrentFocus.item;
  const versionSlug = oCurrentFocus.version;

  return (
    <>
      <div>
        The following assumptions are assumed to apply to a <i>decentralized, distributed system</i> requires:
        <li>
          Networks (subsets of the full set of entities) are often stable but in
          some cases may arise or dissolve quickly; may be highly dynamic, even
          fleeting. Networks can overlap and may have overlapping linguistic rules
          and vocabulary. They may also be divided into subnetworks requiring
          consensus on subsets of linguistic conventions.
        </li>
        <li>
          A bird's eye view of the system, or even any given network, may or may
          not not be available to any single entity.
        </li>
        <li>
          Any given language may require frequent, rapid, and detailed updates,
          even in the absence of any other changes to the system or network
          itself. Network function must be robust/resilient to minor changes or
          disagreements over linguistic rules.
        </li>
        <li>
          Decentralization: there is no entity with a presumed, guaranteed or
          prespecified authority to define, maintain, update, assert any such
          language.
        </li>
        <li>
          Specific entities may gain influence over the language by earning the
          respect (trust) of other entities. However, any influential entity today
          (e.g. standards or specifications committees, dev teams) may fall out of
          favor tomorrow, and network function must be resilient to this.
        </li>
        <li>
          Most linguistic rules and symbols are noncontroversial, but lack any
          obvious schelling point.
        </li>
        <li>
          Attention to language consensus rules requires (a probably small but
          nevertheless nontrivial amount of) cognitive / computational work. Not
          only the act of devising changes to the language, but also the effort
          required to gain influence over others in the network to implement those
          changes.
        </li>
      </div>
    </>
  );
};
export default Content;
