/** Prints the merged achievement list so the dedupe can be eyeballed. */

import { readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const temp = join(here, "__merged.probe.mjs");

const raw = await readFile(join(here, "..", "src", "data", "team.js"), "utf8");
await writeFile(
  temp,
  raw.replace(/^import\s+\w+Portrait\s+from\s+".*";$/gm, (l) => `const ${l.split(/\s+/)[1]} = "s";`),
  "utf8",
);

try {
  const d = await import(`file://${temp.replace(/\\/g, "/")}`);

  console.log(`headline rows (one per member): ${d.headlineAchievements.length}`);
  for (const h of d.headlineAchievements) {
    console.log(`   ${h.memberFirstName.padEnd(11)} ${h.result} — ${h.event}`);
  }

  console.log(
    `\nremaining entries: ${d.remainingAchievements.length}  ->  merged rows: ${d.mergedAchievements.length}`,
  );
  for (const m of d.mergedAchievements) {
    const who = m.members.map((x) => x.firstName).join(", ");
    const years = m.years.length ? ` [${m.years.join(", ")}]` : "";
    console.log(`   ${m.members.length}x  ${m.results.join(" / ")} — ${m.event}${years}`);
    console.log(`        ${who}`);
  }
} finally {
  await unlink(temp);
}
