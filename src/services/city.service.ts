import axios from "axios";
import logger from "../utils/logger"
import { CacheService } from "./cache.service";
import { getCitiesWithDescription, getPerfectCities, ICity } from "../utils/city.util";
const cache = CacheService.getInstance();

export const getCity = async (city: { page: number, limit: number, country: string }) => {
    try {
        if (cache.has("usr")) {
            const usr: string | undefined = cache.get("usr");
            if (usr != undefined) {
                const usrInfo = JSON.parse(usr);
                const cities = await axios.get(`${process.env.RECRUITMENT_BASE_URL}/pollution?country=${city.country}&page=${city.page}&limit=${city.limit}`, {
                    headers: {
                        "Authorization": `Bearer ${usrInfo.token}`
                    }
                })
                logger.info(`CITY_DATA: ${cities.data}`)
                let cleancities = getPerfectCities(cities.data);
                const finalCitiesWithDesc = await getCitiesWithDescription(city.country, cleancities);
                finalCitiesWithDesc.meta.limit = city.limit;
                return finalCitiesWithDesc;
            }
        }
        logger.warn("Key {user} udefined or not found")
        return { code: 401, success: false, meg: "Session Expiry please login." }
    } catch (error) {
        logger.error(`ERR_CITY: ${error}`)
        return { code: 401, success: false, message: "Error in fetch the cities.", err: error }
    }
};

