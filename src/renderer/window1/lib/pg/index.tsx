export const timeout = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const cloneObj = (obj: object) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isValidObj = (x) => {
  // test if the input is a string that converts into JSON
  try {
    const obj1 = JSON.parse(x);
    return true;
  } catch (e1) {}

  // test if the input is already an object
  try {
    const obj2 = JSON.parse(JSON.stringify(x));
    return true;
  } catch (e2) {}

  return false;
};

export const secsToTime = (secs: number) => {
  let displayTime = '--';
  const currentTime = Math.floor(Date.now() / 1000);
  const ageSecs = currentTime - secs;
  const ageMins = Math.floor(ageSecs / 60);
  const ageHours = Math.floor(ageSecs / (60 * 60));
  const ageDays = Math.floor(ageSecs / (60 * 60 * 24));
  const ageYears = Math.floor(ageSecs / (60 * 60 * 24 * 365));
  let discoveredUnit = false;
  if (!discoveredUnit && ageSecs < 60) {
    // if less than one minute,
    // display in seconds
    displayTime = `${ageSecs} s`;
    discoveredUnit = true;
  }
  if (!discoveredUnit && ageSecs < 60 * 60) {
    // if less than one hour,
    // display in minutes
    displayTime = `${ageMins} m`;
    discoveredUnit = true;
  }
  if (!discoveredUnit && ageSecs < 24 * 60 * 60) {
    // if less than one day,
    // display in hours
    displayTime = `${ageHours} h`;
    discoveredUnit = true;
  }
  if (!discoveredUnit && ageSecs < 365 * 24 * 60 * 60) {
    // if less than one year,
    // display in days
    displayTime = `${ageDays} d`;
    discoveredUnit = true;
  }
  if (!discoveredUnit) {
    // else display in years
    displayTime = `${ageYears} y`;
    discoveredUnit = true;
  }

  return displayTime;
};

export const addStringToArrayUniquely = (str, aIn) => {
  const aOut = [str];
  aIn.forEach((element) => {
    if (!aOut.includes(element)) {
      aOut.push(element);
    }
  });
  return aOut;
}

export const removeStringFromArray = (str, aIn) => {
  const aOut = [];
  aIn.forEach((element) => {
    if (str != element) {
      aOut.push(element);
    }
  });
  return aOut;
}
