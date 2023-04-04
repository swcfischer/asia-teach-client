let backendPath;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendPath = "http://localhost:8888";
} else {
  backendPath = "https://historic-arches-33577.herokuapp.com";
}

export const API_ROOT = backendPath;
