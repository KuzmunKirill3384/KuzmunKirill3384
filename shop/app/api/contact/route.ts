import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "contact-messages.json");

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  source: "form" | "chat";
  createdAt: string;
};

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Некорректный JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 200) : "";
  const email = typeof body.email === "string" ? body.email.trim().slice(0, 200) : "";
  const subject = typeof body.subject === "string" ? body.subject.trim().slice(0, 300) : "Общий вопрос";
  const message = typeof body.message === "string" ? body.message.trim().slice(0, 5000) : "";
  const source = body.source === "chat" ? "chat" as const : "form" as const;

  if (!email) {
    return NextResponse.json({ error: "Укажите email" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "Напишите сообщение" }, { status: 400 });
  }

  let existing: ContactMessage[] = [];
  try {
    const buf = await fs.readFile(FILE, "utf8");
    const list = JSON.parse(buf) as unknown;
    if (Array.isArray(list)) existing = list as ContactMessage[];
  } catch {
    existing = [];
  }

  const entry: ContactMessage = {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    email,
    subject,
    message,
    source,
    createdAt: new Date().toISOString(),
  };

  const next = [...existing, entry];
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(next, null, 2), "utf8");

  return NextResponse.json({ ok: true, id: entry.id });
}
