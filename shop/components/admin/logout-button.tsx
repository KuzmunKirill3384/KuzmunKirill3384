"use client";

export function LogoutButton() {
  return (
    <button
      type="button"
      className="text-[11px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        window.location.href = "/admin/login";
      }}
    >
      Выйти
    </button>
  );
}
