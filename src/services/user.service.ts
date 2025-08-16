import User, { ILoginUser } from "../models/city.model";
import { CacheService } from "./cache.service";
import axios from "axios";
import { APP_CONSTANTS } from "../utils/constants.util";
import logger from "../utils/logger"

const cache = CacheService.getInstance();
export const createUser = async (data: ILoginUser) => {
    const user = new User(data);
    return await user.save();
};

export const loginUser = async (uData: ILoginUser) => {
    try {
        let user = await axios.post(`${process.env.RECRUITMENT_BASE_URL}/auth/login`, uData)
        if (user.status == 200) {
            cache.set("usr", JSON.stringify(user.data));
            logger.info(`TOKEN_CACHED: token saved in cache`);
            return user.data;
        }
        logger.warn(`ERR_LOGIN: status:${user.status}`)
        return null;
    } catch (error) {
        logger.error(`ERR_LOGIN: ${error}`)
        return { code: 401, success: false, message: APP_CONSTANTS.MESSAGES.ERROR.ERR_LOGIN, err: error }
    }

};
