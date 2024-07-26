const { configs } = require('../../db');

exports.sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.getCur = () => {
  return parseInt(configs.select({ key: 'curNumber' })) || 0;
};

exports.setCur = (cur) => {
  configs.replace({ key: 'curNumber', value: cur.toString() });
};
