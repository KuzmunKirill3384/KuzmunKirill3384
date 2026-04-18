"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { NewsArticle } from "@/lib/news-store";

type Props = { articles: NewsArticle[] };

export function AdminNewsTable({ articles }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Удалить новость?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/news/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  if (articles.length === 0) {
    return (
      <div className="rounded-lg border border-white/10 bg-white/[0.02] p-10 text-center">
        <p className="text-white/40">Нет новостей</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-white/10 text-[10px] uppercase tracking-[0.2em] text-white/40">
            <th className="px-4 py-3">Заголовок</th>
            <th className="px-4 py-3">Статус</th>
            <th className="px-4 py-3">Автор</th>
            <th className="px-4 py-3">Дата</th>
            <th className="px-4 py-3 text-right">Действия</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((a) => (
            <tr key={a.id} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="px-4 py-3 font-medium">
                <Link href={`/admin/news/${a.id}/edit`} className="hover:text-[var(--admin-accent)]">
                  {a.title}
                </Link>
                {a.tags.length > 0 && (
                  <div className="mt-1 flex flex-wrap gap-1">
                    {a.tags.map((t) => (
                      <span key={t} className="rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-white/50">{t}</span>
                    ))}
                  </div>
                )}
              </td>
              <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                  a.status === "published"
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "bg-amber-500/15 text-amber-400"
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    a.status === "published" ? "bg-emerald-400" : "bg-amber-400"
                  }`} />
                  {a.status === "published" ? "Опубликовано" : "Черновик"}
                </span>
              </td>
              <td className="px-4 py-3 text-white/60">{a.authorName}</td>
              <td className="px-4 py-3 text-white/50 text-xs">
                {new Date(a.createdAt).toLocaleDateString("ru-RU")}
              </td>
              <td className="px-4 py-3 text-right">
                <div className="flex justify-end gap-2">
                  <Link
                    href={`/admin/news/${a.id}/edit`}
                    className="rounded border border-white/15 px-2.5 py-1 text-[10px] uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                  >
                    Ред.
                  </Link>
                  <button
                    onClick={() => handleDelete(a.id)}
                    disabled={deleting === a.id}
                    className="rounded border border-red-500/30 px-2.5 py-1 text-[10px] uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                  >
                    {deleting === a.id ? "…" : "Удалить"}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
