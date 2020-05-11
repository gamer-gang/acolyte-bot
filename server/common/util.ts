import * as YAML from 'json-to-pretty-yaml';
import * as path from 'path';
import { promisify } from 'util';

/**
 * Changes the content of a string by removing a range of
 * characters and/or adding new characters.
 */
export function strInsert(
  string: string,
  startIndex: number,
  deleteCount: number,
  substring: string,
) {
  return string.slice(0, startIndex) + substring + string.slice(startIndex + Math.abs(deleteCount));
}

/** Resolve a directory/file from the project root. */
export function resolvePath(dir: string) {
  return path.resolve(process.cwd(), '/', dir);
}

/** Promisify all the provided functions.  */
export function promisifyAll(...functions: Array<Function>) {
  const output: Array<Function> = [];
  for (const func of functions) output.push(promisify(func));
  return output;
}

/** Convert a `Map<string, any>` to a plain object. */
export function mapToObject<T>(map: Map<string, T>) {
  const obj: { [key: string]: T } = Object.create(null);
  for (const [key, value] of map) {
    // Don’t escape the key '__proto__'
    // can cause problems on older engines
    obj[key] = value;
  }
  return obj;
}

/** Convert a plain object to a `Map<string, any>`. */
export function objectToMap<T>(obj: { [key: string]: T }) {
  const map = new Map<string, T>();
  for (const [key, value] of Object.entries(obj)) {
    map.set(key, value);
  }
  return map;
}

/** Convert a JS object into YAML. Optionally include Markdown code fences. */
export function yaml(object: { [key: string]: any }, codeBlock = true) {
  return (codeBlock ? '```yaml\n' : '') + YAML.stringify(object) + (codeBlock ? '```' : '');
}

export class Timer {
  start: [number, number];
  duration?: number;

  constructor() {
    this.start = process.hrtime();
  }

  end() {
    const end = process.hrtime(this.start);

    // time in ms
    this.duration = (end[0] * 1000000000 + end[1]) / 1000000;
  }

  restart() {
    this.start = process.hrtime();
  }
}
