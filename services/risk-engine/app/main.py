from fastapi import FastAPI

app = FastAPI(title="EndoCare Risk Engine")


@app.get("/health")
def health() -> dict[str, str]:
    return {"service": "risk-engine", "status": "ok"}

