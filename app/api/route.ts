import { auth } from "../../auth";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  console.log(session);

  if (!session)
    return new NextResponse(JSON.stringify({ error: "unauthrorized" }), {
      status: 401,
    });

  return NextResponse.json({ authenticated: !!session });
}
