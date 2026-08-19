/** Renders the built SSR bundle and asserts the important content is present. */

const mod = await import("../dist-smoke/entry-smoke.js");
const html = mod.render();

const required = [
  "TEAM VERIS",
  "Preran S Gowda",
  "Shamanth M S",
  "Shreya BJ",
  "Shashank S",
  "Chithsukhi C V",
  "Five minds.",
  "One vision.",
  // Headings are split into per-word spans by RevealText, so assert on the
  // section labels and on individual words rather than whole phrases.
  "The collective",
  "Capabilities",
  "Achievements",
  "Also recognised",
  "github.com/Pythonpreran",
  "github.com/Chithsukhicv",
  "linkedin.com/in/shreyabj",
  "Skip to team",
  // Member accent colours must reach the markup.
  "#E9B44C",
  "#6BA8E5",
  "#C88BE0",
  "#56C596",
  "#EE8A6A",
];

const forbidden = [
  // The follower circle was removed; make sure nothing reintroduces it.
  "data-cursor",
  // Shreya's full name was shortened at her request.
  "Belavatha",
];

let failed = 0;
for (const needle of required) {
  const ok = html.includes(needle);
  if (!ok) failed += 1;
  console.log(`${ok ? "  ok  " : "  FAIL"}  ${needle}`);
}

for (const needle of forbidden) {
  const absent = !html.includes(needle);
  if (!absent) failed += 1;
  console.log(`${absent ? "  ok  " : "  FAIL"}  absent: ${needle}`);
}

const imgCount = (html.match(/<img/g) || []).length;
const altCount = (html.match(/alt="/g) || []).length;
const sectionCount = (html.match(/<section/g) || []).length;
const externalLinks = (html.match(/href="https?:\/\//g) || []).length;

console.log("");
console.log("html bytes      ", html.length);
console.log("sections        ", sectionCount);
console.log("img tags        ", imgCount, "| with alt:", altCount);
console.log("external links  ", externalLinks);

if (imgCount !== altCount) {
  console.log("  FAIL  every image must have an alt attribute");
  failed += 1;
}

console.log("");
console.log(failed === 0 ? "SMOKE TEST PASSED" : `SMOKE TEST FAILED (${failed})`);
process.exit(failed === 0 ? 0 : 1);
