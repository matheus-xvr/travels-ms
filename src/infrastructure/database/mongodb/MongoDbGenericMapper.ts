/* eslint-disable @typescript-eslint/naming-convention */
type IConstructor<T> = new (...args: any[]) => T;

export const mapperToEntity = <T>(Entity: IConstructor<T>, rawData: any): T => {
  const resultDb = rawData.ops ? rawData.ops[0] : rawData;
  const { _id, ...targetValues } = resultDb;
  return new Entity(targetValues);
};
