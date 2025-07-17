import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id: projectId } = await context.params;

  const { type, payload } = await req.json();

  const event = await prisma.event.create({
    data: { projectId, type, payload },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);

  return Response.json(event, { status: 201 });
}
