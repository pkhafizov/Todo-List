export default function getBaseUrl() {
  if (typeof window === 'undefined') {
    return 'http://localhost:3001/';
  }
  const inDevelopment = window.location.hostname === 'localhost';
  return inDevelopment ? 'http://localhost:3001/' : '/';
}
