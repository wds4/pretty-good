export const groupOptions = {
  user: {
    shape: 'circle',
    borderWidth: '3',
    color: {
      background: 'white',
      border: 'black',
    },
  },
};

export const edgeOptions = {
  follows: {
    polarity: 'forward',
    color: 'blue',
    width: '5',
    dashes: false,
    physics: true,
  },
};

function editEdgeFunction() {}
function deleteEdgeFunction() {}
function deleteNodeFunction() {}

export const options = {
  clickToUse: false,
  layout: {
    improvedLayout: false,
  },
  interaction: { hover: true },
  manipulation: {
    enabled: false,
  },
  physics: {
    enabled: true,
  },
  nodes: {
    margin: 10,
    borderWidth: 1,
    color: { background: 'white', border: 'black' },
    widthConstraint: {
      minimum: 0,
      maximum: 100,
    },
  },
  edges: {
    physics: false,
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 4,
      },
    },
  },
  groups: groupOptions,
};
