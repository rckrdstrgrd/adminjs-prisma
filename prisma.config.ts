import path from 'node:path'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  earlyAccess: true,
  schema: path.join(__dirname, 'spec/prisma/schema.prisma'),
  migrate: {
    schema: path.join(__dirname, 'spec/prisma/schema.prisma'),
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
})
