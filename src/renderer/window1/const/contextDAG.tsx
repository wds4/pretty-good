/*
For now, each node in this context DAG is identified by its slug.

Eventually, we will use a hash of some sort rather than a slug to id each node, to solve two problem scenarios:
- One meaning, many slugs:
  Users who speak different languages may wish to use the same node (same meaning, same relationships to other nodes)
  but may not agree on the language for the slug.
-  One slug, many meanings:
  claim to the same slug but have different ideas on what it means.

When leaving a rating or calculating composite trust scores, you MUST specify a node within the contextDAG.
OPTIONAL: specify the inheritance pathway through the tree.

Example: there are multiple pathways to the node "dramas"; one through "writing", one through "critiquing"
Alice may wish to endorse Bob as good at writing dramas, but not good at rating them, or vice versa.
However, at the time Alice leaves her rating, she may or may not have access to the same context DAG as another user.
Therefore, the full path cannot be an absolute requirement. If she endorses someone without specifying the path,
then her endorsement may be ambiguous from my perspective; and I may choose to rely upon it only in the absence of
better information (i.e. where the path is specified).

WHEN CALCULATING A COMPOSITE TRUST SCORE:
must specify the NODE within the contextDAG;
must also specify any path requirements (CAN BE EMPTY SET), which is an (ordered) list of contextDAG nodes through which the inheritance path must tranverse (in that order).
*/
let n=0;
export const contextDAG = [];

contextDAG[n] = [
  ["purpose_all","purpose_attention"],
  ["purpose_all","purpose_believe"],
  ["purpose_all","purpose_nostrRelays"],
  ["purpose_all","purpose_ontology"],
  ["purpose_all","purpose_advice"],
];
n++;

contextDAG[n] = [
  ["movies","dramas"],
  ["movies","westerns"],
  ["movies","comedies"],
  ["movies"],"scienceFiction",
]
n++;

contextDAG[n] = [
  ["authoredContent","entertainment"],
  ["authoredContent","technology"],
  ["authoredContent","economics"],
]
n++;
