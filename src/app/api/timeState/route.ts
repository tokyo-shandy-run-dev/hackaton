import { NextRequest, NextResponse } from 'next/server';
import { TimeStateSchema } from '@/lib/timeState';
import { TimeState } from '@prisma/client';
// import { getServerSession } from '@lib/auth/server';
import { PrismaClient } from '@prisma/client';
// import { getProjectId } from '@lib/project/server';

const prisma = new PrismaClient();

//// ユーザーの予定を取得できる(変更するときの確認とかとか)
// res : timestate?
export async function get(req: NextRequest) : Promise<Response>{
  const userId: number = 1; // getUserId();
  const projectId: number = 1; // getProjectId();
  const userSchedule: TimeState[] | null = await prisma.timeState.findMany({
    where: {userId: userId,
      projectId: projectId
    }
  });
  return NextResponse.json(userSchedule);
}

//// 最初の登録の時に使う？　時間毎に新規登録する？どっち？
// req : timeState？
export async function post(req: NextRequest, res: NextResponse) {
  
}

//// 予定の一部x おそらく状態保存がそのまま渡される感じ？
// req: timeState?
export async function put(req: NextRequest, res: NextResponse) {
  
}

//// 予定を削除する
export async function del(req: NextRequest, res: NextResponse) {
  
}

async function putTimestate(id: number): Promise<TimeState | null> {
    return await prisma.timeState.findUnique({
        where: { id: id },
    });
}