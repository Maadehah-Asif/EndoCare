# EndoCare Folder Setup

This setup is designed for a first app build in React Native without mixing frontend and backend concerns.

## Frontend vs Backend

`apps/mobile` is the frontend.
It contains screens, components, navigation, local state, and API calls.
This is what the patient uses on the phone.

`apps/api` is the backend.
It contains routes, business logic, database access, authentication, report generation, and integrations.
This is what the mobile app talks to over HTTP.

`services/*` is for future extracted services.
Use this when one module becomes heavy, independent, or ML-specific.
Examples: `risk-engine`, `imaging-engine`.

## Recommended Repo Shape

```text
EndoCare/
  apps/
    mobile/
      src/
        modules/
          onboarding/
          symptomTracking/
          riskAssessment/
          imagingAnalysis/
          exerciseCoach/
          medicationTracking/
          lifestyleAnalytics/
          educationHub/
          aiChatbot/
          communityForum/
          careNavigation/
          reportGeneration/
          notifications/
          userProfile/
        shared/
        navigation/
          RootNavigator.tsx
          AuthStack.tsx
          MainTabs.tsx
        services/
          apiClient.ts
          authService.ts
          storage.ts
        App.tsx
        index.ts
      assets/
    api/
      src/
        modules/
          onboarding/
            onboarding.controller.ts
            onboarding.service.ts
            onboarding.repository.ts
            onboarding.routes.ts
            onboarding.model.ts
            onboarding.dto.ts
          ...
        shared/
        ml-services/
          riskModelClient.ts
          imagingModelClient.ts
        app.ts
        server.ts
  packages/
    contracts/
  services/
    risk-engine/
    imaging-engine/
```

## What Goes Where

Inside each mobile module, keep code like this:

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

Inside each backend module, keep code like this:

```text
module-name/
  module-name.controller.ts
  module-name.service.ts
  module-name.repository.ts
  module-name.routes.ts
  module-name.model.ts
  module-name.dto.ts
  index.ts
```

## How To Grow Later

Start as a modular monolith:

- one mobile app
- one backend app
- shared contracts
- clear feature boundaries

Later, if one module needs to become independent:

1. Keep the mobile app unchanged.
2. Move that backend module into `services/<service-name>`.
3. Keep the same API contract.
4. Let `apps/api` call that new service.

That gives you microservices without rewriting your whole app.

## Rule To Keep The Code Clean

- mobile modules should not directly depend on other mobile modules
- backend modules should not directly read each other's database tables
- shared types go in `packages/contracts`
- cross-module communication should happen through APIs or service contracts
