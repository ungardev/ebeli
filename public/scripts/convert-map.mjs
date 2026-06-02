import * as d3 from 'd3';
import { readFileSync, writeFileSync } from 'fs';

async function convertSvg() {
  const https = await import('https');

  return new Promise((resolve, reject) => {
    https
      .get(
        'https://raw.githubusercontent.com/fckfck97/Mapa-de-Venezuela-GeoJson/main/venezuela.geojson',
        res => {
          let data = '';
          res.on('data', chunk => (data += chunk));
          res.on('end', () => {
            const geo = JSON.parse(data);
            const width = 800;
            const height = 500;

            const projection = d3
              .geoMercator()
              .fitExtent(
                [
                  [40, 40],
                  [width - 40, height - 40],
                ],
                geo
              )
              .translate([width / 2, height / 2]);

            const pathGen = d3.geoPath().projection(projection);
            const bounds = pathGen.bounds(geo);
            const actualWidth = bounds[1][0] - bounds[0][0];
            const actualHeight = bounds[1][1] - bounds[0][1];

            console.log('Bounds:', bounds);
            console.log('Actual size:', actualWidth, 'x', actualHeight);

            const svgParts = [
              `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">`,
            ];

            for (const feature of geo.features) {
              const pathD = pathGen(feature);
              const props = feature.properties || {};
              const id = props.ID_1 || props.NAME_1 || 'unknown';
              const name = props.NAME_1 || id;

              const stateName = name === 'Vargas' ? 'La Guaira' : name;

              svgParts.push(
                `  <path id="${id}" title="${stateName}" d="${pathD}" fill="#D1D5DB" stroke="#9CA3AF" stroke-width="1"/>`
              );
              console.log(`  ${id} -> ${stateName}`);
            }

            svgParts.push('</svg>');

            writeFileSync(
              'public/maps/venezuela-simple.svg',
              svgParts.join('\n')
            );
            console.log('\nCreated venezuela-simple.svg');
            resolve(true);
          });
        }
      )
      .on('error', reject);
  });
}

convertSvg().catch(console.error);
