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
        The <i>neuronal tapestry model</i> (a.k.a. the{' '}
        <i>cortical tapestry model</i>) is the hypothesis that knowledge
        representation and curation in the central nervous system, in particular
        the cerebral cortex, follow the{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('threadedTapestry'));
          }}
        >
          threaded tapestry
        </div>{' '}
        model.
      </div>
      <p>
        The{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('primaryProblem'));
          }}
        >
          central challenge
        </div>{' '}
        of{' '}
        <div
          className="eBookHyperlink"
          onClick={() => {
            dispatch(updateCurrentItemFocus('decentralizedDistributedSystem'));
          }}
        >
          decentralized, distributed systems
        </div>{' '}
        applies to decentrlaized web: billions of people, millions of
        developers, thousands of platforms, standards bodies, etc. None of them
        with any permanent or guarantted authority over the others. This problem
        also applies to the central nervous system, in particular, the cerebral
        cortex: of neurons, of cortical columns (specialized groups of neurons
        arranged into functional units); which neuron is in charge? Which groups
        of neurons? None of them are in charge of the others. And yet, they form
        into coordinated networks. They communicate from one to another.
        Communication requires consensus on a language; no different than the
        decentralized web. I propose that the threaded tapestry model is the
        solution we need for the decentralized web. I speculate this solution
        may already be at work in the CNS.
      </p>
      <p>
        Candidate for data chunks: cortical columns. Edges in the graph: axonal
        projections.
      </p>
      <p>
        Analogue of the grapevine in the cortex. Value-rich threads, connect to
        the limbic system. Dunbar's number.
      </p>
      <p>
        REM sleep: recalibration of the cortical grapevine and value assessments.
        Non-REM sleep: recalibration of the concept graph. Data that small world properties
        are reset during sleep.
      </p>
    </>
  );
};
export default Content;
