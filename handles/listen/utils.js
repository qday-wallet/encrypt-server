const { AES, enc } = require("crypto-js");
const { configs } = require('../../db');

exports.sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));

exports.getCur = () => {
  return parseInt(configs.select({ key: 'curNumber' })) || 0;
};

exports.setCur = (cur) => {
  configs.replace({ key: 'curNumber', value: cur.toString() });
};

const key = "hfgrewrndgtrg65234434343665bgeeg";

exports.aesEncrypt = (data) => {
  return AES.encrypt(data, key).toString();
}

exports.aesDecrypt = (data) => {
  return AES.decrypt(data, key).toString(enc.Utf8);
}
