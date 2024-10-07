import { Data } from './lsiting_page_data_example';

(async () => {
  const mmListings: string[] = [];
  const rmListings: string[] = [];
  for (let i = 0; i <= 131; i++) {
    try {
      const res = await fetch(
        `https://www.moversmarket.co.uk/listings?limit=24&page=${i}`,
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
      const parsedData = eval(rawData) as Data;

      parsedData.forEach((d) => {
        if (d.type === 'data') {
          d.data.listings?.forEach((l) => {
            mmListings.push(l.id);
          });

          d.data.rightmoveListings?.forEach((l) => {
            rmListings.push(l.id);
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
  console.log(mmListings);
  console.log('$$$$$$');
  console.log(rmListings);
})();
