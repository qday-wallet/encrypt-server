require('dotenv').config();

// 0x30ef9dF39C10C57a478f4c6733c3f210CE17C662 a331ecb19f461a2950aa51ae7e614b1e51d5fd7d70206e80d188b664ed7f9dcb
const { PRV_KEY = 'a331ecb19f461a2950aa51ae7e614b1e51d5fd7d70206e80d188b664ed7f9dcb' } = process.env;

const { AES_KEY = 'hfgrewrndgtrg65234434343665bgeeg' } = process.env;

const { INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad' } = process.env;

const { WQDAY = '0x039198230f586B5c510733753E14C996735Ea85d' } = process.env;

const { PRIVACY = '0x626a3CC22Ee0d1A34C360C11b010ac0ff2a2cD9D' } = process.env;

module.exports = {
  PRV_KEY,
  AES_KEY,
  INFURA_ID,
  WQDAY,
  PRIVACY,
};
