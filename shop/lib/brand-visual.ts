export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function brandInitials(name: string): string {
  const cleaned = name.replace(/[^\p{L}\p{N}\s.&-]/gu, " ");
  const parts = cleaned.split(/\s+/).filter(Boolean);
  const letters: string[] = [];
  for (const p of parts) {
    const m = p.match(/[\p{L}\p{N}]/u);
    if (m) letters.push(m[0]!.toUpperCase());
    if (letters.length >= 2) break;
  }
  if (letters.length >= 2) return letters[0]! + letters[1]!;
  if (letters.length === 1) {
    const rest = name.slice(name.indexOf(letters[0]!) + 1);
    const m2 = rest.match(/[\p{L}\p{N}]/u);
    if (m2) return letters[0]! + m2[0]!.toUpperCase();
    return (letters[0]! + letters[0]!).slice(0, 2);
  }
  const mono = cleaned.replace(/\s/g, "");
  const seq = mono.match(/[\p{L}\p{N}]/gu);
  if (seq && seq.length >= 2) {
    return (seq[0]! + seq[1]!).toUpperCase().slice(0, 2);
  }
  return name.slice(0, 2).toUpperCase();
}

export function brandVariant(name: string): number {
  return hashString(name) % 6;
}

const GLYPHS = ["✦", "✧", "◇", "◆", "✶", "○", "△", "✷"] as const;

export function brandGlyph(name: string): string {
  return GLYPHS[hashString(name) % GLYPHS.length]!;
}
