export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            BOT_TOKEN: string;
            DB_CONN_STRING: string;
            OPENTRIP_API_KEY: string;
            OPENTRIP_STATIC_URL: string;
            PHOTOS_API_KEY: string;
            PHOTO_STATIC_URL: string;
            PORT: string;
            WEATHER_API_KEY: string;
            WEATHER_STATIC_URL: string;
        }
    }
}
