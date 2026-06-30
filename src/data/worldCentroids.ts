/**
 * Representative [longitude, latitude] for each country plotted by the `worldMap`
 * chart kind, keyed by numeric ISO 3166-1 (matching the `id` on the world-atlas
 * basemap features). Hardcoded rather than derived from the TopoJSON so symbol
 * placement is decoupled from the basemap join — robust, and lets us nudge a point
 * for legibility without touching geometry. Add an entry here before plotting a new
 * country.
 */
export const COUNTRY_CENTROIDS: Record<string, [number, number]> = {
  '840': [-98.5, 39.8], // United States
  '156': [104.2, 35.9], // China
  '276': [10.4, 51.2], // Germany
  '826': [-1.5, 52.6], // United Kingdom
  '124': [-106.3, 56.1], // Canada
  '528': [5.3, 52.1], // Netherlands
  '36': [134.5, -25.7], // Australia
  '250': [2.2, 46.6], // France
  '392': [138.0, 36.5], // Japan
  '643': [60.0, 58.0], // Russia (nudged west for visibility)
  '356': [78.9, 22.6], // India
  '76': [-51.9, -10.8], // Brazil
  '702': [103.8, 1.35], // Singapore
  '752': [15.0, 62.0], // Sweden
  '616': [19.1, 52.1], // Poland
  '380': [12.6, 42.5], // Italy
  '756': [8.2, 46.8], // Switzerland
  '724': [-3.7, 40.2], // Spain
  '372': [-8.2, 53.4], // Ireland
  '410': [127.8, 36.4], // South Korea
  '484': [-102.5, 23.6], // Mexico
}
