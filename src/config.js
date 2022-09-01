baseUrl = 'http://localhost:5000/api/';
if (window.location.host === 'ezxport-dev.falconweb.app') {
  baseUrl = 'https://ezxport-api-dev.falconweb.app/api/';
} else if (window.location.host === 'ezxport-qa.falconweb.app') {
  baseUrl = 'https://ezxport-api-qa.falconweb.app/api/';
} else if (window.location.host === 'ezxport-staging.falconweb.app') {
  baseUrl = 'https://ezxport-api-staging.falconweb.app/api/';
} else if (window.location.host === 'ezxport-prod.falconweb.app/') {
  baseUrl = 'https://ezxport-api-prod.falconweb.app/api/';
}

module.exports = { baseUrl, url };
