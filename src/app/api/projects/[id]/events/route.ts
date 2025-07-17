import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();

    const { type, payload } = body;

    if (!type || !payload) {
      return NextResponse.json(
        { error: "Missing type or payload" },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        projectId: params.id,
        type,
        payload,
      },
    });

    revalidatePath(`/dashboard/projects/${params.id}`);

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error("Event creation failed:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
