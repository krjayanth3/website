import * as THREE from "three";

/** An exploded engineering stack: infrastructure, processing and interface. */
export function createHeroCore(root: THREE.Group) {
  root.rotation.set(.58, -.52, -.08);
  const navy = new THREE.MeshStandardMaterial({ color: 0x162b43, metalness: .32, roughness: .38 });
  const porcelain = new THREE.MeshStandardMaterial({ color: 0xf4f7fa, metalness: .15, roughness: .32 });
  const glass = new THREE.MeshStandardMaterial({ color: 0xc7dce8, transparent: true, opacity: .28, metalness: .12, roughness: .25, depthWrite: false });
  const gold = new THREE.MeshStandardMaterial({ color: 0xb58a32, metalness: .48, roughness: .4 });
  const edge = new THREE.LineBasicMaterial({ color: 0x91aaba, transparent: true, opacity: .55 });
  const trace = new THREE.LineBasicMaterial({ color: 0xb58a32, transparent: true, opacity: .65 });
  const layers: THREE.Group[] = [];
  const routes: THREE.Vector3[][][] = [[], [], []];
  const slabGeometry = new THREE.BoxGeometry(4.6, .09, 3.4);
  const terminalGeometry = new THREE.BoxGeometry(.13, .06, .13);
  for (let index = 0; index < 3; index++) {
    const layer = new THREE.Group();
    layer.name = `hero-layer-${index}`;
    layer.position.y = (index - 1) * 1.45;
    layers.push(layer);
    root.add(layer);
    const slab = new THREE.Mesh(slabGeometry, [porcelain, navy, glass][index]);
    layer.add(slab);
    layer.add(new THREE.LineSegments(new THREE.EdgesGeometry(slabGeometry), edge));
    // Routed traces connect the processing tile to discrete edge terminals.
    for (let side = -1; side <= 1; side += 2) {
      for (let lane = 0; lane < 4; lane++) {
        const z = (lane - 1.5) * .65;
        const points = [
          new THREE.Vector3(side * .7, .06, z * .45),
          new THREE.Vector3(side * (1.1 + lane * .12), .06, z * .45),
          new THREE.Vector3(side * (1.1 + lane * .12), .06, z),
          new THREE.Vector3(side * 2.08, .06, z),
        ];
        routes[index].push(points);
        layer.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), trace));
        const terminal = new THREE.Mesh(terminalGeometry, gold);
        terminal.position.set(side * 2.08, .08, z);
        layer.add(terminal);
      }
    }
  }
  const processor = new THREE.Mesh(new THREE.BoxGeometry(1.45, .25, 1.35), navy);
  processor.position.y = .18;
  layers[2].add(processor);
  const processorEdge = new THREE.LineSegments(new THREE.EdgesGeometry(processor.geometry), trace);
  processor.add(processorEdge);
  // A restrained grid of processing cells, rather than a floating brand badge.
  const cellGeometry = new THREE.BoxGeometry(.28, .025, .28);
  for (let x = 0; x < 3; x++) for (let z = 0; z < 3; z++) {
    const cell = new THREE.Mesh(cellGeometry, (x + z) % 3 === 0 ? gold : porcelain);
    cell.position.set((x - 1) * .39, .32, (z - 1) * .36);
    layers[2].add(cell);
  }
  const linkMaterial = new THREE.LineDashedMaterial({ color: 0x7f99aa, dashSize: .09, gapSize: .09, transparent: true, opacity: .42 });
  for (const x of [-1.9, 1.9]) for (const z of [-1.25, 1.25]) {
    const link = new THREE.Line(new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(x, -1.4, z), new THREE.Vector3(x, 1.45, z),
    ]), linkMaterial);
    link.computeLineDistances();
    root.add(link);
  }
  // A thin, softly lit perimeter follows the existing chip rather than adding bloom.
  const chipLight = new THREE.LineBasicMaterial({ color: 0xc9a34c, transparent: true, opacity: .12 });
  const chipHalo = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.BoxGeometry(1.51, .015, 1.41)), chipLight);
  chipHalo.position.y = .055;
  layers[2].add(chipHalo);

  // One pulse per layer; routes reuse the exact points used by the circuit lines.
  const pulseGeometry = new THREE.SphereGeometry(.027, 6, 4);
  const pulses = layers.map((layer, index) => {
    const material = new THREE.MeshBasicMaterial({ color: 0xc9a34c, transparent: true, opacity: 0 });
    const mesh = new THREE.Mesh(pulseGeometry, material);
    mesh.name = `hero-data-pulse-${index}`;
    layer.add(mesh);
    return { mesh, material };
  });
  const verticalMaterial = new THREE.MeshBasicMaterial({ color: 0xc9a34c, transparent: true, opacity: 0 });
  const verticalPulse = new THREE.Mesh(new THREE.SphereGeometry(.024, 6, 4), verticalMaterial);
  verticalPulse.name = "hero-vertical-pulse";
  verticalPulse.scale.y = 2;
  root.add(verticalPulse);
  const periods = [9.4, 8.1, 6.8];
  const phases = [.9, 2.4, .2];
  const amplitudes = [2, 2.5, 3];
  let separation = 0;
  let previousTime = 0;
  return (elapsed: number, pointerX: number, pointerY: number, hovered = false, unitsPerPixel = .02, touch = false) => {
    const delta = Math.max(0, Math.min(elapsed - previousTime, .1));
    previousTime = elapsed;
    const smoothing = 1 - Math.exp(-delta * 5);
    root.rotation.y += (-.52 + THREE.MathUtils.clamp(pointerX, -1, 1) * Math.PI / 60 - root.rotation.y) * smoothing;
    root.rotation.x += (.58 + THREE.MathUtils.clamp(pointerY, -1, 1) * Math.PI / 90 - root.rotation.x) * smoothing;
    separation += ((hovered && !touch ? 6 : 0) - separation) * smoothing;
    const entrance = 1 - Math.pow(1 - Math.min(elapsed / .9, 1), 3);
    layers.forEach((layer, index) => {
      const floating = (Math.sin(elapsed * Math.PI * 2 / periods[index] + phases[index]) * amplitudes[index] + (index === 1 ? .5 : 0)) * (touch ? .25 : 1);
      layer.position.y = (index - 1) * 1.45 + unitsPerPixel * (floating + (index - 1) * (separation + (1 - entrance) * 9));
    });
    trace.opacity = .65 + separation / 6 * .12;
    chipLight.opacity = .1 + (.5 + .5 * Math.sin(elapsed * Math.PI * 2 / 7.6)) * .13;
    pulses.forEach(({ mesh, material }, index) => {
      const cycle = (elapsed + index * 1.8) / (5.6 + index * .7);
      const progress = cycle % 1;
      const route = routes[index][(Math.floor(cycle) * 3 + index * 2) % routes[index].length];
      mesh.visible = progress < .86;
      if (!mesh.visible) return;
      const travel = progress / .86;
      const total = route[0].distanceTo(route[1]) + route[1].distanceTo(route[2]) + route[2].distanceTo(route[3]);
      let remaining = travel * total;
      for (let segment = 0; segment < 3; segment++) {
        const length = route[segment].distanceTo(route[segment + 1]);
        if (remaining <= length || segment === 2) {
          mesh.position.lerpVectors(route[segment], route[segment + 1], length ? remaining / length : 0);
          mesh.position.y += .015;
          break;
        }
        remaining -= length;
      }
      material.opacity = Math.min(1, travel * 8, (1 - travel) * 8) * .65;
    });
    const verticalProgress = (elapsed + 6) % 12 / 2.8;
    verticalPulse.visible = verticalProgress < 1;
    if (verticalPulse.visible) {
      verticalPulse.position.set(1.9, THREE.MathUtils.lerp(layers[2].position.y, layers[0].position.y, verticalProgress), -1.25);
      verticalMaterial.opacity = Math.sin(verticalProgress * Math.PI) * .45;
    }
    return .35 + entrance * .65;
  };
}
