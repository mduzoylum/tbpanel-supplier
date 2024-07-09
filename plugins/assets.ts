import {defineNuxtPlugin, useRuntimeConfig} from "nuxt/app";

export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig();
    return {
        provide: {
            assets: (name) => {
                return new URL(`../assets/${name}`, import.meta.url).href
            }
        }
    }
})