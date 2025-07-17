export function formatDate(date: Date) {
  return date.toISOString().replace("T", " ").substring(0, 16);
}