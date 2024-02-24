import { options } from "@/app/api/auth/[...nextauth]/options";
import { extractBody } from "@/lib/extractBody";
import { db } from "@/lib/prisma";
import { CreateUserSchema } from "@/types/createUser";
import { UserSchema } from "@/types/user";
import { User } from "@prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const unauthorizedResponse = new Response("Unauthorized", { status: 401 });

export async function GET(): Promise<NextResponse<Omit<User, "password">> | Response> {
  const session = await getServerSession(options);

  if (!session?.user) return unauthorizedResponse;

  const userDummyData: Omit<User, "password"> = {
    id: 1,
    email: "dummyyyyy@huga.com",
    name: "dummy",
    createdAt: new Date("1970/1/1"),
    updatedAt: new Date("1970/1/1"),
  };
  return NextResponse.json(userDummyData, { status: 200 });
}

export async function POST(req: NextRequest): Promise<Response> {
  const user = await extractBody(req, CreateUserSchema);
  if (user instanceof Response) return user;
  db.user.create({
    data: {
      email: user.email,
      password: user.password,
      name: user.name,
    },
  });

  return new Response(null, { status: 204 });
}

export async function PUT(): Promise<Response> {
  const session = await getServerSession(options);
  const user = session?.user;
  if (!user) {
    return unauthorizedResponse;
  }

  return new Response("Not implemented", { status: 501 });
}

export async function DELETE(): Promise<Response> {
  const session = await getServerSession(options);
  const user = session?.user;
  if (!user) {
    return unauthorizedResponse;
  }

  return new Response("Not implemented", { status: 501 });
}
