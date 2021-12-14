// This file work without .env dependencies, so this setting must be here
module.exports = {
  fillies: ['2', '5', '6', '8', '9', '10', '11', '12', '13', '14', '15'],
  serviceUrl: `${process.env.BACKEND_SERVICE || 'http://193.23.225.178:3124'}/api/formulars_form/`,
  serviceCurrentStateAkps: `${process.env.BACKEND_SERVICE || 'http://193.23.225.178:3124'}/api/get-current-state-akps/`,
};
