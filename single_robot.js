import { RMLISTINGS } from './ids';

(async () => {
  const detailedListings = [];
  for (let i = 0; i < RMLISTINGS.length; i++) {
    try {
      const id = RMLISTINGS[i];
      const res = await fetch(
        `https://www.moversmarket.co.uk/listings/external/${id}`,
      );

      const html = await res.text();

      const startTerm = 'const data = ';
      const startIndex = html.indexOf(startTerm);
      const endTerm = 'Promise.all([';
      const endIndex = html.indexOf(endTerm);

      const rawData = html
        .slice(startIndex + startTerm.length, endIndex)
        .trim()
        .slice(0, -1);
      const parsedDate = eval(rawData);

      parsedDate.forEach((d) => {
        if (d.type === 'data') {
          if (d.data.listing) {
            detailedListings.push(d.data.listing);
          }
        }
      });
    } catch (e) {
      console.error(e);
    }
  }

  console.log(detailedListings);
})();
