/**
 * Combines multiple permissions into a single permission.
 * @param  {...String} permissions The permissions to combine.
 * @returns {String} The combined permissions.
 */
function combinePermissions(...permissions: string[]): string {
  if (permissions.length === 0)
    throw new TypeError("GLUON: Permissions must be provided.");

  if (!permissions.every((permission) => typeof permission == "string"))
    throw new TypeError("GLUON: Permissions must be an array of strings.");

  let combined = 0n;

  for (let i = 0; i < permissions.length; i++)
    combined |= BigInt(permissions[i]);

  return String(combined);
}

export default combinePermissions;
