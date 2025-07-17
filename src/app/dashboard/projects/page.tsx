import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SortableHeader from "@/components/SortableHeader";
import { HiCheckCircle } from "react-icons/hi";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const sort =
    typeof resolvedSearchParams.sort === "string"
      ? resolvedSearchParams.sort
      : undefined;
  const order =
    typeof resolvedSearchParams.order === "string"
      ? resolvedSearchParams.order
      : undefined;

  const sortBy = sort === "name" || sort === "createdAt" ? sort : "createdAt";
  const sortOrder = order === "asc" || order === "desc" ? order : "desc";

  const projects = await prisma.project.findMany({
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const showCreated = resolvedSearchParams.created === "1";
  const showDeleted = resolvedSearchParams.deleted === "1";

  const cleanUrl = "/dashboard/projects";

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {(showCreated || showDeleted) && (
        <head>
          <meta httpEquiv="refresh" content={`3;url=${cleanUrl}`} />
        </head>
      )}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/dashboard/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Create New
        </Link>
      </div>

      {(showCreated || showDeleted) && (
        <div className="mb-4 p-4 rounded bg-green-100 border border-green-300 text-green-800 text-sm flex items-center gap-2 animate-fade-in">
          <HiCheckCircle className="text-green-600" size={20} />
          {showCreated && <span>Project created successfully.</span>}
          {showDeleted && <span>Project deleted successfully.</span>}
        </div>
      )}

      <table className="w-full border border-zinc-300 dark:border-zinc-700 text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-800 text-left">
          <tr>
            <SortableHeader
              label="Name"
              field="name"
              currentSort={sortBy}
              currentOrder={sortOrder}
            />
            <th className="p-2">Description</th>
            <SortableHeader
              label="Created At"
              field="createdAt"
              currentSort={sortBy}
              currentOrder={sortOrder}
            />
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr
              key={project.id}
              className="border-t border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
            >
              <td className="p-2">
                <Link
                  href={`/dashboard/projects/${project.id}`}
                  className="hover:underline text-blue-600 dark:text-blue-400"
                >
                  {project.name}
                </Link>
              </td>
              <td className="p-2">{project.description}</td>
              <td className="p-2">
                {new Date(project.createdAt).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
