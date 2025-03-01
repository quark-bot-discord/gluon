import { TO_JSON_TYPES_ENUM } from "src/constants.js";
import { Stream } from "stream";

export interface FileUploadType {
  setName(name: string): FileUploadType;
  setStream(stream: Stream): FileUploadType;
  setPath(path: string): FileUploadType;
  setSize(size: number): FileUploadType;
  name: string | undefined;
  stream: Stream | undefined;
  attachment: string | undefined;
  size: number | undefined;
  toJSON(
    format: TO_JSON_TYPES_ENUM,
    options?: { suppressValidation?: boolean },
  ): FileUploadStorageJSON | FileUploadCacheJSON | FileUploadDiscordJSON;
}

export interface FileUploadStorageJSON {
  name: string;
  size: number;
  stream?: Stream;
  attachment?: string;
}

export interface FileUploadCacheJSON {
  name: string;
  size: number;
  stream?: Stream;
  attachment?: string;
}

export interface FileUploadDiscordJSON {
  name: string;
  size: number;
  stream?: Stream;
  attachment?: string;
}
