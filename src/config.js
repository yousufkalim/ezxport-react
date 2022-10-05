let baseUrl = 'https://ezxport-api-dev.falconweb.app/api';
let mediaUrl = 'http://localhost:5000/';

if (window.location.host === 'ezxport-dev.falconweb.app') {
  baseUrl = 'https://ezxport-api-dev.falconweb.app/api';
  mediaUrl = 'https://ezxport-api-dev.falconweb.app/';
} else if (window.location.host === 'ezxport-qa.falconweb.app') {
  baseUrl = 'https://ezxport-api-qa.falconweb.app/api';
  mediaUrl = 'https://ezxport-api-qa.falconweb.app/';
} else if (window.location.host === 'ezxport-staging.falconweb.app') {
  baseUrl = 'https://ezxport-api-staging.falconweb.app/api';
  mediaUrl = 'https://ezxport-api-staging.falconweb.app/';
} else if (window.location.host === 'ezxport-prod.falconweb.app/') {
  baseUrl = 'https://ezxport-api-prod.falconweb.app/api';
  mediaUrl = 'https://ezxport-api-prod.falconweb.app/';
}

module.exports = { baseUrl, mediaUrl };
