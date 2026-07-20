# modified-reference — complete versions of changed EXISTING files

You asked for complete files instead of merge snippets. Here's the honest split:

## ✅ These 4 are here as COMPLETE ready files

| File | Replaces | Contains |
|---|---|---|
| `static-renderer.tsx` | `src/features/frame/components/static-renderer.tsx` | usePageInit + Breadcrumb + pristine captureAll |
| `dynamic-renderer.tsx` | `src/features/frame/components/dynamic-renderer.tsx` | usePageInit + pristine captureAll |
| `tab-layout.tsx` | `src/layouts/tab-layout.tsx` | initialTab preselect + Cancel focus + tab handler + pendingTab switch (needs focus-store v2) |
| `header.tsx` | `src/components/header.tsx` | timing display; dual exports + defensive loader access |

Every change block inside them is marked `>>> GAP ... <<< GAP`, so if a
wholesale replace misbehaves on your branch, you can still lift just the
marked blocks into your file.

## ⚠️ These 4 CANNOT be given as complete files — and why

| File | Why not |
|---|---|
| `form-renderer.tsx` | Your branch's version is large and only partially photographed — a complete file from the reconstruction would DELETE real functionality (this is exactly what broke header.tsx last time). Needed change is 1 line: `<EditLoopBridge fields={mergedFields} />` |
| `field-renderer.tsx` | Same — 692 lines on your branch, photos have gaps. Needed change: the onFocus/onBlur wiring block (checklist §2f) |
| `command.ts` | Same — needed change: 2 small blocks (checklist §2h) |
| root layout | Branch-specific — needed change: 3 hook lines (checklist §2e) |

**Want complete files for these 4 too?** Photo each file from the client
machine (top to bottom, like the earlier transcription work) and send them —
the complete merged version of each comes back ready to paste. That is the
safe way to get wholesale files for branch-specific code.
