// =====================================================
// ONNX Runtime (WASM)
// =====================================================
importScripts("https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/ort.min.js");

ort.env.wasm.simd = true;
ort.env.wasm.numThreads = 1;
ort.env.wasm.wasmPaths =
  "https://cdn.jsdelivr.net/npm/onnxruntime-web/dist/";

// =====================================================
// GLOBALS
// =====================================================
let session = null;
let points = [];

// =====================================================
// UTILITIES
// =====================================================
function tokenize(text, maxLen = 128) {
  return text
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, maxLen)
    .map(w => w.charCodeAt(0) % 30000);
}

function isTooShort(text) {
  return text.split(/\s+/).length < 5;
}

function getFiller() {
  const fillers = [
    "Let me think for a moment.",
    "Okay, moving to the next point.",
    "Alright, noted.",
    "Got it, continuing."
  ];
  return fillers[Math.floor(Math.random() * fillers.length)];
}

// =====================================================
// SUMMARIZATION (INTENT-BASED)
// =====================================================
function summarize(text) {
  const t = text.toLowerCase();

  if (t.includes("my name is")) {
    const name = text.match(/my name is ([a-z ]+)/i);
    return name
      ? `Introduced himself as ${name[1].trim()}`
      : "Introduced himself";
  }

  if (
    t.includes("next question") ||
    t.includes("next point") ||
    t.includes("move to the next")
  ) {
    return "Requested to move to the next question";
  }

  if (t.includes("start the interview")) {
    return "Wants to start the interview";
  }

  if (t.includes("software engineer")) {
    return "Mentioned interest in a software engineering role";
  }

  return text.split(/\s+/).slice(0, 8).join(" ") + "…";
}

// =====================================================
// INIT MODEL
// =====================================================
(async () => {
  const t0 = performance.now();
  session = await ort.InferenceSession.create(
    "./minilm-l6-v2-quantized.onnx"
  );
  const loadTime = performance.now() - t0;

  postMessage({
    type: "ready",
    loadTime
  });
})();

// =====================================================
// MAIN HANDLER
// =====================================================
onmessage = async e => {
  const { text, pause } = e.data;
  if (!pause || !text) return;
  if (isTooShort(text)) return;

  const t0 = performance.now();
  const point = summarize(text);
  const latency = performance.now() - t0;

  if (!point) return;

  points.push("• " + point);

  postMessage({
    type: "result",
    summary: points.join("\n"),
    filler: getFiller(),
    latency
  });
};
