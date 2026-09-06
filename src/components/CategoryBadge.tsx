import type { Category } from "../types";

const CLASS: Record<Category, string> = {
  Market: "badge--market",
  Music: "badge--music",
  Sports: "badge--sports",
  Volunteer: "badge--volunteer",
};

export function CategoryBadge({ category }: { category: Category }) {
  return <span className={`badge ${CLASS[category]}`}>{category}</span>;
}
