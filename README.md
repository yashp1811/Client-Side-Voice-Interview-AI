
# 🎙️ Client-Side Voice Interview AI (Offline, <30MB)

A fully **client-side AI demo** that performs **real-time voice summarization**, **pause detection**, and **contextual filler phrase generation** directly in the browser — **no server, no API calls, no cloud dependency**.

Built to demonstrate how **ONNX + WASM** can power low-latency AI interviews entirely on the client.

---

## 🚀 Objective

Develop a **<30MB client-side AI model** that enhances automated voice interviews by:

- Generating **real-time summaries**
- Detecting **speech pauses**
- Playing **contextual filler phrases**
- Running **fully offline** in the browser
- Maintaining **<50ms inference latency**

---

## ✨ Features

- 🎤 **Live speech recognition** (Chrome / Edge)
- 🧠 **Client-side AI summarization** using ONNX Runtime Web
- ⏸️ **Pause-based segmentation** (new point on silence)
- 🗣️ **Contextual filler phrases** using browser TTS
- ⚡ **Low-latency inference** (measured in real time)
- 📊 **Model load time & inference metrics**
- 🔒 **100% offline after initial load**

---

## 🧩 Architecture Overview

Microphone
↓
Speech Recognition (Web Speech API)
↓
Pause Detection (Silence Timer)
↓
Web Worker (ONNX Runtime WASM)
↓
Intent-Based Summarization
↓
UI Update + TTS Filler Playback

```


## 📦 Model Details

| Item | Value |
|---|---|
| Model | MiniLM-L6 (Quantized) |
| Format | ONNX |
| Size | ~22 MB |
| Runtime | onnxruntime-web (WASM) |
| Inference Latency | ~5–20 ms (device dependent) |

---

## 📁 Project Structure



voice-ai-demo/
├── index.html                 # UI + Speech Recognition + TTS
├── worker.js                  # ONNX inference + summarization
├── minilm-l6-v2-quantized.onnx
└── README.md



---

## 🛠️ How to Run

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/voice-ai-demo.git
cd voice-ai-demo


### 2️⃣ Start a local server

> Required because browsers block WASM & workers from `file://`

```bash
python -m http.server


### 3️⃣ Open in browser

```
http://localhost:8000
```

> ✅ Use **Chrome or Edge** (Web Speech API required)

---

## 🧪 How to Use the Demo

1. Click **🎤 Start Interview**
2. Speak naturally
3. Pause for ~1 second
4. Each pause creates:

   * A **new summarized point**
   * A **spoken filler phrase**
5. View:

   * Live summary updates
   * Model load time
   * Inference latency

---

## 📝 Example Interaction

### Spoken Input (with pauses)

> My name is Yash Patil
> Can we move to the next question
> I am interested in a software engineer role

### Generated Summary

```
• Introduced himself as Yash Patil
• Requested to move to the next question
• Mentioned interest in a software engineering role
```

### Spoken Filler

> “Okay, moving to the next point.”

---

## 📊 Performance Metrics (Displayed Live)

* **Model Load Time** (ms)
* **Inference Latency** per summary (ms)
* **No UI lag** (worker-based inference)

---

## ✅ Success Criteria Checklist

| Requirement               | Status |
| ------------------------- | ------ |
| Model ≤ 30MB              | ✅      |
| Fully client-side         | ✅      |
| Runs offline              | ✅      |
| Real-time summaries       | ✅      |
| Pause detection           | ✅      |
| Contextual filler phrases | ✅      |
| Same TTS output           | ✅      |
| <50ms inference           | ✅      |
| No perceivable lag        | ✅      |

---

## 🧠 Key Design Decisions

* **Intent-based summarization** instead of raw transcription
* **Final ASR chunks only** (prevents duplicated text)
* **Length filtering** to ignore micro-pauses
* **Deterministic logic** instead of LLM hallucinations
* **Web Worker isolation** for smooth UX

This mirrors **production systems** used in:

* Interview bots
* Call-center analysis
* Meeting summarization tools

---

## 🔮 Future Enhancements

* Interview scoring & evaluation
* Question auto-generation
* Export summary as JSON / PDF
* Confidence & sentiment analysis
* Optional LLM drop-in (hybrid mode)

---

## 🧑‍💻 Author

**Yash Patil**
Client-Side AI • Web ML • Systems Engineering


```
```
