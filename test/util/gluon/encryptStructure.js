import { expect } from "chai";
import {
  TEST_CHANNELS,
  TEST_CLIENTS,
  TEST_DATA,
  TEST_GUILDS,
} from "../../../src/testData.js";
import Message from "../../../src/structures/Message.js";
import encryptStructure from "../../../src/util/gluon/encryptStructure.js";

describe("EncryptStructure", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(encryptStructure).to.be.a("function");
    });
  });

  context("check invalid input", function () {
    it("should throw an error if no message is provided", function () {
      expect(() => encryptStructure()).to.throw(
        TypeError,
        "GLUON: Structure must be provided.",
      );
    });
    it("should throw an error if the structure does not have a toJSON method", function () {
      expect(() => encryptStructure({})).to.throw(
        TypeError,
        "GLUON: Structure must have a toJSON method.",
      );
    });
    it("should throw an error if encryption keys are not provided", function () {
      expect(() => encryptStructure({ toJSON: () => null })).to.throw(
        TypeError,
        "GLUON: An encryption key must be provided.",
      );
    });
  });

  context("check valid output", function () {
    it("should return a string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(
        encryptStructure(
          message,
          message.id,
          message.channelId,
          message.guildId,
        ),
      ).to.be.a("string");
    });
    it("should return an encrypted string", function () {
      const client = TEST_CLIENTS.ALL_CACHES_ENABLED();
      TEST_GUILDS.ALL_CACHES_ENABLED(client);
      TEST_CHANNELS.TEXT_CHANNEL_ALL_CACHES_ENABLED(client);
      const message = new Message(client, TEST_DATA.MESSAGE, {
        channelId: TEST_DATA.CHANNEL_ID,
        guildId: TEST_DATA.GUILD_ID,
        nocache: true,
        ignoreExisting: true,
      });
      expect(
        encryptStructure(
          message,
          message.id,
          message.channelId,
          message.guildId,
        ),
      ).to.equal(
        "D7VouuLdNv/GOhSZHlt6sW6b3/LIoNHYIMOjkFzFgpw10SAjFZ6eeQXF6/mxBxgG4zC1h1GwI5dvCFA3LLnQrqXB/ToylQte2qiNhwAZ5oKWFbrE8YYCjGMGfIRA9cwIENjWytyYmbcE529uleVWsj0yIl9rfzSHLE/LrslM9cpTOXYv3NBN50cKvYTDaeNfx1T2kFwlE3jlqjNxKBQYKGeyoB0wqvnrjyLgOxa4jhdPnb/95ZHUa30tGiwqbDW4Is0KOBdxePJ5NVxok9fGWFqaFPGG3bmY1Ln2Oz5qTAkPDsqlYFY0mna+gEsk0o1AggRJ6Bru4xHH1g09S7CPKHmD2DkbF/gVVm3HI5h7v4mPZfwAtFBXn6rCySl3QrQ+TaU9/pafwmkOaKIkQAkcC8I7q6O4C9EEalBBHheu1jFlLE2Y1Gz2SZRNjwopARIeCS7bT/03Llm1XVv8pVd60vicMkLw41yoTnlJsPgQ+RZ4Xwa5eW9aofk6U+yHGzyV+x8V57s4gIPpX7rcLBWXBk60El2amyJHWVsWf6DJfFyk6c52U8yHoK4HnlJL52Dqx7R6vYa1on2UzJcOVBh9UQHdXIiOCKAxq1+sn8iiX2KqGHXo/JhHnRkMTJOULeH3XEkGItaDe3y5zweHHIhj0W/dnHwUslv+pYcr9hR6kYBZVpYerHtQdCVuYdnNcyCBF+iwKgvoX+1AqyJsJlUT7/En5xXScnrZNxRjh/ZCdrRHLAOS19uQfzfNto39XaAtEWb8kdBQMpL1TRsj35E7YJCqgSMkRqsCjnva5E6qawcRU/RfxLNMikcO7Yyq3pqYA5Xy34xkLpCSgSBS1mGNt/maHyxOAVt2LVA74pb0cATC9GcB7irqj57ayTZ3msuyjbY613ArY+/0xfju+GHf2yQBASrLYa5LL3nmtoCzrsWQzbdLIdv+XdVckriqs4uNk1k7wvZs4mawJnNhhIeU2fxKxin99rHOU4exmbbUMVqeWoMb8BkgKLO6Cn1BUU6IPS4t8YY8n9Y34m4cRJ9k2pKXfjHGgbzWRAaTBxx7I0WMZFnX2oLSmaiv3mT8hcBhDWEMyHhYOrNGjLgY+sEJiK50POisCJNC0rsq7aNbNvP8r/wjjLyEwcdEsItbeKwZhYuoAcynWODHM6slOT+IPfXVhtSB85vK8JgYcrfK1r2aO16vf01c7ZHCMuthNsZ8U8xw9iLW/R7ouyH4zzM1DnVQ1QiiBdzCh6SKpSWsMOsQTLrLqrmRHoZR5zMw9ZbPaZgJ6y/pIEpXSHNJWMCNub3qg/VoYjrQmU7NnyIbLjW0ktwlrjIssd1QTJysv7kcAuj4dGRKs0V1Vw9D/aMgh6T6WggHyYxivWCa33pDeMf57HT7hy3lUYf44PL+5p4WMb7yxkhABhdDd3okOpZvD77o2XnHr8acOLA8xoYOSfFKmc0FTau8qrVN88R7bIe/4tzN/aSOk/Iwyj11tL6tdYBIKtqLBik9ZIrX0m5aR10kI6QIgVf2dc1xDsleKYXkM0jB3/NtSWuEsJ6jrmlnyVdznL77jBMea+Z36oFrLkNzcOJzhAtVcYKMMsUpycPD/N0iBkdYUulUZ1L2afTR4giv/c9AeSA0rJuZ1QOM3rVa0Y8gDCrFoj5CcwK6Qo78Vus2KGYH1V8Xgd1nZ4atBAPO5kckTyQx8/InMF7BPG+4EG1zrA/8xFwTL+x3BWO9Y3L9Ov2OLeJtCT4Wdm0JxjCh3JOEedQZ5OEAZ7tiNKsGx/BXvHU4O7bXCAhZc4NSzbdCb5NnkwujH6WtUzlG2dY1vrMpK+2yahifuPJboeLg8Rtr4LRhXPgfaSgsieMFwPPGLxn2nxI2AMLOFKEMVmpXrB4F7fHxR4fTSlLVjoFDIxdZ4YviWpEP6kYOXkYyWR04Y9kIhzDtyg+w7s3xRVfAgJyMIjZYAoTVjOe0rFtUnNXbnPvl5oDurB4XlWmgXIsWWw7l1jNBJ83kMY7OSBlAlRC41LElobqEAZ4OYW6+JKGUkzAuEI9wmtRvM0Y/a9C2nqK9k8iyHsF0TH0KHt3DXXQqGZc2An1JU89sdHldy/Ii61DepMFAeVTazVn0O9Kw33Z6gYduJSQ2TMBUng5HrZtOxmS2dn9n69FMhI0NJzwQM73dqD/fTU0CamHEhBSFMV7J9Heaxr3yhHnAXniG1vrnZdg8Xg/E2ICS3k8MU7zMeYxM9xAj8ZnGoWqLRGxQ9GLRUu3MdfAnSro+qQ==",
      );
    });
  });
});
