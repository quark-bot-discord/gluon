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
    toJSON(format: any, { suppressValidation }?: {
        suppressValidation?: false;
    }): {
        name: any;
        stream: any;
        attachment?: undefined;
    } | {
        name: any;
        attachment: any;
        stream?: undefined;
    };
    #private;
}
//# sourceMappingURL=fileUpload.d.ts.map