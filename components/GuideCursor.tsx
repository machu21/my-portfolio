"use client";

import { useEffect, useRef } from "react";
import { RotateCcw, X } from "lucide-react";

type Step = {
  els?: () => HTMLElement[];
  at?: "above" | "below" | "right";
  free?: boolean;
  text: string;
  icon?: string;
};

const ICON_SVGS: Record<string, string> = {
  hand: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;width:13.5px;height:13.5px;vertical-align:-2px;"><path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2"/><path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2"/><path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/></svg>`,
  sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;width:13.5px;height:13.5px;vertical-align:-2px;"><path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/></svg>`,
};

export default function GuideCursor() {
  const rootRef = useRef<HTMLDivElement>(null);
  const promptRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const prompt = promptRef.current;
    const desktop = window.matchMedia("(min-width: 768px)");
    if (!root || !prompt || !desktop.matches) return;

    let cancelled = false;

    const store = {
      get(key: string) {
        try {
          return sessionStorage.getItem(key);
        } catch {
          return null;
        }
      },
      set(key: string, value: string) {
        try {
          sessionStorage.setItem(key, value);
        } catch {}
      },
    };

    const tag = root.querySelector(".gc-tag") as HTMLElement;
    const name = root.querySelector(".gc-name") as HTMLElement;
    const clip = root.querySelector(".gc-clip") as HTMLElement;
    const inner = root.querySelector("[data-gc-text]") as HTMLElement;
    const measure = root.querySelector("[data-gc-measure]") as HTMLElement;
    const caret = root.querySelector(".gc-caret") as HTMLElement;
    const sidebar = document.querySelector('[data-guide="sidebar"]') as HTMLElement | null;

    const graphemes =
      typeof Intl !== "undefined" && "Segmenter" in Intl
        ? new Intl.Segmenter(undefined, { granularity: "grapheme" })
        : null;

    const hooks = (key: string) =>
      Array.from(document.querySelectorAll<HTMLElement>(`[data-guide="${key}"]`));
    const within = (key: string, selector: string) =>
      hooks(key).flatMap((el) => Array.from(el.querySelectorAll<HTMLElement>(selector)));
    const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
    const rand = (min: number, max: number) => min + Math.random() * (max - min);

    const steps: Step[] = [
      {
        els: () => hooks("name"),
        at: "above",
        free: true,
        text: "Hi! I'm Matt, welcome to my website! ",
        icon: "hand",
      },
      {
        els: () => within("socials", "a"),
        at: "below",
        text: "Here are my social links, Calendly, and Tango release.",
      },
      {
        els: () => within("stats", "[data-guide-stat]"),
        at: "below",
        text: "9+ shipped builds across web, desktop, and hardware.",
      },
      {
        els: () => hooks("nav-projects"),
        text: "Explore my featured software & hardware projects.",
      },
      {
        els: () => hooks("nav-experience"),
        text: "My career timeline and engineering roles.",
      },
      {
        els: () => hooks("nav-stack"),
        text: "The tech stack and tools I build with every day.",
      },
      {
        els: () => hooks("chat"),
        text: "Ask my AI assistant anything about my work!",
      },
      {
        els: () => hooks("email"),
        text: "Reach out or book an intro call right here.",
      },
      {
        free: true,
        text: "That's the tour. Scroll around and enjoy your stay! ",
        icon: "sparkles",
      },
    ];

    const goal = { x: 0, y: 0 };
    const shown = { x: 0, y: 0, vx: 0, vy: 0 };
    const SPRING = 190;
    const DAMPING = 2 * Math.sqrt(SPRING) * 0.82;
    const waiters: { at: number; done: () => void }[] = [];

    let clock = 0;
    let last = 0;
    let running = false;
    let away = false;
    let move: {
      from: { x: number; y: number };
      to: () => { x: number; y: number };
      t0: number;
      dur: number;
      skew: number;
      nx: number;
      ny: number;
      b1: number;
      b2: number;
      done: () => void;
    } | null = null;
    let rest: (() => { x: number; y: number }) | null = null;
    let hovered: HTMLElement | null = null;
    let typing = false;
    let tremor = 1;
    let rafId = 0;

    function isAway() {
      const chatbotModal = document.querySelector('[data-chatbot-open="true"]');
      return !desktop.matches || Boolean(chatbotModal);
    }

    function frame(now: number) {
      if (!running || cancelled) return;
      const dt = Math.min(now - last, 50);
      last = now;
      const nowAway = isAway();
      if (nowAway !== away) {
        away = nowAway;
        root!.classList.toggle("is-away", away);
      }
      if (!away) {
        clock += dt;
        if (move) {
          const p = Math.min((clock - move.t0) / move.dur, 1);
          const u = Math.pow(p, move.skew);
          const e = u * u * u * (u * (u * 6 - 15) + 10);
          const to = move.to();
          const side =
            3 * (1 - e) * (1 - e) * e * move.b1 + 3 * (1 - e) * e * e * move.b2;
          goal.x = move.from.x + (to.x - move.from.x) * e + move.nx * side;
          goal.y = move.from.y + (to.y - move.from.y) * e + move.ny * side;
          if (p === 1) {
            const { done } = move;
            rest = move.to;
            move = null;
            done();
          }
        } else if (rest) {
          const to = rest();
          goal.x = to.x;
          goal.y = to.y;
        }

        const hops = Math.ceil(dt / 12);
        const h = dt / hops / 1000;
        for (let i = 0; i < hops; i++) {
          shown.vx += (SPRING * (goal.x - shown.x) - DAMPING * shown.vx) * h;
          shown.vy += (SPRING * (goal.y - shown.y) - DAMPING * shown.vy) * h;
          shown.x += shown.vx * h;
          shown.y += shown.vy * h;
        }

        tremor += ((typing ? 0 : 1) - tremor) * Math.min(dt / 280, 1);
        const x =
          shown.x +
          (Math.sin(clock / 830 + 1.3) * 1.5 +
            Math.sin(clock / 310 + 4.1) * 0.6 +
            Math.sin(clock / 127) * 0.22) *
            tremor;
        const y =
          shown.y +
          (Math.cos(clock / 1010 + 0.4) * 1.3 +
            Math.sin(clock / 370 + 2.2) * 0.55 +
            Math.cos(clock / 141 + 5) * 0.2) *
            tremor;
        root!.style.transform = `translate3d(${x.toFixed(2)}px,${y.toFixed(2)}px,0)`;

        for (let i = waiters.length - 1; i >= 0; i--) {
          if (waiters[i].at <= clock) waiters.splice(i, 1)[0].done();
        }
      }
      rafId = requestAnimationFrame(frame);
    }

    const sleep = (ms: number) =>
      new Promise<void>((done) => waiters.push({ at: clock + ms, done }));

    function glide(to: () => { x: number; y: number }, dur: number) {
      return new Promise<void>((done) => {
        const from = { x: goal.x, y: goal.y };
        const target = to();
        const dx = target.x - from.x;
        const dy = target.y - from.y;
        const dist = Math.hypot(dx, dy) || 1;
        const b1 = Math.min(dist * rand(0.08, 0.28), 64) * (Math.random() < 0.5 ? -1 : 1);
        const b2 =
          Math.random() < 0.3 ? -b1 * rand(0.3, 0.8) : b1 * rand(0.4, 1.1);
        move = {
          from,
          to,
          t0: clock,
          dur,
          skew: rand(0.72, 0.94),
          nx: -dy / dist,
          ny: dx / dist,
          b1,
          b2,
          done,
        };
      });
    }

    async function moveTo(
      to: () => { x: number; y: number },
      opts: { direct?: boolean; dur?: number } = {}
    ) {
      const off = { x: rand(-2.5, 2.5), y: rand(-1.5, 1.5) };
      const aim = opts.direct
        ? to
        : () => {
            const t = to();
            return { x: t.x + off.x, y: t.y + off.y };
          };
      const target = aim();
      const dx = target.x - goal.x;
      const dy = target.y - goal.y;
      const dist = Math.hypot(dx, dy) || 1;
      const dur =
        (opts.dur || clamp(210 + Math.sqrt(dist) * 25, 330, 1000)) * rand(0.88, 1.15);
      const roll = Math.random();
      if (opts.direct || dist < 160 || roll > 0.65) return glide(aim, dur);

      const miss = clamp(dist * rand(0.025, 0.06), 5, 22) * (roll < 0.4 ? 1 : -1);
      const drift = rand(-0.5, 0.5) * miss;
      const ox = (dx / dist) * miss - (dy / dist) * drift;
      const oy = (dy / dist) * miss + (dx / dist) * drift;
      await glide(() => {
        const t = aim();
        return { x: t.x + ox, y: t.y + oy };
      }, dur);
      await sleep(rand(40, 110));
      await glide(aim, rand(140, 230));
    }

    function visible(el: HTMLElement) {
      const r = el.getBoundingClientRect();
      if (!r.width || r.top < 0 || r.bottom > window.innerHeight) return false;
      const scroller = el.closest(".overflow-y-auto");
      if (!scroller) return true;
      const s = scroller.getBoundingClientRect();
      return r.top >= s.top && r.bottom <= s.bottom;
    }

    function anchor(el: HTMLElement, at?: "above" | "below" | "right") {
      return () => {
        const r = el.getBoundingClientRect();
        if (at === "above") return { x: r.left + 6, y: r.top - 24 };
        if (at === "below") return { x: r.left + r.width / 2, y: r.bottom + 2 };
        return { x: r.right + 5, y: r.top + r.height / 2 };
      };
    }

    function openSpace(fx: number, fy: number) {
      const left = sidebar ? sidebar.getBoundingClientRect().right : 0;
      const point = {
        x: left + (window.innerWidth - left) * fx,
        y: window.innerHeight * fy,
      };
      return () => point;
    }

    function setHover(el?: HTMLElement | null) {
      if (hovered) hovered.classList.remove("gc-hover");
      hovered = el || null;
      if (hovered) hovered.classList.add("gc-hover");
    }

    function compose(text: string, iconKey?: string) {
      const parts = graphemes
        ? Array.from(graphemes.segment(text), (s) => s.segment)
        : Array.from(text);
      const chars: HTMLElement[] = parts.map((part) => {
        const span = document.createElement("span");
        span.className = "gc-ch";
        span.textContent = part;
        return span;
      });

      if (iconKey && ICON_SVGS[iconKey]) {
        const iconSpan = document.createElement("span");
        iconSpan.className = "gc-ch inline-flex items-center";
        iconSpan.innerHTML = ICON_SVGS[iconKey];
        chars.push(iconSpan);
        parts.push("");
      }

      measure.replaceChildren(...chars);
      const boxes = chars.map((span) => ({
        right: span.offsetLeft + span.offsetWidth,
        top: span.offsetTop,
        bottom: span.offsetTop + span.offsetHeight,
      }));
      return {
        parts,
        chars,
        boxes,
        width: Math.ceil(measure.getBoundingClientRect().width),
        height: measure.offsetHeight,
      };
    }

    function place(
      point: { x: number; y: number },
      layout: { width: number; height: number },
      prefer?: string | null
    ) {
      const w = Math.max(name.offsetWidth, layout.width) + 22;
      const h = name.offsetHeight + layout.height + 10;
      const fitsBelow = point.y + 19 + h + 10 <= window.innerHeight;
      const fitsAbove = point.y - h - 10 >= 0;
      root!.classList.toggle("is-up", fitsAbove && (prefer === "above" || !fitsBelow));
      root!.classList.toggle("is-left", point.x + 16 + w + 10 > window.innerWidth);
    }

    async function type(layout: ReturnType<typeof compose>) {
      inner.style.width = layout.width + "px";
      inner.replaceChildren(...layout.chars, caret);
      tag.classList.add("is-talking", "is-typing");
      typing = true;
      const pace = rand(0.85, 1.25);
      let width = 0;
      for (let i = 0; i < layout.chars.length; i++) {
        if (cancelled) return;
        const box = layout.boxes[i];
        const part = layout.parts[i];
        layout.chars[i].classList.add("is-on");
        width = Math.max(width, box.right);
        clip.style.width = Math.ceil(width) + 2 + "px";
        clip.style.height = box.bottom + "px";
        caret.style.transform = `translate(${box.right}px,${box.top}px)`;
        let wait = rand(7, 20) * pace;
        if (/[.!?]/.test(part)) wait = rand(80, 150);
        else if (/[,:]/.test(part)) wait = rand(45, 90);
        else if (part === " " && Math.random() < 0.12) wait += rand(60, 150);
        else if (Math.random() < 0.07) wait += rand(30, 80);
        await sleep(wait);
      }
      typing = false;
      tag.classList.remove("is-typing");
    }

    function hush() {
      clip.style.width = clip.style.height = "0px";
      tag.classList.remove("is-talking", "is-typing");
    }

    async function say(step: Step) {
      if (cancelled) return;
      const els = step.els ? step.els().filter(visible) : [];
      if (!els.length && !step.free) return;
      const points = els.length
        ? els.map((el) => anchor(el, step.at))
        : [openSpace(rand(0.44, 0.56), rand(0.4, 0.5))];
      const layout = compose(step.text, step.icon);
      hush();
      place(points[0](), layout, els.length ? step.at : null);
      setHover(els[0]);
      await moveTo(points[0]);
      await sleep(rand(60, 140));
      await type(layout);
      if (points.length > 1) {
        await sleep(rand(550, 800));
        for (let i = 1; i < points.length; i++) {
          if (cancelled) return;
          await sleep(rand(90, 190));
          setHover(els[i]);
          await moveTo(points[i], { dur: rand(240, 340) });
        }
        await sleep(rand(550, 750));
      } else {
        await sleep((850 + layout.chars.length * 20) * rand(0.95, 1.15));
      }
      setHover(null);
    }

    function showPrompt() {
      if (store.get("guideTourPrompt") !== "off") {
        prompt!.classList.add("is-on");
      }
    }

    async function run() {
      await sleep(300);
      if (cancelled) return;
      root!.classList.add("is-here");
      for (const step of steps) {
        if (cancelled) return;
        await say(step);
      }

      if (cancelled) return;
      store.set("guideTourSeen", "1");

      hush();
      await sleep(rand(300, 500));
      const exit = { x: window.innerWidth + 90, y: window.innerHeight * rand(0.18, 0.42) };
      await moveTo(() => exit, { direct: true });
      root!.classList.remove("is-here");
      await sleep(500);
      running = false;
      showPrompt();
    }

    function start() {
      if (running || cancelled) return;
      running = true;
      move = rest = null;
      goal.x = shown.x = window.innerWidth + 40;
      goal.y = shown.y = window.innerHeight * rand(0.5, 0.7);
      shown.vx = shown.vy = 0;
      root!.classList.remove("is-up", "is-left");
      root!.style.transform = `translate3d(${goal.x}px,${goal.y}px,0)`;
      rafId = requestAnimationFrame((now) => {
        last = now;
        frame(now);
      });
      run();
    }

    const replayBtn = prompt.querySelector("[data-guide-replay]");
    const dismissBtn = prompt.querySelector("[data-guide-dismiss]");

    const handleReplay = () => {
      prompt.classList.remove("is-on");
      start();
    };

    const handleDismiss = () => {
      prompt.classList.remove("is-on");
      store.set("guideTourPrompt", "off");
    };

    replayBtn?.addEventListener("click", handleReplay);
    dismissBtn?.addEventListener("click", handleDismiss);

    // Clear any stale lock from hot-reloads or interrupted tours and start
    sessionStorage.removeItem("guideTourSeen");
    start();

    return () => {
      cancelled = true;
      running = false;
      cancelAnimationFrame(rafId);
      setHover(null);
      replayBtn?.removeEventListener("click", handleReplay);
      dismissBtn?.removeEventListener("click", handleDismiss);
    };
  }, []);

  return (
    <>
      <div id="guideCursor" ref={rootRef} aria-hidden="true">
        <svg className="gc-arrow" viewBox="0 0 24 24" fill="none">
          <path
            className="gc-rim"
            d="M5.5 5.5l3.9 11.7 2.2-5.6 5.6-2.2-11.7-3.9z"
          />
          <path
            className="gc-body"
            d="M5.5 5.5l3.9 11.7 2.2-5.6 5.6-2.2-11.7-3.9z"
          />
        </svg>
        <div className="gc-tag">
          <span className="gc-name">Matt</span>
          <div className="gc-clip">
            <div className="gc-text" data-gc-text></div>
          </div>
          <div className="gc-text gc-measure" data-gc-measure></div>
          <span className="gc-caret"></span>
        </div>
      </div>

      <div id="guidePrompt" ref={promptRef}>
        <button type="button" className="gp-replay" data-guide-replay>
          <RotateCcw className="w-3 h-3" />
          <span>take the tour again</span>
        </button>
        <button
          type="button"
          className="gp-dismiss"
          data-guide-dismiss
          aria-label="Dismiss"
        >
          <X className="w-2.5 h-2.5" />
        </button>
      </div>
    </>
  );
}

