import { User } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function extractBody<T extends z.ZodSchema>(
  req: NextRequest,
  schema: T
): Promise<z.infer<typeof schema> | NextResponse<Response>> {
  try {
    const requestBody = await req.body!.getReader().read();

    const decoder = new TextDecoder();
    const decodedBody = decoder.decode(requestBody.value);
    const JSONBody = JSON.parse(decodedBody);
    const parseResult = schema.safeParse(JSONBody);

    if (!parseResult.success) {
      return NextResponse.json(parseResult.error, { status: 400 });
    }
    return parseResult.data;
  } catch (e) {
    return NextResponse.json(e, { status: 400 });
  }
}
