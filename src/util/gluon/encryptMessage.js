import hash from "hash.js";
import encryptText from "../general/encryptText.js";
import { TO_JSON_TYPES_ENUM } from "../../constants.js";
import Message from "../../structures/Message.js";

/**
 * Encrypts a message and returns an encrypted string.
 * @param {Message} message The message to encrypt.
 * @returns {String}
 */
function encryptMessage(message) {
  if (!message) throw new TypeError("GLUON: Message must be provided.");

  if (!(message instanceof Message))
    throw new TypeError("GLUON: Message must be an instance of Message.");

  if (!message.id || !message.channelId || !message.guildId)
    throw new TypeError(
      "GLUON: Message must have an id, channel id and guild id.",
    );

  const stringifyableObject = message.toJSON(TO_JSON_TYPES_ENUM.STORAGE_FORMAT);
  const messageString = JSON.stringify(stringifyableObject);

  const key = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(`${message.id}_${message.channelId}_${message.guildId}`)
        .digest("hex")}satoshiNakamoto`,
    )
    .digest("hex")
    .slice(0, 32);

  const iv = hash
    .sha512()
    .update(
      `${hash
        .sha512()
        .update(`${message.id}_${message.channelId}_${message.guildId}`)
        .digest("hex")}${message.id}`,
    )
    .digest("hex")
    .slice(0, 16);

  return encryptText(messageString, key, iv);
}

export default encryptMessage;
