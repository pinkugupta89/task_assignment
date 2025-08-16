import axios from "axios";

export interface ICity {
    meta: {
        page: number,
        limit: number,
        totalPages: number
    },
    results: {
        name: string;
        country?: string;
        pollution: number;
        description?: string;
    }[];
}

export const isPerfectCity = (name: string): boolean => {
    const lower = name.toLowerCase().trim();

    // Reject unwanted words
    if (
        lower.includes("station") ||
        lower.includes("powerplant") ||
        lower.includes("unknown") ||
        lower.includes("area")
    ) {
        return false;
    }

    // Reject if contains special characters (only allow A-Z and spaces)
    if (!/^[a-zA-Z\s]+$/.test(name.trim())) {
        return false;
    }

    return true;
}

// ✅ Check if city is duplicate
const checkDuplicateCity = (name: string, seen: Set<string>): boolean => {
    const normalized = name.trim().toLowerCase();

    if (seen.has(normalized)) {
        return true; // duplicate found
    }

    seen.add(normalized);
    return false;
}

// Main function
export const getPerfectCities = (iCity: ICity): ICity => {
    const seen = new Set<string>();

    const filteredResults: ICity["results"] = iCity.results.filter(item => {
        if (!isPerfectCity(item.name)) return false;
        if (checkDuplicateCity(item.name, seen)) return false;
        return true;
    });
    iCity.results = filteredResults;
    return iCity;
}

export const getCitiesWithDescription = async (countryCode: string, iCity: ICity): Promise<ICity> => {
    const countryName = await getCountryNameByCountryCode(countryCode);
    const resWithDesc = await Promise.all(
        iCity.results.map(async (city) => {
            try {

                const response = await axios.get(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(city.name)}`
                );

                return {
                    ...city,
                    description: response.data.extract || "Description not found",
                    country: countryName
                };
            } catch (err) {
                return {
                    ...city,
                    description: "No description available",
                    country: countryName
                };
            }
        })
    );

    return {
        ...iCity,
        results: resWithDesc,
    };
}

export const getCountryNameByCountryCode = async (code: string): Promise<string> => {
    try {
        const response = await axios.get(
            `https://restcountries.com/v3.1/alpha/${code}`
        );
        return response.data[0].name.common; // e.g. "Poland"
    } catch (error) {
        return "Unknown Country";
    }
}
