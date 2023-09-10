export const updateMainColWidth = () => {
  const menuColWidth = document.getElementById('menuCol').offsetWidth;
  const innerWidth = window.innerWidth;
  const newWidth = innerWidth - menuColWidth - 4;
  document.getElementById('mainCol').style.width = newWidth + 'px';
  /*
  const e1 = document.getElementById('body');
  e1.style.width = innerWidth+"px";
  const e2 = document.getElementById('root');
  e2.style.width = innerWidth+"px";
  const rootWidth = document.getElementById('root').offsetWidth;
  const rootStyleWidth = document.getElementById('root').style.width;
  const bodyWidth = document.getElementById('body').offsetWidth;
  const bodyStyleWidth = document.getElementById('body').style.width;
  console.log("QWERTY; newWidth: "+newWidth+"; innerWidth: "+innerWidth+"; rootWidth: "+rootWidth+"; rootStyleWidth: "+rootStyleWidth+"; bodyWidth: "+bodyWidth+"; bodyStyleWidth: "+bodyStyleWidth+"; menuColWidth: "+menuColWidth);
  */
};

export const updateMastheadCenter = (mastheadDescriptor) => {
  const e = document.getElementById('mastheadCenterContainer');
  if (e) {
    e.innerHTML = mastheadDescriptor;
  }
};
