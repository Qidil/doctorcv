<p align="center">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="app/icon.svg">
    <img src="public/doctorcv-logo.svg" alt="Doctor CV logo, a stethoscope that spells C and V" height="96">
  </picture>
</p>

<h1 align="center">Doctor CV</h1>

<p align="center">English | <a href="README.id.md">Bahasa Indonesia</a></p>

<div align="center">

**Tech stack**

[![Next.js](https://img.shields.io/badge/Next.js-1A1A1A?style=flat-square&logo=nextdotjs&logoColor=FFFFFF)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-1A1A1A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-1A1A1A?style=flat-square&logo=typescript&logoColor=3178C6)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-1A1A1A?style=flat-square&logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com)
[![Node.js](https://img.shields.io/badge/Node.js-1A1A1A?style=flat-square&logo=nodedotjs&logoColor=5FA04E)](https://nodejs.org)
[![Dexie.js][badge-dexie]](https://dexie.org)
[![pdf.js][badge-pdfjs]](https://mozilla.github.io/pdf.js/)
[![Motion][badge-motion]](https://motion.dev)
[![OpenRouter](https://img.shields.io/badge/OpenRouter-1A1A1A?style=flat-square&logo=openrouter&logoColor=6467F2)](https://openrouter.ai)
[![Upstash](https://img.shields.io/badge/Upstash-1A1A1A?style=flat-square&logo=upstash&logoColor=00E9A3)](https://upstash.com)
[![Vitest](https://img.shields.io/badge/Vitest-1A1A1A?style=flat-square&logo=vitest&logoColor=6E9F18)](https://vitest.dev)
[![Testing Library](https://img.shields.io/badge/Testing_Library-1A1A1A?style=flat-square&logo=testinglibrary&logoColor=E33332)](https://testing-library.com)
[![ESLint](https://img.shields.io/badge/ESLint-1A1A1A?style=flat-square&logo=eslint&logoColor=8080F2)](https://eslint.org)

</div>

> [!IMPORTANT]
> Doctor CV is still in development and is not ready for an official release. There is no hosted version
> yet. You are welcome to try it on your own machine: follow [Getting started](#getting-started), then run
> analyses with your own OpenRouter key in `.env.local`, or with a key from any supported provider in
> Settings. Features, the storage format, and the interface can still change, so results saved in your
> browser may not carry over to a later version.

Upload a PDF CV, choose how to check it, and get a score with the exact lines to change. The app runs in
English and Indonesian.

> **The score is an estimate.** Most of the scores and suggestions come from an AI model working from a
> rule-based rubric; the formatting check and the notes on hidden text and typography come from rules
> alone. None of it has been tested against the applicant tracking systems that employers use, so treat
> the result as a guide for revising your CV, not as a promise that it will pass a screening.

## What it does

- *General review + suggested roles* needs only the PDF and also lists the 5 roles that fit it best.
  *Match a job posting* compares the CV with a pasted job description and points out missing keywords and
  skills.
- The report gives an overall score from 0 to 100, six weighted checks, the main weaknesses, and suggestions
  ordered from "must change" to "optional", quoting the CV line they refer to when there is one.
- The server renders each page as an image and sends it with the result, so your pages sit next to the
  report.
- Every analysis is saved in IndexedDB in your browser. Reopen it without the network, delete it, or run a
  new analysis of a stored CV without choosing the file again.
- In Settings you can enter your own key and a model ID from any provider. The app recognizes OpenRouter,
  OpenAI, Anthropic, Google Gemini, Groq, Mistral, DeepSeek, xAI, Perplexity, Fireworks, Cerebras, Hugging
  Face, and NVIDIA from the key (or the model) and knows where to send it. For any other OpenAI-compatible
  provider, or a model server of your own, add its endpoint address. The free quota itself always runs on
  the app's OpenRouter key, and only it has a daily limit.

## Where your data goes

| Data | Where it lives |
| --- | --- |
| The PDF | Sent to `POST /api/analyze`, read in memory with pdf.js, and discarded after the response. |
| Hidden text in the PDF | Detected on the server (low contrast, invisible or transparent, tiny, or off the page), left out of the analysis, and reported so you can delete it. It never reaches the AI. |
| What the AI receives | The visible CV text and, when matching a posting, the job title and description, sent with the prompt to OpenRouter (free quota) or to the provider of your own key. |
| Results, page images, the PDF for later runs | IndexedDB in your browser. Private browsing that blocks IndexedDB keeps the result on screen until you leave the page, without saving it. |
| Your API key | `localStorage` in your browser, with its model and endpoint address. It is sent only with your analyses, which the server forwards to the provider recognized from the key (a key the app cannot place is refused), and to that provider's own key check, which runs from your browser. |
| An endpoint address | Called by the server only on the checked address, without following redirects. By default it must be HTTPS to a public host; plain HTTP and local or private-network hosts need `ALLOW_PRIVATE_ENDPOINTS=true`, and cloud metadata addresses are always refused. |
| Usage counters | Upstash Redis on the server: a daily count for the free quota and an hourly request count, keyed by a hashed IP address. No CV data. |

## Languages

The landing page lives at `/en` (the default) and `/id`, and the workspace at `/en/app` and `/id/app`. The
language switcher in the header changes the interface, the server's messages, and the language the AI writes
in, and the choice is remembered in a cookie. Quoted CV text stays exactly as it is in the CV. A stored
result keeps the language it was written in.

## Getting started

Requirements: Node.js 22.22.2 or later on the 22 line, 24.15 or later on the 24 line, or 26 and up (the
range the jsdom test environment supports), and npm. Developed on Node.js 24.18.

```bash
git clone https://github.com/Qidil/doctorcv.git
cd doctorcv
npm install
cp .env.example .env.local   # then fill in OPENROUTER_API_KEY at least
npm run dev
```

Open <http://localhost:3000>; it redirects to the landing page at `/en` or in the language you picked last,
and the workspace is at `/en/app`. Without Upstash credentials, development counts the quota in memory, so
the counters reset when the dev server restarts.

## Environment variables

Every variable is optional in development. `.env.example` lists them with comments.

| Variable | Default | Purpose |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | none | The key behind the free quota. Without it, only personal keys can analyze. |
| `OPENROUTER_MODEL` | `openrouter/free` | First model of the chain. |
| `OPENROUTER_FREE_MODELS` | list in `lib/api/config.ts` | Comma-separated fallback models, tried in order. |
| `OPENROUTER_TIMEOUT_MS` | `120000` | Time budget for one analysis across the whole chain. |
| `DAILY_ANALYSIS_LIMIT` | `10` | Free-quota analyses per client per day, reset at 00:00 GMT+8. Personal keys are not counted. |
| `HOURLY_REQUEST_LIMIT` | `20` | Requests per client per clock hour, with any key. |
| `QUOTA_HASH_SECRET` | development value | Secret for hashing client IPs in the counters. Required in production. |
| `ALLOW_PRIVATE_ENDPOINTS` | `false` | `true` lets endpoint addresses in Settings use plain HTTP and local or private-network hosts, for a model server of your own. Only on a server you control. |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | none | The counters' store. `KV_REST_API_URL` and `KV_REST_API_TOKEN` are read too. Required in production for the free quota and for endpoint addresses in Settings. |

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server at <http://localhost:3000>. |
| `npm run build` | Production build. |
| `npm start` | Serves the production build. |
| `npm test` | Unit and component tests (Vitest, jsdom, fake-indexeddb). |
| `npm run typecheck` | Generates route types and runs `tsc --noEmit`. |
| `npm run lint` | ESLint with the Next.js rules. |

The end-to-end journey in `test/e2e/workflow.e2e.js` has no npm script. It runs through the Playwright MCP
against `npm run build` then `npm start -- -p 3100`, and uses the real AI with a fictional CV it builds itself.
Pass the file to `browser_run_code_unsafe` as `filename`: the first call starts the run, and later calls
return the checks so far and then the result. A run takes about a minute.

## Deploying

The app targets Vercel; any Node.js host that runs Next.js 16 should work. Before a public deployment:

- Leave `DAILY_ANALYSIS_LIMIT` and `HOURLY_REQUEST_LIMIT` unset, or set them to 10 and 20. Raised values
  are for local testing only.
- Set `QUOTA_HASH_SECRET` and the Upstash credentials. Without them, production turns the free quota off,
  only personal keys from recognized providers work, and endpoint addresses in Settings are refused, since
  an endpoint without the hourly limit would let anyone use the host to relay requests.
- Leave `ALLOW_PRIVATE_ENDPOINTS` off. A visitor's local model server is out of the host's reach anyway,
  and turning it on would let anyone use the host to reach its own private network.
- Put the function region next to the Upstash database, so each counter call stays short.
- The route runs for up to 180 seconds (`maxDuration`), which on Vercel Hobby needs Fluid compute.
- Requests and responses must stay under Vercel's 4.5 MB limit; the 4 MB PDF cap and the page image budget
  keep them there.
- After `npm run build`, check that `.next/server/app/api/analyze/route.js.nft.json` lists the pdf.js
  standard fonts and the `@napi-rs/canvas` binary for the target platform.
- Consider the host's own rate limiting (for example the Vercel Firewall) for `/api/analyze`.

## Project layout

| Path | Contents |
| --- | --- |
| `app/[lang]/` | The landing page and the root layout, built for `/en` and `/id`. The workspace is in `app/[lang]/app/` (`/en/app`, `/id/app`). |
| `app/api/analyze/` | The analysis route. |
| `app/icon.svg`, `public/` | The favicon and the logo (`public/doctorcv-logo.svg`), both plain SVG. |
| `proxy.ts` | Sends paths without a language to the saved one, or to `/en`. Tested in `proxy.test.ts`. |
| `components/` | The dashboard and its parts: upload, results, page images, settings, history. The landing page is in `landing/`, and `brand-logo.tsx` renders the logo. |
| `components/test-utils/` | Test render helpers and fixtures. |
| `lib/pdf/` | PDF text extraction and page rendering (pdf.js on the server). |
| `lib/ats/` | Hidden-text rules, the scoring rubric, and report assembly. |
| `lib/ai/` | Prompts, the model chain with failover, provider requests, the custom endpoint guard, answer parsing, and the counters. |
| `lib/api/` | Request handling, configuration, and the error catalog in both languages. |
| `lib/client/` | Browser code: the analysis request, the personal key, and history. |
| `lib/db/` | The IndexedDB schema (Dexie). |
| `lib/i18n/` | Interface dictionaries, language negotiation, and date and size formatting. |
| `lib/drawably/` | The hand-drawn sketch components (Drawably), copied into the repo so the build needs no extra package. |
| `types/` | Shared types for the API, the report, and storage. |
| `test/e2e/` | `workflow.e2e.js`, the end-to-end user journey run through the Playwright MCP. |

The `.agents/`, `.codex/`, `.opencode/`, and `anti-slop/` folders hold the AI-assisted workflow used to
build the project; the app does not use them.

<!-- Badge images with embedded logos (shields.io). Kept here so the top of the file stays readable. -->
[badge-dexie]: https://img.shields.io/badge/Dexie.js-1A1A1A?style=flat-square&logo=data%3Aimage%2Fpng%3Bbase64%2CiVBORw0KGgoAAAANSUhEUgAAADcAAAAoCAYAAABaW2IIAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAASGSURBVGhDzZlZrF1TGMdrbtUsrcSQmKfcoNJQKREhMdSD8oCYJfrgQa%2BUNoZnRIuERAURczRIBK3hgaaaItKgSkiFimgbQ00x8%2Fvkf%2FvtY52v65yz9%2B7e9%2Fol6%2BHe863%2FWv9z1vitceNqYGbbmNl4M9spKTvGuP81ZratmR0OXADcCNwHLAbeAj4B1gMbvHwBXJzWB3Y2sxNVgOllShFrZscA%2BwI7pJpbhJltB5wN3A18CPxoJQFWpFrA8cBfXv4sWYrYX4BvgI%2BB54B5wHGpfmmAicBs4IPY6bIArwXNE2LMlgD8DrwBXAVMSNvqCXAYsCyK5fAGNBw%2FAlZ6eRdYDpwRdKfF%2Bg2yFDglbW8zgAM0f2JNAfzq8%2BsB4GqJAUcC%2B5nZbvr2vEw0s60z2m2aU%2F80hOfEdjsAj2Qq6de4FhjSyhjrlKVtcwXA%2FNj2CMC6JOgnH8%2BNrFD9zPlq%2BzjwZFKeAJ4CXgHeBtbGer0Abo7tqwPfJwHfAifHmLr0M2dmt8X4CLCXT4X56Y%2BQw4fojCjwXQj6G3haiwOwR1dwRfqZAxbE%2BH5ozzOzh6NOCrAG2DOt1GUuxYM1dK4zs9PMbH8z2117YVfLPRhg7o4YXwbghqiVAlyfBvc0F%2FHV81Pfa5YAz3p5MG4Drt24OQHcHvUK%2FKS0acRVMdcPNnFe6ERb5rT9vB81C4CLisBGzAng1dCJVswJnWOjZoGmUhHUpLlloQOtmdPc1xCMugL4EtilaXOvpx1o05wAFkVd4Sv%2BdAWUPvUPYgzMXRN1Ey5XwGfxv3UZA3NnRt0CbRkKOF8%2FY%2FywDmNgbhrwT9QWHX032Pd4U4YxMDekS23UFsoadALN7EDgId1%2BY2BZtLmHxts2dyiwMWoLYGGMV4VDgLl%2BCvk5VuqHrk9Bq21zR%2BnUFLVF1y%2BXAzgauAK4F3hTi4%2B%2BqdwcBd4Djgj12zY3NdcXMaIPDMtArJhDG6OnJE7SSqXjluarmZ2Tu0GMgrmzom4BcJMCfvM%2FXmryLidGwdxw1C0ArlRAZ0JqWQVe0Lmt615Uk1Ew91jUFekJJXv88gyXLq3KF57uq6mSrKXucqJNc8py6%2FoVdQXwlZnt2tNcxPMrOpAqt6G73CLgUc973Kl5GDvQpjngwqhZADxTBJUyNwjNXS0yoQOtmPOs%2BMqoWQBcOhLYlDkBvJh2oi1zWgmjXoFPp8lFYJPmWr%2FPAZf02tuc%2F7JqZvZD%2FLQubZ4ttUCo470OygL4HJjUqVQl8TmIiuZuTWNzKDnsp6Q5enGKGhEdKKLAwhhUl4rm3lEWy1fatCwA7vd3QB3psmfHSHYk%2BP6VfQipShVzTQLck3uIGcHPi8tjpRosDbqtmwNuMbOt0nY3Q6cPLbG%2Bu9dl1MwBq4GZaXsDAfYxs1kaYukjSRmAu4JW4%2BaUjFV%2BJHcLqQRwsLK3vgQ%2FD6wCvlbGzFPrf3imWaeTl4G9Q3093NfGdfXytMJfemaUfi6uiplt7y%2BqB%2FkSrQf9U4EpuXGvJyil2FSAywYVj9ON5Fy%2FLx6rfavuA%2Bi%2FaMXHLs0OdykAAAAASUVORK5CYII%3D
[badge-pdfjs]: https://img.shields.io/badge/pdf.js-1A1A1A?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2C77u%2FPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI%2BPHBhdGggZD0iTSA0LjgsMC41IDMyLjEsNC42IDU5LjIsMC41IDU0LjcsNTcuOCAzMi4xLDYzLjUgOC4zLDU3LjggeiIgZmlsbD0iI2U1ZTdlOCIgc3Ryb2tlPSIjY2NjY2NjIiAvPjxwYXRoIGQ9Ik0gMzIuMSwxMC43IDUzLjksNi44IDUxLDUzLjggMzIuMSw1OC41IHoiIGZpbGw9IiNmZmZmZmYiIC8%2BPHJlY3Qgd2lkdGg9IjM0IiBoZWlnaHQ9IjE5LjEiIHg9IjMuOCIgeT0iMjIuNCIgZmlsbD0iI2ZmMjYwMCIgLz48cmVjdCB3aWR0aD0iMjMuNSIgaGVpZ2h0PSIxOS4xIiB4PSIzNi44IiB5PSIyMi40IiBmaWxsPSIjZmY1MDFhIiAvPjxnIHRyYW5zZm9ybT0ibWF0cml4KDAuNCwwLDAsMC40LDU4LjYsOS43KSI%2BPHBhdGggZD0ibSAtMTIwLjUsMzQuNiAwLDM1LjIgNi41LDAgMCwtNS45IDAsLTYgOC45LDAgNC4yLC0zLjcgMCwtNy43IDAsLTcuNyAtNC4yLC00LjEgLTE1LjMsMCB6IG0gNi41LDYuOCA2LjIsMCAwLDEwLjIgLTYuMiwwIDAsLTEwLjIgeiIgZmlsbD0iI2ZmZmZmZiIgLz48cGF0aCBkPSJtIC05OC4xLDM0LjYgMCwzNS4yIDE2LjEsMCAzLjgsLTMuNiAwLC0yOCAtNCwtMy42IC0xNS45LDAgeiBtIDYuOCw2LjggNi44LDAgMCwyMS42IC02LjgsMCAwLC0yMS42IHoiIGZpbGw9IiNmZmZmZmYiIC8%2BPHBhdGggZD0ibSAtNzQuOSwzNC42IGMgNS41LDAgMTEsMCAxNi41LDAgMCwyLjMgMCw0LjUgMCw2LjggLTMuNCwwIC02LjgsMCAtMTAuMiwwIDAsMi41IDAsNC45IDAsNy40IDIuOSwwLjEgNS45LC0wLjEgOC44LDAgbCAwLDMuNCAwLDMuNCBjIC0yLjksMC4xIC01LjksLTAuMSAtOC44LDAgbCAwLDcuMSAwLDcuMSBjIC0yLjEsMCAtNC4yLDAgLTYuMiwwIDAsLTExLjcgMCwtMjMuNSAwLC0zNS4yIHoiIGZpbGw9IiNmZmZmZmYiIC8%2BPHBhdGggZD0ibSAtNDIuOSw2Ny45IC0yLjIsLTEuOCBjIDAsLTIgMCwtNCAwLC02IDIuMiwwIDQuNCwwIDYuNSwwIDAsMC45IDAsMS45IDAsMi44IDEuOSwwIDMuOCwwIDUuNywwIDAsLTkuNSAwLC0xOC45IDAsLTI4LjQgMi4yLDAgNC40LDAgNi41LDAgMCwxMC41IDAsMjEgMCwzMS41IC0xLjUsMS4yIC0yLjksMi41IC00LjQsMy43IC0zLjMsMCAtNi43LDAgLTEwLDAgLTAuNywtMC42IC0xLjUsLTEuMiAtMi4yLC0xLjggeiIgZmlsbD0iI2ZmZmZmZiIgLz48cGF0aCBkPSJtIC0yMS4zLDY3LjkgLTIuMSwtMS44IDAsLTYgYyAyLjEsMCA0LjQsMCA2LjUsMCAwLDAuOSAwLDEuOSAwLDIuOCAyLjMsMCA0LjUsMCA2LjgsMCAwLC0yLjUgMCwtNC45IDAsLTcuNCAtMy4yLDAgLTYuNCwwIC05LjYsMCBsIC0zLjcsLTMuNyAwLC02LjggMCwtNi44IDMuNywtMy43IGMgMy45LDAgNy43LDAgMTEuNiwwIGwgNC4zLDMuNyBjIDAsMS44IDAsMy42IDAsNS40IC0yLjEsMCAtNC4yLDAgLTYuMiwwIDAsLTAuOCAwLC0xLjUgMCwtMi4zIC0yLjMsMCAtNC41LDAgLTYuOCwwIDAsMi41IDAsNC45IDAsNy40IDMsMCA2LDAgOSwwIDEuNCwxLjIgNC4xLDMuNiA0LjEsMy42IDAsNC42IDAsOS4xIDAsMTMuNyBsIC0yLjEsMS45IC0yLjEsMS45IC01LjUsMCAtNS41LDAgeiIgZmlsbD0iI2ZmZmZmZiIgLz48L2c%2BPC9zdmc%2B
[badge-motion]: https://img.shields.io/badge/Motion-1A1A1A?style=flat-square&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2C77u%2FPHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHZpZXdCb3g9IjAgMCA2NCA2NCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHJ4PSIxNCIgZmlsbD0iIzBCMEIwQyIgLz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMCAyNC4yKSBzY2FsZSgxLjczNSkiPjxwYXRoIGQ9Ik0gOS41ODcgMCBMIDQuNTcgOSBMIDAgOSBMIDMuOTE3IDEuOTcyIEMgNC41MjQgMC44ODMgNi4wMzkgMCA3LjMwMSAwIFogTSAyMC43OTQgMi4yNSBDIDIwLjc5NCAxLjAwNyAyMS44MTcgMCAyMy4wNzkgMCBDIDI0LjM0MSAwIDI1LjM2NCAxLjAwNyAyNS4zNjQgMi4yNSBDIDI1LjM2NCAzLjQ5MyAyNC4zNDEgNC41IDIzLjA3OSA0LjUgQyAyMS44MTcgNC41IDIwLjc5NCAzLjQ5MyAyMC43OTQgMi4yNSBaIE0gMTAuNDQzIDAgTCAxNS4wMTMgMCBMIDkuOTk3IDkgTCA1LjQyNyA5IFogTSAxNS44NDEgMCBMIDIwLjQxMSAwIEwgMTYuNDk0IDcuMDI4IEMgMTUuODg3IDguMTE3IDE0LjM3MiA5IDEzLjExIDkgTCAxMC44MjUgOSBaIiBmaWxsPSIjRkZGRkZGIiAvPjwvZz48L3N2Zz4%3D
