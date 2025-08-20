# QA Artifacts

- Postman collection: `docs/qa/postman-collection.json`
- k6 script: `docs/qa/k6-script.js`

Run k6 locally (install k6):

```bash
k6 run docs/qa/k6-script.js
```

Goal: ensure cached /api/drills responds quickly (p95 < 150ms in local dev might vary).
