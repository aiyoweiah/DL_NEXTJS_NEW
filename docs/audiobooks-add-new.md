# Adding a new audiobook — copilot prompt

Paste the block below into a new Claude Code session (or any AI assistant
with file-edit + bash access to this repo) when you're ready to publish a
new audiobook. The prompt is self-contained — it doesn't depend on prior
context.

The system this drives is documented in
[`docs/audiobooks-setup.md`](./audiobooks-setup.md) (one-time setup) and
the project memory file `project_audiobooks.md` (architecture overview).
**The one-time setup is already done.** This is the per-book flow only.

---

## The prompt

> I want to publish a new audiobook on dodolearning.com/audiobooks.
>
> **My workflow** generates the script + MP3 in
> `C:\Users\hsink\Documents\DODO_Audiobook Workflow\DODO_Audiobook_Workflow\output\stage3_final\`.
> The repo for the website is at
> `C:\Users\hsink\Documents\DODO_web\DL_NEXTJS_NEW\` — main branch.
>
> **What I'll provide:**
> 1. The path to the generated script `.md` file (so you can read the title,
>    author, narrator, level, and vocabulary from it).
> 2. The duration of the rendered MP3 in seconds (I'll get this from the
>    file's Properties → Details → Length). If I don't have it yet, leave
>    a `0` placeholder and remind me to update it.
> 3. Optionally: a cover image path or URL. If I don't have one yet, leave
>    the cover field as a placeholder pointing at
>    `/audiobooks/covers/<slug>.jpg` and remind me.
>
> **What I need you to do, in order:**
>
> 1. **Read the script .md** I point you at. Extract the title, author,
>    narrator, target CEFR level, and the vocabulary preview list.
>
> 2. **Propose a kebab-case slug** from the title (e.g. "The Little
>    Engine That Could" → `the-little-engine-that-could`). Show it to
>    me — wait for confirmation before writing files. The slug becomes
>    both the URL path and the expected MP3 filename in R2.
>
> 3. **Write the content file** at
>    `content/en/audiobooks/<slug>.md` with this frontmatter shape:
>    ```yaml
>    ---
>    title: "..."
>    author: "..."
>    narrator: "Miss Jennifer"          # or whoever
>    cover: "/audiobooks/covers/<slug>.jpg"
>    summary: "A 2–3 sentence hook for the library card."
>    durationSec: <total seconds, or 0>
>    publishedAt: "YYYY-MM-DD"          # today's date
>    chapters:
>      - title: "Full Story"            # single-chapter for kids' books
>        durationSec: <same as above>
>        audioUrl: "https://audio.dodolearning.com/<slug>.mp3"
>    ---
>    ```
>    Use the existing `danny-and-the-dinosaur-go-to-camp.md` in
>    `content/en/audiobooks/` as the visual template.
>
> 4. **Write the description body** below the frontmatter as markdown.
>    Include:
>    - A short paragraph about the reading style / pacing
>    - A `## Level` section noting the CEFR level
>    - A `## Vocabulary preview` section listing the words with
>      one-line definitions
>    Pull all of this from the script .md if it's there.
>
> 5. **Tell me what to do on R2.** The MP3 needs to live at
>    `audio.dodolearning.com/<slug>.mp3` (flat, bucket root). Give me
>    the exact target filename so I can match my upload to it — or
>    rename a freshly-uploaded file in the Cloudflare R2 dashboard.
>
> 6. **Confirm the cover file location.** Place at
>    `public/audiobooks/covers/<slug>.jpg`, square (800×800+). If I
>    haven't added it yet, remind me — the library card will show a ♪
>    placeholder until I do.
>
> 7. **Show me a unified summary** of:
>    - the new file path you created
>    - the exact R2 path I need to match
>    - the exact cover path I need to add
>    - any placeholders I still need to fill (durationSec, etc.)
>
> 8. **Wait for me to confirm** I've uploaded the MP3 + cover before
>    suggesting a commit. Once I confirm, run the commit + push (use
>    `git config user.name "aiyoweiah"` and
>    `user.email "hsinkwu@gmail.com"` if the repo doesn't have an
>    identity set yet — but only as a local config, never global,
>    never without telling me).
>
> 9. **After push**, remind me to:
>    - Watch Cloudflare Pages → Workers & Pages → Deployments for green
>    - Hard-refresh `https://dodolearning.com/en/audiobooks/` (Ctrl+Shift+R)
>    - Click into the new book → confirm playback works
>    - If the player 404s on the MP3, the most common cause is a slug
>      mismatch between the frontmatter `audioUrl` and the R2 filename
>      — diff the two and fix whichever needs to change.
>
> **Constraints:**
> - Don't add new fields to the frontmatter schema without telling me —
>   the loader at `lib/audiobooks.js` only reads the fields listed in
>   step 3. Extras get silently dropped.
> - Don't try to set up R2, Cloudflare Access, or env vars — those are
>   one-time and already done. Just match the existing conventions.
> - Don't touch `vercel.json` or `public/_redirects` — the routing for
>   `/audiobooks/*` is already correct on both hosts.
> - The audiobook URL is `dodolearning.com/<slug>` (the `/en/` is added
>   by `_redirects`). The slug **must** match what's in R2 exactly,
>   including hyphens and case.

---

## Tips for the user (you, future Janet)

- **Get the duration first** if you can — saves a follow-up commit. On
  Windows: right-click the MP3 → Properties → Details → Length, then
  convert `mm:ss` to total seconds (e.g. `7:23` = `7×60 + 23` = `443`).
- **Cover image** — square JPG, at least 800×800. Generate via Midjourney,
  Canva, or Figma. Keep it readable at the small library-card size.
- **One book per session** is fine, but you can batch — paste the prompt
  once, then for each subsequent book just say "another one, here's the
  script: `<path>`, duration `<seconds>`." Claude will reuse the same
  flow.
- **If the workflow rename friction gets fixed** (see the OPEN item in
  `project_audiobooks.md`), this prompt may simplify — the slug derivation
  and R2 filename matching steps will become automatic. Update this doc
  when that happens.
