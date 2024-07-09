export default defineNuxtRouteMiddleware((to, from) => {

    if (!to.path.startsWith('/auth')) {
        const {$getToken} = useNuxtApp();
        const token = $getToken(to);

        if (!token || token === '') {
            return navigateTo('/auth/login')
        }
    } else {
        const {$getToken} = useNuxtApp();
        const token = $getToken(to);

        if (token && token !== '') {
            return navigateTo('/')
        }
    }
})

