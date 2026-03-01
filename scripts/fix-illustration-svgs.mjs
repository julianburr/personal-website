import fs from 'fs';
import path from 'path';

const illustrationsPath = path.join(process.cwd(), 'src/assets/illustrations');

function fixSvgs() {
  /**
   * home.svg
   */
  const homeOrgPath = path.join(illustrationsPath, './home-original.svg');
  const homeFixedPath = path.join(illustrationsPath, './home.svg');

  let homeFixed = fs.readFileSync(homeOrgPath, 'utf8');
  homeFixed = homeFixed.replaceAll(
    'fill="#FFEE71"',
    'fill="#FFEE71" class="light"',
  );

  let i = 0;
  const highlightsMap = [
    'lamp',
    'globe',
    'rubics-cube',
    'coffee',
    'books',
    'pen',
  ];

  homeFixed = homeFixed.replaceAll('fill="#606E7E"', () => {
    const mapItem = highlightsMap[i++];
    return mapItem
      ? `fill="#606E7E" class="highlight highlight--${mapItem}"`
      : `fill="#606E7E" class="highlight"`;
  });

  fs.writeFileSync(homeFixedPath, homeFixed);

  /**
   * beach.svg
   */
  const beachOrgPath = path.join(illustrationsPath, './beach-original.svg');
  const beachFixedPath = path.join(illustrationsPath, './beach.svg');

  let beachFixed = fs.readFileSync(beachOrgPath, 'utf8');
  beachFixed = beachFixed.replaceAll(
    'fill="#444444"',
    'fill="#333333" class="boat"',
  );

  fs.writeFileSync(beachFixedPath, beachFixed);
}

fixSvgs();
