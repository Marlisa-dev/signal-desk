import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import path from 'path'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

// Use absolute path to database
const dbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const libsqlUrl = `file:${dbPath}`

// Create Prisma adapter
const adapter = new PrismaLibSql({ url: libsqlUrl })

// Initialize Prisma with adapter
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma