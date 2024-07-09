
export default defineNuxtPlugin((nuxtApp) => {

    const route = useRoute();
    let lang = route.query?.lang ?? (localStorage.getItem('language') ?? 'en');

    if (['tr', 'en', 'ar'].indexOf(<string>lang) === -1) {
        lang = 'tr'
    }

    const { $i18n } = useNuxtApp();

    if (typeof lang === "string") {
        localStorage.setItem('language', lang);
        $i18n.setLocale(lang);
    }

    return {
        provide: {}
    }
})