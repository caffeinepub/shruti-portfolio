import { useEffect, useState } from "react";

const GREETINGS = [
  { text: "నమస్తే", lang: "Telugu", script: "telugu" },
  { text: "Namaste", lang: "English", script: "latin" },
  { text: "नमस्ते", lang: "Hindi", script: "devanagari" },
];

const STEP_DURATION = 1000; // ms each greeting is visible
const FADE_DURATION = 400; // ms fade in/out
const TOTAL_STEPS = GREETINGS.length;

interface LoadingOverlayProps {
  onComplete: () => void;
}

export function LoadingOverlay({ onComplete }: LoadingOverlayProps) {
  const [step, setStep] = useState(0); // 0..TOTAL_STEPS-1
  const [phase, setPhase] = useState<"in" | "hold" | "out">("in");
  const [overlayExit, setOverlayExit] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (phase === "in") {
      timer = setTimeout(() => setPhase("hold"), FADE_DURATION);
    } else if (phase === "hold") {
      timer = setTimeout(() => setPhase("out"), STEP_DURATION - FADE_DURATION);
    } else if (phase === "out") {
      timer = setTimeout(() => {
        if (step < TOTAL_STEPS - 1) {
          setStep((s) => s + 1);
          setPhase("in");
        } else {
          // All done — exit overlay
          setOverlayExit(true);
          timer = setTimeout(onComplete, 600);
        }
      }, FADE_DURATION);
    }

    return () => clearTimeout(timer);
  }, [phase, step, onComplete]);

  const textOpacity = phase === "in" ? 1 : phase === "hold" ? 1 : 0;
  const textTransform =
    phase === "in"
      ? "translateY(0)"
      : phase === "out"
        ? "translateY(-20px)"
        : "translateY(0)";
  const textTransitionIn = `opacity ${FADE_DURATION}ms ease, transform ${FADE_DURATION}ms ease`;

  const progress = ((step + (phase === "out" ? 1 : 0)) / TOTAL_STEPS) * 100;

  const greeting = GREETINGS[step];

  const isTelugu = greeting.script === "telugu";
  const isDevanagari = greeting.script === "devanagari";

  return (
    <div
      className="loading-overlay"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse at 50% 0%, #0d1f3c 0%, #060d1f 40%, #020810 100%)",
        opacity: overlayExit ? 0 : 1,
        transition: "opacity 600ms ease",
        pointerEvents: overlayExit ? "none" : "all",
      }}
    >
      {/* Floating orbs */}
      <div className="loading-orbs">
        <span className="orb orb-1" />
        <span className="orb orb-2" />
        <span className="orb orb-3" />
      </div>

      {/* Greeting text */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
          opacity: textOpacity,
          transform: textTransform,
          transition: textTransitionIn,
        }}
      >
        <span
          style={{
            fontSize: isTelugu || isDevanagari ? "5rem" : "5.5rem",
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: isTelugu || isDevanagari ? "0.04em" : "0.15em",
            textShadow:
              "0 0 40px rgba(139,92,246,0.8), 0 0 80px rgba(99,102,241,0.5), 0 0 120px rgba(59,130,246,0.3)",
            lineHeight: 1.1,
            fontFamily:
              isTelugu || isDevanagari
                ? "'Noto Sans', 'Noto Sans Telugu', 'Noto Sans Devanagari', system-ui, sans-serif"
                : "'Playfair Display', Georgia, serif",
          }}
        >
          {greeting.text}
        </span>
        <span
          style={{
            fontSize: "0.85rem",
            fontWeight: 400,
            color: "rgba(180,180,220,0.7)",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
          }}
        >
          {greeting.lang}
        </span>
      </div>

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "2px",
          background: "rgba(255,255,255,0.1)",
          borderRadius: "9999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progress}%`,
            background: "linear-gradient(90deg, #6366f1, #8b5cf6, #3b82f6)",
            borderRadius: "9999px",
            transition: `width ${STEP_DURATION}ms ease`,
            boxShadow: "0 0 8px rgba(139,92,246,0.8)",
          }}
        />
      </div>

      {/* Step dots */}
      <div
        style={{
          position: "absolute",
          bottom: "4rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        {GREETINGS.map((g, i) => (
          <span
            key={g.lang}
            style={{
              width: i === step ? "1.5rem" : "0.4rem",
              height: "0.4rem",
              borderRadius: "9999px",
              background:
                i <= step
                  ? "linear-gradient(90deg, #6366f1, #8b5cf6)"
                  : "rgba(255,255,255,0.2)",
              transition: "width 300ms ease, background 300ms ease",
              display: "inline-block",
              boxShadow: i === step ? "0 0 6px rgba(139,92,246,0.8)" : "none",
            }}
          />
        ))}
      </div>

      <style>{`
        .loading-orbs { position: absolute; inset: 0; overflow: hidden; pointer-events: none; }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: orb-float 8s ease-in-out infinite;
        }
        .orb-1 { width: 300px; height: 300px; background: #6366f1; top: 10%; left: 15%; animation-delay: 0s; }
        .orb-2 { width: 250px; height: 250px; background: #8b5cf6; top: 50%; right: 10%; animation-delay: -3s; }
        .orb-3 { width: 200px; height: 200px; background: #3b82f6; bottom: 15%; left: 40%; animation-delay: -5s; }
        @keyframes orb-float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-30px) scale(1.08); }
        }
      `}</style>
    </div>
  );
}
