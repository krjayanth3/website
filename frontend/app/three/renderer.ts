import * as THREE from "three";
import { createHeroCore } from "./hero-core";

export type SceneKind = "hero" | "ecosystem" | "sdlc";

/** Decorative geometry only. All labels, controls and descriptions stay in HTML. */
export function createScene(host: HTMLElement, kind: SceneKind, count: number) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.appendChild(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, .1, 100);
  camera.position.set(0, 0, 15);
  const root = new THREE.Group();
  scene.add(root);
  scene.add(new THREE.HemisphereLight(0xeaf3ff, 0x6d7985, 2.6));
  const key = new THREE.DirectionalLight(0xffffff, 3);
  key.position.set(-3, 5, 8);
  const rim = new THREE.DirectionalLight(0xd7af54, 2);
  rim.position.set(4, -2, 4);
  scene.add(key, rim);
  const gold = new THREE.MeshStandardMaterial({ color: 0xb58a32, metalness: .65, roughness: .36 });
  const white = new THREE.MeshStandardMaterial({ color: 0xeef4fa, metalness: .2, roughness: .36 });
  const selectedLineMaterial = new THREE.LineBasicMaterial({ color: 0xb58a32 });
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0xa5b5c4, transparent: true, opacity: .38 });
  const nodes: THREE.Mesh[] = [];
  const connectors: THREE.Line[] = [];
  let highlight: THREE.Mesh | undefined;
  let animateHero: ReturnType<typeof createHeroCore> | undefined;
  if (kind === "hero") {
    animateHero = createHeroCore(root);
  } else {
  const ring = new THREE.Mesh(new THREE.TorusGeometry(3.4, .035, 8, 96), gold);
  ring.rotation.x = THREE.MathUtils.degToRad(12);
  root.add(ring);
  const innerRing = new THREE.Mesh(new THREE.TorusGeometry(2.95, .014, 6, 96), gold);
  innerRing.rotation.x = -.18;
  root.add(innerRing);
  const nodeGeometry = new THREE.CylinderGeometry(.37, .37, .17, 6);
  for (let i = 0; i < count; i++) {
    const angle = i / count * Math.PI * 2;
    const x = Math.sin(angle) * 3.4;
    const y = Math.cos(angle) * 3.4;
    const node = new THREE.Mesh(nodeGeometry, white);
    node.rotation.x = Math.PI / 2;
    node.position.set(x, y, Math.sin(angle) * .25);
    root.add(node);
    nodes.push(node);
    const line = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x * .39, y * .39, 0), new THREE.Vector3(x, y, 0),
    ]), lineMaterial);
    root.add(line);
    connectors.push(line);
  }
  highlight = new THREE.Mesh(new THREE.TorusGeometry(3.4, .06, 8, 24, Math.PI * 2 / count), gold);
  highlight.rotation.x = ring.rotation.x;
  root.add(highlight);
  }
  let selected: number | null = null;
  let visible = false;
  let disposed = false;
  let frame = 0;
  let last = 0;
  let pointerX = 0;
  let pointerY = 0;
  let elapsed = kind === "hero" && host.dataset.heroEntered === "true" ? .9 : 0;
  let hovered = false;
  let unitsPerPixel = .02;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const draw = (time: number) => {
    if (disposed || !visible || document.hidden) return;
    frame = 0;
    if (time - last >= 33) {
      elapsed += Math.min((time - last) / 1000, .05);
      last = time;
      if (kind === "hero") {
        const opacity = animateHero?.(elapsed, pointerX, pointerY, hovered, unitsPerPixel, !finePointer.matches);
        renderer.domElement.style.opacity = String(opacity ?? 1);
        if (elapsed >= .9) host.dataset.heroEntered = "true";
      }
      renderer.render(scene, camera);
    }
    if (kind === "hero") frame = requestAnimationFrame(draw);
  };
  const renderOnce = () => { if (visible && !document.hidden && !disposed) renderer.render(scene, camera); };
  const visibility = (next: boolean) => {
    visible = next;
    cancelAnimationFrame(frame);
    frame = 0;
    if (visible && !document.hidden) {
      last = performance.now();
      if (kind === "hero") frame = requestAnimationFrame(draw);
      else renderOnce();
    }
  };
  const resize = () => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    const aspect = width / height;
    camera.left = -5 * Math.max(aspect, 1);
    camera.right = -camera.left;
    camera.top = 5 / Math.min(aspect, 1);
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    unitsPerPixel = (camera.top - camera.bottom) / height / Math.cos(.58);
    renderer.setSize(width, height);
    renderOnce();
  };
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(host);
  const onVisibility = () => visibility(visible);
  document.addEventListener("visibilitychange", onVisibility);
  const pointer = (event: PointerEvent) => {
    if (event.pointerType !== "mouse" || !finePointer.matches) return;
    hovered = true;
    const bounds = host.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width * 2 - 1;
    pointerY = (event.clientY - bounds.top) / bounds.height * 2 - 1;
  };
  const resetPointer = () => { pointerX = 0; pointerY = 0; hovered = false; };
  if (kind === "hero") {
    host.addEventListener("pointerenter", pointer);
    host.addEventListener("pointermove", pointer);
    host.addEventListener("pointerleave", resetPointer);
  }
  if (kind === "hero") renderer.domElement.style.opacity = String(animateHero?.(elapsed, 0, 0, false, unitsPerPixel, !finePointer.matches) ?? 1);
  resize();
  return {
    visibility,
    select(index: number | null) {
      selected = index;
      nodes.forEach((node, i) => {
        node.material = i === selected ? gold : white;
        node.position.z = i === selected ? .55 : 0;
        node.scale.setScalar(i === selected ? 1.04 : 1);
        connectors[i].material = i === selected ? selectedLineMaterial : lineMaterial;
      });
      if (highlight) {
        highlight.visible = index !== null;
        if (index !== null) highlight.rotation.z = Math.PI / 2 - (index + 1) * Math.PI * 2 / count;
      }
      renderOnce();
    },
    dispose() {
      disposed = true;
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointerenter", pointer);
      host.removeEventListener("pointermove", pointer);
      host.removeEventListener("pointerleave", resetPointer);
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>([gold, white, lineMaterial, selectedLineMaterial]);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Line) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach((material) => materials.add(material));
        }
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    },
  };
}
