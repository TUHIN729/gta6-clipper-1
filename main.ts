// gta6-clipper-01 — "GTA 6's Craziest 20 Seconds"
// Entry program for the make.fun bounty "Clip GTA 6 for the most YouTube views".
// It hands in the public YouTube Short that carries the clip: it reads VIDEO.json
// from this repository, refuses the placeholder, and copies the real address to
// the grader's output directory. It also prints the clip recipe (the edit
// decision list) so the program itself documents how the clip was cut.
//
// The clip: one continuous beat from Rockstar's official Grand Theft Auto VI
// Trailer 2 (youtube.com/watch?v=VQRLujxTm3c) — the final getaway climax,
// 138.0s to 157.5s — cut vertical (1080x1920) with ffmpeg, hook text up top,
// and a make.fun pitch card with the real make.fun ghost mark for the last
// 10.5 seconds. The video is uploaded by the entrant (Tuhin) to his own
// YouTube channel; VIDEO.json is filled in with the real Short URL after upload.

import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? ".";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "out";

const VIDEO_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;
const YOUTUBE_PATTERNS = [
  /^https:\/\/www\.youtube\.com\/shorts\/([A-Za-z0-9_-]{11})$/,
  /^https:\/\/www\.youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})$/,
  /^https:\/\/youtu\.be\/([A-Za-z0-9_-]{11})$/,
];

// The cut, second by second, as rendered by ffmpeg in-session. Keeping the
// timing table in the program (not only in a note) means the entry documents
// its own edit decisions every time it runs.
const SEGMENTS = [
  { from: 0.0, to: 3.5, shot: "helicopter over the swamp + hook text 'GTA 6 IS ACTUALLY INSANE'" },
  { from: 3.5, to: 6.0, shot: "jet ski jump, Jason & Lucia mid-air over the water" },
  { from: 6.0, to: 9.5, shot: "Jason on the bike, seaplane overhead" },
  { from: 9.5, to: 14.0, shot: "night truck, car tumbling out the back, sparks on the highway" },
  { from: 14.0, to: 19.5, shot: "golden Vice City sunset skyline, the trailer's money shot" },
  { from: 19.5, to: 30.0, shot: "pitch card — make.fun ghost mark + 'Make clips like this with AI and earn money on make.fun' + bounty URL" },
];

function fail(message) {
  console.error(`gta6-clipper-01: ERROR: ${message}`);
  process.exit(1);
}

function videoIdFromUrl(url) {
  for (const pattern of YOUTUBE_PATTERNS) {
    const match = pattern.exec(url);
    if (match && VIDEO_ID_PATTERN.test(match[1])) return match[1];
  }
  return null;
}

function printRecipe(videoId) {
  const lines = [
    "clip recipe — gta6-clipper-01 entry (gta6-clipper-1)",
    `  video: https://www.youtube.com/shorts/${videoId}`,
    "  source: Grand Theft Auto VI Trailer 2 (Rockstar Games, official)",
    "          https://www.youtube.com/watch?v=VQRLujxTm3c (downloaded in-session with yt-dlp)",
    "  moment: the trailer's final getaway climax, 138.0s-157.5s (19.5s)",
    "          jet ski jump -> swamp helicopter -> bike under a seaplane ->",
    "          car tumbling out of a truck at night -> golden Vice City sunset",
    "  hook:   'GTA 6 IS ACTUALLY INSANE' on screen for the first 3.5s,",
    "          then 'VICE CITY HAS NEVER LOOKED LIKE THIS'",
    "  render: ffmpeg, 1080x1920 vertical (blur-fill), H.264 + AAC, 30s total",
    "  pitch:  last 10.5s — real make.fun ghost mark (press kit) +",
    "          'Make clips like this with AI and earn money on make.fun'",
    "          'make.fun/bounty/gta6-clipper-01'",
    "  upload: public YouTube Short on the entrant's channel, before the deadline",
  ];
  for (const line of lines) console.log(line);
  console.log("  segments (clip time -> shot):");
  for (const segment of SEGMENTS) {
    console.log(`    ${segment.from.toFixed(1)}s-${segment.to.toFixed(1)}s  ${segment.shot}`);
  }
}

function main() {
  const videoPath = join(BOT_DIR, "VIDEO.json");
  if (!existsSync(videoPath)) fail("VIDEO.json is missing from the repository.");

  let record;
  try {
    record = JSON.parse(readFileSync(videoPath, "utf8"));
  } catch (error) {
    fail(`VIDEO.json is not valid JSON: ${error.message}`);
  }

  const url = typeof record === "object" && record !== null ? record.url : undefined;
  if (typeof url !== "string" || url.length === 0) {
    fail("VIDEO.json has no string 'url' field.");
  }
  if (url.includes("<id>") || url.includes("PLACEHOLDER")) {
    fail(
      "VIDEO.json still holds the placeholder URL — upload the clip to YouTube " +
        "first and replace it with the real Short URL."
    );
  }

  const videoId = videoIdFromUrl(url);
  if (videoId === null) {
    fail(`VIDEO.json url is not a YouTube Short/watch URL: ${url}`);
  }

  // Clear only the CONTENTS of the output directory; never remove the
  // directory itself (the grader mounts it and removal fails with EPERM).
  mkdirSync(OUTPUT_DIR, { recursive: true });
  for (const entry of readdirSync(OUTPUT_DIR)) {
    rmSync(join(OUTPUT_DIR, entry), { recursive: true, force: true });
  }

  copyFileSync(videoPath, join(OUTPUT_DIR, "VIDEO.json"));
  printRecipe(videoId);
}

main();
