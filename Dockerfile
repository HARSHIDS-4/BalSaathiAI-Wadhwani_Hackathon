FROM python:3.14.4
WORKDIR /app
COPY . .
run pip install -r requirements.txt
EXPOSE 8000
CMD ["uvicorn","app:app","--host","0.0.0.0","--port","8000"]