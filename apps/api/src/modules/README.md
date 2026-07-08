# API Modules

Each folder under `src/modules/*` is one backend business domain.

Recommended internal structure per module:

```text
module-name/
  routes.ts
  controller.ts
  service.ts
  repository.ts
  dto.ts
  model.ts
  index.ts
```

Rules:

- the module owns its own data access
- other modules should use a service boundary, not direct table access
- heavy AI modules can later move into `services/*`

