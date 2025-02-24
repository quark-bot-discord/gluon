import { LIMITS, TO_JSON_TYPES_ENUM } from "../../constants.js";

class FileUpload {
  // @ts-expect-error TS(7008): Member '#name' implicitly has an 'any' type.
  #name;
  // @ts-expect-error TS(7008): Member '#stream' implicitly has an 'any' type.
  #stream;
  // @ts-expect-error TS(7008): Member '#path' implicitly has an 'any' type.
  #path;
  // @ts-expect-error TS(7008): Member '#size' implicitly has an 'any' type.
  #size;
  /**
   * The name of the file.
   * @param {String} name The name of the file.
   * @returns {FileUpload}
   */
  setName(name: any) {
    if (!name) throw new TypeError("GLUON: File name must be provided.");
    if (typeof name !== "string")
      throw new TypeError("GLUON: File name must be a string.");
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
  setStream(stream: any) {
    if (!stream) throw new TypeError("GLUON: File stream must be provided.");
    this.#stream = stream;
    return this;
  }

  /**
   * The path of the file.
   * @param {String} path The path of the file.
   * @returns {FileUpload}
   */
  setPath(path: any) {
    if (!path) throw new TypeError("GLUON: File path must be provided.");
    if (typeof path !== "string")
      throw new TypeError("GLUON: File path must be a string.");
    this.#path = path;
    return this;
  }

  /**
   * The size of the file.
   * @param {Number} size The size of the file.
   * @returns {FileUpload}
   */
  setSize(size: any) {
    if (!size) throw new TypeError("GLUON: File size must be provided.");
    if (typeof size !== "number")
      throw new TypeError("GLUON: File size must be a number.");
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
    format: number,
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
      name: this.#name,
      size: this.#size,
    };
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
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

export default FileUpload;
