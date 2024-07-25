class File {
  #name;
  #stream;
  #path;
  setName(name) {
    if (!name) throw new TypeError("GLUON: File name must be provided.");
    if (typeof name !== "string")
      throw new TypeError("GLUON: File name must be a string.");
    this.#name = name;
    return this;
  }

  setStream(stream) {
    if (!stream) throw new TypeError("GLUON: File stream must be provided.");
    this.#stream = stream;
    return this;
  }

  setPath(path) {
    if (!path) throw new TypeError("GLUON: File path must be provided.");
    if (typeof path !== "string")
      throw new TypeError("GLUON: File path must be a string.");
    if (path.length > 255)
      throw new RangeError(
        "GLUON: File path must be less than 256 characters.",
      );
    this.#path = path;
    return this;
  }

  toJSON() {
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

module.exports = File;
