// Built from scene/main.ts (sources 2154a2ced64bcf4b) by `bun run build`: edit the source, not this file.
var { defineProperty: __defProp, getOwnPropertyNames: __getOwnPropNames, getOwnPropertyDescriptor: __getOwnPropDesc } = Object, __hasOwnProp = Object.prototype.hasOwnProperty;
function __accessProp(key) {
  return this[key];
}
var __toCommonJS = (from) => {
  var entry = (__moduleCache ??= /* @__PURE__ */ new WeakMap).get(from), desc;
  if (entry)
    return entry;
  if (entry = __defProp({}, "__esModule", { value: !0 }), from && typeof from === "object" || typeof from === "function") {
    for (var key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(entry, key))
        __defProp(entry, key, {
          get: __accessProp.bind(from, key),
          enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
        });
  }
  return __moduleCache.set(from, entry), entry;
}, __moduleCache;
var __returnValue = (v) => v;
function __exportSetter(name, newValue) {
  this[name] = __returnValue.bind(null, newValue);
}
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: !0,
      configurable: !0,
      set: __exportSetter.bind(all, name)
    });
};

// scene/main.ts
var exports_main = {};
__export(exports_main, {
  default: () => build
});
module.exports = __toCommonJS(exports_main);

// scene/tower.ts
var import_scene = require("@threert/scene"), BUILDING = { w: 64, d: 44, h: 31, floors: 9 }, PROFILE = [
  [7.4, 31],
  [6.6, 36],
  [5.4, 46],
  [4.5, 58],
  [4, 72],
  [3.8, 86],
  [4.6, 90],
  [8.4, 92],
  [8.6, 95],
  [8.6, 103.5],
  [8, 105],
  [5.6, 106.5],
  [4.4, 110],
  [3, 116],
  [1.6, 121],
  [0.7, 125]
], DECK = { y0: 92, y1: 105, r: 8.6 };
function kyotoTower(night) {
  let root = new import_scene.Group;
  root.name = "kyoto-tower";
  let concrete = new import_scene.MeshStandardMaterial({ name: "building", color: 14210251, roughness: 0.75 }), band = new import_scene.MeshStandardMaterial({ name: "spandrel", color: 10133670, roughness: 0.5, metalness: 0.2 }), glass = new import_scene.MeshPhysicalMaterial({ name: "window", color: 2898500, roughness: 0.05, metalness: 0.1, ior: 1.5, emissive: 16767400, emissiveIntensity: night ? 18 : 0 }), white = new import_scene.MeshStandardMaterial({ name: "tower", color: 15921386, roughness: 0.35, metalness: 0.05 }), deckGlass = new import_scene.MeshPhysicalMaterial({ name: "deck glass", color: 1911347, roughness: 0.02, ior: 1.5, emissive: 16773336, emissiveIntensity: night ? 60 : 0 }), red = new import_scene.MeshStandardMaterial({ name: "red", color: 13116190, roughness: 0.4 }), beacon = new import_scene.MeshStandardMaterial({ name: "beacon", color: 16724000, roughness: 0.3, emissive: 16719888, emissiveIntensity: 2500 }), roofMat = new import_scene.MeshStandardMaterial({ name: "roof", color: 9210501, roughness: 0.9 }), sign = new import_scene.MeshStandardMaterial({ name: "sign", color: 15921906, roughness: 0.5, emissive: 16777215, emissiveIntensity: night ? 300 : 0 }), { w, d, h, floors } = BUILDING, base = new import_scene.Mesh(new import_scene.BoxGeometry(w, h + 3, d), concrete);
  base.position.set(0, (h - 3) / 2, 0), root.add(base);
  let roof = new import_scene.Mesh(new import_scene.BoxGeometry(w - 1, 0.6, d - 1), roofMat);
  roof.position.set(0, h + 0.3, 0), root.add(roof);
  let parapet = new import_scene.Mesh(new import_scene.BoxGeometry(w + 0.4, 1.1, d + 0.4), band);
  parapet.position.set(0, h - 0.55, 0), root.add(parapet);
  let fh = (h - 5) / floors, wins = [], winsZ = [], bands = [], bandsZ = [], q0 = new import_scene.Quaternion, qz = new import_scene.Quaternion().setFromAxisAngle(new import_scene.Vector3(0, 1, 0), Math.PI / 2), one = new import_scene.Vector3(1, 1, 1);
  for (let f = 0;f < floors; f++) {
    let y = 5 + f * fh + fh * 0.55;
    for (let s of [-1, 1]) {
      for (let x = -w / 2 + 2;x <= w / 2 - 2; x += 2)
        wins.push(new import_scene.Matrix4().compose(new import_scene.Vector3(x, y, s * (d / 2 + 0.02)), q0, one));
      for (let z = -d / 2 + 2;z <= d / 2 - 2; z += 2)
        winsZ.push(new import_scene.Matrix4().compose(new import_scene.Vector3(s * (w / 2 + 0.02), y, z), qz, one));
      bands.push(new import_scene.Matrix4().compose(new import_scene.Vector3(0, 5 + f * fh, s * (d / 2 + 0.05)), q0, one)), bandsZ.push(new import_scene.Matrix4().compose(new import_scene.Vector3(s * (w / 2 + 0.05), 5 + f * fh, 0), qz, one));
    }
  }
  let inst = (geo, m, list) => {
    let im = new import_scene.InstancedMesh(geo, m, list.length);
    list.forEach((x, i) => im.setMatrixAt(i, x)), root.add(im);
  };
  inst(new import_scene.BoxGeometry(1.6, fh * 0.6, 0.06), glass, wins), inst(new import_scene.BoxGeometry(1.6, fh * 0.6, 0.06), glass, winsZ), inst(new import_scene.BoxGeometry(w + 0.1, 0.35, 0.1), band, bands), inst(new import_scene.BoxGeometry(d + 0.1, 0.35, 0.1), band, bandsZ);
  let front = new import_scene.Mesh(new import_scene.BoxGeometry(w - 4, 3.6, 0.1), glass);
  front.position.set(0, 2.2, d / 2 + 0.06), root.add(front);
  let canopy = new import_scene.Mesh(new import_scene.BoxGeometry(w - 2, 0.3, 3), band);
  canopy.position.set(0, 4.3, d / 2 + 1.5), root.add(canopy);
  let plate = new import_scene.Mesh(new import_scene.BoxGeometry(18, 1.6, 0.2), sign);
  plate.position.set(0, h - 2.6, d / 2 + 0.15), root.add(plate);
  let pts = PROFILE.map(([r, y]) => ({ x: r, y })), shell = new import_scene.Mesh(new import_scene.LatheGeometry(pts, 48), white);
  root.add(shell);
  let deck = new import_scene.Mesh(new import_scene.CylinderGeometry(DECK.r + 0.05, DECK.r + 0.05, 7.4, 48, 1, !0), deckGlass);
  deck.position.set(0, 99.2, 0), root.add(deck);
  for (let y of [95.3, 103.1]) {
    let ring = new import_scene.Mesh(new import_scene.CylinderGeometry(DECK.r + 0.25, DECK.r + 0.25, 0.5, 48), white);
    ring.position.set(0, y, 0), root.add(ring);
  }
  let mast = (r0, r1, y0, y1, m) => {
    let c = new import_scene.Mesh(new import_scene.CylinderGeometry(r1, r0, y1 - y0, 24), m);
    c.position.set(0, (y0 + y1) / 2, 0), root.add(c);
  };
  mast(0.7, 0.55, 125, 127, red), mast(0.55, 0.42, 127, 128.5, white), mast(0.42, 0.3, 128.5, 130, red);
  let light = new import_scene.Mesh(new import_scene.CylinderGeometry(0.22, 0.22, 0.8, 16), beacon);
  if (light.position.set(0, 130.6, 0), root.add(light), night) {
    let lamp = new import_scene.MeshStandardMaterial({ name: "floodlight", color: 16777215, emissive: 16773599, emissiveIntensity: 4000 });
    for (let i = 0;i < 12; i++) {
      let a = i / 12 * Math.PI * 2, l = new import_scene.Mesh(new import_scene.BoxGeometry(0.5, 0.25, 0.5), lamp);
      l.position.set(Math.cos(a) * 9.5, h + 0.75, Math.sin(a) * 9.5), root.add(l);
    }
  }
  return root;
}

// scene/main.ts
function build(ctx) {
  let night = ctx.time < 6.2 || ctx.time > 17.3, t = kyotoTower(night);
  return t.name = ctx.place.id, t;
}
