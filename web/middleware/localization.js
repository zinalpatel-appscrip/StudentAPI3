const defaultlan = process.env.DEFAULT_LANG

const i18n = {
    plugin: require('hapi-i18n'),
    options : {
        locales: ['en','de'],
        directory: './locales',
        languageHeaderField: 'lan',
        defaultLocale: defaultlan,
        objectNotation: true
    }
}

module.exports = { i18n }
