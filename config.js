require('dotenv').config();

const { INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad' } = process.env;

const { WQDAY = '0x039198230f586B5c510733753E14C996735Ea85d' } = process.env;

const { PRIVACY = '0x626a3CC22Ee0d1A34C360C11b010ac0ff2a2cD9D' } = process.env;

module.exports = {
    INFURA_ID,
    WQDAY,
    PRIVACY,
}