export default defineNuxtPlugin((nuxtApp) => {

    const config = useRuntimeConfig();
    let BASE_URL = config.public.API_URL || 'http://localhost:8083';
    BASE_URL = BASE_URL.replace('/\/$/', '');

    const {$i18n}  = useNuxtApp();
    const {$getToken}  = useNuxtApp();
    const token = $getToken();

    console.log($i18n.locale)

    const request = $fetch.create({
        baseURL: `${BASE_URL}/`,
        headers : {
            'Authorization' : `Bearer ${(token || '')}`,
            'Accept-Language': $i18n.locale.value || 'en',
        },
        async onResponse({ request, response, options }) {
            if(response.status == 401 || response.status == 403) {
                localStorage.removeItem('token');
                const msg = response._data.message ?? 'Hata Oluştu';
                return navigateTo('/auth/error?msg='+msg);
            }
        }
    })

    return{
        provide:{
           apiFetch : request,
            url     : BASE_URL
        }
    }
})