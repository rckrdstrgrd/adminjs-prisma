import { Enums } from '../types.js';

export const getEnums = (clientModule?: any): Enums => {
  if (!clientModule?.Prisma?.dmmf) {
    throw new Error('clientModule with Prisma.dmmf is required.');
  }
  const dmmf = clientModule.Prisma.dmmf.datamodel;

  return dmmf.enums.reduce((memo, current) => {
    // eslint-disable-next-line no-param-reassign
    memo[current.name] = current;

    return memo;
  }, {});
}
