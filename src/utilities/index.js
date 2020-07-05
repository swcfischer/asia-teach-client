export function turnNullValuesToStrings(data) {
  const newDataObj = {};
  for (let key in data) {
    newDataObj[key] = data[key] ? data[key] : '';
  }
  return newDataObj;
}

export function compareTwoValues(firstObj, secondObj, keysToAvoid = []) {
  let isFormNotReady = false;
  for (let valueKey in firstObj) {
    if (keysToAvoid.includes(valueKey)) {
      continue;
    }
    if (!firstObj[valueKey]) {
      isFormNotReady = true;
    }

    if (firstObj[valueKey] !== secondObj[valueKey]) {
      isFormNotReady = true;
    }
  }
  return isFormNotReady;
}
