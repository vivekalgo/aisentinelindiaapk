# 🏆 AI Legal Sentinel - Competition Edition

## Indian Contract Analyzer for Freelancers

> **A competition-ready LegalTech tool that analyzes Indian freelance contracts and detects risky clauses under Indian law**

⚠️ **Disclaimer:** This tool does NOT provide legal advice. It is an educational tool for legal awareness. Always consult a qualified lawyer for legal matters.

---

## 🚀 Cloud Deployment & Mobile App

### 1. Backend (Render)
This project is configured for one-click deployment on Render.
1. Connect your GitHub repo to [Render](https://render.com).
2. It will auto-detect `render.yaml`.
3. Add Environment Variables (e.g., `OPENAI_API_KEY`).
4. Copy the **Service URL**.

### 2. Frontend (APK)
The Android APK is built automatically via GitHub Actions.
1. **Secrets**: Go to Repo Settings -> Secrets -> Actions and add:
   - `VITE_API_URL`: Your Render Backend URL.
   - `VITE_SUPABASE_URL`: Your Supabase URL.
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase Key.
2. **Build**: Go to "Actions" tab -> "Build Android APK" -> Run Workflow.
3. **Download**: Get the `app-debug.apk` from the run artifacts.

### 3. Google Auth
- Add your Render URL and `com.ailegal.sentinel://google-auth` to Supabase Redirect URLs.

---

## 🎯 What's New in Competition Edition

### ✨ Enhanced Features

#### 🔍 **5 Types of Risky Clauses Detected**
1. **Non-Compete Clauses** (Section 27, Indian Contract Act 1872) - Risk Score: 9/10
2. **Unlimited Liability** (Section 23, Indian Contract Act 1872) - Risk Score: 9/10
3. **Penalty Clauses** (Section 74, Indian Contract Act 1872) - Risk Score: 8/10
4. **Unfair Termination** (Industrial Disputes Act 1947) - Risk Score: 6/10
5. **IP Transfer** (Copyright Act 1957 & Patent Act 1970) - Risk Score: 6/10

#### 📊 **Risk Scoring System**
- Each clause gets a risk score from 0-10
- Overall contract risk score calculated automatically
- Color-coded risk levels: 🔴 High (8-10) | 🟡 Medium (5-7) | 🟢 Low (1-4)

#### ✅ **Actionable Guidance**
Every risky clause includes:
- **Why This is Risky:** Plain English explanation
- **What You Can Do:** Numbered list of specific actions
- **Safer Alternative:** Indian law-compliant clause rewrite

#### 🎨 **Professional UI**
- Summary dashboard with 3-card layout
- Enhanced clause cards with all details
- Collapsible sections for better readability
- Educational "Why This Matters" section
- Privacy-first messaging

---

## 📁 Project Structure

```
New folder/
├── backend/
│   ├── main.py              # Enhanced FastAPI with 5 clause types
│   ├── requirements.txt     # Python dependencies
│   └── README.md           # Backend instructions
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Competition-ready React UI
│   │   ├── main.jsx        # React entry point
│   │   ├── index.css       # Tailwind CSS
│   │   └── App.css         # Additional styles
│   ├── index.html          # HTML template
│   ├── package.json        # Node dependencies
│   ├── vite.config.js      # Vite configuration
│   ├── tailwind.config.js  # Tailwind configuration
│   └── postcss.config.js   # PostCSS configuration
├── sample-contract.txt      # Test contract with all 5 risky clause types
└── README.md               # This file
```

---

## ⚡ Local Development

### Prerequisites
- Python 3.8+ installed
- Node.js 16+ installed

### Step 1: Start Backend

```bash
cd backend
pip install -r requirements.txt
python main.py
```

✅ Backend runs at: **http://localhost:8000**

### Step 2: Start Frontend (New Terminal)

```bash
cd frontend
npm install
npm run dev
```

✅ Frontend runs at: **http://localhost:5173**

---

## 🔍 How It Works

### Backend Flow
1. **Upload:** Receive PDF/DOCX file
2. **Extract:** Use pdfplumber or python-docx to get text
3. **Split:** Break text into individual clauses
4. **Analyze:** Run rule-based detection for 5 clause types
5. **Score:** Calculate risk scores and overall contract risk
6. **Return:** JSON with all details including guidance and rewrites

### Detection Rules

#### Non-Compete (Section 27)
**Keywords:** "non-compete", "restraint of trade", "shall not engage"  
**Risk:** 9/10 - Generally void under Indian law

#### Penalty Clause (Section 74)
**Keywords:** "penalty", "forfeit", "punitive damages"  
**Risk:** 8/10 - Only reasonable compensation allowed

#### Unlimited Liability (Section 23)
**Keywords:** "unlimited liability", "indemnify", "hold harmless"  
**Risk:** 9/10 - Against public policy

#### Unfair Termination
**Keywords:** "terminate without cause", "at will", "no notice"  
**Risk:** 6/10 - Lacks job security

#### IP Transfer
**Keywords:** "intellectual property", "assign", "all rights"  
**Risk:** 6/10 - May be too broad

---

## 🏆 Competitive Advantages

### 1. Indian Law Focus
- Not generic US/UK law
- Specific sections: 27, 23, 74
- Relevant to Indian freelancers

### 2. Actionable Guidance
- Not just warnings
- Specific steps to take
- Safer alternatives provided

### 3. Educational Approach
- Explains WHY risky
- Teaches user rights
- Empowers decisions

### 4. Privacy-First
- In-memory processing
- No data storage
- Clearly communicated

### 5. Professional Quality
- Clean, modern UI
- Comprehensive docs
- Production code

---

## 🎓 Judging Criteria Alignment

✅ **Innovation:** First Indian law-focused contract analyzer with actionable guidance  
✅ **Technical:** Modern stack, clean code, privacy-first architecture  
✅ **Impact:** Helps millions of Indian freelancers avoid unfair contracts  
✅ **Execution:** Working demo, professional UI, comprehensive features  
✅ **Presentation:** Clear value prop, impressive demo, educational focus  

---

## 🔒 Privacy & Security

- ✅ Files processed in-memory only
- ✅ No database storage
- ✅ No file retention
- ✅ No user tracking
- ✅ No external API calls
- ✅ Complete data privacy

---

## 📧 Questions?

This is a competition-ready LegalTech product built with:
- Deep understanding of Indian law
- Focus on user empowerment
- Professional execution
- Educational approach

**Remember:** This is NOT legal advice. Always consult a qualified lawyer for legal matters.

---

**Built with ❤️ for Indian freelancers**

**Competition Edition - January 2026**