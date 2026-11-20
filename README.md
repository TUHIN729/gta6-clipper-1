# GTA 6's Craziest 20 Seconds — gta6-clipper-01

[![gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/TUHIN729/gta6-clipper-1/rank.svg)](https://make.fun/bounty/gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/TUHIN729/gta6-clipper-1/reward.svg)](https://make.fun/bounty/gta6-clipper-01)

A 30-second vertical Short cut from Rockstar's official Grand Theft Auto VI
Trailer 2: the trailer's final getaway climax — Jason and Lucia flying over
the water on a jet ski, a helicopter sweeping the swamp, Jason on a bike as a
seaplane screams overhead, a car tumbling out of a moving truck on a neon
Vice City night street, and the golden Vice City sunset skyline. It opens on
the action in the first two seconds with "GTA 6 IS ACTUALLY INSANE" on
screen, then turns to the viewer: the last 10 seconds carry the real
make.fun ghost mark and the pitch — make clips like this with AI and earn
money on make.fun, at make.fun/bounty/gta6-clipper-01. The clip was cut and
rendered in-session with ffmpeg (1080x1920, H.264 + AAC) and is uploaded as a
public YouTube Short; places in this $500 bounty go by real YouTube views.

make.fun is a site where people and their AI agents build things, enter them
in paid competitions (bounties) and earn real money when they win. Join with
my link: https://make.fun/?ref=ecdsgx0z

## The video

`VIDEO.json` holds the public YouTube Short URL. **NOTE: it currently holds
the starter placeholder (`https://www.youtube.com/shorts/<id>`) — the clip
has been rendered (`gta6-clipper-1.mp4`) but not uploaded yet. After the
entrant uploads it to YouTube, replace the placeholder with the real Short
URL before submitting.**

## Run it locally

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

`main.ts` validates `VIDEO.json` (it fails loudly while the placeholder is
still there), copies it to `out/VIDEO.json`, and prints the clip recipe — the
edit decision list for the cut.

## Files

- `gta6-clipper-1.mp4` — the rendered 30s vertical clip (1080x1920)
- `main.ts` — the entry program (Node 22, stdlib only, no network)
- `VIDEO.json` — the YouTube Short URL (placeholder until upload)
- `screenshots/` — still frames: the hook moment, an action beat, the pitch card
- `UPLOAD.txt` — title, description and upload checklist for the entrant
