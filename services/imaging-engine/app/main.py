from fastapi import FastAPI

app = FastAPI(title="EndoCare Imaging Engine")


@app.get("/health")
def health() -> dict[str, str]:
    return {"service": "imaging-engine", "status": "ok"}
