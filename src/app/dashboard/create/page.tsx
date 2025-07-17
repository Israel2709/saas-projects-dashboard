import Link from "next/link";
import { HiArrowLeft } from "react-icons/hi";
import { createProject } from "./actions";

export default function CreateProjectPage() {
  return (
    <div className="p-8 max-w-xl mx-auto">
      <div className="mb-6 flex justify-between items-center">
        <Link
          href="/dashboard/projects"
          className="text-sm text-blue-600 hover:underline inline-flex items-center gap-1"
        >
          <HiArrowLeft /> Back to Projects
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Create New Project</h1>

      <form
        action={createProject}
        className="space-y-4 bg-white dark:bg-zinc-900 p-6 rounded-xl border border-zinc-200 dark:border-zinc-700"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
          >
            Project Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-zinc-700 dark:text-zinc-200"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="mt-1 block w-full rounded-md border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
