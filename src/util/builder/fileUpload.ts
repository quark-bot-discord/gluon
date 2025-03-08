import { Stream } from "stream";
import { LIMITS } from "../../constants.js";
import type { FileUpload as FileUploadType } from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";

export class FileUpload implements FileUploadType {
  #name: string | undefined;
  #stream: Stream | undefined;
  #path: string | undefined;
  #size: number | undefined;
  /**
   * The name of the file.
   * @param {String} name The name of the file.
   * @returns {FileUpload}
   */
  setName(name: string) {
    if (!name) throw new TypeError("GLUON: File name must be provided.");
    if (name.length > LIMITS.MAX_FILE_NAME_LENGTH)
      throw new RangeError(
        `GLUON: File name must be less than ${LIMITS.MAX_FILE_NAME_LENGTH} characters.`,
      );
    this.#name = name;
    return this;
  }

  /**
   * The stream of the file.
   * @param {Stream} stream The stream of the file.
   * @returns {FileUpload}
   */
  setStream(stream: Stream) {
    this.#stream = stream;
    return this;
  }

  /**
   * The path of the file.
   * @param {String} path The path of the file.
   * @returns {FileUpload}
   */
  setPath(path: string) {
    if (!path) throw new TypeError("GLUON: File path must be provided.");
    this.#path = path;
    return this;
  }

  /**
   * The size of the file.
   * @param {Number} size The size of the file.
   * @returns {FileUpload}
   */
  setSize(size: number) {
    this.#size = size;
    return this;
  }

  /**
   * The name of the file.
   * @type {String}
   * @readonly
   */
  get name() {
    return this.#name;
  }

  /**
   * The stream of the file.
   * @type {Stream}
   * @readonly
   */
  get stream() {
    return this.#stream;
  }

  /**
   * The path of the file.
   * @type {String}
   * @readonly
   */
  get attachment() {
    return this.#path;
  }

  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   */
  get size() {
    return this.#size;
  }

  toJSON(
    format: JsonTypes,
    { suppressValidation = false }: { suppressValidation: boolean } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (!this.#name)
        throw new TypeError("GLUON: File name must be provided.");
      if (!this.#stream && !this.#path)
        throw new TypeError("GLUON: File stream or path must be provided.");
    }
    const commonProperties = {
      name: this.#name as string, // only valid because of the above check
      size: this.#size as number, // only valid because of the above check
    };
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        if (this.#stream)
          return {
            ...commonProperties,
            stream: this.#stream,
          };
        else
          return {
            ...commonProperties,
            attachment: this.#path,
          };
      }
    }
  }
}
