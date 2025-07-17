import Link from "next/link";
import { HiSortAscending, HiSortDescending, HiSelector } from "react-icons/hi";

type Props = {
  label: string;
  field: "name" | "createdAt";
  currentSort: string;
  currentOrder: string;
};

export default function SortableHeader({
  label,
  field,
  currentSort,
  currentOrder,
}: Props) {
  const isActive = currentSort === field;
  const nextOrder = isActive && currentOrder === "asc" ? "desc" : "asc";
  const url = `/dashboard/projects?sort=${field}&order=${nextOrder}`;

  let icon = <HiSelector className="inline text-zinc-400" size={16} />;
  if (isActive) {
    icon =
      currentOrder === "asc" ? (
        <HiSortAscending className="inline text-blue-500" size={16} />
      ) : (
        <HiSortDescending className="inline text-blue-500" size={16} />
      );
  }

  return (
    <th className="p-2">
      <Link href={url} className="flex items-center gap-1 hover:underline">
        {label} {icon}
      </Link>
    </th>
  );
}
