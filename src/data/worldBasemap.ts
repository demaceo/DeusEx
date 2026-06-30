/**
 * Runtime loader for the world basemap used by the `worldMap` chart kind. Mirrors
 * the cached-promise pattern in `audioEpisodes.ts`: the ~106KB TopoJSON lives in
 * `public/geo/` and is fetched once at runtime (never bundled into JS), parsed to a
 * GeoJSON FeatureCollection, and reused. Resolves to `null` on any failure — and
 * when `fetch` is unavailable (jsdom under test) — so callers render a graceful
 * empty state instead of crashing.
 */

import { geoNaturalEarth1, geoPath, type GeoPath, type GeoProjection } from 'd3-geo'
import type { Feature, FeatureCollection, Geometry } from 'geojson'
import { feature } from 'topojson-client'

const BASEMAP_URL = '/geo/countries-110m.json'

export type CountryProps = { name?: string }
export type CountryFeature = Feature<Geometry, CountryProps>
export type WorldBasemap = FeatureCollection<Geometry, CountryProps>

let promise: Promise<WorldBasemap | null> | null = null

/** Fetch + parse the world basemap once; cached. Returns `null` on failure. */
export function loadBasemap(): Promise<WorldBasemap | null> {
  if (!promise) {
    promise =
      typeof fetch === 'function'
        ? fetch(BASEMAP_URL)
            .then((res) => (res.ok ? res.json() : null))
            .then((topo) =>
              topo ? (feature(topo, topo.objects.countries) as unknown as WorldBasemap) : null,
            )
            .catch(() => null)
        : Promise.resolve(null)
  }
  return promise
}

/**
 * Natural Earth projection + path generator fitted to the FULL world collection,
 * so the frame stays stable regardless of which countries carry data. Bubble
 * centroids must project through the returned `projection` to register on land.
 */
export function fitWorld(
  basemap: WorldBasemap,
  width: number,
  height: number,
): { projection: GeoProjection; path: GeoPath } {
  const projection = geoNaturalEarth1().fitSize([width, height], basemap)
  return { projection, path: geoPath(projection) }
}
