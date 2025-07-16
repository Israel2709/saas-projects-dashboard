import { prisma } from "@/lib/prisma";
import Link from "next/link";
import SortableHeader from "@/components/SortableHeader";

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const sort = searchParams?.sort;
  const order = searchParams?.order;

  const sortBy = sort === "name" || sort === "createdAt" ? sort : "createdAt";
  const sortOrder = order === "asc" || order === "desc" ? order : "desc";

  const projects = await prisma.project.findMany({
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Link
          href="/dashboard/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
        >
          Create New
        </Link>
      </div>

      <table className="w-full border border-zinc-300 dark:border-zinc-700">
        <thead className="bg-zinc-100 dark:bg-zinc-800 text-left text-sm">
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
              <td className="p-2">{project.name}</td>
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
