import dayjs from "dayjs";

export default defineNuxtPlugin((nuxtApp) => {

    const color = getColor();
    return {
        provide: {
            date: dayjs,
            getToken,
            color : color,
            isNull,
            isDarkMode : isDarkMode(),
            paramsToMove
        }
    }
})


const getColor = () => {

    const route = useRoute();
    let allowedThemes = ['blue', 'yellow', 'indigo', 'green', 'red', 'orange', 'amber'];


    const theme = window.localStorage.getItem('store-theme') ?? 'orange';

    return allowedThemes.includes(theme) ? theme: "yellow";
}


const isNull = (variable) => {
    return typeof variable == 'undefined' || variable === null 
}

export function isDarkMode () {

    const route = useRoute();
    if(route.query.darkMode) {
        window.localStorage.setItem('store-dark-mode', route.query.darkMode);
        return route.query.darkMode == 1;
    }

    if(window.localStorage.getItem('store-dark-mode')) {
        return window.localStorage.getItem('store-dark-mode') == 1;
    }

    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
}
const paramsToMove = (prefix) => {

    // bunu 3. part engellenen durumlar için yapıyoruz. belli parametreleri url de taşımayı hedefliyoruz.
    if(typeof prefix === 'undefined') {
        prefix = '';
    }

    const route = useRoute();

    const queryParams = route.query;
    const allowedParams = ['lang', 'token', 'theme', 'darkMode'];

    let paramsToMove = [];

    // Iterate through query parameters
    for (const param in queryParams) {
        if(allowedParams.includes(param)) {
            paramsToMove.push(param+'='+queryParams[param]);
        }
    }

    if(paramsToMove.length > 0) {
        return prefix+paramsToMove.join('&');
    }

    return '';
}

const getToken = (route) => {
    let token;

    if(typeof route == 'undefined') {
        route = useRoute();
    }

    if(route.query?.token) {
        localStorage.setItem('token',route.query.token)
        token = route.query.token
    } else {
        token = localStorage.getItem('token') ?? '';
    }

    return token;
}