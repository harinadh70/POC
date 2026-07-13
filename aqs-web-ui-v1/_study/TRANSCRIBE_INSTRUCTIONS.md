# Photo transcription instructions

You are transcribing code from iPhone photos of a laptop screen in `/Users/harinadh/Downloads/POC/`. The photos show a client machine's VS Code with a React/TypeScript repo called **aqs-web-ui** (workspace "AQS_workspace", branch like `hitanshu/experimental` in the bottom status bar). Some photos instead show Bruno (API client), a browser, or a Teams meeting recording of a screen share.

You are given a photo number range, e.g. 2397-2408. Process every file `IMG_<n>.JPG` in that range that exists (some numbers are missing — `ls` the directory to check which exist in your range). Process them in ascending order, ONE at a time.

## Per photo

1. **Read** the JPG with the Read tool.
2. **Orientation**: many photos were taken upside down. If the screen content appears rotated 180° (taskbar at top, inverted text), run:
   `mkdir -p "/Users/harinadh/My code/aqs-web-ui/_study/rotated" && sips -r 180 "<original>" --out "/Users/harinadh/My code/aqs-web-ui/_study/rotated/IMG_<n>.jpg"`
   then Read the rotated copy and work from it. Do NOT rotate photos that are already upright. NEVER transcribe from an upside-down view.
3. **Classify**: `vscode-code` | `bruno` | `browser` | `meeting-video` | `other`.
4. **Identify the file shown** (for vscode-code). Sources of truth in order: editor tab name → breadcrumb path under the tabs → highlighted file in Explorer sidebar. Record the visible line-number range from the editor gutter. Note VS Code sticky-scroll headers at the top (they repeat enclosing scope lines — record them too, they carry real line numbers).
5. **Transcribe ALL legible code VERBATIM**, every visible line with its line number. Do not paraphrase. Do not guess illegible fragments — mark them `⟪?⟫`. Preserve indentation. Include comments. For Bruno/browser/meeting photos: describe the screen and transcribe visible URLs, JSON bodies, request/response data verbatim.
6. **Write** `/Users/harinadh/My code/aqs-web-ui/_study/transcripts/IMG_<n>.md`:

```
---
photo: IMG_<n>.JPG
type: vscode-code
file: aqs-web-ui/src/<path as shown in breadcrumb/tab>
lines: <first>-<last>
orientation: 0|180
confidence: high|medium|low
notes: <squiggles, git markers, occlusion, selected text, blur, sidebar files visible, anything notable>
---
<verbatim transcription with line numbers>
```

   If a transcript file for this photo ALREADY exists, skip the photo entirely.
7. **Append** one JSON line to your chunk catalog file (path given in your task):
   `{"photo":"IMG_<n>","type":"vscode-code","file":"<path or null>","lines":"<a>-<b>","orientation":180,"confidence":"high"}`

## Extra signal worth capturing (in `notes:`)

- Explorer sidebar file/folder names visible (helps reconstruct the repo tree).
- Tab bar: other open tabs.
- Problems count / "No Solution" indicators.
- For meeting-video photos: timestamp in the video scrubber, what app is being shown.

## Return value

Return ONLY a compact summary — one line per photo: `IMG_<n>: <type> <file> <lines> <confidence> [issues]`, plus one final line listing any photos you could not process and why. The transcripts on disk are the deliverable; do not repeat their content in your reply.
