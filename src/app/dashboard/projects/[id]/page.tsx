import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";
import { HiArrowLeft, HiTrash } from "react-icons/hi";
import Head from "next/head";
import { formatDate } from "@/lib/formatDate";

export default async function ProjectDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams?: Promise<Record<string, string | string[]>>;
}) {
  const { id } = await params;
  const resolvedSearchParams = searchParams ? await searchParams : {};

  const project = await prisma.project.findUnique({
    where: { id },
  });

  if (!project) return notFound();

  const page = parseInt(resolvedSearchParams?.page as string) || 1;
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const events = await prisma.event.findMany({
    where: { projectId: id },
    orderBy: { createdAt: "desc" },
    skip,
    take: pageSize,
  });

  const totalEvents = await prisma.event.count({
    where: { projectId: id },
  });

  const totalPages = Math.ceil(totalEvents / pageSize);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Head>
        <title>{project.name} – Project Details</title>
      </Head>

      <div className="mb-4 flex justify-between items-center">
        <Link
          href="/dashboard/projects"
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <HiArrowLeft /> Back to Projects
        </Link>

        <Link
          href={`/dashboard/projects/${id}/delete`}
          className="text-sm bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 inline-flex items-center gap-1"
        >
          <HiTrash /> Delete
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-2">{project.name}</h1>
      <p className="mb-6 text-sm text-zinc-500">{project.description}</p>

      <h2 className="font-semibold mb-2">Events</h2>
      <table className="w-full border border-zinc-300 dark:border-zinc-700 text-sm">
        <thead className="bg-zinc-100 dark:bg-zinc-800">
          <tr>
            <th className="p-2">Type</th>
            <th className="p-2">Payload</th>
            <th className="p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr
              key={event.id}
              className="border-t border-zinc-300 dark:border-zinc-700"
            >
              <td className="p-2">{event.type}</td>
              <td className="p-2 whitespace-pre-wrap break-all text-zinc-600 dark:text-zinc-300">
                <pre>{JSON.stringify(event.payload, null, 2)}</pre>
              </td>
              <td className="p-2">{formatDate(event.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="mt-4 flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => {
            const pageNum = i + 1;
            return (
              <a
                key={pageNum}
                href={`?page=${pageNum}`}
                className={`px-3 py-1 rounded border text-sm ${
                  pageNum === page
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-300 dark:border-zinc-700"
                }`}
              >
                {pageNum}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
