function getCities() {
  const citiesJson = [];
  document.querySelectorAll('tr td:nth-child(2) a').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return JSON.stringify(citiesJson);
}
function getCitiesChina() {
  const citiesJson = [];
  document.querySelectorAll('#cities tr td:nth-child(1) a').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return citiesJson;
}
function getCitiesThailand() {
  const citiesJson = [];
  document.querySelectorAll('tr td:nth-child(2) a').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return citiesJson;
}
function getCitiesVietnam() {
  const citiesJson = [];
  document.querySelectorAll('tr td:nth-child(1) a').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return citiesJson;
}

function getCitiesTaiwan() {
  const citiesJson = [];
  document.querySelectorAll('tr td:nth-child(3) a').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return citiesJson;
}

function getCitiesIndonesia() {
  const citiesJson = [];
  document.querySelectorAll('tr td:nth-child(2) a').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return citiesJson;
}

function getCitiesJapan() {
  const citiesJson = [];
  document.querySelectorAll('tr td:nth-child(2) b').forEach(el => {
    const text = el.innerHTML;
    citiesJson.push({ label: text, value: text });
  });
  return citiesJson;
}
