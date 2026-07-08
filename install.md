Install at the root.

This repo uses npm workspaces, so root install is the correct setup:

```powershell
npm.cmd install
```

Why root:

- the root `package.json` defines the workspaces: `apps/*` and `packages/*`
- one root install resolves dependencies for `apps/mobile`, `apps/api`, and `packages/contracts`
- it keeps one dependency tree and one lockfile

Do not start by installing separately inside `apps/api` and `apps/mobile` unless you intentionally stop using workspaces.

Then run from root too:

```powershell
npm.cmd run dev:api
npm.cmd run dev:mobile
```

So the rule for this project is simple: install from root, run workspace scripts from root.

======================================

installation error fix :
I changed the versioning so `npm` would stop drifting into an incompatible React Native package set.

The actual fix was in [apps/mobile/package.json](</C:/Projects/1)Personal_Projects/EndoCare/EndoCare/apps/mobile/package.json>):

Before, some core mobile packages used caret ranges like:

```json
"react-native-screens": "^4.11.1"
```

That allowed npm to install a newer version, and it pulled `react-native-screens@4.25.2`, which requires `react-native >= 0.82.0`.

But your app is on:

- `expo 53.0.0`
- `react-native 0.79.x`

So the install failed.

What I changed:

- pinned Expo/mobile-native packages to exact versions instead of loose `^` ranges
- specifically pinned:
  - `expo` to `53.0.0`
  - `expo-status-bar` to `2.2.3`
  - `react` to `19.0.0`
  - `react-native` to `0.79.7`
  - `react-native-safe-area-context` to `5.4.0`
  - `react-native-screens` to `4.11.1`

Why that helped:

- npm can no longer auto-upgrade `react-native-screens` to `4.25.2`
- that removes the peer dependency conflict with `react-native 0.79.7`
- so the dependency tree becomes consistent again

I also updated [README.md](</C:/Projects/1)Personal_Projects/EndoCare/EndoCare/README.md>) to warn against using `--force` or `--legacy-peer-deps` as the normal install path.

So the short answer is: I didn’t “make npm smarter”; I stopped it from selecting incompatible newer package versions.