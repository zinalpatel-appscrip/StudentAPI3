const i18n = require('i18n');
const i18nConfig = require('../../web/middleware/localization').i18n.options;
require('dotenv').config()

i18n.configure(i18nConfig);

exports.request = {
    _route: {},
    i18n,
    headers: {
        authorization: process.env.JWT_TOKEN,
        lan: 'en'
    },
    info: { remoteAddress: '127.0.0.1' },
    payload: {},
    query: {},
    params: {}
}