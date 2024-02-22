import { Prisma, PrismaClient, Project, ProjectOnUser, TimeState, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function hello() {
  const res = await fetch("api/project", { method: "GET" });
  if (!res.ok) throw new Error();
  const body = await res.json();
  body;
  return "hello";
}
