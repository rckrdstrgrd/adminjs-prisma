import type { DMMF } from '@prisma/client/runtime/client';

/**
 * Minimal PrismaClient interface for the adapter.
 * The consuming project passes their generated PrismaClient instance.
 */
export type PrismaClientLike = Record<string, any> & {
  $connect(): Promise<void>;
  $disconnect(): Promise<void>;
};

export type ModelManager = {
  [action in DMMF.ModelAction]: (...args: any[]) => Promise<any>;
};

export type Enums = { [key: string]: DMMF.DatamodelEnum };
