import React, { useState } from 'react';

const OverviewTab = () => {
  return (
    <>
      <div className="h4">
        What are Grapevine 'trust' scores
        <br />
        and how are they calculated?
      </div>
      <div style={{ textAlign: 'left', margin: '0px 10px 10px 10px' }}>
        <p>
          Grapevine 'trust' scores are used to determine how much weight to give
          to a given user in a given context, such as when calculating an
          average score.
        </p>
        <p>
          "Trust' is not quite accurate, but there is no perfect term for these
          scores, so it will have to suffice for now. You are welcome to come up
          with a better one! Ultimately, how we use these scores is more
          important than the terms we use to call them.
        </p>
        <p>
          A standard Grapevine trust score is transitive and contextual.
          Transitive means that if Alice trusts Bob in a given context, and Bob
          trusts Charlie in that context, then Alice indirectly trusts Charlie
          in that context. This is reflected in the trust score.
        </p>
        <p>How to calculate:</p>
        <p>
          Step 1: collect ratings, which take the form: Alice trusts Bob some
          number T between 0 and 100, with 100 indicating she considers Bob's
          trustworthiness to be equal to her own. (Note: in some cases T may
          have no upper limit. This allows Alice to say, effectively, that she
          trust's Bob's judgment more than her own. This introduces attack
          vectors which require several mitigation strategies, including the
          attenuation factor, alteration of default trust settings, adjustment
          of the "rigor" parameter and adjustment of the other parameters in the
          "Defense" tab.) Each rating also comes with confidence C between 0 and
          100 (100 = 100% confident). For binary attestations like the Follow
          button, defaults for each of these parameters is used, such as T=100
          and C = 80. If thumbs up and thumbs down bottons are used, T=0 may be
          used to indicate thumbs down.
        </p>

        <p>
          Step 2: For each user, calculate the average score of all ratings.
        </p>

        <p>(this section is not complete)</p>
      </div>
    </>
  );
};
export default OverviewTab;
