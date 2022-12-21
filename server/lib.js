var config = require('/var/.props/.cfg.json');

function getConfigValue(configAttributeName, defaultVal, returnAsInt) {
  ret = null;

  if (!process.env[configAttributeName]) {
    ret = config[configAttributeName];
  } else {
    ret = process.env[configAttributeName];
  }

  return ret;
}

module.exports = { getConfigValue };