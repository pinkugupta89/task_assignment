import NodeCache from "node-cache";

export class CacheService {
    private static instance: CacheService;
    private cache: NodeCache;

    private constructor() {
        // Default TTL = 600 seconds (10 minutes)
        this.cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });
    }

    // Singleton instance (Global use)
    public static getInstance(): CacheService {
        if (!CacheService.instance) {
            CacheService.instance = new CacheService();
        }
        return CacheService.instance;
    }

    // Set cache
    public set<T>(key: string, value: T, ttl?: number | string): boolean {
        return ttl !== undefined ? this.cache.set<T>(key, value, ttl) : this.cache.set<T>(key, value);
    }

    // Get cache
    public get<T>(key: string): T | undefined {
        return this.cache.get<T>(key);
    }

    // Delete cache
    public del(key: string): number {
        return this.cache.del(key);
    }

    // Check if key exists
    public has(key: string): boolean {
        return this.cache.has(key);
    }

    // Flush all cache
    public flush(): void {
        this.cache.flushAll();
    }
}