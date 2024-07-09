
import en from './locales/en.json'
import tr from './locales/tr.json'
import ar from './locales/ar.json'

export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'tr',
    messages: {
        en: en,
        tr: tr,
        ar: ar
    }
}))
