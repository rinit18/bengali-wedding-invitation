# Reference design notes

## Source and capture

- Reference: [Biyer Card Sample 2](https://biyercardsample2.vercel.app/)
- Captured 25 Nov 2026 at desktop viewport, with a live browser view and a full page Firecrawl scrape.
- The reference opens on a cream paper invitation with a marigold and mango leaf toran, Bengali blessing, circular sindoor wedding seal, couple names, date, and wedding ritual still lifes near the bottom corners. Subsequent chapters cover the couple's story, families, event cards, printed invitation, schedule and final greeting.
- The supplied pasted snapshot confirms the Bengali names, event copy and most of the image asset names.

## Tokens

Values below are implementation estimates based on the viewed page and Firecrawl branding extraction; they are not claims about the reference's exact CSS.

| Role | Value | Use |
| --- | --- | --- |
| Paper | `#FBF2DF` | Main invitation ground |
| Paper shadow | `#F2E2C8` | Warm section variation |
| Sindoor | `#74131C` | Main headings and buttons |
| Vermilion | `#A91E28` | Secondary wedding red |
| Muted gold | `#A67A31` | Dividers and small labels |
| Ink | `#54252A` | Body copy |
| Bengali display | Galada, Tiro Bangla, serif | Headings and couple names |
| Bengali text | Tiro Bangla, Noto Serif Bengali, serif | Body and labels |

## Layout and components

- The hero fills the viewport and centers the seal and names vertically. The toran spans the top edge; ritual objects balance the lower corners. A compact scroll cue sits near the bottom.
- Long form content uses full bleed paper panels with spacious vertical padding, modest hairline borders and restrained shadows.
- Story cards form a three step row on desktop and a vertical sequence on narrow screens.
- Family portraits sit opposite each other around a small central mangal ghat illustration.
- Event cards use a five item desktop row and a two column mobile grid.
- The invitation letter and event details use lightly bordered paper cards, while an unobtrusive fixed music control and chapter rail support navigation.
- Reference assets are served from the reference site's `/img/` directory and reused as illustration assets.

## Fidelity notes

The section order, copy style, Bengali wedding palette and main illustrations follow the reference. Animations and spacing are approximations. The music button plays the reference page's public background track after the visitor starts it. Reference assets remain externally hosted.
