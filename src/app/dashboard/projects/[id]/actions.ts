'use server';

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function deleteProject(id: string) {
  await prisma.event.deleteMany({
    where: { projectId: id },
  });

  await prisma.project.delete({
    where: { id },
  });

  redirect("/dashboard/projects?deleted=1");
}
