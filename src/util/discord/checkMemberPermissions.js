function checkMemberPermissions(roles) {
  if (roles == undefined)
    throw new TypeError("GLUON: Member roles must be provided.");

  if (!Array.isArray(roles))
    throw new TypeError("GLUON: Member roles must be an array.");

  let permissions = 0n;

  if (roles.length != 0) {
    for (let i = 0; i < roles.length; i++) permissions |= roles[i].permissions;
    return permissions;
  } else return 0n;
}

module.exports = checkMemberPermissions;
