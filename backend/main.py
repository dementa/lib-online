from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def home():
    return {"message": "Online Library API is running"}