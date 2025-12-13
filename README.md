# Wedding AI Deployment Guide

## Architecture
- **Frontend**: Next.js (Vercel)
- **AI Service**: Python FastAPI (Cloud Run)
- **Legacy Backend**: Node.js (Optional, not deployed for AI image gen)

## Deployment Steps

### 1. AI Service (Cloud Run)
This service handles Gemini API calls for image generation.

**Directory**: `ai_service`
**Requirements**:
- GCP Project with Cloud Run API enabled
- Gemini API Key

**Deploy Command (Example using gcloud)**:
```bash
cd ai_service
gcloud run deploy wedding-ai-backend \
  --source . \
  --region asia-northeast3 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=YOUR_API_KEY
```
*Note: `--allow-unauthenticated` is required for the frontend to call it publicly (unless using private networking, but public HTTPS is easiest).*

**Environment Variables**:
- `GEMINI_API_KEY`: Required.
- `PORT`: Automatically set by Cloud Run (default 8080).

### 2. Frontend (Vercel)
**Directory**: `frontend`

**Environment Variables**:
- `BACKEND_BASE_URL`: The URL of the deployed Cloud Run service.  
  Example: `https://wedding-ai-backend-xxxxx.run.app`  
  *Do not include the trailing slash or `/ai/generate-image` path, just the base origin.*

### 3. Local Development
- **Run AI Service**:
  ```bash
  cd ai_service
  pip install -r requirements.txt
  python main.py
  # Runs on http://localhost:8000
  ```
  *Make sure `GEMINI_API_KEY` is set in your environment or `.env` file.*

- **Run Frontend**:
  ```bash
  cd frontend
  npm run dev
  # Runs on http://localhost:3000
  ```
  The proxy in `route.ts` defaults to `http://localhost:8000` when `BACKEND_BASE_URL` is missing and `NODE_ENV` is not production.

## End-to-End Test Scenarios

### 1. Local Testing
1. **Start Backend**: Run `python main.py` in `ai_service` (ensure `GEMINI_API_KEY` is set). Confirm it listens on port 8000.
2. **Start Frontend**: Run `npm run dev` in `frontend`. Confirm it listens on port 3000.
3. **Action**: Open browser to `http://localhost:3000`, go to the image generation page, enter a prompt, and click "Simulate" (or Generate).
4. **Verification**:
   - Check Backend logs: Should see `POST /ai/generate-image` request.
   - Check Frontend Network Tab: Request to `/api/generate-image` should return 200 OK.
   - Response: JSON should contain `images` array with a base64 string.
   - UI: Image should display correctly.

### 2. Production Deployment Verification
1. **Cloud Run**: Verify `ai_service` is deployed and accessible via its URL (e.g., https://wedding-ai-backend-xyz.run.app).
2. **Vercel**: Verify `frontend` is deployed and `BACKEND_BASE_URL` environment variable is set to the Cloud Run URL.
3. **Action**: Open the Vercel deployment URL, navigate to generate page, click "Simulate".
4. **Verification**:
   - Network Tab: Inspect the request to `/api/generate-image`.
   - Status: Should be 200 OK.
   - Response Payload: Should include valid `images` list.
   - If 500 Error: Check Vercel Function logs for "CRITICAL: BACKEND_BASE_URL..." or "Backend Error". Check Cloud Run logs for application errors.
