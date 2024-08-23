import { LIMITS, TO_JSON_TYPES_ENUM } from "../../constants.js";

class FileUpload {
  #name;
  #stream;
  #path;
  /**
   * The name of the file.
   * @param {String} name The name of the file.
   * @returns {FileUpload}
   */
  setName(name) {
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
  setStream(stream) {
    if (!stream) throw new TypeError("GLUON: File stream must be provided.");
    this.#stream = stream;
    return this;
  }

  /**
   * The path of the file.
   * @param {String} path The path of the file.
   * @returns {FileUpload}
   */
  setPath(path) {
    if (!path) throw new TypeError("GLUON: File path must be provided.");
    if (typeof path !== "string")
      throw new TypeError("GLUON: File path must be a string.");
    this.#path = path;
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

  toJSON(
    format,
    { suppressValidation = false } = { suppressValidation: false },
  ) {
    if (suppressValidation !== true) {
      if (!this.#name)
        throw new TypeError("GLUON: File name must be provided.");
      if (!this.#stream && !this.#path)
        throw new TypeError("GLUON: File stream or path must be provided.");
    }
    switch (format) {
      case TO_JSON_TYPES_ENUM.CACHE_FORMAT:
      case TO_JSON_TYPES_ENUM.DISCORD_FORMAT:
      case TO_JSON_TYPES_ENUM.STORAGE_FORMAT:
      default: {
        if (this.#stream)
          return {
            name: this.#name,
            stream: this.#stream,
          };
        else
          return {
            name: this.#name,
            attachment: this.#path,
          };
      }
    }
  }
}

export default FileUpload;