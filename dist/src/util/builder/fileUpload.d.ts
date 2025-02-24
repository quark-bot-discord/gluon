declare class FileUpload {
  #private;
  /**
   * The name of the file.
   * @param {String} name The name of the file.
   * @returns {FileUpload}
   */
  setName(name: any): this;
  /**
   * The stream of the file.
   * @param {Stream} stream The stream of the file.
   * @returns {FileUpload}
   */
  setStream(stream: any): this;
  /**
   * The path of the file.
   * @param {String} path The path of the file.
   * @returns {FileUpload}
   */
  setPath(path: any): this;
  /**
   * The size of the file.
   * @param {Number} size The size of the file.
   * @returns {FileUpload}
   */
  setSize(size: any): this;
  /**
   * The name of the file.
   * @type {String}
   * @readonly
   */
  get name(): any;
  /**
   * The stream of the file.
   * @type {Stream}
   * @readonly
   */
  get stream(): any;
  /**
   * The path of the file.
   * @type {String}
   * @readonly
   */
  get attachment(): any;
  /**
   * The size of the file.
   * @type {Number}
   * @readonly
   */
  get size(): any;
  toJSON(
    format: number,
    {
      suppressValidation,
    }?: {
      suppressValidation: boolean;
    },
  ):
    | {
        stream: any;
        name: any;
        size: any;
      }
    | {
        attachment: any;
        name: any;
        size: any;
      };
}
export default FileUpload;
