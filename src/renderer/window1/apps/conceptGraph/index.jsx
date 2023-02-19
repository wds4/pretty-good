import React from 'react';
import Masthead from '../../mastheads/cgMasthead';
import LeftNavbar1 from '../../navbars/leftNavbar1/cgNavbar';
import LeftNavbar2 from '../../navbars/leftNavbar2/emptyNavbar';
import { updateMainColWidth, updateMastheadCenter } from '../../lib/pg/ui';

export default class ConceptGraphHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    updateMainColWidth();
    const mastheadDescriptor = 'Concept Graph: Home';
    updateMastheadCenter(mastheadDescriptor);
  }

  render() {
    return (
      <>
        <div id="menuCol" className="menuCol">
          <LeftNavbar1 />
          <LeftNavbar2 />
        </div>
        <div id="mainCol">
          <Masthead />
          <div id="mainPanel">
            <div className="h3">What is the Concept Graph?</div>

            <p>
              The Concept Graph is a generalization of the notion of a{' '}
              <i>class</i> beyond any one particular programming language. It
              was designed specifically with the grapevine in mind. Together,
              the primary purpose of the Concept Graph and the Grapevine is to
              generate context-specific consensus on a means of communication --
              a language -- without the need for any centralized entity like a
              tech company or a standards body, and to do so quickly,
              efficiently and effectively.
            </p>

            <p>
              Although they sometimes go by a different name, most object
              oriented programming languages make use of <i>classes</i>.
              Generally speaking, a class is used to define, organize, and
              create chunks of data called <i>objects</i>. For example: a class
              called User could be used to create an object file with
              information about Alice, another object for Bob, etc. The class
              definition might tell us that there should be a field called name
              which is a string, a field called created_at which is an integer,
              etc. Depending on the programming language in question, other
              things like methods might also be included in the class
              definition.
            </p>

            <p>
              In the Concept Graph, data is represented as a graph, with nodes
              representing chunks of data, and edges representing various types
              of relationships between the data. (Footnote: Each chunk of data
              will typically be a JSON object file, although in principle it can
              be anything -- an xml file, a chunk of code, an image, or even
              something that's not even digital, like a book.) See this figure
              for an example. Although any type of relationship can be conceived
              of, we will find that a small handful of special relationship
              types are adequate to do two things: first and most importantly,
              to define the basic structure of an individual concept; second, to
              define a few basic ways that different concepts can relate to one
              another.
            </p>

            <p>[figure]</p>

            <p>
              The central organizing principle of the Concept Graph is a special
              type of pathway through the graph, defined by a special sequence
              of particular <i>relationship types</i>, along with an associated{' '}
              <i>rule</i> that must be obeyed for the graph to be considered
              valid. According to this rule, wherever this special type of
              pathway exists within the graph, the node at the beginning of the
              pathway must tell us <i>something useful</i> about the node at the
              end of the pathway. Usually (although not always), this means that
              the node at the beginning tells us something about the{' '}
              <i>format</i> of the node at the end. It does not have to provide
              a complete formatting specification, and there can be (usually
              are) multiple paths carrying formatting information to any given
              node.
            </p>
            <p>
              In the example above, two such pathways can be seen. The node at
              the beginning tells us that each of the nodes at the end ought to
              have a field called name which is a string and a field called
              created_at which is an integer. The collection of all paths
              emanating from a single node defines a concept; in this case, the
              concept of User.
            </p>
            <p>
              With this example, hopefully it is evident that a <i>concept</i>{' '}
              plays a role very similar to a <i>class</i> in object-oriented
              programming. In effect, we have taken the notion of a class and
              simply used a graph to represent the class (User) as well as all
              of its instances (Alice and Bob).
            </p>

            <div className="h4">Why represent data using graphs?</div>

            <p>
              A small handful of basic mathematical operators can be used to
              create, edit, and combine graphs in ways that are independent of
              any specific programming language. At the most basic level, any
              graph can be created with operators to add or remove individual
              nodes or edges. The union operator can be used to combine two
              graphs to make a third. More complex operators can be devised for
              a variety of applications. (Footnote: Indeed: all of mathematical
              physics can be built using the axioms of set theory as a starting
              point, as presented for example in this wonderful{' '}
              <a
                href="https://www.youtube.com/playlist?list=PLPH7f_7ZlzxTi6kS4vCmv4ZKm9u8g5yic"
                target="_blank"
                rel="noreferrer"
              >
                series of lectures
              </a>{' '}
              by Frederic Schuller.)
            </p>

            <p>
              The universality of these basic mathematical operators makes a
              graph ideally suited to organize information that will be
              manipulated by a decentralized web of trust. When paired with the
              grapevine, a database can be effectively crowdsourced by
              individuals who may or may not agree on their choice of language
              or platform. As long as they can agree to use the common language
              of mathematics -- set theory, to be precise -- they have a
              starting point from which to generate consensus.
            </p>
          </div>
        </div>
      </>
    );
  }
}
