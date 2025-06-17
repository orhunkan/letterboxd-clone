import { PrismaClient } from "@prisma/client";

// 👉 TypeScript’e global değişkeni bildir
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// 👉 Tek instans kuralı
export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

// 👉 Development’ta hot-reload sırasında nesneyi koru
if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
