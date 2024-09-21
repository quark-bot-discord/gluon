import { expect } from "chai";
import hexToInt from "../../../src/util/general/hexToInt.js";
import Embed from "../../../src/util/builder/embedBuilder.js";
import { LIMITS } from "../../../src/constants.js";

describe("Embed", function () {
  context("check import", function () {
    it("should be an object", function () {
      const embed = new Embed();
      expect(embed).to.be.an("object");
    });
  });

  context("check setTitle", function () {
    it("should have method setTitle", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setTitle");
    });
    it("should set the title of the embed", function () {
      const embed = new Embed();
      embed.setTitle("title");
      expect(embed.title).to.equal("title");
    });
    it("should throw an error if the title is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setTitle(undefined);
      }).to.throw(TypeError, "GLUON: Embed title must be provided.");
    });
    it("should not allow the character limit to be exceeded", function () {
      const embed = new Embed();
      embed.setTitle("a".repeat(LIMITS.MAX_EMBED_TITLE + 1));
      expect(embed.title.length).to.equal(LIMITS.MAX_EMBED_TITLE);
    });
  });

  context("check setDescription", function () {
    it("should have method setDescription", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setDescription");
    });
    it("should set the description of the embed", function () {
      const embed = new Embed();
      embed.setDescription("description");
      expect(embed.description).to.equal("description");
    });
    it("should throw an error if the description is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setDescription(undefined);
      }).to.throw(TypeError, "GLUON: Embed description must be provided.");
    });
    it("should not allow the character limit to be exceeded", function () {
      const embed = new Embed();
      embed.setDescription("a".repeat(LIMITS.MAX_EMBED_DESCRIPTION + 1));
      expect(embed.description.length).to.equal(LIMITS.MAX_EMBED_DESCRIPTION);
    });
  });

  context("check setURL", function () {
    it("should have method setURL", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setURL");
    });
    it("should set the url of the embed", function () {
      const embed = new Embed();
      embed.setURL("https://example.com");
      expect(embed.url).to.equal("https://example.com");
    });
    it("should throw an error if the url is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setURL(undefined);
      }).to.throw(TypeError, "GLUON: Embed url must be provided.");
    });
  });

  context("check setColor", function () {
    it("should have method setColor", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setColor");
    });
    it("should set the color of the embed", function () {
      const embed = new Embed();
      embed.setColor("#fcfcfc");
      expect(embed.color).to.equal(hexToInt("fcfcfc"));
    });
    it("should work without the #", function () {
      const embed = new Embed();
      embed.setColor("fcfcfc");
      expect(embed.color).to.equal(hexToInt("fcfcfc"));
    });
    it("should throw an error if the color is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setColor(undefined);
      }).to.throw(TypeError, "GLUON: Embed color must be provided.");
    });
  });

  context("check setTimestamp", function () {
    it("should have method setTimestamp", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setTimestamp");
    });
    it("should set the timestamp of the embed", function () {
      const embed = new Embed();
      embed.setTimestamp(123456);
      expect(embed.timestamp).to.equal(new Date(123456 * 1000).getTime());
    });
  });

  context("check setFooter", function () {
    it("should have method setFooter", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setFooter");
    });
    it("should set the footer of the embed", function () {
      const embed = new Embed();
      embed.setFooter("footer", "https://example.com");
      expect(embed.footer.text).to.equal("footer");
      expect(embed.footer.icon_url).to.equal("https://example.com");
    });
    it("should throw an error if the text is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setFooter(undefined, "https://example.com");
      }).to.throw(TypeError, "GLUON: Embed footer text must be provided.");
    });
    it("should not allow the character limit to be exceeded", function () {
      const embed = new Embed();
      embed.setFooter("a".repeat(LIMITS.MAX_EMBED_FOOTER_TEXT + 1));
      expect(embed.footer.text.length).to.equal(LIMITS.MAX_EMBED_FOOTER_TEXT);
    });
  });

  context("check setImage", function () {
    it("should have method setImage", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setImage");
    });
    it("should throw an error if the url is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setImage(undefined);
      }).to.throw(TypeError, "GLUON: Embed image url must be a string.");
    });
    it("should set the image of the embed", function () {
      const embed = new Embed();
      embed.setImage("https://example.com");
      expect(embed.image.url).to.equal("https://example.com");
    });
  });

  context("check setVideo", function () {
    it("should have method setVideo", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setVideo");
    });
    it("should throw an error if the url is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setVideo(undefined);
      }).to.throw(TypeError, "GLUON: Embed video url must be a string.");
    });
    it("should set the video of the embed", function () {
      const embed = new Embed();
      embed.setVideo("https://example.com");
      expect(embed.video.url).to.equal("https://example.com");
    });
  });

  context("check setThumbnail", function () {
    it("should have method setThumbnail", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setThumbnail");
    });
    it("should set the thumbnail of the embed", function () {
      const embed = new Embed();
      embed.setThumbnail("https://example.com");
      expect(embed.thumbnail.url).to.equal("https://example.com");
    });
    it("should throw an error if the url is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setThumbnail(undefined);
      }).to.throw(TypeError, "GLUON: Embed thumbnail url must be provided.");
    });
  });

  context("check setAuthor", function () {
    it("should have method setAuthor", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("setAuthor");
    });
    it("should set the author of the embed", function () {
      const embed = new Embed();
      embed.setAuthor("author");
      expect(embed.author.name).to.equal("author");
    });
    it("should throw an error if the name is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.setAuthor(undefined);
      }).to.throw(TypeError, "GLUON: Embed author name must be provided.");
    });
    it("should set the author url of the embed", function () {
      const embed = new Embed();
      embed.setAuthor("author", "https://example.com");
      expect(embed.author.url).to.equal("https://example.com");
    });
    it("should not allow the character limit to be exceeded", function () {
      const embed = new Embed();
      embed.setAuthor("a".repeat(LIMITS.MAX_EMBED_AUTHOR_NAME + 1));
      expect(embed.author.name.length).to.equal(LIMITS.MAX_EMBED_AUTHOR_NAME);
    });
  });

  context("check addField", function () {
    it("should have method addField", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("addField");
    });
    it("should add a field to the embed", function () {
      const embed = new Embed();
      embed.addField("field", "fieldValue");
      expect(embed.fields.find((f) => f.name == "field").name).to.equal(
        "field",
      );
      expect(embed.fields.find((f) => f.name == "field").value).to.equal(
        "fieldValue",
      );
    });
    it("should not add a field if the field is empty", function () {
      const embed = new Embed();
      expect(() => {
        embed.addField(undefined, "fieldValue");
      }).to.throw(
        TypeError,
        "GLUON: Embed field name and value must be provided.",
      );
      expect(() => {
        embed.addField("field", undefined);
      }).to.throw(
        TypeError,
        "GLUON: Embed field name and value must be provided.",
      );
      expect(() => {
        embed.addField(undefined, undefined);
      }).to.throw(
        TypeError,
        "GLUON: Embed field name and value must be provided.",
      );
    });
    it("should throw an error if too many fields are added", function () {
      const embed = new Embed();
      for (let i = 0; i < 25; i++) {
        embed.addField("field", "fieldValue");
      }
      expect(() => {
        embed.addField("field", "fieldValue");
      }).to.throw(
        RangeError,
        `GLUON: Embed fields cannot exceed ${LIMITS.MAX_EMBED_FIELDS} fields.`,
      );
    });
    it("should not exceed the value limit", function () {
      const embed = new Embed();
      embed.addField("field", "a".repeat(LIMITS.MAX_EMBED_FIELD_VALUE + 1));
      expect(embed.fields.find((f) => f.name == "field").value.length).to.equal(
        LIMITS.MAX_EMBED_FIELD_VALUE,
      );
    });
    it("should not exceed the name limit", function () {
      const embed = new Embed();
      embed.addField("a".repeat(256), "fieldValue");
      expect(
        embed.fields.find((f) => f.value == "fieldValue").name.length,
      ).to.equal(LIMITS.MAX_EMBED_FIELD_NAME);
    });
    it("should throw an error if the provided field name is not a string", function () {
      const embed = new Embed();
      expect(() => {
        embed.addField(1, "fieldValue").toJSON();
      }).to.throw(
        TypeError,
        "GLUON: Embed fields must be an array of objects with name (string), value (string), and inline (boolean) properties.",
      );
    });
    it("should throw an error if the provided field value is not a string", function () {
      const embed = new Embed();
      expect(() => {
        embed.addField("field", 1).toJSON();
      }).to.throw(
        TypeError,
        "GLUON: Embed fields must be an array of objects with name (string), value (string), and inline (boolean) properties.",
      );
    });
    it("should throw an error if the provided field inline is not a boolean", function () {
      const embed = new Embed();
      expect(() => {
        embed.addField("field", "fieldValue", 1).toJSON();
      }).to.throw(
        TypeError,
        "GLUON: Embed fields must be an array of objects with name (string), value (string), and inline (boolean) properties.",
      );
    });
  });

  context("check toString", function () {
    it("should have method toString", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("toString");
    });
    it("should return the embed as a string", function () {
      const embed = new Embed();
      embed.setTitle("title");
      embed.setDescription("description");
      embed.setURL("https://example.com");
      embed.setColor("#f3f3f3");
      embed.setTimestamp(123456);
      embed.setFooter("footer");
      embed.setImage("image");
      embed.setThumbnail("thumbnail");
      embed.setAuthor("author");
      embed.addField("field", "fieldValue");
      expect(embed.toString()).to.equal(
        "## title\n\ndescription\n\n**field**:\nfieldValue\n-# footer",
      );
    });
  });

  context("check embed character count", function () {
    it("should return the correct character count", function () {
      const embed = new Embed();
      embed.setTitle("title");
      embed.setDescription("description");
      embed.setURL("https://example.com");
      embed.setColor("#f3f3f3");
      embed.setTimestamp(123456);
      embed.setFooter("footer");
      embed.setImage("image");
      embed.setThumbnail("thumbnail");
      embed.setAuthor("author");
      embed.addField("field", "fieldValue");
      expect(embed.characterCount).to.equal(43);
    });
  });

  context("check toJSON method", function () {
    it("should have method toJSON", function () {
      const embed = new Embed();
      expect(embed).to.respondTo("toJSON");
    });
    it("should return the embed as an object", function () {
      const embed = new Embed();
      embed.setTitle("title");
      embed.setDescription("description");
      embed.setURL("https://example.com");
      embed.setColor("#f3f3f3");
      embed.setTimestamp(123456);
      embed.setFooter("footer");
      embed.setImage("https://example.com");
      embed.setVideo("https://example.com");
      embed.setThumbnail("https://example.com");
      embed.setAuthor("author");
      embed.addField("field", "fieldValue");
      expect(embed.toJSON()).to.deep.equal({
        title: "title",
        description: "description",
        url: "https://example.com",
        color: hexToInt("f3f3f3"),
        timestamp: new Date(123456 * 1000).toISOString(),
        footer: {
          text: "footer",
        },
        image: {
          url: "https://example.com",
        },
        video: {
          url: "https://example.com",
        },
        thumbnail: {
          url: "https://example.com",
        },
        author: {
          name: "author",
        },
        fields: [
          {
            name: "field",
            value: "fieldValue",
            inline: false,
          },
        ],
      });
    });
  });
});
