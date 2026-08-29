"use client";

import React, { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Hand-authored WebGL2 fragment-shader background — Direction C's "how far
 * could this go" experiment. A fullscreen triangle (no vertex buffers,
 * drawn via gl_VertexID) runs a small fractal-value-noise plasma, colored
 * through VSC's own ink/dark/green/sprout/cream ramp — never a rainbow.
 *
 * Fully self-contained: no npm dependency, isolated to the design lab.
 * Falls back to a static CSS gradient when WebGL2 is unavailable or the
 * user prefers reduced motion; pauses the render loop when scrolled
 * offscreen or the tab is hidden.
 */

const VERTEX_SRC = `#version 300 es
void main() {
  vec2 pos[3] = vec2[3](vec2(-1.0, -1.0), vec2(3.0, -1.0), vec2(-1.0, 3.0));
  gl_Position = vec4(pos[gl_VertexID], 0.0, 1.0);
}`;

const FRAGMENT_SRC = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
out vec4 outColor;

vec2 hash(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float noise(vec2 p) {
  const float K1 = 0.366025404;
  const float K2 = 0.211324865;
  vec2 i = floor(p + (p.x + p.y) * K1);
  vec2 a = p - i + (i.x + i.y) * K2;
  vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec2 b = a - o + K2;
  vec2 c = a - 1.0 + 2.0 * K2;
  vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
  vec3 n = h * h * h * h * vec3(dot(a, hash(i)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
  return dot(n, vec3(70.0));
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  vec2 p = uv * 3.0;
  float t = u_time * 0.035;
  float n = fbm(p + vec2(t, -t * 0.6));
  n = n * 0.5 + 0.5;

  vec3 dark   = vec3(0.055, 0.102, 0.078);  /* #0E1A14 */
  vec3 green  = vec3(0.059, 0.478, 0.251);  /* #0F7A40 */
  vec3 sprout = vec3(0.247, 0.796, 0.455);  /* #3FCB74 */
  vec3 cream  = vec3(0.984, 0.980, 0.965);  /* #FBFAF6 */

  vec3 col = mix(dark, green, smoothstep(0.15, 0.55, n));
  col = mix(col, sprout, smoothstep(0.55, 0.85, n) * 0.5);
  col = mix(col, cream, smoothstep(0.85, 1.05, n) * 0.12);

  outColor = vec4(col, 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function useInViewPause(ref: React.RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setActive(entries.some((e) => e.isIntersecting)), {
      threshold: 0.01,
    });
    io.observe(el);
    const onVisibility = () => setActive(document.visibilityState !== "hidden");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [ref]);
  return active;
}

export function PlasmaField({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [supported, setSupported] = useState(true);
  const inView = useInViewPause(wrapRef);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { antialias: false, alpha: false });
    if (!gl) {
      setSupported(false);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX_SRC);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SRC);
    const program = gl.createProgram();
    if (!vs || !fs || !program) {
      setSupported(false);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      setSupported(false);
      return;
    }
    gl.useProgram(program);

    const timeLoc = gl.getUniformLocation(program, "u_time");
    const resLoc = gl.getUniformLocation(program, "u_resolution");

    let raf = 0;
    const start = performance.now();
    let stopped = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr);
      const h = Math.floor(canvas.clientHeight * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl.viewport(0, 0, w, h);
      }
    };

    const draw = (now: number) => {
      resize();
      gl.uniform1f(timeLoc, (now - start) / 1000);
      gl.uniform2f(resLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (stopped) return;
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduce || !inView) {
      draw(performance.now());
    } else {
      raf = requestAnimationFrame(loop);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      stopped = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [reduce, inView]);

  return (
    <div ref={wrapRef} aria-hidden="true" className={["pointer-events-none absolute inset-0 overflow-hidden", className].filter(Boolean).join(" ")}>
      {supported ? (
        <canvas ref={canvasRef} className="h-full w-full" />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 30% 30%, rgba(63,203,116,0.20) 0%, transparent 65%), radial-gradient(ellipse 60% 60% at 75% 70%, rgba(15,122,64,0.22) 0%, transparent 65%), #0E1A14",
          }}
        />
      )}
    </div>
  );
}
