'use server';

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function createProject(formData: FormData) {
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  await prisma.project.create({
    data: {
      name,
      description,
    },
  });

  redirect("/dashboard/projects?created=1");
}
