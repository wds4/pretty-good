import React, { useState } from 'react';

const OverviewTab = () => {
  return (
    <>
      <div className="h4">
        What are Grapevine 'trust' scores and how are they calculated?
      </div>
      <div style={{ textAlign: 'left', margin: '0px 10px 10px 10px' }}>
        <p>
          Grapevine 'trust' scores are used to determine how much weight to give
          to a given user in a given context, such as when calculating an
          average score.
        </p>
        <p>
          "Trust' is not quite accurate, but there is no perfect descriptor for
          these scores, so it will have to suffice for now. You are welcome to
          come up with a better one! Ultimately, how we use them is more
          important than what we call them.
        </p>
        <p>
          A standard Grapevine trust score is transitive and contextual.
          Transitive means that if Alice trusts Bob in a given context, and Bob
          trusts Charlie in that context, then Alice indirectly trusts Charlie
          in that context. This is reflected in the trust score.
        </p>
        <p>(this section is not complete)</p>
      </div>
    </>
  );
};
export default OverviewTab;
