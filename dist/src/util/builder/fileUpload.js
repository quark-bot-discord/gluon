var __classPrivateFieldSet =
  (this && this.__classPrivateFieldSet) ||
  function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot write private member to an object whose class did not declare it",
      );
    return (
      kind === "a"
        ? f.call(receiver, value)
        : f
          ? (f.value = value)
          : state.set(receiver, value),
      value
    );
  };
var __classPrivateFieldGet =
  (this && this.__classPrivateFieldGet) ||
  function (receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (
      typeof state === "function"
        ? receiver !== state || !f
        : !state.has(receiver)
    )
      throw new TypeError(
        "Cannot read private member from an object whose class did not declare it",
      );
    return kind === "m"
      ? f
      : kind === "a"
        ? f.call(receiver)
        : f
          ? f.value
          : state.get(receiver);
  };
var _FileUpload_name, _FileUpload_stream, _FileUpload_path, _FileUpload_size;
import { LIMITS } from "../../constants.js";
import { JsonTypes } from "../../../typings/enums.js";
export class FileUpload {
  constructor() {
    _FileUpload_name.set(this, void 0);
    _FileUpload_stream.set(this, void 0);
    _FileUpload_path.set(this, void 0);
    _FileUpload_size.set(this, void 0);
  }
  /**
   * The name of the file.
   * @param {String} name The name of the file.
   * @returns {FileUpload}
   */
  setName(name) {
    if (!name) throw new TypeError("GLUON: File name must be provided.");
    if (name.length > LIMITS.MAX_FILE_NAME_LENGTH)
      throw new RangeError(
        `GLUON: File name must be less than ${LIMITS.MAX_FILE_NAME_LENGTH} characters.`,
      );
    __classPrivateFieldSet(this, _FileUpload_name, name, "f");
    return this;
  }
  /**
   * The stream of the file.
   * @param {Stream} stream The stream of the file.
   * @returns {FileUpload}
   */
  setStream(stream) {
    __classPrivateFieldSet(this, _FileUpload_stream, stream, "f");
    return this;
  }
  /**
   * The path of the file.
   * @param {String} path The path of the file.
   * @returns {FileUpload}
   */
  setPath(path) {
    if (!path) throw new TypeError("GLUON: File path must be provided.");
    __classPrivateFieldSet(this, _FileUpload_path, path, "f");
    return this;
  }
  /**
   * The size of the file.
   * @param {Number} size The size of the file.
   * @returns {FileUpload}
   */
  setSize(size) {
    __classPrivateFieldSet(this, _FileUpload_size, size, "f");
    return this;
  }
  /**
   * The name of the file.
   * @type {String}
   * @readonly
   */
  get name() {
    return __classPrivateFieldGet(this, _FileUpload_name, "f");
  }
  /**
   * The stream of the file.
   * @type {Stream}
   * @readonly
   */
  get stream() {
    return __classPrivateFieldGet(this, _FileUpload_stream, "f");
  }
  /**
   * The path of the file.
   * @type {String}
   * @readonly
   */
  get attachment() {
    return __classPrivateFieldGet(this, _FileUpload_path, "f");
  }
  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   */
  get size() {
    return __classPrivateFieldGet(this, _FileUpload_size, "f");
  }
  toJSON(
    format,
    { suppressValidation = false } = {
      suppressValidation: false,
    },
  ) {
    if (suppressValidation !== true) {
      if (!__classPrivateFieldGet(this, _FileUpload_name, "f"))
        throw new TypeError("GLUON: File name must be provided.");
      if (
        !__classPrivateFieldGet(this, _FileUpload_stream, "f") &&
        !__classPrivateFieldGet(this, _FileUpload_path, "f")
      )
        throw new TypeError("GLUON: File stream or path must be provided.");
    }
    const commonProperties = {
      name: __classPrivateFieldGet(this, _FileUpload_name, "f"), // only valid because of the above check
      size: __classPrivateFieldGet(this, _FileUpload_size, "f"), // only valid because of the above check
    };
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.DISCORD_FORMAT:
      case JsonTypes.STORAGE_FORMAT:
      default: {
        if (__classPrivateFieldGet(this, _FileUpload_stream, "f"))
          return {
            ...commonProperties,
            stream: __classPrivateFieldGet(this, _FileUpload_stream, "f"),
          };
        else
          return {
            ...commonProperties,
            attachment: __classPrivateFieldGet(this, _FileUpload_path, "f"),
          };
      }
    }
  }
}
(_FileUpload_name = new WeakMap()),
  (_FileUpload_stream = new WeakMap()),
  (_FileUpload_path = new WeakMap()),
  (_FileUpload_size = new WeakMap());
//# sourceMappingURL=fileUpload.js.map
