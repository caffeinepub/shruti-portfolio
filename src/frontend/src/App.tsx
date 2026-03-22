import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Award,
  Briefcase,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Layers,
  Linkedin,
  Mail,
  Menu,
  Moon,
  Sun,
  Trophy,
  User,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────
// DATA
// ──────────────────────────────────────────────

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

const EDUCATION = [
  {
    degree: "B.Tech in Computer Science Engineering",
    institution: "CMR Institute of Technology",
    year: "2025 – 2029",
    grade: "SGPA: 9.4",
    icon: "🎓",
  },
  {
    degree: "Intermediate (MPC — Mathematics, Physics, Chemistry)",
    institution: "Geetha College",
    year: "2023 – 2025",
    grade: "Percentage: 96.4%",
    icon: "📚",
  },
  {
    degree: "Secondary School",
    institution: "Children's High School",
    year: "2023",
    grade: "CGPA: 9.7",
    icon: "🏫",
  },
];

const SKILLS = [
  { category: "Programming", icon: "💻", items: ["C Programming", "Python"] },
  {
    category: "Soft Skills",
    icon: "🗣️",
    items: ["Communication", "Presentation"],
  },
];

const EXPERIENCE = [
  {
    role: "Intern",
    company: "Evolve x",
    duration: "2026 – Present",
    location: "India",
    type: "Internship",
    bullets: [
      "Gaining hands-on industry experience in software development",
      "Working on real-world projects to apply programming fundamentals",
      "Collaborating with team members and learning professional workflows",
    ],
  },
];

const PROJECTS = [
  {
    title: "Pathwiz",
    description:
      "An intelligent interview preparation platform designed to help aspiring developers and students practice coding challenges, mock interviews, and technical assessments with personalized feedback.",
    tech: ["React", "Python", "AI/ML", "Node.js"],
    github: "https://github.com/kiran66B7/AceMyInterview",
    live: "https://ai-interview-preparation-application-10e.caffeine.xyz/",
    featured: true,
  },
];

const HACKATHONS = [
  {
    name: "Codestorm 2026 (36hrs)",
    description:
      "An interactive and innovative experience where we explored unique ideas that truly expanded our thinking at NRCM College.",
    image:
      "https://pub-1407f82391df4ab1951418d04be76914.r2.dev/uploads/caf6aab2-249d-42f5-ae08-b581aa8667f4.jpg",
    link: "https://drive.google.com/file/d/1LW7JvV7BmbCf1RpHKAUgANxl7ipf22GA/view",
  },
  {
    name: "Hackforge 2026 (48hrs)",
    description:
      "A dynamic hackathon experience focused on creativity and problem-solving, where innovative ideas came to life at CMRIT College.",
    image:
      "https://media.licdn.com/dms/image/v2/D4D22AQF7sUWTCrQSdg/feedshare-shrink_2048_1536/B4DZzYctVjJQAg-/0/1773157932158?e=1775692800&v=beta&t=PkP_sYMuAI4pcAITHorMLAF9X7EP13Yy6sRsxcBy8JA",
    link: "https://drive.google.com/file/d/1haSWZYJ0kGMXJd7NZB7lA03EEGrAAiAR/view",
  },
];

const CERTIFICATIONS = [
  {
    name: "Basic Python",
    description:
      "Completed a foundational course in Python, covering core programming concepts and problem-solving techniques.",
    image:
      "https://s3.amazonaws.com/coursera_assets/meta_images/generated/CERTIFICATE_LANDING_PAGE/CERTIFICATE_LANDING_PAGE~9F2S3619YEL6/CERTIFICATE_LANDING_PAGE~9F2S3619YEL6.jpeg",
  },
  {
    name: "AI Tools Workshop",
    description:
      "Participated in a hands-on workshop exploring modern AI tools and real-world applications.",
    image:
      "https://media.licdn.com/dms/image/v2/D5622AQGmpI0Lv8Y5kA/feedshare-shrink_800/B56Zv0giHuH4Ag-/0/1769333727956?e=1775692800&v=beta&t=hl52HzX8EpRczbcF8uWSbZ4yeGfjikkZmX0C72cHDuo",
  },
];

// Particle config — fixed positions so they don't jump on re-render
const PARTICLES = [
  { id: "p1", top: "12%", left: "8%", size: 4, delay: "0s", duration: "7s" },
  { id: "p2", top: "28%", left: "88%", size: 3, delay: "1.2s", duration: "9s" },
  { id: "p3", top: "55%", left: "5%", size: 5, delay: "2.5s", duration: "8s" },
  {
    id: "p4",
    top: "70%",
    left: "92%",
    size: 3,
    delay: "0.8s",
    duration: "11s",
  },
  { id: "p5", top: "18%", left: "55%", size: 2, delay: "3.1s", duration: "6s" },
  {
    id: "p6",
    top: "40%",
    left: "75%",
    size: 4,
    delay: "1.8s",
    duration: "10s",
  },
  {
    id: "p7",
    top: "82%",
    left: "30%",
    size: 3,
    delay: "0.4s",
    duration: "8.5s",
  },
  { id: "p8", top: "65%", left: "50%", size: 2, delay: "2s", duration: "7.5s" },
  { id: "p9", top: "35%", left: "18%", size: 3, delay: "4s", duration: "9.5s" },
  {
    id: "p10",
    top: "90%",
    left: "70%",
    size: 2,
    delay: "1.5s",
    duration: "6.5s",
  },
  {
    id: "p11",
    top: "5%",
    left: "45%",
    size: 3,
    delay: "0.6s",
    duration: "10s",
  },
  {
    id: "p12",
    top: "48%",
    left: "35%",
    size: 2,
    delay: "3.8s",
    duration: "7s",
  },
];

// ──────────────────────────────────────────────
// HOOKS
// ──────────────────────────────────────────────

function useScrollReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  }, [enabled]);
}

function useActiveSection() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { threshold: 0.4 },
    );

    const sections = document.querySelectorAll("section[id]");
    for (const s of sections) observer.observe(s);
    return () => observer.disconnect();
  }, []);

  return active;
}

function useTypewriter(
  text: string,
  typeSpeed = 60,
  deleteSpeed = 40,
  pauseAfterType = 2000,
  pauseAfterDelete = 500,
) {
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<
    "typing" | "pausing" | "deleting" | "waiting"
  >("typing");

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayed(text.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        setPhase("pausing");
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), pauseAfterType);
    } else if (phase === "deleting") {
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, deleteSpeed);
      } else {
        setPhase("waiting");
      }
    } else if (phase === "waiting") {
      timeout = setTimeout(() => setPhase("typing"), pauseAfterDelete);
    }

    return () => clearTimeout(timeout);
  }, [
    displayed,
    phase,
    text,
    typeSpeed,
    deleteSpeed,
    pauseAfterType,
    pauseAfterDelete,
  ]);

  return displayed;
}

// ──────────────────────────────────────────────
// COMPONENTS
// ──────────────────────────────────────────────

function Navbar({
  dark,
  toggleDark,
}: { dark: boolean; toggleDark: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNav = useCallback((href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-hidden ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-glow-sm"
          : "bg-transparent"
      }`}
    >
      {/* Header animated gradient blobs */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-8 left-[5%] w-64 h-32 rounded-full blur-[60px] orb-drift-1 opacity-60"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.28 285 / 0.45), transparent 70%)",
          }}
        />
        <div
          className="absolute -top-6 right-[10%] w-48 h-28 rounded-full blur-[50px] orb-drift-2 opacity-50"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.28 315 / 0.4), transparent 70%)",
            animationDelay: "3s",
          }}
        />
        <div
          className="absolute top-0 left-[45%] w-40 h-24 rounded-full blur-[45px] orb-drift-3 opacity-40"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.25 230 / 0.35), transparent 70%)",
            animationDelay: "6s",
          }}
        />
      </div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo — avatar image */}
        <button
          type="button"
          onClick={() => handleNav("#hero")}
          className="flex items-center gap-2.5 group"
          data-ocid="nav.link"
        >
          <div className="relative">
            <div
              className="w-9 h-9 rounded-full ring-2 ring-primary/50 group-hover:ring-primary transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: "0 0 12px oklch(0.72 0.28 285 / 0.4)",
              }}
            >
              <img
                src="/assets/uploads/Screenshot-2026-03-22-055020-1.png"
                alt="Shrutisree"
                className="w-full h-full object-cover object-top rounded-full"
              />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-background animate-pulse"
              style={{ background: "oklch(0.72 0.28 285)" }}
            />
          </div>
          <span className="font-display font-bold text-sm grad-text hidden sm:block">
            Shrutisree
          </span>
        </button>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-0.5">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.slice(1);
            const isActive = active === sectionId;
            return (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className={`px-2 py-1.5 rounded-md text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary/20 text-primary nav-link-active"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                  data-ocid="nav.link"
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="block h-0.5 mt-0.5 rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, oklch(0.72 0.28 285), oklch(0.62 0.28 315))",
                        boxShadow: "0 0 6px oklch(0.72 0.28 285 / 0.6)",
                      }}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleDark}
            className="rounded-full"
            data-ocid="nav.toggle"
          >
            {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <a
            href="mailto:shrutisreetadepalli@gmail.com"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent hover:shadow-[0_0_12px_3px_rgba(139,92,246,0.6)] transition-all duration-200"
            aria-label="Email"
            data-ocid="nav.link"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href="https://www.linkedin.com/in/shrutisree-tadepalli-6a3163362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full hover:bg-accent hover:shadow-[0_0_12px_3px_rgba(139,92,246,0.6)] transition-all duration-200"
            aria-label="LinkedIn"
            data-ocid="nav.link"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden rounded-full"
            onClick={() => setOpen(!open)}
            data-ocid="nav.toggle"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border">
          <ul className="max-w-7xl mx-auto px-4 py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  type="button"
                  onClick={() => handleNav(link.href)}
                  className="w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                  data-ocid="nav.link"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

function TypewriterSubtitle({ dark }: { dark: boolean }) {
  const text = "An aspiring AI & Machine Learning Engineer";
  const displayed = useTypewriter(text, 60, 40, 2000, 500);
  return (
    <span
      style={
        dark
          ? {
              background:
                "linear-gradient(90deg, oklch(0.82 0.28 285), oklch(0.72 0.28 315), oklch(0.65 0.25 230))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }
          : {
              color: "oklch(0.42 0.25 285)",
            }
      }
    >
      {displayed}
      <span
        style={{
          color: dark ? "oklch(0.72 0.28 285)" : "oklch(0.42 0.25 285)",
          WebkitTextFillColor: dark
            ? "oklch(0.72 0.28 285)"
            : "oklch(0.42 0.25 285)",
          animation: "blink-cursor 1s step-end infinite",
        }}
      >
        |
      </span>
    </span>
  );
}

function Hero({ dark }: { dark: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let spawnTimer: ReturnType<typeof setTimeout>;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    interface Star {
      x: number;
      y: number;
      vx: number;
      vy: number;
      length: number;
      opacity: number;
      fade: number;
      color: string;
    }

    const stars: Star[] = [];
    const COLORS = ["255,255,255", "180,120,255", "100,220,255"];

    const spawnStar = () => {
      const edge = Math.random() < 0.6 ? "top" : "left";
      const x =
        edge === "top"
          ? Math.random() * canvas.width
          : Math.random() * canvas.width * 0.3;
      const y =
        edge === "top"
          ? Math.random() * canvas.height * 0.3
          : Math.random() * canvas.height;
      const speed = 6 + Math.random() * 6;
      const angle = Math.PI / 4 + (Math.random() - 0.5) * 0.4;
      stars.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 80 + Math.random() * 120,
        opacity: 1,
        fade: 0.015 + Math.random() * 0.01,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    };

    const scheduleSpawn = () => {
      spawnTimer = setTimeout(
        () => {
          if (stars.length < 3) spawnStar();
          scheduleSpawn();
        },
        1500 + Math.random() * 1500,
      );
    };

    spawnStar();
    scheduleSpawn();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i];
        const tailX =
          s.x - s.vx * (s.length / Math.sqrt(s.vx * s.vx + s.vy * s.vy));
        const tailY =
          s.y - s.vy * (s.length / Math.sqrt(s.vx * s.vx + s.vy * s.vy));
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, `rgba(${s.color},0)`);
        grad.addColorStop(1, `rgba(${s.color},${s.opacity})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();
        // head glow
        ctx.beginPath();
        ctx.arc(s.x, s.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${s.color},${s.opacity})`;
        ctx.fill();
        s.x += s.vx;
        s.y += s.vy;
        s.opacity -= s.fade;
        if (
          s.opacity <= 0 ||
          s.x > canvas.width + 50 ||
          s.y > canvas.height + 50
        ) {
          stars.splice(i, 1);
        }
      }
      rafId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(spawnTimer);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background - dark blue radial gradient in dark mode, soft lavender in light */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 50% 40%, #0d1f3c 0%, #060d1f 45%, #020810 100%)"
            : "radial-gradient(ellipse at 50% 40%, oklch(0.97 0.01 280) 0%, oklch(0.94 0.015 270) 50%, oklch(0.96 0.008 290) 100%)",
        }}
      />

      {/* Shooting stars canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -5 }}
      />

      {/* Animated gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[10%] left-[10%] w-[600px] h-[600px] rounded-full blur-[120px] orb-drift-1"
          style={{
            background:
              "radial-gradient(circle, oklch(0.72 0.28 285 / 0.35), oklch(0.62 0.28 315 / 0.15))",
          }}
        />
        <div
          className="absolute bottom-[5%] right-[8%] w-[500px] h-[500px] rounded-full blur-[100px] orb-drift-2"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.25 230 / 0.3), oklch(0.45 0.22 210 / 0.1))",
            animationDelay: "4s",
          }}
        />
        <div
          className="absolute top-[50%] left-[55%] w-[450px] h-[450px] rounded-full blur-[90px] orb-drift-3"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.28 315 / 0.28), oklch(0.72 0.28 285 / 0.1))",
            animationDelay: "8s",
          }}
        />
        <div
          className="absolute top-[20%] right-[20%] w-[350px] h-[350px] rounded-full blur-[80px] orb-drift-1"
          style={{
            background:
              "radial-gradient(circle, oklch(0.55 0.25 230 / 0.25), transparent 70%)",
            animationDelay: "12s",
          }}
        />
      </div>

      {/* Subtle grid / mesh overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.72 0.28 285) 1px, transparent 1px), linear-gradient(90deg, oklch(0.72 0.28 285) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particle dots */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full animate-float-particle"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              height: p.size,
              animationDuration: p.duration,
              animationDelay: p.delay,
              background: "oklch(0.72 0.28 285)",
              boxShadow: `0 0 ${p.size * 3}px oklch(0.72 0.28 285 / 0.8)`,
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Welcome badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-8 animate-slide-up"
          style={{
            animationDelay: "0.15s",
            opacity: 0,
            background: dark
              ? "oklch(0.72 0.28 285 / 0.1)"
              : "oklch(0.92 0.04 280)",
            border: dark
              ? "1px solid oklch(0.72 0.28 285 / 0.35)"
              : "1px solid oklch(0.52 0.22 285 / 0.5)",
            boxShadow: dark ? "0 0 18px oklch(0.72 0.28 285 / 0.15)" : "none",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse"
            style={{ background: "oklch(0.72 0.28 285)" }}
          />
          <span className="text-sm font-medium text-primary tracking-wide">
            Welcome to my portfolio
          </span>
        </div>

        {/* Name */}
        <h1
          className="font-display font-bold text-5xl sm:text-6xl lg:text-8xl leading-tight mb-5 animate-slide-up"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <span className="grad-text glow-text name-shimmer">
            Shrutisree Tadepalli
          </span>
        </h1>

        {/* Subtitle — typewriter effect */}
        <div
          className="text-xl sm:text-2xl font-semibold mb-6 animate-slide-up min-h-[2rem] flex items-center justify-center"
          style={{
            animationDelay: "0.45s",
            opacity: 0,
          }}
        >
          <TypewriterSubtitle dark={dark} />
        </div>

        {/* Description */}
        <div
          className="max-w-2xl mx-auto space-y-2 mb-10 animate-slide-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            I'm passionate about understanding how machines think and building
            intelligent solutions.
          </p>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Currently learning Python and exploring real-world applications of
            AI.
          </p>
        </div>

        {/* Tag pill */}
        <div
          className="inline-flex items-center gap-3 animate-slide-up"
          style={{ animationDelay: "0.75s", opacity: 0 }}
        >
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{
              background: dark
                ? "oklch(0.22 0.05 280 / 0.6)"
                : "oklch(0.92 0.04 280)",
              borderColor: dark
                ? "oklch(0.72 0.28 285 / 0.25)"
                : "oklch(0.52 0.22 285 / 0.6)",
              color: dark ? "oklch(0.75 0.15 280)" : "oklch(0.32 0.18 280)",
            }}
          >
            AI and ML Enthusiast
          </span>
          <span className="text-primary font-bold">·</span>
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium border"
            style={{
              background: dark
                ? "oklch(0.22 0.05 280 / 0.6)"
                : "oklch(0.92 0.04 280)",
              borderColor: dark
                ? "oklch(0.72 0.28 285 / 0.25)"
                : "oklch(0.52 0.22 285 / 0.6)",
              color: dark ? "oklch(0.75 0.15 280)" : "oklch(0.32 0.18 280)",
            }}
          >
            Aspiring Dev
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-float opacity-60">
        <span className="text-xs text-muted-foreground">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent" />
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading icon={<User className="w-5 h-5" />} label="About Me" />

        <div className="mt-16">
          {/* Text */}
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-lg leading-relaxed text-muted-foreground reveal reveal-delay-1">
              Hey! I'm{" "}
              <span className="text-foreground font-semibold">Shruti</span> — a
              1st-year Computer Science student at{" "}
              <span className="text-primary font-medium">
                CMR Institute of Technology, Hyderabad
              </span>
              . I'm an aspiring Full Stack Developer with a growing interest in{" "}
              <span className="text-primary font-medium">AI &amp; ML</span>.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground reveal reveal-delay-2">
              I'm focused on building strong fundamentals in programming and
              software development while actively working on projects to apply
              what I learn.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground reveal reveal-delay-2">
              I enjoy exploring new technologies, solving problems, and
              continuously improving my skills as a developer.
            </p>

            <div className="pt-4 reveal reveal-delay-3">
              <div className="inline-flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border hover:border-primary/40 transition-colors">
                <span className="text-xl">🌏</span>
                <span className="text-sm font-medium">Intern @ Evolve x</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<GraduationCap className="w-5 h-5" />}
          label="Education"
        />

        <div className="mt-16">
          {/* Desktop: alternating left-right timeline */}
          <div className="hidden md:block relative">
            {/* Center vertical line */}
            <div
              className="absolute left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.72 0.28 285), oklch(0.62 0.28 315), oklch(0.55 0.25 230))",
              }}
            />

            <div className="space-y-12">
              {EDUCATION.map((edu, i) => {
                const isLeft = i % 2 === 0;
                return (
                  <div
                    key={edu.institution}
                    className={`reveal ${isLeft ? "reveal-from-left" : "reveal-from-right"} reveal-delay-${i + 1} relative grid grid-cols-2 gap-8 items-center`}
                  >
                    {/* Left slot */}
                    {isLeft ? (
                      <div className="flex justify-end">
                        <EducationCard edu={edu} align="right" />
                      </div>
                    ) : (
                      <div />
                    )}

                    {/* Center dot */}
                    <div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-primary bg-background z-10 flex items-center justify-center"
                      style={{
                        boxShadow: "0 0 14px oklch(0.72 0.28 285 / 0.7)",
                      }}
                    >
                      <div
                        className="w-2.5 h-2.5 rounded-full animate-pulse"
                        style={{ background: "oklch(0.72 0.28 285)" }}
                      />
                    </div>

                    {/* Right slot */}
                    {!isLeft ? (
                      <div className="flex justify-start">
                        <EducationCard edu={edu} align="left" />
                      </div>
                    ) : (
                      <div />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile: stacked timeline */}
          <div className="md:hidden relative">
            <div
              className="absolute left-6 top-3 bottom-3 w-0.5"
              style={{
                background:
                  "linear-gradient(to bottom, oklch(0.72 0.28 285), oklch(0.62 0.28 315), oklch(0.55 0.25 230))",
              }}
            />
            <div className="space-y-10">
              {EDUCATION.map((edu, i) => (
                <div
                  key={edu.institution}
                  className={`reveal reveal-delay-${i + 1} pl-16 relative`}
                >
                  <div
                    className="absolute left-3.5 top-5 w-5 h-5 rounded-full border-2 border-primary bg-background z-10"
                    style={{ boxShadow: "0 0 10px oklch(0.72 0.28 285 / 0.6)" }}
                  />
                  <EducationCard edu={edu} align="left" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function EducationCard({
  edu,
  align,
}: {
  edu: (typeof EDUCATION)[0];
  align: "left" | "right";
}) {
  return (
    <Card
      className={`grad-border bg-card hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 w-full max-w-sm ${
        align === "right" ? "text-right" : "text-left"
      }`}
    >
      <CardContent className="p-6">
        <div
          className={`flex flex-wrap items-start justify-between gap-3 mb-2 ${
            align === "right" ? "flex-row-reverse" : ""
          }`}
        >
          <div
            className={`flex items-center gap-3 ${
              align === "right" ? "flex-row-reverse" : ""
            }`}
          >
            <span className="text-2xl">{edu.icon}</span>
            <h3 className="font-display font-bold text-sm text-foreground leading-tight">
              {edu.degree}
            </h3>
          </div>
          <Badge
            variant="outline"
            className="text-primary border-primary/40 bg-primary/5 flex-shrink-0 text-xs"
          >
            {edu.year}
          </Badge>
        </div>
        <p className="text-muted-foreground font-medium text-sm mb-2">
          {edu.institution}
        </p>
        <Badge className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 text-xs">
          {edu.grade}
        </Badge>
      </CardContent>
    </Card>
  );
}

function Skills() {
  return (
    <section id="skills" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading icon={<Layers className="w-5 h-5" />} label="Skills" />

        <div className="mt-16 grid sm:grid-cols-2 gap-6 max-w-2xl">
          {SKILLS.map((group, i) => (
            <Card
              key={group.category}
              className={`reveal reveal-delay-${(i % 3) + 1} grad-border bg-card hover:shadow-glow hover:scale-[1.02] transition-all duration-300 group`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-2xl">{group.icon}</span>
                  <h3 className="font-display font-semibold text-base text-foreground">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="cursor-default transition-all duration-200 hover:bg-primary/20 hover:text-primary hover:border-primary/40 border border-transparent"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<Briefcase className="w-5 h-5" />}
          label="Experience"
        />

        <div className="mt-16 relative">
          {/* Timeline line */}
          <div
            className="absolute left-6 sm:left-8 top-0 bottom-0 w-px hidden sm:block"
            style={{
              background:
                "linear-gradient(to bottom, oklch(0.72 0.28 285), oklch(0.55 0.25 230), transparent)",
            }}
          />

          <div className="space-y-10">
            {EXPERIENCE.map((exp, i) => (
              <div
                key={`${exp.company}-${exp.role}`}
                className={`reveal reveal-delay-${i + 1} sm:pl-20 relative`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-4 sm:left-6 top-6 w-5 h-5 rounded-full border-2 border-primary bg-background hidden sm:block"
                  style={{
                    boxShadow: "0 0 12px oklch(0.72 0.28 285 / 0.5)",
                  }}
                />

                <Card className="grad-border bg-card hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300">
                  <CardContent className="p-7">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-display font-bold text-lg text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-primary font-semibold">
                          {exp.company}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {exp.location}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge
                          variant="outline"
                          className="text-primary border-primary/40 bg-primary/5"
                        >
                          {exp.duration}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {exp.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading icon={<Code2 className="w-5 h-5" />} label="Projects" />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <Card
              key={project.title}
              className={`reveal reveal-delay-${(i % 3) + 1} grad-border bg-card hover:shadow-glow-lg hover:scale-[1.02] transition-all duration-300 group flex flex-col ${
                project.featured ? "ring-1 ring-primary/30" : ""
              }`}
              data-ocid={`projects.item.${i + 1}`}
            >
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3 className="font-display font-bold text-base text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-primary/15 hover:text-primary transition-colors"
                        aria-label="GitHub"
                        data-ocid="projects.link"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-md hover:bg-primary/15 hover:text-primary transition-colors"
                        aria-label="Live site"
                        data-ocid="projects.link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
                {project.featured && (
                  <Badge className="w-fit mb-3 bg-primary/20 text-primary border border-primary/30 text-xs">
                    ⭐ Featured
                  </Badge>
                )}
                <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs px-2">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-3 mt-auto">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-primary/40 text-primary bg-primary/10 hover:bg-primary/20 transition-all duration-200"
                      style={{
                        boxShadow: "0 0 0 0 oklch(0.72 0.28 285 / 0)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 0 12px 2px oklch(0.72 0.28 285 / 0.5)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 0 0 0 oklch(0.72 0.28 285 / 0)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1)";
                      }}
                      data-ocid="projects.primary_button"
                    >
                      <Github className="w-3.5 h-3.5" />
                      View on GitHub
                    </a>
                  )}
                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold border border-primary/60 text-white bg-primary/80 hover:bg-primary transition-all duration-200"
                      style={{
                        boxShadow: "0 0 0 0 oklch(0.72 0.28 285 / 0)",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 0 16px 3px oklch(0.72 0.28 285 / 0.6)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1.05)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow =
                          "0 0 0 0 oklch(0.72 0.28 285 / 0)";
                        (e.currentTarget as HTMLElement).style.transform =
                          "scale(1)";
                      }}
                      data-ocid="projects.secondary_button"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </a>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Hackathons() {
  return (
    <section id="hackathons" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<Trophy className="w-5 h-5" />}
          label="Hackathons"
        />

        <div className="mt-16 grid sm:grid-cols-2 gap-6">
          {HACKATHONS.map((h, i) => (
            <a
              key={h.name}
              href={h.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block cursor-pointer"
            >
              <Card
                className={`reveal reveal-delay-${(i % 2) + 1} grad-border bg-card hover:shadow-glow-lg hover:scale-[1.05] transition-all duration-300 overflow-hidden`}
                data-ocid={`hackathons.item.${i + 1}`}
              >
                <div className="w-full h-48 overflow-hidden">
                  <img
                    src={h.image}
                    alt={h.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="font-display font-bold text-base text-foreground mb-2">
                    {h.name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {h.description}
                  </p>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certifications" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading
          icon={<Award className="w-5 h-5" />}
          label="Certifications"
        />

        <div className="mt-16 grid sm:grid-cols-2 gap-5 max-w-2xl">
          {CERTIFICATIONS.map((cert, i) => (
            <a
              key={cert.name}
              href={cert.image}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal reveal-delay-${(i % 3) + 1} block rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-glow-lg hover:scale-[1.05] transition-all duration-300 overflow-hidden cursor-pointer`}
              data-ocid={`certifications.item.${i + 1}`}
            >
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={cert.image}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  alt={cert.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm text-foreground leading-tight mb-1">
                  {cert.name}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <SectionHeading icon={<Mail className="w-5 h-5" />} label="Contact" />

        <div className="mt-16 flex flex-col items-center text-center reveal">
          <h3 className="font-display font-bold text-3xl text-foreground mb-12">
            Get in Touch
          </h3>

          <div className="flex flex-col sm:flex-row gap-6">
            <a
              href="mailto:shrutisreetadepalli@gmail.com"
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.04] hover:shadow-[0_0_24px_6px_rgba(139,92,246,0.5)] transition-all duration-200 group min-w-[220px]"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium text-foreground">
                  shrutisreetadepalli@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/shrutisree-tadepalli-6a3163362?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl border border-border bg-card hover:border-primary/40 hover:bg-primary/5 hover:scale-[1.04] hover:shadow-[0_0_24px_6px_rgba(139,92,246,0.5)] transition-all duration-200 group min-w-[220px]"
            >
              <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Linkedin className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs text-muted-foreground">LinkedIn</p>
                <p className="text-sm font-medium text-foreground">
                  Connect with me
                </p>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({
  icon,
  label,
}: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-start gap-3 reveal">
      <div className="flex items-center gap-2.5">
        <div
          className="p-2 rounded-lg text-white"
          style={{
            background:
              "linear-gradient(135deg, oklch(0.72 0.28 285), oklch(0.62 0.28 315))",
          }}
        >
          {icon}
        </div>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 dark:text-white heading-glow">
          {label}
        </h2>
      </div>
      {/* Animated underline: expands from left on scroll reveal via CSS */}
      <div className="heading-underline" />
    </div>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          © {year} Shrutisree. All rights reserved.
        </p>
        <p className="text-sm text-muted-foreground">
          Built with ❤️ using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────
// APP
// ──────────────────────────────────────────────

export default function App() {
  const [loadingDone, setLoadingDone] = useState(false);

  const [dark, setDark] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [dark]);

  const toggleDark = useCallback(() => setDark((d) => !d), []);

  useScrollReveal(loadingDone);

  if (!loadingDone) {
    return <LoadingOverlay onComplete={() => setLoadingDone(true)} />;
  }

  return (
    <>
      <div
        className="min-h-screen bg-background"
        style={{
          background: dark
            ? "radial-gradient(ellipse at 50% 0%, #0d1f3c 0%, #060d1f 40%, #020810 100%)"
            : undefined,
        }}
      >
        <Navbar dark={dark} toggleDark={toggleDark} />
        <main>
          <Hero dark={dark} />
          <About />
          <Education />
          <Skills />
          <Experience />
          <Projects />
          <Hackathons />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
