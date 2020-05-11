import { EventEmitter } from 'events';
import * as fse from 'fs-extra';
import { objectToMap, mapToObject } from './common/util';

export interface StoreOptions {
  /** Path to JSON file to store data in. */
  path: string;
  /**
   * Whether to read the file (at `this.path`) immediately on instantiation.
   *
   * Default: `false`
   */
  readImmediately?: boolean;
  /**
   * Whether to write to disk every time `store.set()` is called.
   *
   * Default: `false`
   */
  writeOnSet?: boolean;
}

export class Store<T> {
  /** An event emitter that emits events for each operation of the store. */
  public events: EventEmitter;
  /** Internal map for holding values. */
  private map: Map<string, T>;
  /** Path to store data, in JSON format. */
  public path: string;

  /** Create a new store instance. */
  constructor(options: StoreOptions) {
    this.events = new EventEmitter();
    this.path = options.path;
    this.map = new Map<string, T>();
    options.readImmediately || this.readFile();
    if (options.writeOnSet) {
      this.events.addListener('set', () => {
        this.writeFile();
      });
    }
  }
  /**
   * Read the contents of `this.path` and interpret as JSON;
   * if file read throws an error, will set to an empty map instead.
   * Emits `read` once complete.
   */
  readFile() {
    try {
      const raw = (fse.readFileSync(this.path) as unknown) as string;
      const data = JSON.parse(raw) as { [key: string]: T };
      this.map = objectToMap<T>(data) as Map<string, T>;
      this.events.emit('read');
    } catch (err) {
      this.map = new Map<string, T>();
      this.events.emit('read');
    }
  }
  /** Delete all users from the map.
   * Emits `clear` once complete. */
  async clear() {
    this.map.clear();
    await this.writeFile();
    this.events.emit('clear');
  }
  /** Write the current contents to disk.
   * Emits `write` after complete. */
  async writeFile() {
    await fse.writeFile(this.path, JSON.stringify(mapToObject(this.map)));
    this.events.emit('write');
  }
  /** Set the value for a given key.
   * Emits `set` once complete. */
  set(key: string, value: T) {
    this.map.set(key, value);
    this.events.emit('set');
  }
  /**
   * Only set the value if it doesn't exist.
   *
   * Directly calls `this.set()`.
   */
  setIfUnset(key: string, value: T) {
    if (this.has(key)) return;
    this.set(key, value);
  }
  /** Retrieve the value for a given key.
   * Emits `get`. */
  get(key: string) {
    this.events.emit('get');
    return this.map.get(key);
  }
  /** Returns an iterable of duples in the format [key, value]. */
  get entries() {
    return this.map.entries;
  }
  /** Returns an array of all keys stored. */
  get keys() {
    return this.map.keys;
  }
  /** Check if a key exists in the map. */
  has(key: string) {
    return this.map.has(key);
  }
}
