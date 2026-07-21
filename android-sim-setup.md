Here's the full step-by-step for Windows. Take your time — this setup takes ~20-30 min mostly due to download size, but once done, it "just works" every time.

## Step 1: Download Android Studio

1. Go to: https://developer.android.com/studio
2. Click **Download Android Studio** (accept terms)
3. Run the installer (`.exe` file) once downloaded

## Step 2: Install Android Studio

1. Run the installer, keep clicking **Next** with default options
2. On the "Install Type" screen, choose **Standard**
3. Let it download the Android SDK, emulator, and system images (this is the big download — can take 10-20 min depending on internet speed)
4. Click **Finish** when done — Android Studio will open

## Step 3: Create a Virtual Device (the emulator)

1. On the Android Studio welcome screen, click **More Actions** → **Virtual Device Manager**
   (or if a project opens automatically, go to **Tools → Device Manager**)
2. Click **Create Device**
3. Choose a phone model — pick **Pixel 7** or **Pixel 6** (good defaults)
4. Click **Next**
5. Choose a system image — pick the one with **API level 34** (or the latest one shown), it'll say something like "UpsideDownCake" or "VanillaIceCream"
   - If it says "Download" next to it, click that first, wait for it to finish
6. Click **Next** → **Finish**

You now have a virtual Android phone saved.

## Step 4: Launch the emulator

1. In **Device Manager**, find your new device in the list
2. Click the **▶ (play) button** next to it
3. Wait ~30-60 seconds — a phone screen window will pop up and boot up like a real Android phone

Leave this window open.

## Step 5: Set environment variables (needed so terminal commands can find the SDK)

1. Search **"Environment Variables"** in Windows search → click **"Edit the system environment variables"**
2. Click **Environment Variables** button
3. Under **User variables**, click **New**:
   - Variable name: `ANDROID_HOME`
   - Variable value: `C:\Users\<YourUsername>\AppData\Local\Android\Sdk`
   (replace `<YourUsername>` with your actual Windows username — check this path exists first)
4. Find the **Path** variable in the same list → click **Edit** → **New**, and add these two lines:
```
%ANDROID_HOME%\platform-tools
%ANDROID_HOME%\emulator
```
5. Click **OK** on everything to save
6. **Close and reopen** any terminal/VS Code windows you have open (needed for the new PATH to load)

## Step 6: Verify it's working

Open a fresh terminal (PowerShell) and run:
```bash
adb devices
```
With the emulator still running, you should see something like:
```
List of devices attached
emulator-5554    device
```

## Step 7: Run your app on the emulator

With the emulator still open, go to your project:
```bash
npm --workspace @endocare/mobile start -- --clear
```
Then press **`a`** in the terminal — it should automatically detect the running emulator and install/launch your app on it.

---

Go through these steps and let me know exactly where it gets stuck (if anywhere) — especially step 3 (system image download) and step 5 (environment variables) are the two most common places people hit snags.
===================================================
Run it in this order from the repo root:

```powershell
cd "C:\Projects\1)Personal_Projects\EndoCare\EndoCare"
```

First, make sure env files exist.

Backend:

```powershell
Copy-Item apps/api/.env.example apps/api/.env -ErrorAction SilentlyContinue
```

Frontend:

```powershell
Copy-Item apps/mobile/.env.example apps/mobile/.env -ErrorAction SilentlyContinue
```

Important for Android emulator: edit `apps/mobile/.env` and set this, not `localhost`:

```env
EXPO_PUBLIC_API_BASE_URL=http://10.0.2.2:4000
```

`10.0.2.2` is how the Android emulator reaches your PC.

Then install once from root:

```powershell
npm.cmd install
```

Now use 2 terminals.

Terminal 1: backend

```powershell
npm.cmd run dev:api
```

Expected:
- MongoDB connected
- EndoCare API listening on `http://localhost:4000`

Quick test in another terminal if needed:

```powershell
Invoke-WebRequest http://localhost:4000/health
```

Terminal 2: frontend

```powershell
npm.cmd --workspace @endocare/mobile start -- --clear
```

Then:

- keep the Android emulator open
- press `a` in the Expo terminal

That should launch the app in the emulator.

What you should see in the app:

- `EndoCare`
- a status card at the top
- if backend is reachable: `Project connected`
- if frontend opened but backend is not reachable: `Frontend only`

Most common issue:
- if the app opens but cannot reach backend, your mobile `.env` is probably still using `http://localhost:4000` instead of `http://10.0.2.2:4000`

If anything fails, send me the exact output from:
- backend terminal
- Expo terminal
- emulator screen