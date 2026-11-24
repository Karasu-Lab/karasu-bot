## Rules

- API routing: versioned endpoints are served under `/api/v1/<path>`, and unversioned endpoints (such as `/api/version`) are served directly under `/api/`. `src/app.ts` composes all endpoints into these route groups.
- File naming: name each endpoint file after the endpoint, in lowercase, with spaces converted to hyphens (for example, "Health Check" becomes `health-check.ts`).
- File placement: create one file per endpoint, and place versioned endpoints in `src/api/v1/` and unversioned endpoints directly in `src/api/`. Do not use a `routes` directory.
