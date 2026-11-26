// Kyoto Tower, path-traced: the building and the tower (scene/tower.ts), lit by its windows, its deck and floodlights
// after dusk (ctx.time: the local solar time at the place).
import type { Object3D } from "@threert/scene";
import type { PlaceContext } from "./context.ts";
import { kyotoTower } from "./tower.ts";

export default function build(ctx: PlaceContext): Object3D {
  const night = ctx.time < 6.2 || ctx.time > 17.3;
  const t = kyotoTower(night);
  t.name = ctx.place.id;
  return t;
}
