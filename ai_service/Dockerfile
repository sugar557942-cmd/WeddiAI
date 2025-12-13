# ai_service/Dockerfile
FROM python:3.10-slim

# 1. Set working directory
WORKDIR /app

# 2. Key environment vars to prevent buffering
ENV PYTHONUNBUFFERED=1

# 3. Copy requirements and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 4. Copy source code
COPY . .

# 5. Expose default Cloud Run port (optional, but good practice)
EXPOSE 8080

# 6. Run uvicorn
# Cloud Run injects $PORT (default 8080). We must listen on 0.0.0.0
CMD ["sh", "-c", "uvicorn main:app --host 0.0.0.0 --port ${PORT:-8080}"]
