// gta6-meme-x-01 entrypoint (Node 22, standard library only).
// The entry is the X post itself: this program only hands the grader
// POST.json, which names the post's address. It reads POST.json from
// the repository root, checks it names a post URL, and writes it to
// the output directory. No network, no clock, no reads outside the
// repository, so both runs write the same bytes.

import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const source = join(BOT_DIR, 'POST.json');
const target = join(OUTPUT_DIR, 'POST.json');

let post: unknown;
try {
  post = JSON.parse(readFileSync(source, 'utf8'));
} catch (err) {
  console.error(`POST.json could not be read from ${source}: ${(err as Error).message}`);
  process.exit(1);
}

if (typeof post !== 'object' || post === null || typeof (post as { url?: unknown }).url !== 'string') {
  console.error(`POST.json in ${source} does not name a post URL`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(target, `${JSON.stringify(post)}\n`);
