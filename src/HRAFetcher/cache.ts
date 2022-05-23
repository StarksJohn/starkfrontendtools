import _isEqual from "lodash/isEqual";

/**
 * cache key of storage
 */
interface CacheKey {
  url: string;
  params?: object;
}

/**
 * cache storage
 */
export interface ICacheStorage {
  contains(key: CacheKey): boolean;
  delete(key: CacheKey): void;
  load(key: CacheKey): any;
  save(key: CacheKey, value: any): void;
}

/**
 * memory storage that store data in memory
 */
export class MemoryStorage implements ICacheStorage {
  private readonly map: Record<string, {params?: any, value: any}> = {};

  public contains(key: CacheKey) {
    const data = this.map[key.url];
    if (!data) {
      return false;
    }
    return _isEqual(key.params, data.params);
  }

  public delete(key: CacheKey) {
    if (this.contains(key)) {
      delete this.map[key.url];
    }
  }

  public load(key: CacheKey) {
    if (this.contains(key)) {
      return this.map[key.url].value;
    }
  }

  public save(key: CacheKey, value: any) {
    this.map[key.url] = { params: key.params, value };
  }
}

/**
 * browser storage that store data in browser
 */
export class BrowserStorage implements ICacheStorage {

  private static keyParams(url: string) {
    return `${url}:PARAMS`;
  }
  /**
   * specify the storage for data store in.
   * @param storage
   */
  constructor(private readonly storage: Storage) {
  }

  public contains(key: CacheKey) {
    const value = this.storage.getItem(key.url);
    // ensure the value is not stored as an empty string
    if (!value && typeof value !== "string") {
      return false;
    }

    const kparams = BrowserStorage.keyParams(key.url);
    const vparams = this.storage.getItem(kparams);
    const params = vparams ? this.deserializeParams(vparams) : undefined;
    return _isEqual(key.params, params);
  }

  public delete(key: CacheKey) {
    this.storage.removeItem(key.url);
    this.storage.removeItem(BrowserStorage.keyParams(key.url));
  }

  public load(key: CacheKey) {
    if (this.contains(key)) {
      const value = this.storage.getItem(key.url)!;
      return this.deserializeValue(value);
    }
  }

  public save(key: CacheKey, value: any) {
    this.storage.setItem(key.url, this.serializeValue(value));
    if (key.params) {
      const kparams = BrowserStorage.keyParams(key.url);
      const vparams = this.serializeParams(key.params);
      this.storage.setItem(kparams, vparams);
    }
  }

  private serializeParams(v: object) {
    return JSON.stringify(v);
  }

  private deserializeParams(v: string) {
    return JSON.parse(v);
  }

  private serializeValue(v: any) {
    switch (typeof v) {
      case "string": return "s" + v;
      case "number": return "n" + v;
      default: return "o" + JSON.stringify(v);
    }
  }

  private deserializeValue(v: string) {
    const rval = v.substr(1);
    switch (v[0]) {
      case "s": return rval;
      case "n": return parseFloat(rval);
      default: return JSON.parse(rval);
    }
  }
}

// // create storage instances

// type StorageType = "memory" | "session" | "persistent";

// let storages: Record<string, ICacheStorage>;

// /**
//  * get storeage by the specified type
//  * @param type "memory" | "session" | "persistent"
//  */
// export function getStorage(type: StorageType) {
//   if (!storages) {
//     storages = {};
//   }

//   if (!storages[type]) {
//     switch (type) {
//       case "memory": storages[type] = new MemoryStorage(); break;
//       case "session": storages[type] = new BrowserStorage(window.sessionStorage); break;
//       case "persistent": storages[type] = new BrowserStorage(window.localStorage); break;
//     }
//   }

//   return storages[type];
// }

// /**
//  * CacheManager
//  */
// export class CacheManager {
//   private readonly storages: Record<string, ICacheStorage> = {};

//   register(id: string, storage: ICacheStorage) {
//     log.verbose("Cache", "register storage", id);
//     this.storages[id] = storage;
//   }

//   retrieve(id: string) {
//     if (this.storages[id]) {
//       return this.storages[id];
//     }
//   }
// }
