# Job Board

A full-stack job search app that pulls live listings from the Adzuna API, with filters, pagination and a metrics dashboard.

Status: **Archived**

## Why
Job sites each have their own search. This is the base for a single search across job providers, starting with Adzuna.

## How it works
- **Provider layer.** The FastAPI backend wraps the Adzuna API behind its own job schema, so the frontend never sees a provider's format.
- **Storage and pagination.** Listings are stored in MySQL through SQLAlchemy, with offset pagination on the server.
- **Search UI.** Keyword, location and multi-select filters plus a salary slider, validated with Zod and React Hook Form.
- **Metrics.** Recharts dashboards show salary and listing trends for the current search.

## Key design decisions
| Decision | Why | Trade-off |
|---|---|---|
| Own job schema in front of Adzuna | New providers plug in without frontend changes | Mapping code to write for each provider |
| Pagination on the server | Keeps responses small for large result sets | Deep pages get slower with offset pagination |

## Stack
Next.js 14 · React · TypeScript · Zustand · Tailwind + shadcn · FastAPI · SQLAlchemy · MySQL · Redis

## Run locally
Needs a free [Adzuna API key](https://developer.adzuna.com), plus MySQL and Redis running locally. Copy `server/.env.example` and `app/.env.example` to `.env` in the same folders and fill them in.
```bash
# terminal 1
cd server && pip install -r requirements.txt && uvicorn app.main:app --reload
# terminal 2
cd app && pnpm install && pnpm dev
```

## What I'd improve next
- Add a second provider to prove the abstraction works
- Cursor-based pagination
- Docker Compose for one-command setup
