/**
 * Sanity check for the derived figures shown on the site.
 * Strips the image imports so team.js can be evaluated in plain Node.
 *
 *   node scripts/verify-data.mjs
 */

import { readFile, unlink, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "..", "src", "data", "team.js");
const temp = join(here, "__team.probe.mjs");

const raw = await readFile(source, "utf8");
const stubbed = raw.replace(
  /^import\s+\w+Portrait\s+from\s+".*";$/gm,
  (line) => `const ${line.split(/\s+/)[1]} = "stub";`,
);

await writeFile(temp, stubbed, "utf8");

try {
  const data = await import(`file://${temp.replace(/\\/g, "/")}`);

  const duplicateSkills = data.members.flatMap((m) => {
    const seen = new Set();
    return m.skills.filter((s) => (seen.has(s) ? true : (seen.add(s), false)));
  });

  const missingLinks = data.members.filter(
    (m) => !m.links?.github || !m.links?.linkedin || !m.links?.email,
  );

  const badExpertise = data.expertise.flatMap((area) =>
    area.members.filter((id) => !data.getMember(id)).map((id) => `${area.title} -> ${id}`),
  );

  // The achievements section shows one standout per person, so exactly one
  // entry per member must be flagged, and no two may point at the same event.
  const headlineCounts = data.members.map((m) => ({
    name: m.name,
    count: m.achievements.filter((a) => a.headline).length,
  }));
  const wrongHeadlineCount = headlineCounts.filter((h) => h.count !== 1);
  const headlineEvents = data.headlineAchievements.map((a) => a.event);
  const duplicateHeadlineEvents = headlineEvents.filter(
    (e, i) => headlineEvents.indexOf(e) !== i,
  );

  const missingAccents = data.members.filter((m) => !/^#[0-9a-f]{6}$/i.test(m.accent ?? ""));

  console.log("members            ", data.members.length);
  console.log("projects listed    ", data.allProjects.length);
  console.log("achievement entries", data.allAchievements.length);
  console.log("distinct events    ", data.distinctEvents.length);
  console.log("technologies       ", data.allTechnologies.length);
  console.log("");
  console.log("stats band:");
  for (const stat of data.teamStats) {
    console.log(`   ${String(stat.value).padStart(3)}  ${stat.label}`);
  }
  console.log("");
  console.log("distinct events:");
  for (const event of data.distinctEvents) console.log("   -", event);
  console.log("");
  console.log("headline results (one per person):");
  for (const a of data.headlineAchievements) {
    console.log(`   ${a.index}  ${a.memberFirstName.padEnd(11)} ${a.result} — ${a.event}`);
  }
  console.log("");
  // No event may render twice on the page: not once per member in the merged
  // list, and not once as a headline and again in the list below it.
  const renderedEvents = [
    ...data.headlineAchievements.map((a) => a.event),
    ...data.mergedAchievements.map((a) => a.event),
  ];
  const repeatedEvents = [
    ...new Set(renderedEvents.filter((e, i) => renderedEvents.indexOf(e) !== i)),
  ];

  console.log("");
  console.log("achievement rows rendered:", renderedEvents.length);
  console.log(
    "  headline rows:",
    data.headlineAchievements.length,
    "| merged rows:",
    data.mergedAchievements.length,
    "| from entries:",
    data.allAchievements.length,
  );
  console.log("events rendered more than once:", repeatedEvents.join(", ") || "none");

  console.log("");
  console.log("duplicate skills within a member:", duplicateSkills.length || "none");
  console.log("members missing a link:", missingLinks.map((m) => m.name).join(", ") || "none");
  console.log("expertise pointing at unknown member:", badExpertise.join(", ") || "none");
  console.log(
    "members without exactly one headline:",
    wrongHeadlineCount.map((h) => `${h.name} (${h.count})`).join(", ") || "none",
  );
  console.log("duplicate headline events:", duplicateHeadlineEvents.join(", ") || "none");
  console.log("members missing an accent colour:", missingAccents.length || "none");

  const problems =
    wrongHeadlineCount.length +
    duplicateHeadlineEvents.length +
    repeatedEvents.length +
    missingAccents.length +
    missingLinks.length +
    badExpertise.length +
    duplicateSkills.length;

  console.log("");
  console.log(problems === 0 ? "DATA CHECKS PASSED" : `DATA CHECKS FAILED (${problems})`);
  if (problems > 0) process.exitCode = 1;
} finally {
  await unlink(temp);
}
