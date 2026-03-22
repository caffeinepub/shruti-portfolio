import { useEffect, useRef, useState } from "react";

interface CinematicIntroProps {
  onComplete: () => void;
}

type Phase = "ride" | "charminar" | "avatar" | "snap" | "exit" | "done";

const STYLES = `
@keyframes bikeRide {
  0% { transform: translateX(-300px) scaleX(1); opacity: 0; }
  10% { opacity: 1; }
  85% { opacity: 1; }
  100% { transform: translateX(120vw) scaleX(1); opacity: 0; }
}
@keyframes spinRing {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
@keyframes floatUpDown {
  0%, 100% { transform: translateY(-8px); }
  50% { transform: translateY(8px); }
}
@keyframes snapRipple {
  0% { transform: translate(-50%, -50%) scale(0.3); opacity: 0.8; }
  100% { transform: translate(-50%, -50%) scale(3.5); opacity: 0; }
}
@keyframes zoomFade {
  from { transform: scale(1); opacity: 1; }
  to { transform: scale(1.12); opacity: 0; }
}
@keyframes brightPulse {
  0% { filter: brightness(1) drop-shadow(0 0 24px #7c3aed); }
  50% { filter: brightness(1.8) drop-shadow(0 0 48px #7c3aed) drop-shadow(0 0 80px #db2777); }
  100% { filter: brightness(1.2) drop-shadow(0 0 32px #7c3aed); }
}
`;

export function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const onCompleteRef = useRef(onComplete);
  const [phase, setPhase] = useState<Phase>("ride");
  const [canvasOpacity, setCanvasOpacity] = useState(1);
  const [charminarOpacity, setCharminarOpacity] = useState(0);
  const [charminarScale, setCharminarScale] = useState(1.0);
  const [hyderabadOpacity, setHyderabadOpacity] = useState(0);
  const [hyderabadY, setHyderabadY] = useState(20);
  const [avatarOpacity, setAvatarOpacity] = useState(0);
  const [nameOpacity, setNameOpacity] = useState(0);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [showRipples, setShowRipples] = useState(false);
  const [exitAnim, setExitAnim] = useState(false);

  onCompleteRef.current = onComplete;

  const skipIntro = () => {
    timersRef.current.forEach(clearTimeout);
    cancelAnimationFrame(rafRef.current);
    onCompleteRef.current();
  };

  // Canvas streak animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = [
      "rgba(255,255,255,",
      "rgba(6,182,212,",
      "rgba(124,58,237,",
      "rgba(219,39,119,",
    ];

    const streaks = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: 80 + Math.random() * 400,
      speed: 25 + Math.random() * 50,
      opacity: 0.3 + Math.random() * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
      width: 0.5 + Math.random() * 2.5,
    }));

    let verticalDrift = 0;
    let driftDir = 1;
    let running = true;

    const draw = () => {
      if (!running) return;
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      verticalDrift += 0.18 * driftDir;
      if (Math.abs(verticalDrift) > 10) driftDir *= -1;

      for (const s of streaks) {
        const grad = ctx.createLinearGradient(s.x, 0, s.x + s.length, 0);
        grad.addColorStop(0, `${s.color}0)`);
        grad.addColorStop(0.3, `${s.color}${s.opacity})`);
        grad.addColorStop(1, `${s.color}0)`);
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.moveTo(s.x, s.y + verticalDrift);
        ctx.lineTo(s.x + s.length, s.y + verticalDrift);
        ctx.stroke();

        s.x += s.speed;
        if (s.x > canvas.width + s.length) {
          s.x = -s.length;
          s.y = Math.random() * canvas.height;
          s.opacity = 0.3 + Math.random() * 0.7;
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      running = false;
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Phase timeline
  useEffect(() => {
    const timers = timersRef.current;
    const t = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timers.push(id);
    };

    // Phase 2: Charminar at 1200ms
    t(() => {
      setPhase("charminar");
      setCanvasOpacity(0);
      cancelAnimationFrame(rafRef.current);
      t(() => {
        setCharminarOpacity(1);
        setCharminarScale(1.08);
        t(() => {
          setHyderabadOpacity(1);
          setHyderabadY(0);
        }, 300);
      }, 100);
    }, 1200);

    // Phase 3: Avatar at 2600ms
    t(() => {
      setPhase("avatar");
      setHyderabadOpacity(0);
      t(() => {
        setAvatarOpacity(1);
        t(() => setNameOpacity(1), 300);
      }, 200);
    }, 2600);

    // Phase 4: Snap at 3600ms
    t(() => {
      setPhase("snap");
      setShowRipples(true);
      setFlashOpacity(0.6);
      t(() => setFlashOpacity(0), 300);
    }, 3600);

    // Phase 5: Exit at 4100ms
    t(() => {
      setPhase("exit");
      setExitAnim(true);
      setFlashOpacity(1);
      t(() => {
        setPhase("done");
        onCompleteRef.current();
      }, 500);
    }, 4100);

    // Safety fallback: ensure portfolio always loads even if animation gets stuck
    const safetyTimer = setTimeout(() => {
      onCompleteRef.current();
    }, 3000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (phase === "done") return null;

  return (
    <>
      <style>{STYLES}</style>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "#0f0a1e",
          overflow: "hidden",
          fontFamily: "'Inter', sans-serif",
          animation: exitAnim ? "zoomFade 0.5s ease-in forwards" : undefined,
        }}
      >
        {/* Canvas streaks */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: canvasOpacity,
            transition: "opacity 0.8s ease-out",
            willChange: "opacity",
          }}
        />

        {/* Bike + rider silhouette */}
        {phase === "ride" && (
          <div
            style={{
              position: "absolute",
              bottom: "35%",
              left: 0,
              zIndex: 10,
              animation: "bikeRide 1.2s ease-in forwards",
              willChange: "transform, opacity",
              filter: "blur(1px)",
            }}
          >
            <svg
              width="160"
              height="80"
              viewBox="0 0 160 80"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              aria-label="Bike rider silhouette"
              style={{ opacity: 0.85 }}
            >
              {/* Rear wheel */}
              <circle
                cx="30"
                cy="60"
                r="18"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="30" cy="60" r="4" fill="white" />
              {/* Front wheel */}
              <circle
                cx="130"
                cy="60"
                r="18"
                stroke="white"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="130" cy="60" r="4" fill="white" />
              {/* Frame */}
              <line
                x1="30"
                y1="60"
                x2="70"
                y2="30"
                stroke="white"
                strokeWidth="2.5"
              />
              <line
                x1="70"
                y1="30"
                x2="130"
                y2="60"
                stroke="white"
                strokeWidth="2.5"
              />
              <line
                x1="70"
                y1="30"
                x2="100"
                y2="30"
                stroke="white"
                strokeWidth="2.5"
              />
              <line
                x1="100"
                y1="30"
                x2="130"
                y2="60"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="60"
                x2="70"
                y2="30"
                stroke="white"
                strokeWidth="2"
              />
              <line
                x1="50"
                y1="60"
                x2="30"
                y2="60"
                stroke="white"
                strokeWidth="2"
              />
              {/* Handlebar */}
              <line
                x1="100"
                y1="30"
                x2="108"
                y2="20"
                stroke="white"
                strokeWidth="2.5"
              />
              <line
                x1="105"
                y1="20"
                x2="115"
                y2="22"
                stroke="white"
                strokeWidth="2"
              />
              {/* Seat */}
              <line
                x1="68"
                y1="30"
                x2="82"
                y2="28"
                stroke="white"
                strokeWidth="2.5"
              />
              {/* Rider body */}
              <ellipse cx="85" cy="10" rx="7" ry="7" fill="white" />{" "}
              {/* head */}
              <line
                x1="85"
                y1="17"
                x2="83"
                y2="32"
                stroke="white"
                strokeWidth="3"
              />{" "}
              {/* torso */}
              <line
                x1="83"
                y1="22"
                x2="72"
                y2="28"
                stroke="white"
                strokeWidth="2.5"
              />{" "}
              {/* left arm */}
              <line
                x1="83"
                y1="22"
                x2="105"
                y2="26"
                stroke="white"
                strokeWidth="2.5"
              />{" "}
              {/* right arm to handlebar */}
              <line
                x1="83"
                y1="32"
                x2="78"
                y2="45"
                stroke="white"
                strokeWidth="2.5"
              />{" "}
              {/* left leg */}
              <line
                x1="83"
                y1="32"
                x2="90"
                y2="45"
                stroke="white"
                strokeWidth="2"
              />{" "}
              {/* right leg */}
              {/* Wind hair */}
              <path
                d="M78 5 Q65 2 55 6"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M80 3 Q68 -2 58 2"
                stroke="white"
                strokeWidth="1"
                fill="none"
                opacity="0.5"
              />
              {/* Glow trail */}
              <defs>
                <linearGradient id="trailGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                  <stop offset="40%" stopColor="#06b6d4" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect
                x="-80"
                y="55"
                width="80"
                height="3"
                fill="url(#trailGrad)"
              />
              <rect
                x="-60"
                y="45"
                width="50"
                height="2"
                fill="url(#trailGrad)"
                opacity="0.4"
              />
            </svg>
          </div>
        )}

        {/* Charminar background */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url('/assets/uploads/Screenshot-2026-03-21-200837-1.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(0.7) saturate(0.8)",
            opacity: charminarOpacity,
            transform: `scale(${charminarScale})`,
            transition: "opacity 0.9s ease-out, transform 1.4s ease-out",
            willChange: "transform, opacity",
          }}
        />

        {/* Purple-blue gradient overlay on charminar */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(88,28,135,0.6), rgba(15,10,30,0.8))",
            opacity: charminarOpacity,
            transition: "opacity 1s ease-out",
            pointerEvents: "none",
          }}
        />

        {/* HYDERABAD text */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            left: 0,
            right: 0,
            textAlign: "center",
            opacity: hyderabadOpacity,
            transform: `translateY(${hyderabadY}px)`,
            transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
            willChange: "opacity, transform",
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              color: "#fff",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "0.4em",
              textTransform: "uppercase",
              textShadow:
                "0 0 30px rgba(124,58,237,0.9), 0 0 60px rgba(124,58,237,0.5), 0 0 90px rgba(6,182,212,0.3)",
            }}
          >
            HYDERABAD
          </span>
        </div>

        {/* Avatar + name section */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            opacity: avatarOpacity,
            transition: "opacity 0.6s ease-out",
            willChange: "opacity",
            pointerEvents: "none",
          }}
        >
          {/* Spinning ring wrapper */}
          <div
            style={{
              position: "relative",
              width: 216,
              height: 216,
              flexShrink: 0,
            }}
          >
            {/* Outer spinning ring */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "conic-gradient(from 0deg, #7c3aed, #db2777, #06b6d4, #7c3aed)",
                animation: "spinRing 3s linear infinite",
                willChange: "transform",
              }}
            />
            {/* Avatar circle */}
            <div
              style={{
                position: "absolute",
                inset: 4,
                borderRadius: "50%",
                overflow: "hidden",
                animation: "floatUpDown 2s ease-in-out infinite",
                filter:
                  phase === "snap" || phase === "exit"
                    ? "brightness(1.8) drop-shadow(0 0 24px #7c3aed)"
                    : "drop-shadow(0 0 24px #7c3aed)",
                transition: "filter 0.3s ease",
                willChange: "transform, filter",
              }}
            >
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background:
                    "linear-gradient(135deg, oklch(0.72 0.28 285), oklch(0.62 0.28 315))",
                }}
              >
                <img
                  src="/assets/uploads/Screenshot-2026-03-22-055020-1.png"
                  alt="Shrutisree"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "top",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
            {/* Ripple rings for snap */}
            {showRipples &&
              [0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: 208,
                    height: 208,
                    marginLeft: -104,
                    marginTop: -104,
                    border: "2px solid #7c3aed",
                    borderRadius: "50%",
                    animation: `snapRipple 0.8s ease-out ${i * 150}ms forwards`,
                    transform: "translate(-50%, -50%) scale(0.3)",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                />
              ))}
          </div>

          {/* Name and subtitle */}
          <div
            style={{
              textAlign: "center",
              opacity: nameOpacity,
              transform:
                nameOpacity === 1 ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
            }}
          >
            <div
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.4rem)",
                fontWeight: 700,
                background: "linear-gradient(90deg, #7c3aed, #db2777, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "0.05em",
              }}
            >
              Shrutisree
            </div>
            <div
              style={{
                fontSize: "clamp(0.75rem, 1.5vw, 0.9rem)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.65)",
                marginTop: 6,
              }}
            >
              AI &amp; ML Engineer
            </div>
          </div>
        </div>

        {/* Flash overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "white",
            opacity: flashOpacity,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />

        {/* Skip intro button */}
        <button
          type="button"
          onClick={skipIntro}
          data-ocid="intro.skip_button"
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            zIndex: 10000,
            padding: "8px 18px",
            background: "rgba(15,10,30,0.75)",
            border: "1px solid #7c3aed",
            borderRadius: 6,
            color: "rgba(255,255,255,0.85)",
            fontSize: "0.8rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            cursor: "pointer",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "background 0.2s ease, box-shadow 0.2s ease",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(124,58,237,0.35)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 16px rgba(124,58,237,0.6)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.background =
              "rgba(15,10,30,0.75)";
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          Skip Intro
        </button>
      </div>
    </>
  );
}
