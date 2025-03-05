import { Stream } from "stream";
import type { FileUpload as FileUploadType } from "typings/index.d.ts";
import { JsonTypes } from "../../../typings/enums.js";
declare class FileUpload implements FileUploadType {
  #private;
  /**
   * The name of the file.
   * @param {String} name The name of the file.
   * @returns {FileUpload}
   */
  setName(name: string): this;
  /**
   * The stream of the file.
   * @param {Stream} stream The stream of the file.
   * @returns {FileUpload}
   */
  setStream(stream: Stream): this;
  /**
   * The path of the file.
   * @param {String} path The path of the file.
   * @returns {FileUpload}
   */
  setPath(path: string): this;
  /**
   * The size of the file.
   * @param {Number} size The size of the file.
   * @returns {FileUpload}
   */
  setSize(size: number): this;
  /**
   * The name of the file.
   * @type {String}
   * @readonly
   */
  get name(): string | undefined;
  /**
   * The stream of the file.
   * @type {Stream}
   * @readonly
   */
  get stream(): Stream | undefined;
  /**
   * The path of the file.
   * @type {String}
   * @readonly
   */
  get attachment(): string | undefined;
  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   */
  get size(): number | undefined;
  toJSON(
    format: JsonTypes,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ):
    | {
        stream: Stream;
        name: string;
        size: number;
      }
    | {
        attachment: string | undefined;
        name: string;
        size: number;
      };
}
export default FileUpload;
