import fs from 'fs';
import path from 'path';

function fixSvg() {
  const svgPath = path.join(process.cwd(), 'src/assets/illustrations/home.svg');
  let fixed = fs.readFileSync(svgPath, 'utf8');

  fixed = fixed.replaceAll('fill="#FFEE71"', 'fill="#FFEE71" class="light"');

  let i = 0;
  const highlightsMap = [
    'lamp',
    'globe',
    'rubics-cube',
    'coffee',
    'books',
    'pen',
  ];

  fixed = fixed.replaceAll('fill="#606E7E"', () => {
    const mapItem = highlightsMap[i++];
    return mapItem
      ? `fill="#606E7E" class="highlight highlight--${mapItem}"`
      : `fill="#606E7E" class="highlight"`;
  });

  fs.writeFileSync(svgPath, fixed);
}

fixSvg();
