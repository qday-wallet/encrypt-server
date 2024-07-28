const { AES, enc } = require('crypto-js');
const { configs } = require('../../db');
const { AES_KEY } = require('../../config');

exports.sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.getCur = () => {
  return parseInt(configs.select({ key: 'curNumber' })) || 0;
};

exports.setCur = (cur) => {
  configs.replace({ key: 'curNumber', value: cur.toString() });
};

exports.aesEncrypt = (data) => {
  return AES.encrypt(data, AES_KEY).toString();
};

exports.aesDecrypt = (data) => {
  return AES.decrypt(data, AES_KEY).toString(enc.Utf8);
};
