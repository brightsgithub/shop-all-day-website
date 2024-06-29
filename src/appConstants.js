const hostName = window.location.hostname; // Dynamically get the host name from the current environment
const serverUrl = `http://${hostName}:8080`; // Template literal for URL construction

export { serverUrl };
