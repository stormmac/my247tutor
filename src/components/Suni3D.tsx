"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { SuniPose } from "@/components/Suni";

/**
 * Suni as a real 3D model, built from shapes and lit like the character video: a glossy yellow
 * head with big cartoon eyes, a chrome ear disc each side, a striped body with a glowing band and
 * name badge, chrome robot arms with jointed hands, chrome legs and glowing see-through wings with
 * circuit lines. It hovers, flaps its wings, blinks, waves, and gives a thumbs up or a high five.
 */

interface Arm {
  shoulder: THREE.Group;
  elbow: THREE.Group;
  hand: THREE.Group;
  fingers: THREE.Group[];
  thumb: THREE.Group;
}

/** Shoulder and elbow angles, and how curled the fingers are, for each thing an arm does. */
interface ArmPose {
  shoulderZ: number;
  shoulderX: number;
  elbow: number;
  curl: number;
  thumbUp: boolean;
}

const RELAXED: ArmPose = { shoulderZ: -0.55, shoulderX: 0.2, elbow: -0.5, curl: 0.5, thumbUp: false };
const OUT: ArmPose = { shoulderZ: -0.15, shoulderX: 0, elbow: -0.35, curl: 0.45, thumbUp: false };
const WAVE: ArmPose = { shoulderZ: 0.6, shoulderX: 0, elbow: -1.5, curl: 0.1, thumbUp: false };
const THUMBS_UP: ArmPose = { shoulderZ: 0.1, shoulderX: 0.4, elbow: -1.9, curl: 1.5, thumbUp: true };
const HIGH_FIVE: ArmPose = { shoulderZ: 1.2, shoulderX: 0.1, elbow: -0.5, curl: 0, thumbUp: false };

function bodyTexture(): THREE.CanvasTexture {
  // The body's stripes, from the top of the sphere (v = 1) to the bottom (v = 0).
  const canvas = document.createElement("canvas");
  canvas.width = 8;
  canvas.height = 512;
  const g = canvas.getContext("2d")!;
  g.fillStyle = "#f9c412";
  g.fillRect(0, 0, 8, 512);
  g.fillStyle = "#3b3431";
  for (const [from, to] of [
    [0.5, 0.6],
    [0.69, 0.79],
  ])
    g.fillRect(0, from * 512, 8, (to - from) * 512);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function badgeTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 160;
  const g = canvas.getContext("2d")!;
  const glow = g.createRadialGradient(128, 80, 10, 128, 80, 130);
  glow.addColorStop(0, "#fffef2");
  glow.addColorStop(1, "#ffe26a");
  g.fillStyle = glow;
  g.beginPath();
  g.roundRect(8, 8, 240, 144, 40);
  g.fill();
  g.fillStyle = "#c27d00";
  g.font = "bold 78px system-ui, sans-serif";
  g.textAlign = "center";
  g.textBaseline = "middle";
  g.fillText("Suni", 128, 84);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function wingGeometry(length: number, width: number): THREE.ShapeGeometry {
  const s = new THREE.Shape();
  s.moveTo(0, 0);
  s.bezierCurveTo(width * 0.5, length * 0.15, width * 0.75, length * 0.75, width * 0.35, length);
  s.bezierCurveTo(0, length * 1.1, -width * 0.45, length * 0.7, -width * 0.25, length * 0.3);
  s.bezierCurveTo(-width * 0.15, length * 0.12, -width * 0.05, 0.04, 0, 0);
  return new THREE.ShapeGeometry(s, 24);
}

function wingVeins(length: number, width: number): THREE.BufferGeometry {
  // Circuit-board lines: straight runs with right-angle turns, inside the wing.
  const points: number[][] = [
    [0, 0.05, 0.05, 0.35, 0.05, 0.35, 0.2, 0.55, 0.2, 0.55, 0.15, 0.8],
    [0.05, 0.35, -0.12, 0.5, -0.12, 0.5, -0.05, 0.7],
    [0.2, 0.55, 0.32, 0.65],
    [-0.05, 0.7, 0.1, 0.85],
  ].map((run) => run.map((v, i) => (i % 2 ? v * length : v * width)));
  const segments: number[] = [];
  for (const run of points)
    for (let i = 0; i + 3 < run.length; i += 2) segments.push(run[i], run[i + 1], 0.002, run[i + 2], run[i + 3], 0.002);
  return new THREE.BufferGeometry().setAttribute("position", new THREE.Float32BufferAttribute(segments, 3));
}

function buildSuni() {
  const yellow = new THREE.MeshPhysicalMaterial({ color: "#f9c412", roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.12 });
  const body = new THREE.MeshPhysicalMaterial({ map: bodyTexture(), roughness: 0.32, clearcoat: 1, clearcoatRoughness: 0.15 });
  const chrome = new THREE.MeshStandardMaterial({ color: "#e8ecef", metalness: 1, roughness: 0.18 });
  const darkMetal = new THREE.MeshStandardMaterial({ color: "#3b4046", metalness: 0.8, roughness: 0.35 });
  const black = new THREE.MeshPhysicalMaterial({ color: "#111114", roughness: 0.15, clearcoat: 1 });
  const white = new THREE.MeshPhysicalMaterial({ color: "#ffffff", roughness: 0.2, clearcoat: 1 });
  const glow = new THREE.MeshBasicMaterial({ color: "#fffbe8" });

  const root = new THREE.Group();
  const sphere = new THREE.SphereGeometry(1, 48, 32);

  // Body: an egg with two dark stripes, a glowing band and the name badge.
  const torso = new THREE.Mesh(sphere, body);
  torso.scale.set(0.86, 0.92, 0.82);
  torso.position.y = 0;
  root.add(torso);
  const band = new THREE.Mesh(new THREE.TorusGeometry(0.83, 0.03, 12, 64), glow);
  band.rotation.x = Math.PI / 2;
  band.position.y = 0.1;
  band.scale.set(1, 0.97, 1);
  root.add(band);
  const badge = new THREE.Mesh(new THREE.PlaneGeometry(0.5, 0.31), new THREE.MeshBasicMaterial({ map: badgeTexture(), transparent: true }));
  badge.position.set(0.2, 0.36, 0.75);
  badge.rotation.set(-0.35, 0.22, 0);
  root.add(badge);

  // Neck.
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 0.18, 32), darkMetal);
  neck.position.y = 0.88;
  root.add(neck);

  // Head, with eyes, cheeks, a smile, ear discs and antennae.
  const head = new THREE.Group();
  head.position.y = 1.72;
  root.add(head);
  const skull = new THREE.Mesh(sphere, yellow);
  skull.scale.set(1.05, 0.88, 0.95);
  head.add(skull);

  const eyes = new THREE.Group();
  head.add(eyes);
  for (const side of [-1, 1]) {
    const eye = new THREE.Group();
    eye.position.set(side * 0.36, 0.05, 0.8);
    eye.rotation.y = side * 0.38;
    eyes.add(eye);
    const ball = new THREE.Mesh(sphere, white);
    ball.scale.set(0.25, 0.29, 0.13);
    eye.add(ball);
    const pupil = new THREE.Mesh(sphere, black);
    pupil.scale.set(0.15, 0.19, 0.07);
    pupil.position.set(-0.06, -0.01, 0.085);
    eye.add(pupil);
    const shine = new THREE.Mesh(sphere, glow);
    shine.scale.setScalar(0.05);
    shine.position.set(-0.02, 0.08, 0.15);
    eye.add(shine);

    const cheek = new THREE.Mesh(
      new THREE.CircleGeometry(0.12, 24),
      new THREE.MeshBasicMaterial({ color: "#ff7a6a", transparent: true, opacity: 0.4 }),
    );
    cheek.position.set(side * 0.6, -0.22, 0.68);
    cheek.rotation.y = side * 0.6;
    head.add(cheek);

    const ear = new THREE.Group();
    ear.position.set(side * 1.02, 0.02, 0);
    ear.rotation.z = (side * Math.PI) / 2;
    head.add(ear);
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.27, 0.14, 32), chrome);
    ear.add(disc);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 12, 32), darkMetal);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -side * 0.075;
    ear.add(ring);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(side * 0.22, 0.76, 0.05),
      new THREE.Vector3(side * 0.28, 1.08, 0.08),
      new THREE.Vector3(side * 0.48, 1.3, 0.05),
    ]);
    head.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 20, 0.025, 8), black));
    const tip = new THREE.Mesh(sphere, black);
    tip.scale.setScalar(0.08);
    tip.position.set(side * 0.5, 1.32, 0.05);
    head.add(tip);
  }
  const smile = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.026, 10, 24, Math.PI * 0.75), black);
  smile.position.set(0.02, -0.2, 0.86);
  smile.rotation.z = Math.PI + Math.PI * 0.125;
  head.add(smile);

  // Arms: chrome upper arm and forearm, dark joints, a hand of three fingers and a thumb.
  const makeArm = (side: 1 | -1): Arm => {
    const shoulder = new THREE.Group();
    shoulder.position.set(side * 0.8, 0.42, 0.05);
    root.add(shoulder);
    const ball = new THREE.Mesh(sphere, chrome);
    ball.scale.setScalar(0.17);
    shoulder.add(ball);
    const upper = new THREE.Mesh(new THREE.CapsuleGeometry(0.11, 0.36, 6, 16), chrome);
    upper.rotation.z = Math.PI / 2;
    upper.position.x = side * 0.27;
    shoulder.add(upper);
    const elbow = new THREE.Group();
    elbow.position.x = side * 0.52;
    shoulder.add(elbow);
    const joint = new THREE.Mesh(sphere, darkMetal);
    joint.scale.setScalar(0.135);
    elbow.add(joint);
    const fore = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.32, 6, 16), chrome);
    fore.rotation.z = Math.PI / 2;
    fore.position.x = side * 0.24;
    elbow.add(fore);
    const hand = new THREE.Group();
    hand.position.x = side * 0.48;
    elbow.add(hand);
    const palm = new THREE.Mesh(sphere, darkMetal);
    palm.scale.set(0.14, 0.15, 0.1);
    hand.add(palm);
    const fingers: THREE.Group[] = [];
    for (let i = 0; i < 3; i++) {
      const finger = new THREE.Group();
      finger.position.set(side * 0.1, 0.08 - i * 0.08, 0.02);
      hand.add(finger);
      const bone = new THREE.Mesh(new THREE.CapsuleGeometry(0.036, 0.15, 4, 8), chrome);
      bone.rotation.z = Math.PI / 2;
      bone.position.x = side * 0.1;
      finger.add(bone);
      fingers.push(finger);
    }
    const thumb = new THREE.Group();
    thumb.position.set(side * 0.06, 0.1, 0.06);
    hand.add(thumb);
    const thumbBone = new THREE.Mesh(new THREE.CapsuleGeometry(0.04, 0.13, 4, 8), chrome);
    thumbBone.position.y = 0.08;
    thumb.add(thumbBone);
    return { shoulder, elbow, hand, fingers, thumb };
  };
  const left = makeArm(-1);
  const right = makeArm(1);

  // Legs: short chrome legs with dark joints and round boots.
  for (const side of [-1, 1]) {
    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.1, 0.3, 16), chrome);
    leg.position.set(side * 0.32, -0.95, 0.05);
    root.add(leg);
    const knee = new THREE.Mesh(sphere, darkMetal);
    knee.scale.setScalar(0.12);
    knee.position.set(side * 0.32, -0.85, 0.05);
    root.add(knee);
    const boot = new THREE.Mesh(sphere, chrome);
    boot.scale.set(0.17, 0.11, 0.24);
    boot.position.set(side * 0.32, -1.13, 0.1);
    root.add(boot);
  }

  // Wings: glowing glassy wings with circuit lines, two each side, on the back.
  const wingMaterial = new THREE.MeshPhysicalMaterial({
    color: "#fff6dc",
    emissive: "#ffe9a8",
    emissiveIntensity: 0.7,
    transparent: true,
    opacity: 0.55,
    roughness: 0.1,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const edgeMaterial = new THREE.LineBasicMaterial({ color: "#e9b44c", transparent: true, opacity: 0.95 });
  const veinMaterial = new THREE.LineBasicMaterial({ color: "#f3c766", transparent: true, opacity: 0.9 });
  const wings: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const pivot = new THREE.Group();
    pivot.position.set(side * 0.25, 0.75, -0.55);
    root.add(pivot);
    for (const [length, width, tilt] of [
      [1.9, 0.95, 0.6],
      [1.2, 0.62, 1.65],
    ]) {
      const wing = new THREE.Group();
      wing.rotation.z = -side * tilt;
      pivot.add(wing);
      const shape = wingGeometry(length, width);
      wing.add(new THREE.Mesh(shape, wingMaterial));
      wing.add(new THREE.LineSegments(new THREE.EdgesGeometry(shape), edgeMaterial));
      wing.add(new THREE.LineSegments(wingVeins(length, width), veinMaterial));
    }
    wings.push(pivot);
  }

  return { root, head, eyes, left, right, wings };
}

function applyPose(arm: Arm, side: 1 | -1, to: ArmPose, k: number) {
  const lerp = (a: number, b: number) => a + (b - a) * k;
  arm.shoulder.rotation.z = lerp(arm.shoulder.rotation.z, side * to.shoulderZ);
  arm.shoulder.rotation.x = lerp(arm.shoulder.rotation.x, to.shoulderX);
  arm.elbow.rotation.z = lerp(arm.elbow.rotation.z, -side * to.elbow);
  for (const f of arm.fingers) {
    f.rotation.y = lerp(f.rotation.y, side * to.curl * 1.1);
    // Fingers tuck into a fist for a thumbs up, so the thumb stands out.
    f.scale.x = lerp(f.scale.x, to.thumbUp ? 0.3 : 1);
  }
  arm.thumb.rotation.z = lerp(arm.thumb.rotation.z, to.thumbUp ? side * -1.55 : side * 0.4);
  arm.thumb.scale.setScalar(lerp(arm.thumb.scale.x, to.thumbUp ? 1.7 : 1));
}

export default function Suni3D({
  size,
  animated,
  wave,
  pose,
  onReady,
}: {
  size: number;
  animated: boolean;
  wave: boolean;
  pose: SuniPose | null;
  onReady: () => void;
}) {
  const host = useRef<HTMLDivElement>(null);
  const state = useRef({ wave, pose, animated });
  state.current = { wave, pose, animated };

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const width = size;
    const height = Math.round(size * 1.1);
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = environment;
    const key = new THREE.DirectionalLight("#fff1dc", 2.2);
    key.position.set(-3, 4, 5);
    scene.add(key);
    const rim = new THREE.DirectionalLight("#ffe7b0", 1.2);
    rim.position.set(3, 2, -4);
    scene.add(rim);
    scene.add(new THREE.AmbientLight("#ffffff", 0.35));

    const camera = new THREE.PerspectiveCamera(28, width / height, 0.1, 50);
    camera.position.set(0, 0.6, 11);
    camera.lookAt(0, 0.6, 0);

    const suni = buildSuni();
    // Turned a little towards the viewer's left, like in the video.
    suni.root.rotation.y = -0.3;
    scene.add(suni.root);
    applyPose(suni.left, -1, OUT, 1);
    applyPose(suni.right, 1, RELAXED, 1);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let frame = 0;
    let visible = true;
    let nextBlink = 2 + Math.random() * 3;

    const draw = () => {
      const t = clock.getElapsedTime();
      const { wave: waving, pose: current, animated: moving } = state.current;
      const speed = reduce ? 0.4 : 1;
      if (moving) {
        suni.root.position.y = Math.sin(t * 2.4 * speed) * 0.1;
        suni.root.rotation.z = Math.sin(t * 1.2 * speed) * 0.04;
        const flap = Math.sin(t * (reduce ? 9 : 42)) * 0.55;
        suni.wings[0].rotation.y = 0.5 + flap;
        suni.wings[1].rotation.y = -0.5 - flap;
        const blinking = t > nextBlink;
        suni.eyes.scale.y = blinking ? 0.15 : 1;
        if (t > nextBlink + 0.12) nextBlink = t + 3 + Math.random() * 3;
      } else {
        suni.wings[0].rotation.y = 0.5;
        suni.wings[1].rotation.y = -0.5;
      }
      let right = current === "thumbsUp" ? THUMBS_UP : current === "highFive" ? HIGH_FIVE : waving ? WAVE : RELAXED;
      if (right === WAVE && moving) right = { ...WAVE, elbow: WAVE.elbow + Math.sin(t * 7) * 0.35 };
      if (current === "thumbsUp" && moving) right = { ...THUMBS_UP, shoulderZ: THUMBS_UP.shoulderZ + Math.sin(t * 10) * 0.08 };
      applyPose(suni.right, 1, right, 0.18);
      applyPose(suni.left, -1, OUT, 0.18);
      renderer.render(scene, camera);
    };

    const loop = () => {
      draw();
      frame = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const resume = () => {
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };
    // Only draw while Suni is on screen.
    const watcher = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    watcher.observe(el);
    document.addEventListener("visibilitychange", resume);
    draw();
    onReady();
    resume();

    return () => {
      cancelAnimationFrame(frame);
      watcher.disconnect();
      document.removeEventListener("visibilitychange", resume);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh || o instanceof THREE.LineSegments) {
          o.geometry.dispose();
          const materials = Array.isArray(o.material) ? o.material : [o.material];
          for (const m of materials) {
            (m as THREE.MeshBasicMaterial).map?.dispose();
            m.dispose();
          }
        }
      });
      environment.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
    // The scene is built once for a size; poses and waving are read each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [size]);

  return <div ref={host} className="suni-3d" style={{ width: size, height: Math.round(size * 1.1) }} aria-hidden />;
}
