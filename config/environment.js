var _ = require('lodash');

var localEnvVars = {
  TITLE:       'homeGrown',
  SAFE_TITLE:  'homeGrown',
  superSecret: 'jwtsonjwtsonjwts'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
