let expect;
before(async () => {
  expect = (await import("chai")).expect;
});

const { TEST_DATA } = require("../../src/constants");
const AuditLog = require("../../src/structures/AuditLog");

describe("AuditLog", function () {
  context("check import", function () {
    it("should be a function", function () {
      expect(AuditLog).to.be.a("function");
    });
  });

  context("check structure", function () {
    it("should have the correct structure", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog).to.have.property("id");
      expect(auditLog).to.have.property("guildId");
      expect(auditLog).to.have.property("actionType");
      expect(auditLog).to.have.property("reason");
      expect(auditLog).to.have.property("targetId");
      expect(auditLog).to.have.property("channelId");
      expect(auditLog).to.have.property("executorId");
      expect(auditLog).to.have.property("reason");
      expect(auditLog).to.have.property("count");
      expect(auditLog).to.have.property("deleteMemberDays");
      expect(auditLog).to.have.property("membersRemoved");
      expect(auditLog).to.have.property("specialId");
      expect(auditLog).to.have.property("specialType");
      expect(auditLog).to.have.property("status");
      expect(auditLog).to.have.property("changes");
      expect(auditLog).to.have.property("toString");
      expect(auditLog).to.have.property("toJSON");
    });
  });

  context("check id", function () {
    it("should have the correct id", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.id).to.equal(TEST_DATA.AUDIT_LOG.id);
    });
  });

  context("check actionType", function () {
    it("should have the correct actionType", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.actionType).to.equal(TEST_DATA.AUDIT_LOG.action_type);
    });
  });

  context("check reason", function () {
    it("should have the correct reason", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.reason).to.equal(TEST_DATA.AUDIT_LOG.reason);
    });
  });

  context("check targetId", function () {
    it("should have the correct targetId", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.targetId).to.equal(TEST_DATA.AUDIT_LOG.target_id);
    });
  });

  context("check channelId", function () {
    it("should have the correct channelId", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.channelId).to.equal(
        TEST_DATA.AUDIT_LOG.options.channel_id
      );
    });
  });

  context("check executorId", function () {
    it("should have the correct executorId", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.executorId).to.equal(TEST_DATA.AUDIT_LOG.executor_id);
    });
  });

  context("check count", function () {
    it("should have the correct count", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.count).to.equal(TEST_DATA.AUDIT_LOG.count);
    });
  });

  context("check deleteMemberDays", function () {
    it("should have the correct deleteMemberDays", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.deleteMemberDays).to.equal(
        TEST_DATA.AUDIT_LOG.delete_member_days
      );
    });
  });

  context("check membersRemoved", function () {
    it("should have the correct membersRemoved", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.membersRemoved).to.equal(
        TEST_DATA.AUDIT_LOG.members_removed
      );
    });
  });

  context("check specialId", function () {
    it("should have the correct specialId", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.specialId).to.equal(TEST_DATA.AUDIT_LOG.options.id);
    });
  });

  context("check specialType", function () {
    it("should have the correct specialType", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.specialType).to.equal(TEST_DATA.AUDIT_LOG.options.type);
    });
  });

  context("check status", function () {
    it("should have the correct status", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.status).to.equal(TEST_DATA.AUDIT_LOG.status);
    });
  });

  context("check changes", function () {
    it("should have the correct changes", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.changes).to.equal(TEST_DATA.AUDIT_LOG.changes);
    });
  });

  context("check toString", function () {
    it("should return the correct string", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.toString()).to.equal(
        `<Audit Log Entry: ${TEST_DATA.AUDIT_LOG.id}>`
      );
    });
  });

  context("check toJSON", function () {
    it("should return the correct JSON", function () {
      const client = {};
      const auditLog = new AuditLog(client, TEST_DATA.AUDIT_LOG);
      expect(auditLog.toJSON()).to.deep.equal({
        id: TEST_DATA.AUDIT_LOG.id,
        guild_id: TEST_DATA.AUDIT_LOG.guild_id,
        action_type: TEST_DATA.AUDIT_LOG.action_type,
        reason: TEST_DATA.AUDIT_LOG.reason,
        target_id: TEST_DATA.AUDIT_LOG.target_id,
        executor_id: TEST_DATA.AUDIT_LOG.executor_id,
        options: {
            channel_id: TEST_DATA.AUDIT_LOG.options.channel_id,
            count: TEST_DATA.AUDIT_LOG.count,
            delete_member_days: TEST_DATA.AUDIT_LOG.delete_member_days,
            members_removed: TEST_DATA.AUDIT_LOG.members_removed,
            id: TEST_DATA.AUDIT_LOG.options.id,
            type: TEST_DATA.AUDIT_LOG.options.type,
            status: TEST_DATA.AUDIT_LOG.status,
        },
        changes: TEST_DATA.AUDIT_LOG.changes,
      });
    });
  });
});
