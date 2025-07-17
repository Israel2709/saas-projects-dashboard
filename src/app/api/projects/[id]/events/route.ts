import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const body = await req.json();

    const event = await prisma.event.create({
      data: {
        projectId: id,
        type: body.type,
        payload: body.payload,
      },
    });

    revalidatePath(`/dashboard/projects/${id}`);

    return new Response(JSON.stringify(event), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to create event" }), {
      status: 500,
    });
  }
}
