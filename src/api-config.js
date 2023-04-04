let backendPath;

const hostname = window && window.location && window.location.hostname;

if (hostname === "localhost") {
  backendPath = "http://localhost:8888";
} else {
  backendPath = "https://asia-teach-backend.onrender.com";
}

export const API_ROOT = backendPath;
