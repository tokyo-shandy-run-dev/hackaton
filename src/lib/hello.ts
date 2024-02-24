import { Prisma, PrismaClient, Project, ProjectOnUser, TimeState, User } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

// type ProjectResponse = {
//   id: number;
//   name: string;
//   timeStates: TimeState[];
// };

const TimeStateSchema = z.object({
  id: z.number(),
  state: z.string(),
  time: z.date(),
  projectId: z.number(),
});

const ProjectResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  timeStates: z.array(TimeStateSchema),
});

type ProjectResponse = z.infer<typeof ProjectResponseSchema>;

export async function hello() {
  const res = await fetch("api/project", { method: "GET" });
  if (!res.ok) throw new Error();
  const body = await res.json();

  if (body.text === undefined)
    // プロパティの数だけやらないといけない
    throw new Error();
  if (typeof body.text === "string")
    // プロパティの数だけやらないといけない
    throw new Error();

  const data = ProjectResponseSchema.parse(body);

  // body.timeStates.map((timeState) => {
  //   // これをtimeStateのプロパティの数だけやらないといけない
  //   if (timeState.state === undefined) throw new Error();

  //   timeState.state; // can not read property state of undefined
  // }); // can not read property map of undefined
  return "hello";
}
