import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteProject } from "../actions";

export default async function ConfirmDeletePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) {
    return <div className="p-8">Project not found.</div>;
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-4 text-red-600">Delete Project</h1>
      <p className="mb-4 text-sm">
        Are you sure you want to delete <strong>{project.name}</strong>? This
        action is <span className="font-semibold text-red-500">permanent</span>{" "}
        and cannot be undone.
      </p>

      <form action={deleteProject.bind(null, id)} className="flex gap-3">
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm"
        >
          Confirm Delete
        </button>
        <Link
          href={`/dashboard/projects/${id}`}
          className="px-4 py-2 text-sm border rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
}
