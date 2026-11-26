// Kyoto Tower (1964) on the Kyoto Tower Building, in front of Kyoto Station: the nine-storey building (31 m), and on
// it the white steel tower (a shell, no frame inside) to 131 m, its observation deck at 100 m. Dimensions from the
// public figures (heights) and photographs (proportions); built in the place's frame, metres, the tower's axis at the
// anchor, the building's long side along x (east-west, on Shiokoji-dori).
import {
  BoxGeometry, CylinderGeometry, Group, InstancedMesh, LatheGeometry, Matrix4, Mesh, MeshPhysicalMaterial, MeshStandardMaterial,
  Quaternion, Vector3, type Object3D,
} from "@threert/scene";

export const BUILDING = { w: 64, d: 44, h: 31, floors: 9 };
/** The tower's profile above the roof: [radius, height above the ground], bottom to top. */
export const PROFILE: [number, number][] = [
  [7.4, 31], [6.6, 36], [5.4, 46], [4.5, 58], [4.0, 72], [3.8, 86], [4.6, 90], [8.4, 92], [8.6, 95],
  [8.6, 103.5], [8.0, 105], [5.6, 106.5], [4.4, 110], [3.0, 116], [1.6, 121], [0.7, 125],
];
export const DECK = { y0: 92, y1: 105, r: 8.6 };

export function kyotoTower(night: boolean): Object3D {
  const root = new Group();
  root.name = "kyoto-tower";

  const concrete = new MeshStandardMaterial({ name: "building", color: 0xd8d4cb, roughness: 0.75 });
  const band = new MeshStandardMaterial({ name: "spandrel", color: 0x9aa0a6, roughness: 0.5, metalness: 0.2 });
  const glass = new MeshPhysicalMaterial({ name: "window", color: 0x2c3a44, roughness: 0.05, metalness: 0.1, ior: 1.5, emissive: 0xffd9a8, emissiveIntensity: night ? 18 : 0 });
  const white = new MeshStandardMaterial({ name: "tower", color: 0xf2f0ea, roughness: 0.35, metalness: 0.05 });
  const deckGlass = new MeshPhysicalMaterial({ name: "deck glass", color: 0x1d2a33, roughness: 0.02, ior: 1.5, emissive: 0xfff0d8, emissiveIntensity: night ? 60 : 0 });
  const red = new MeshStandardMaterial({ name: "red", color: 0xc8231e, roughness: 0.4 });
  const beacon = new MeshStandardMaterial({ name: "beacon", color: 0xff3020, roughness: 0.3, emissive: 0xff2010, emissiveIntensity: 2500 });
  const roofMat = new MeshStandardMaterial({ name: "roof", color: 0x8c8a85, roughness: 0.9 });
  const sign = new MeshStandardMaterial({ name: "sign", color: 0xf2f2f2, roughness: 0.5, emissive: 0xffffff, emissiveIntensity: night ? 300 : 0 });

  // ---- the building: a base that goes below the ground (terrain is coarse), nine floors of windows on every side
  const { w, d, h, floors } = BUILDING;
  const base = new Mesh(new BoxGeometry(w, h + 3, d), concrete);
  base.position.set(0, (h - 3) / 2, 0);
  root.add(base);
  const roof = new Mesh(new BoxGeometry(w - 1, 0.6, d - 1), roofMat);
  roof.position.set(0, h + 0.3, 0);
  root.add(roof);
  const parapet = new Mesh(new BoxGeometry(w + 0.4, 1.1, d + 0.4), band);
  parapet.position.set(0, h - 0.55, 0);
  root.add(parapet);
  const fh = (h - 5) / floors;
  const wins: Matrix4[] = [], winsZ: Matrix4[] = [], bands: Matrix4[] = [], bandsZ: Matrix4[] = [];
  const q0 = new Quaternion(), qz = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI / 2), one = new Vector3(1, 1, 1);
  for (let f = 0; f < floors; f++) {
    const y = 5 + f * fh + fh * 0.55;
    for (const s of [-1, 1]) {
      for (let x = -w / 2 + 2; x <= w / 2 - 2; x += 2) wins.push(new Matrix4().compose(new Vector3(x, y, s * (d / 2 + 0.02)), q0, one));
      for (let z = -d / 2 + 2; z <= d / 2 - 2; z += 2) winsZ.push(new Matrix4().compose(new Vector3(s * (w / 2 + 0.02), y, z), qz, one));
      bands.push(new Matrix4().compose(new Vector3(0, 5 + f * fh, s * (d / 2 + 0.05)), q0, one));
      bandsZ.push(new Matrix4().compose(new Vector3(s * (w / 2 + 0.05), 5 + f * fh, 0), qz, one));
    }
  }
  const inst = (geo: BoxGeometry, m: MeshStandardMaterial, list: Matrix4[]) => {
    const im = new InstancedMesh(geo, m, list.length);
    list.forEach((x, i) => im.setMatrixAt(i, x));
    root.add(im);
  };
  inst(new BoxGeometry(1.6, fh * 0.6, 0.06), glass, wins);
  inst(new BoxGeometry(1.6, fh * 0.6, 0.06), glass, winsZ);
  inst(new BoxGeometry(w + 0.1, 0.35, 0.1), band, bands);
  inst(new BoxGeometry(d + 0.1, 0.35, 0.1), band, bandsZ);
  // the ground floor: shopfronts, a canopy, the name over the door on the south side (toward the station)
  const front = new Mesh(new BoxGeometry(w - 4, 3.6, 0.1), glass);
  front.position.set(0, 2.2, d / 2 + 0.06);
  root.add(front);
  const canopy = new Mesh(new BoxGeometry(w - 2, 0.3, 3), band);
  canopy.position.set(0, 4.3, d / 2 + 1.5);
  root.add(canopy);
  const plate = new Mesh(new BoxGeometry(18, 1.6, 0.2), sign);
  plate.position.set(0, h - 2.6, d / 2 + 0.15);
  root.add(plate);

  // ---- the tower: a turned shell; the deck a glass drum between two white rings
  const pts = PROFILE.map(([r, y]) => ({ x: r, y }));
  const shell = new Mesh(new LatheGeometry(pts, 48), white);
  root.add(shell);
  const deck = new Mesh(new CylinderGeometry(DECK.r + 0.05, DECK.r + 0.05, 7.4, 48, 1, true), deckGlass);
  deck.position.set(0, 99.2, 0);
  root.add(deck);
  for (const y of [95.3, 103.1]) {
    const ring = new Mesh(new CylinderGeometry(DECK.r + 0.25, DECK.r + 0.25, 0.5, 48), white);
    ring.position.set(0, y, 0);
    root.add(ring);
  }
  // the top: a red-and-white mast with a beacon
  const mast = (r0: number, r1: number, y0: number, y1: number, m: MeshStandardMaterial) => {
    const c = new Mesh(new CylinderGeometry(r1, r0, y1 - y0, 24), m);
    c.position.set(0, (y0 + y1) / 2, 0);
    root.add(c);
  };
  mast(0.7, 0.55, 125, 127, red);
  mast(0.55, 0.42, 127, 128.5, white);
  mast(0.42, 0.3, 128.5, 130, red);
  const light = new Mesh(new CylinderGeometry(0.22, 0.22, 0.8, 16), beacon);
  light.position.set(0, 130.6, 0);
  root.add(light);
  // at night the shell is floodlit from its base: a ring of upward lights on the roof
  if (night) {
    const lamp = new MeshStandardMaterial({ name: "floodlight", color: 0xffffff, emissive: 0xfff1df, emissiveIntensity: 4000 });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const l = new Mesh(new BoxGeometry(0.5, 0.25, 0.5), lamp);
      l.position.set(Math.cos(a) * 9.5, h + 0.75, Math.sin(a) * 9.5);
      root.add(l);
    }
  }
  return root;
}
