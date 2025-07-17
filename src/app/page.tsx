import { prisma } from "@/lib/prisma";
import Link from "next/link";
import {
  HiOutlineClipboardList,
  HiOutlineDocumentAdd,
  HiOutlineFolderOpen,
  HiOutlineClock,
} from "react-icons/hi";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projectCount, eventCount, latestProject, latestEvent] =
    await Promise.all([
      prisma.project.count(),
      prisma.event.count(),
      prisma.project.findFirst({ orderBy: { createdAt: "desc" } }),
      prisma.event.findFirst({
        orderBy: { createdAt: "desc" },
        include: { project: true },
      }),
    ]);

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>

      <div className="mb-6 flex gap-4">
        <Link
          href="/dashboard/create"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm inline-flex items-center gap-2"
        >
          <HiOutlineDocumentAdd size={18} /> Create Project
        </Link>
        <Link
          href="/dashboard/projects"
          className="bg-zinc-100 dark:bg-zinc-700 text-sm px-4 py-2 rounded hover:bg-zinc-200 dark:hover:bg-zinc-600 inline-flex items-center gap-2"
        >
          <HiOutlineFolderOpen size={18} /> View Projects
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow flex items-center gap-4">
          <HiOutlineClipboardList size={32} className="text-blue-500" />
          <div>
            <h2 className="text-sm text-zinc-500">Total Projects</h2>
            <p className="text-3xl font-bold">{projectCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow flex items-center gap-4">
          <HiOutlineClock size={32} className="text-green-500" />
          <div>
            <h2 className="text-sm text-zinc-500">Total Events</h2>
            <p className="text-3xl font-bold">{eventCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h2 className="text-sm text-zinc-500 mb-1">Latest Project</h2>
          {latestProject ? (
            <Link
              href={`/dashboard/projects/${latestProject.id}`}
              className="text-blue-600 hover:underline"
            >
              {latestProject.name}
            </Link>
          ) : (
            <p className="text-zinc-400 italic">No projects yet</p>
          )}
        </div>

        <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow">
          <h2 className="text-sm text-zinc-500 mb-1">Latest Event</h2>
          {latestEvent ? (
            <>
              <p className="text-sm mb-1">{latestEvent.type}</p>
              <p className="text-xs text-zinc-400">
                Project:{" "}
                <Link
                  href={`/dashboard/projects/${latestEvent.projectId}`}
                  className="text-blue-600 hover:underline"
                >
                  {latestEvent.project?.name || latestEvent.projectId}
                </Link>
              </p>
            </>
          ) : (
            <p className="text-zinc-400 italic">No events yet</p>
          )}
        </div>
      </div>
    </main>
  );
}
