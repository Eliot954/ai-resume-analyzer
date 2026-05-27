# AI Resume Analyzer

Upload your resume (PDF/DOCX) and get instant AI-powered analysis — skill assessments, career recommendations, and a visual report.

## Features

- **Resume Parsing** — Extract text from PDF and DOCX files
- **AI Analysis** — DeepSeek-powered structured analysis: skills scoring, strengths/weaknesses, career suggestions
- **Visual Report** — Interactive charts (radar, bar) and printable HTML report
- **Modern UI** — React + TypeScript + Tailwind CSS with recharts visualization

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18, TypeScript, Tailwind CSS, Recharts |
| Backend | FastAPI (Python), Pydantic |
| AI | DeepSeek API (OpenAI-compatible) |
| PDF/DOCX | pdfplumber, python-docx |

## Quick Start

### Backend

```bash
cd backend
pip install -r requirements.txt
cp .env.example .env   # edit with your DEEPSEEK_API_KEY
uvicorn app.main:app --reload --port 8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and upload a resume.

## Project Structure

```
resume-analyzer/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI app
│   │   ├── config.py            # Settings (env vars)
│   │   ├── routes/analyze.py    # API endpoints
│   │   ├── services/
│   │   │   ├── analyzer.py      # AI analysis via DeepSeek
│   │   │   ├── extractor.py     # PDF/DOCX text extraction
│   │   │   └── report.py        # HTML report generation
│   │   ├── models/              # Pydantic models
│   │   └── utils/               # Validators & prompts
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/          # React components
    │   ├── hooks/               # Custom hooks
    │   ├── api/                 # API client
    │   └── pages/               # Page layouts
    └── package.json
```

## API

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/analyze` | Upload resume (multipart), returns analysis JSON |

## Links

- GitHub: https://github.com/Eliot954/ai-resume-analyzer
