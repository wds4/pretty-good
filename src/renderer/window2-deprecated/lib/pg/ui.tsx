export const updateMainColWidth = () => {
  const menuColWidth = document.getElementById('menuCol').offsetWidth;
  const rootWidth = document.getElementById('root').offsetWidth;
  const newWidth = rootWidth - menuColWidth - 4;
  document.getElementById('mainCol').style.width = newWidth + 'px';
};

export const updateMastheadCenter = (mastheadDescriptor) => {
  const e = document.getElementById('mastheadCenterContainer');
  if (e) {
    e.innerHTML = mastheadDescriptor;
  }
};
