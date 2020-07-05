let backendPath;

const hostname = window && window.location && window.location.hostname;

if (hostname === 'localhost') {
  backendPath = '';
} else {
  backendPath = '';
}

export const API_ROOT = backendPath;
