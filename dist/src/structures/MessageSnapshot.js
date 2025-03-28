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
var _MessageSnapshot_content,
  _MessageSnapshot_embeds,
  _MessageSnapshot_attachments,
  _MessageSnapshot_timestamp,
  _MessageSnapshot_editedTimestamp,
  _MessageSnapshot_flags;
import { Embed } from "#src/util.js";
import { JsonTypes } from "#typings/enums.js";
import Attachment from "./Attachment.js";
class MessageSnapshot {
  constructor(client, data, { channelId }) {
    // this.#_client = client;
    //   #_client;
    _MessageSnapshot_content.set(this, void 0);
    _MessageSnapshot_embeds.set(this, void 0);
    _MessageSnapshot_attachments.set(this, void 0);
    _MessageSnapshot_timestamp.set(this, void 0);
    _MessageSnapshot_editedTimestamp.set(this, void 0);
    _MessageSnapshot_flags.set(this, void 0);
    __classPrivateFieldSet(this, _MessageSnapshot_content, data.content, "f");
    __classPrivateFieldSet(
      this,
      _MessageSnapshot_embeds,
      data.embeds.map((embed) => new Embed(embed)),
      "f",
    );
    __classPrivateFieldSet(
      this,
      _MessageSnapshot_attachments,
      data.attachments.map(
        (attachment) => new Attachment(client, attachment, { channelId }),
      ),
      "f",
    );
    __classPrivateFieldSet(
      this,
      _MessageSnapshot_timestamp,
      (new Date(data.timestamp).getTime() / 1000) | 0,
      "f",
    );
    __classPrivateFieldSet(
      this,
      _MessageSnapshot_editedTimestamp,
      data.edited_timestamp
        ? (new Date(data.edited_timestamp).getTime() / 1000) | 0
        : null,
      "f",
    );
    __classPrivateFieldSet(this, _MessageSnapshot_flags, data.flags, "f");
  }
  get content() {
    return __classPrivateFieldGet(this, _MessageSnapshot_content, "f");
  }
  get embeds() {
    return __classPrivateFieldGet(this, _MessageSnapshot_embeds, "f");
  }
  get attachments() {
    return __classPrivateFieldGet(this, _MessageSnapshot_attachments, "f");
  }
  get timestamp() {
    return __classPrivateFieldGet(this, _MessageSnapshot_timestamp, "f");
  }
  get editedTimestamp() {
    return __classPrivateFieldGet(this, _MessageSnapshot_editedTimestamp, "f");
  }
  get flags() {
    return __classPrivateFieldGet(this, _MessageSnapshot_flags, "f");
  }
  toJSON(format) {
    switch (format) {
      case JsonTypes.CACHE_FORMAT:
      case JsonTypes.STORAGE_FORMAT: {
        return {
          content: this.content,
          embeds: this.embeds.map((embed) => embed.toJSON(format)),
          attachments: this.attachments.map((attachment) =>
            attachment.toJSON(format),
          ),
          timestamp: this.timestamp,
          edited_timestamp: this.editedTimestamp,
          flags: this.flags,
        };
      }
      case JsonTypes.DISCORD_FORMAT:
      default: {
        return {
          content: this.content,
          embeds: this.embeds.map((embed) => embed.toJSON(format)),
          attachments: this.attachments.map((attachment) =>
            attachment.toJSON(format),
          ),
          timestamp: new Date(this.timestamp * 1000).toISOString(),
          edited_timestamp: this.editedTimestamp
            ? new Date(this.editedTimestamp * 1000).toISOString()
            : null,
          flags: this.flags,
        };
      }
    }
  }
}
(_MessageSnapshot_content = new WeakMap()),
  (_MessageSnapshot_embeds = new WeakMap()),
  (_MessageSnapshot_attachments = new WeakMap()),
  (_MessageSnapshot_timestamp = new WeakMap()),
  (_MessageSnapshot_editedTimestamp = new WeakMap()),
  (_MessageSnapshot_flags = new WeakMap());
export default MessageSnapshot;
//# sourceMappingURL=MessageSnapshot.js.map
