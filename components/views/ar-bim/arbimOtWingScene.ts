import * as THREE from "three";

/** Hospital OT wing layout from AR-BIM reference HTML (Delta-ARBIM / floor 2). */
export type ArbimOtWingGroups = {
  struct: THREE.Group;
  wall: THREE.Group;
  mepr: THREE.Group;
  mepb: THREE.Group;
  mepy: THREE.Group;
  mepg: THREE.Group;
};

export function buildArbimOtWingScene(groups: ArbimOtWingGroups): void {
  const sg = groups.struct;
  const wg = groups.wall;

  function lm(col: number, op: number) {
    return new THREE.LineBasicMaterial({
      color: col,
      transparent: true,
      opacity: op,
    });
  }
  function mm(col: number, op: number) {
    return new THREE.MeshBasicMaterial({
      color: col,
      transparent: true,
      opacity: op,
      side: THREE.DoubleSide,
    });
  }
  function addEdge(
    geo: THREE.BufferGeometry,
    mat: THREE.LineBasicMaterial,
    grp: THREE.Group,
    x: number,
    y: number,
    z: number,
  ) {
    const m = new THREE.LineSegments(new THREE.EdgesGeometry(geo), mat);
    m.position.set(x, y, z);
    grp.add(m);
  }
  function addMesh(
    geo: THREE.BufferGeometry,
    mat: THREE.MeshBasicMaterial,
    grp: THREE.Group,
    x: number,
    y: number,
    z: number,
  ) {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    grp.add(m);
  }

  function pipe(
    grp: THREE.Group,
    matF: THREE.MeshBasicMaterial,
    matL: THREE.LineBasicMaterial,
    p1: [number, number, number],
    p2: [number, number, number],
    r: number,
  ) {
    const len = Math.sqrt(
      (p2[0] - p1[0]) ** 2 + (p2[1] - p1[1]) ** 2 + (p2[2] - p1[2]) ** 2,
    );
    const mx = (p1[0] + p2[0]) / 2;
    const my = (p1[1] + p2[1]) / 2;
    const mz = (p1[2] + p2[2]) / 2;
    const dx = p2[0] - p1[0];
    const dy = p2[1] - p1[1];
    const dz = p2[2] - p1[2];
    const g = new THREE.CylinderGeometry(r, r, len, 6);
    const dir = new THREE.Vector3(dx, dy, dz).normalize();
    const up = new THREE.Vector3(0, 1, 0);
    const q = new THREE.Quaternion().setFromUnitVectors(up, dir);
    for (const mesh of [
      new THREE.Mesh(g, matF),
      new THREE.LineSegments(new THREE.EdgesGeometry(g), matL),
    ]) {
      mesh.position.set(mx, my, mz);
      mesh.quaternion.copy(q);
      grp.add(mesh);
    }
  }

  const FH = 3.6;
  const sm = lm(0x94a3b8, 0.7);
  const smf = mm(0x5a6a7a, 0.6);

  const cols: [number, number][] = [
    [-4, -3],
    [-4, -1.5],
    [-4, 2.5],
    [-0.5, -3],
    [-0.5, -1.5],
    [-0.5, 2.5],
    [2, -3],
    [2, -1.5],
    [2, 1],
    [4, -3],
    [4, -1.5],
    [4, 1],
  ];
  cols.forEach(([x, z]) => {
    addMesh(new THREE.BoxGeometry(0.2, FH, 0.2), smf, sg, x, FH / 2, z);
    addEdge(new THREE.BoxGeometry(0.2, FH, 0.2), sm, sg, x, FH / 2, z);
  });

  addMesh(new THREE.BoxGeometry(8.2, 0.12, 5.7), mm(0x3d4f5f, 0.7), sg, 0, 0, -0.25);
  addEdge(new THREE.BoxGeometry(8.2, 0.12, 5.7), lm(0x78909c, 0.35), sg, 0, 0, -0.25);
  addMesh(new THREE.BoxGeometry(8.2, 0.12, 5.7), mm(0x3d4f5f, 0.35), sg, 0, FH, -0.25);
  addEdge(new THREE.BoxGeometry(8.2, 0.12, 5.7), lm(0x78909c, 0.2), sg, 0, FH, -0.25);
  addMesh(new THREE.BoxGeometry(3.4, 0.08, 3.8), mm(0x4a5d6e, 0.55), sg, -2.25, 0.1, 0.5);
  addEdge(new THREE.BoxGeometry(3.4, 0.08, 3.8), lm(0x64748b, 0.35), sg, -2.25, 0.1, 0.5);

  const wm = mm(0x6b7f8e, 0.5);
  const we = lm(0x94a3b8, 0.6);
  const wmOT = mm(0x7a6844, 0.65);
  const weOT = lm(0xc9b896, 0.75);
  const wH = FH - 0.1;
  const wY = FH / 2;

  addMesh(new THREE.BoxGeometry(8.2, wH, 0.1), wm, wg, 0, wY, -3.05);
  addEdge(new THREE.BoxGeometry(8.2, wH, 0.1), we, wg, 0, wY, -3.05);
  addMesh(new THREE.BoxGeometry(2.5, wH, 0.16), wmOT, wg, -2.75, wY, -1.5);
  addEdge(new THREE.BoxGeometry(2.5, wH, 0.16), weOT, wg, -2.75, wY, -1.5);
  addMesh(new THREE.BoxGeometry(1.8, wH, 0.16), wmOT, wg, 0.4, wY, -1.5);
  addEdge(new THREE.BoxGeometry(1.8, wH, 0.16), weOT, wg, 0.4, wY, -1.5);
  addMesh(new THREE.BoxGeometry(1.8, wH, 0.1), wm, wg, 3.1, wY, -1.5);
  addEdge(new THREE.BoxGeometry(1.8, wH, 0.1), we, wg, 3.1, wY, -1.5);
  addMesh(new THREE.BoxGeometry(0.18, wH, 4.1), wmOT, wg, -4.05, wY, 0.5);
  addEdge(new THREE.BoxGeometry(0.18, wH, 4.1), weOT, wg, -4.05, wY, 0.5);
  addMesh(new THREE.BoxGeometry(3.6, wH, 0.16), wmOT, wg, -2.25, wY, 2.55);
  addEdge(new THREE.BoxGeometry(3.6, wH, 0.16), weOT, wg, -2.25, wY, 2.55);
  addMesh(new THREE.BoxGeometry(0.12, wH, 2.5), wm, wg, -0.5, wY, 0.25);
  addEdge(new THREE.BoxGeometry(0.12, wH, 2.5), we, wg, -0.5, wY, 0.25);
  addMesh(new THREE.BoxGeometry(2.6, wH, 0.1), wm, wg, 0.75, wY, 1.05);
  addEdge(new THREE.BoxGeometry(2.6, wH, 0.1), we, wg, 0.75, wY, 1.05);
  addMesh(new THREE.BoxGeometry(0.1, wH, 2.5), wm, wg, 2, wY, -0.25);
  addEdge(new THREE.BoxGeometry(0.1, wH, 2.5), we, wg, 2, wY, -0.25);
  addMesh(new THREE.BoxGeometry(2.1, wH, 0.1), wm, wg, 3, wY, 1.05);
  addEdge(new THREE.BoxGeometry(2.1, wH, 0.1), we, wg, 3, wY, 1.05);
  addMesh(new THREE.BoxGeometry(0.1, wH, 4.1), wm, wg, 4.05, wY, -0.5);
  addEdge(new THREE.BoxGeometry(0.1, wH, 4.1), we, wg, 4.05, wY, -0.5);

  const eqFill = mm(0xb8c4d0, 0.8);
  const eqEdge = lm(0xd4dce4, 0.9);
  addMesh(new THREE.BoxGeometry(1.8, 0.08, 0.7), eqFill, sg, -2.2, 1.05, 0.5);
  addEdge(new THREE.BoxGeometry(1.8, 0.08, 0.7), eqEdge, sg, -2.2, 1.05, 0.5);
  addMesh(new THREE.BoxGeometry(0.5, 0.9, 0.4), mm(0x90a4ae, 0.65), sg, -2.2, 0.55, 0.5);
  addEdge(new THREE.BoxGeometry(0.5, 0.9, 0.4), lm(0xb0bec5, 0.7), sg, -2.2, 0.55, 0.5);
  addMesh(new THREE.BoxGeometry(1.0, 0.06, 0.5), mm(0x90a4ae, 0.6), sg, -2.2, 0.15, 0.5);
  addEdge(new THREE.BoxGeometry(1.0, 0.06, 0.5), lm(0xb0bec5, 0.65), sg, -2.2, 0.15, 0.5);

  pipe(sg, mm(0x90a4ae, 0.7), lm(0xb0bec5, 0.8), [-2.2, FH - 0.1, 0.5], [-2.2, FH - 0.8, 0.5], 0.04);

  const lightGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.06, 12);
  const lightMat = mm(0xe8ecf1, 0.85);
  const lightEdge = lm(0xf1f5f9, 0.95);
  const lightM = new THREE.Mesh(lightGeo, lightMat);
  lightM.position.set(-2.2, FH - 0.85, 0.5);
  sg.add(lightM);
  const lightE = new THREE.LineSegments(new THREE.EdgesGeometry(lightGeo), lightEdge);
  lightE.position.set(-2.2, FH - 0.85, 0.5);
  sg.add(lightE);

  const sinkMat = mm(0xcbd5e1, 0.75);
  const sinkEdge = lm(0xe2e8f0, 0.85);
  addMesh(new THREE.BoxGeometry(0.8, 0.5, 0.35), sinkMat, sg, -0.15, 1.1, 0.7);
  addEdge(new THREE.BoxGeometry(0.8, 0.5, 0.35), sinkEdge, sg, -0.15, 1.1, 0.7);
  addMesh(new THREE.BoxGeometry(0.06, 0.7, 0.06), mm(0x90a4ae, 0.6), sg, 0.15, 0.5, 0.7);
  addEdge(new THREE.BoxGeometry(0.06, 0.7, 0.06), lm(0xb0bec5, 0.65), sg, 0.15, 0.5, 0.7);
  addMesh(new THREE.BoxGeometry(0.06, 0.7, 0.06), mm(0x90a4ae, 0.6), sg, -0.45, 0.5, 0.7);
  addEdge(new THREE.BoxGeometry(0.06, 0.7, 0.06), lm(0xb0bec5, 0.65), sg, -0.45, 0.5, 0.7);

  const markMat = mm(0x4ade80, 0.18);
  const markEdge = lm(0x4ade80, 0.4);
  addMesh(new THREE.BoxGeometry(2.0, 0.01, 0.08), markMat, sg, -2.2, 0.16, 0.5);
  addEdge(new THREE.BoxGeometry(2.0, 0.01, 0.08), markEdge, sg, -2.2, 0.16, 0.5);
  addMesh(new THREE.BoxGeometry(0.08, 0.01, 2.0), markMat, sg, -2.2, 0.16, 0.5);
  addEdge(new THREE.BoxGeometry(0.08, 0.01, 2.0), markEdge, sg, -2.2, 0.16, 0.5);

  const circPts: THREE.Vector3[] = [];
  for (let i = 0; i <= 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    circPts.push(
      new THREE.Vector3(-2.2 + Math.cos(a) * 0.9, 0.16, 0.5 + Math.sin(a) * 0.9),
    );
  }
  sg.add(
    new THREE.Line(
      new THREE.BufferGeometry().setFromPoints(circPts),
      lm(0x4ade80, 0.3),
    ),
  );

  const panelMat = mm(0xeab308, 0.65);
  const panelEdge = lm(0xeab308, 0.8);
  addMesh(new THREE.BoxGeometry(0.6, 1.0, 0.3), panelMat, sg, 3.7, 0.65, 0.5);
  addEdge(new THREE.BoxGeometry(0.6, 1.0, 0.3), panelEdge, sg, 3.7, 0.65, 0.5);
  addMesh(new THREE.BoxGeometry(0.5, 0.8, 0.25), mm(0x22c55e, 0.55), sg, 3.7, 0.55, -0.2);
  addEdge(new THREE.BoxGeometry(0.5, 0.8, 0.25), lm(0x4ade80, 0.65), sg, 3.7, 0.55, -0.2);

  function makeLabel(text: string, x: number, y: number, z: number, color: string) {
    const c = document.createElement("canvas");
    c.width = 256;
    c.height = 64;
    const ctx = c.getContext("2d");
    if (!ctx) return new THREE.Sprite();
    ctx.font = "bold 22px JetBrains Mono, monospace";
    ctx.fillStyle = color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 128, 32);
    const tex = new THREE.CanvasTexture(c);
    tex.minFilter = THREE.LinearFilter;
    const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.85 });
    const s = new THREE.Sprite(mat);
    s.position.set(x, y, z);
    s.scale.set(2.2, 0.55, 1);
    return s;
  }

  for (const lbl of [
    makeLabel("OT-1", -2.2, 2.2, 0.5, "#c9b896"),
    makeLabel("SCRUB", 0.75, 2.0, 0.0, "rgba(200,210,225,0.6)"),
    makeLabel("UTILITY", 3.0, 2.0, -0.2, "rgba(200,210,225,0.6)"),
    makeLabel("CORRIDOR", 0, 2.0, -2.3, "rgba(200,210,225,0.5)"),
  ]) {
    if (lbl) sg.add(lbl);
  }

  const rg = groups.mepr;
  const rm = mm(0xef4444, 0.75);
  const re = lm(0xf87171, 0.85);
  const dY = FH - 0.45;
  pipe(rg, rm, re, [-3.8, dY, -2.3], [3.8, dY, -2.3], 0.18);
  pipe(rg, rm, re, [-2.2, dY, -2.3], [-2.2, dY, -1.5], 0.14);
  pipe(rg, rm, re, [-2.2, dY, -1.5], [-2.2, dY, 1.8], 0.16);
  pipe(rg, rm, re, [-3.5, dY, 0.5], [-0.8, dY, 0.5], 0.12);
  const rY = FH - 0.9;
  pipe(rg, rm, re, [-3.5, rY, 1.8], [-0.8, rY, 1.8], 0.1);
  pipe(rg, rm, re, [0.8, dY, -2.3], [0.8, dY, -1.5], 0.1);
  pipe(rg, rm, re, [0.8, dY, -1.5], [0.8, dY, 0.5], 0.1);

  const bg2 = groups.mepb;
  const bm = mm(0x0ea5e9, 0.8);
  const bl2 = lm(0x38bdf8, 0.9);
  pipe(bg2, bm, bl2, [3.2, 0.15, -0.5], [3.2, FH - 0.3, -0.5], 0.07);
  pipe(bg2, bm, bl2, [2.2, FH - 0.6, -0.5], [3.8, FH - 0.6, -0.5], 0.06);
  pipe(bg2, bm, bl2, [2.2, FH - 0.6, -0.5], [2.2, FH - 0.6, 0.5], 0.05);
  pipe(bg2, bm, bl2, [0.2, FH - 0.6, 0.5], [2.2, FH - 0.6, 0.5], 0.05);
  const drainM = mm(0x8d6e3f, 0.7);
  const drainL = lm(0xa0845a, 0.8);
  pipe(bg2, drainM, drainL, [-3.5, 0.06, 1.5], [-1.0, 0.06, 1.5], 0.05);
  pipe(bg2, drainM, drainL, [-1.0, 0.06, 1.5], [-1.0, 0.06, -1.3], 0.05);

  const yg = groups.mepy;
  const ym = mm(0xeab308, 0.8);
  const yl = lm(0xfbbf24, 0.85);
  pipe(yg, ym, yl, [3.5, 0.15, 0.5], [3.5, FH - 0.4, 0.5], 0.05);
  pipe(yg, ym, yl, [2.2, FH - 0.4, 0.5], [3.8, FH - 0.4, 0.5], 0.045);
  pipe(yg, ym, yl, [3.5, 1.8, 0.5], [2.1, 1.8, 0.0], 0.04);
  pipe(yg, ym, yl, [2.1, 1.8, 0.0], [-0.5, 1.8, 0.0], 0.04);
  pipe(yg, ym, yl, [-0.5, 1.8, 0.0], [-2.5, 1.8, 0.5], 0.04);
  pipe(yg, ym, yl, [-3.2, 1.8, 0.5], [-3.8, 1.8, 0.5], 0.035);
  pipe(yg, ym, yl, [-2.5, 1.8, 0.5], [-2.5, 1.8, 1.2], 0.035);

  const gg = groups.mepg;
  const gm2 = mm(0x22c55e, 0.8);
  const gl = lm(0x4ade80, 0.85);
  const eY = FH - 1.1;
  pipe(gg, gm2, gl, [-3.8, eY, -2.6], [3.8, eY, -2.6], 0.045);
  pipe(gg, gm2, gl, [-2.8, eY, -2.6], [-2.8, eY, -1.5], 0.04);
  pipe(gg, gm2, gl, [-2.8, eY, -1.5], [-2.8, eY, 1.5], 0.04);
  pipe(gg, gm2, gl, [-3.2, eY, 0.8], [-1.2, eY, 0.8], 0.035);
  pipe(gg, gm2, gl, [3.5, 0.15, 0.3], [3.5, FH - 0.3, 0.3], 0.04);
  pipe(gg, gm2, gl, [2.1, eY, 0.3], [3.5, eY, 0.3], 0.035);
}
