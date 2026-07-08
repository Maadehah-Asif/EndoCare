# Mobile Modules

Each folder under `src/modules/*` represents one product feature.

Recommended internal structure per module:

```text
module-name/
  components/
  screens/
  hooks/
  store/
  api/
  types.ts
  index.ts
```

Keep feature code inside its module unless it is truly shared across the whole app.

