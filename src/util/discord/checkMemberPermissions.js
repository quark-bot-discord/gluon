function checkMemberPermissions(roles) {
  let permissions = 0n;

  if (roles.length != 0) {
    for (let i = 0; i < roles.length; i++) permissions |= roles[i].permissions;
    return permissions;
  } else return 0n;
}

module.exports = checkMemberPermissions;
