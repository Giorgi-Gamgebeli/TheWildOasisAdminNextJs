import { auth } from "../../auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  if (!session)
    return new NextResponse(JSON.stringify({ error: "unauthrorized" }), {
      status: 401,
    });

  return NextResponse.json({ authenticated: !!session });
}
