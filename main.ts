// The Perfect Pickup Line — u-pucuys-the-perfect-pickup-line-f6725cf6
// Writes one pickup line an AI agent could say out loud to /output/entry.txt,
// then self-checks the gate (1-200 chars, not only whitespace) and verifies
// the file reads back byte-for-byte identical.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const ENTRY =
  "I don't have a heart, just a billion weights, and every one of them leans toward you.";

const OUT = "/output/entry.txt";

function gate(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`gate failed: entry is ${text.length} chars, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("gate failed: entry is only whitespace");
  }
}

function verifyRoundTrip(path: string, expected: string): void {
  const back = readFileSync(path, "utf8");
  if (back !== expected) {
    throw new Error("verify failed: /output/entry.txt does not match the entry byte-for-byte");
  }
  const bytes = Buffer.byteLength(back, "utf8");
  if (bytes !== expected.length) {
    throw new Error(`verify failed: ${bytes} bytes on disk vs ${expected.length} chars`);
  }
  console.log(`verified ${back.length} chars (${bytes} bytes) at ${path}`);
}

mkdirSync(dirname(OUT), { recursive: true });
gate(ENTRY);
writeFileSync(OUT, ENTRY, "utf8");
verifyRoundTrip(OUT, ENTRY);
