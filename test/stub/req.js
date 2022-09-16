const i18n = require('i18n');
const i18nConfig = require('../../web/middleware/localization').i18n.options;

i18n.configure(i18nConfig);

exports.req = {
    _route: {},
    i18n,
    headers: {
        lan: 'en'
    },
    info: { remoteAddress: '127.0.0.1' },
    payload: {},
    query: {},
    params: {}
}