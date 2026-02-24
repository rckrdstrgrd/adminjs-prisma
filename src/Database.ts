/* eslint-disable class-methods-use-this */
import type { DMMF } from '@prisma/client/runtime/client';
import { BaseDatabase } from 'adminjs';

import { Resource } from './Resource.js';
import { PrismaClientLike } from './types.js';

export class Database extends BaseDatabase {
  protected client: PrismaClientLike;

  protected clientModule?: any;

  public constructor(args: { client: PrismaClientLike, clientModule?: any }) {
    super(args);
    const { client, clientModule } = args;

    this.client = client;
    this.clientModule = clientModule;
  }

  public resources(): Array<Resource> {
    if (!this.clientModule?.Prisma?.dmmf) {
      throw new Error('clientModule with Prisma.dmmf is required. Pass { Prisma } from your generated client.');
    }
    const dmmf = this.clientModule.Prisma.dmmf.datamodel;

    if (!dmmf?.models) return [];

    return dmmf.models.map((model: DMMF.Model) => {
      const resource = new Resource({ model, client: this.client, clientModule: this.clientModule });
      return resource;
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static isAdapterFor(args: { client?: PrismaClientLike, clientModule?: any }): boolean {
    const { clientModule } = args;

    if (!clientModule?.Prisma?.dmmf) return false;
    const dmmf = clientModule.Prisma.dmmf.datamodel;

    return dmmf?.models?.length > 0;
  }
}
