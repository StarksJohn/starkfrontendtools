import axios, { AxiosError } from "axios";
import { ICacheStorage } from "./cache";

console.log('fetch.ts process.env=',process.env)
const service = axios.create({
  baseURL:process.env.NODE_ENV==="development"?'/_api':process.env.VUE_APP_BASEURLAPI,
  timeout: 120000
})

/**
 * https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods
 */
type HttpMethod = "get" | "head" | "post" | "put" | "delete" | "connect" | "options" | "trace" | "patch";

/**
 * FetchUnit
 */
interface FetchUnit {
  /** http method */
  method: HttpMethod;
  /** request url */
  url: string;
  /** mock data, it is used for local debug that means no network request */
  mock?: any;
  /** cache data store in, it is available only in `get` method */
  cache?: "memory" | "session" | "persistent";
}

type ErrorHandler = (error: AxiosError) => void | Promise<void>;

/**
 * DataFetcher
 */
export class DataFetcher {
  private errorHandler?: ErrorHandler;
  private readonly storages: Record<string, ICacheStorage> = {};

  public registerCacheStorage(id: string, cache: ICacheStorage) {
    this.storages[id] = cache;
  }

  /**
   * fetch data
   * @param unit
   * @param data
   */
  public async request<T>(unit: FetchUnit, data?: Record<string, any>) {
    if (unit.mock) {
      return unit.mock as T;
    }

    const cacheable = unit.method === "get" && unit.cache && (unit.cache in this.storages);

    if (cacheable) {
      const cache = this.storages[unit.cache!].load({ url: unit.url, params: data });
      if (cache) {
        return cache as T;
      }
    }

    let rval: T;

    try {
      const response = unit.method === "get"
        ? await service.get(unit.url, { params: data })
        : await service.post(unit.url, data);

      rval = response && response.data;
    } catch (error) {
      this.invokeErrorHandler(error);
      throw error;
    }

    if (cacheable) {
      this.storages[unit.cache!].save({ url: unit.url, params: data }, rval);
    }

    return rval;
  }

  /**
   * register an error handler. it would be invoked when raising exception in request.
   * @param hd handler
   * @param scope handler scope
   */
  public setErrorhandler(hd: ErrorHandler, scope?: any) {
    if (scope) {
      this.errorHandler = hd.bind(scope);
    } else {
      this.errorHandler = hd;
    }
  }

  private invokeErrorHandler(error: AxiosError) {
    if (this.errorHandler) {
      this.errorHandler(error);
    }
  }

}
