import { NextRequest, NextResponse } from 'next/server';
import { TimeStateSchema } from '@/types/timeState';
import { TimeState } from '@prisma/client';
import { extractBody } from "@/lib/extractBody";
import { db } from '@/lib/prisma';

//// ユーザーの予定を取得できる(変更するときの確認とかとか)
// res : timestate?
export async function GET(req: NextRequest) : Promise<Response>{
  const timeState  = await extractBody(req, TimeStateSchema);
  if (timeState instanceof Response) return timeState;
  const userSchedule= await db.timeState.findUnique({
    where: {
      id: timeState.id
    }
  });
  if (userSchedule != null) {
    return new Response(JSON.stringify(userSchedule), { status: 200 });
  }
  return new Response("bad request", { status: 400 });
}

//// 時間毎に新規登録する
// req : timeState
export async function POST(req: NextRequest) : Promise<Response> {
  const timeState  = await extractBody(req, TimeStateSchema);
  if (timeState instanceof Response) return timeState;
  const newTimeState = await putTimestate(timeState);
  return newTimeState;
}

//// 予定の一部x おそらく状態保存がそのまま渡される感じ？
// req: timeState?
export async function PUT(req: NextRequest, res: NextResponse) {
  const timeState  = await extractBody(req, TimeStateSchema);
  if (timeState instanceof Response) return timeState;
  const updatedTimeState = await putTimestate(timeState);
  return updatedTimeState;
}

//// 予定を削除する
export async function DELETE(req: NextRequest): Promise<Response> {
  const timeState  = await extractBody(req, TimeStateSchema);
  if (timeState instanceof Response) return timeState;
  await db.timeState.delete({
    where: {
      id: timeState.id
    }
  });
  return new Response("completed delete data", { status: 200 });
}

async function putTimestate(timeState: TimeState): Promise<Response> {
  const update  = await db.timeState.upsert({
        where: { 
          id: timeState.id
        },
        update: {
          status: timeState.status,
        },
        create: {
          status: timeState.status,
          userId: timeState.userId,
          projectId: timeState.projectId,
          time_start: timeState.time_start,
          createdAt: new Date(), //Dateの処理 要相談？
        }
  });
  return new Response("completed put data", { status: 200 });
}