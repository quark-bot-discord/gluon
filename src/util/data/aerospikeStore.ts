import { StructureIdentifiers } from "#typings/index.js";
import Aerospike, { AerospikeError } from "aerospike";

export interface AerospikeRecord {
  parentId: string;
  data: Aerospike.PartialAerospikeBinValue;
}

const config: Aerospike.ConfigOptions = {
  hosts: "127.0.0.1:3000",
};
const namespace = "gluon";

const client = await Aerospike.connect(config);

export async function aerospikeGet<T>(
  structureType: StructureIdentifiers,
  key: string,
): Promise<T | null> {
  try {
    const record = await client.get(
      new Aerospike.Key(namespace, structureType, key),
    );
    return record.bins.data as T;
  } catch (err) {
    if (
      err instanceof AerospikeError &&
      err.code === Aerospike.status.AEROSPIKE_ERR_RECORD_NOT_FOUND
    )
      return null;
    throw err;
  }
}

export async function aerospikeSet<
  T extends Aerospike.PartialAerospikeBinValue,
>(
  parentId: string,
  structureType: StructureIdentifiers,
  key: string,
  value: T,
  ttl: number = 0, // seconds
): Promise<void> {
  const record = { parentId, data: value };
  await client.put(new Aerospike.Key(namespace, structureType, key), record, {
    ttl,
  });
}

export async function aerospikeDelete(
  structureType: StructureIdentifiers,
  key: string,
): Promise<void> {
  await client.remove(new Aerospike.Key(namespace, structureType, key));
}

export async function aerospikeForEach<
  T extends Aerospike.PartialAerospikeBinValue,
>(
  parentId: string,
  structureType: StructureIdentifiers,
  callback: (value: T, key: string) => void,
) {
  const query = client.query(namespace, structureType);
  query.where(Aerospike.filter.equal("parentId", parentId));

  const stream = query.foreach();

  return new Promise<void>((resolve, reject) => {
    stream.on("data", (record) => {
      const value = record.bins.data as T;
      const key = record.key.key?.toString() ?? "unknown";
      callback(value, key);
    });
    stream.on("end", () => {
      resolve();
    });
    stream.on("error", reject);
  });
}

export async function aerospikeCount(
  parentId: string,
  structureType: StructureIdentifiers,
) {
  const query = client.query(namespace, structureType);
  query.where(Aerospike.filter.equal("parentId", parentId));

  return new Promise<number>((resolve, reject) => {
    let count = 0;
    query
      .foreach()
      .on("data", () => {
        count++;
      })
      .on("end", () => {
        resolve(count);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

export function disconnectAerospike() {
  client.close();
}
