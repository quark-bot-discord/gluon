export default FileUpload;
declare class FileUpload {
    /**
     * The name of the file.
     * @param {String} name The name of the file.
     * @returns {FileUpload}
     */
    setName(name: string): FileUpload;
    /**
     * The stream of the file.
     * @param {Stream} stream The stream of the file.
     * @returns {FileUpload}
     */
    setStream(stream: Stream): FileUpload;
    /**
     * The path of the file.
     * @param {String} path The path of the file.
     * @returns {FileUpload}
     */
    setPath(path: string): FileUpload;
    /**
     * The size of the file.
     * @param {Number} size The size of the file.
     * @returns {FileUpload}
     */
    setSize(size: number): FileUpload;
    /**
     * The name of the file.
     * @type {String}
     * @readonly
     */
    readonly get name(): string;
    /**
     * The stream of the file.
     * @type {Stream}
     * @readonly
     */
    readonly get stream(): Stream;
    /**
     * The path of the file.
     * @type {String}
     * @readonly
     */
    readonly get attachment(): string;
    /**
     * The size of the file.
     * @type {Number}
     * @readonly
     */
    readonly get size(): number;
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): {
        stream: any;
        name: any;
        size: any;
    } | {
        attachment: any;
        name: any;
        size: any;
    };
    #private;
}
//# sourceMappingURL=fileUpload.d.ts.map