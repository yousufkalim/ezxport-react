let baseUrl = 'http://localhost:5000/api';
let mediaUrl = 'http://localhost:5000/';

if (window.location.host === 'app-staging.ezxport.com') {
  baseUrl = 'https://api-staging.ezxport.com/api';
  mediaUrl = 'https://api-staging.ezxport.com/';
} else if (window.location.host === 'app.ezxport.com') {
  baseUrl = 'https://api.ezxport.com/api';
  mediaUrl = 'https://api.ezxport.com/';
}

module.exports = { baseUrl, mediaUrl };
