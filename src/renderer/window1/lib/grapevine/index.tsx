export const convertInputToCertainty = (input, rigor) => {
  const rigority = -Math.log(rigor);
  const fooB = -input * rigority;
  const fooA = Math.exp(fooB);
  const certainty = 1 - fooA;
  return certainty;
};

export const convertRatingToMod3Coeff = (r, s3, s4, s5) => {
  if (r < 1) {
    let mod3Coeff = 1;
    return mod3Coeff;
  }
  // console.log("r,s3,s4,s5,mod3Coeff: s4: "+ s4)
  const s3z = 1 / (1 - s3);
  let logRat = Math.log(r) / Math.log(s5);
  logRat = Math.abs(logRat);
  if (s4 > 0) {
    let logRatExp = Math.pow(logRat, s4);
  } else {
    let logRatExp = logRat;
  }
  let logRatExp = Math.pow(logRat, s4);
  let mod3Coeff = Math.pow(s3z, -logRatExp);
  // console.log("r,s3,s4,s5,mod3Coeff: "+r+" "+s3+" "+s4+" "+s5+" "+mod3Coeff)
  // console.log("r,s3,s4,s5,mod3Coeff: typeof s4: "+typeof s4)

  return mod3Coeff;
};
