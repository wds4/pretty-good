import {
  noProfilePicUrl,
} from 'renderer/window1/const';

export const groups = {
  user: {
    shape: 'circularImage',
    image: noProfilePicUrl,
    brokenImage: noProfilePicUrl,
  },
  instance: {
    shape: 'box',
    color: 'red',
  },
  ratingOfInstance: {
    color: 'green'
  },
  legend: {
    color: '#EFEFEF',
    borderWidth: 0,
  },
}

export const options = {
  autoResize: true,
  clickToUse: false,
  interaction: { hover: true },
  physics: {
    enabled: true,
  },
  nodes: {
    margin: 10,
    borderWidth: 1,
    color: { background: '#FFFFFF', border: '#000000' },
    widthConstraint: {
      minimum: 0,
      maximum: 100,
    },
  },
  edges: {
    hoverWidth: 5,
    selectionWidth: 5,
    scaling: {
      min: 1,
      max: 10,
      label: {
        enabled: false,
        min: 14,
        max: 30,
      },
      customScalingFunction(min, max, total, value) {
        if (max === min) {
          return 0.5;
        }
        const scale = 1 / (max - min);
        return Math.max(0, (value - min) * scale);
      },
    },
    arrows: {
      to: {
        enabled: true,
        type: 'arrow',
      },
      middle: {
        enabled: false,
        type: 'arrow',
      },
      from: {
        enabled: false,
        type: 'circle', // or could do bar; however, it looks odd with arrowStrikethrough false
      },
    },
  },
  groups: groups,
};
