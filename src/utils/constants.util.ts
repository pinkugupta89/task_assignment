export const APP_CONSTANTS = {
    APP_NAME: "MyNodeApp",
    VERSION: "1.0.0",
    DEFAULT_PORT: 3000,
    CACHE_KEYS: {
        USER: "usr",
        SESSION: "session",
    },
    ERROR_CODES: {
        USER_NOT_FOUND: "USER_NOT_FOUND",
        INVALID_TOKEN: "INVALID_TOKEN",
    },
    MESSAGES: {
        ERROR: {
            ERR_LOGIN: "LOGIN ERROR"
        },
        SUCCESS: {

        }
    }

} as const;