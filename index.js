const Parser = require('rss-parser');
const fs = require('fs');

const feeds = {
    'afaanoromoo': { title: 'afaanoromoo', url: 'https://feeds.bbci.co.uk/afaanoromoo/rss.xml' },
    'amharic': { title: 'amharic', url: 'https://feeds.bbci.co.uk/amharic/rss.xml' },
    'afrique': { title: 'afrique', url: 'https://feeds.bbci.co.uk/afrique/rss.xml' },
    'hausa': { title: 'hausa', url: 'https://feeds.bbci.co.uk/hausa/rss.xml' },
    'igbo': { title: 'igbo', url: 'https://feeds.bbci.co.uk/igbo/rss.xml' },
    'gahuza': { title: 'gahuza', url: 'https://feeds.bbci.co.uk/gahuza/rss.xml' },
    'pidgin': { title: 'pidgin', url: 'https://feeds.bbci.co.uk/pidgin/rss.xml' },
    'somali': { title: 'somali', url: 'https://feeds.bbci.co.uk/somali/rss.xml' },
    'swahili': { title: 'swahili', url: 'https://feeds.bbci.co.uk/swahili/rss.xml' },
    'tigrinya': { title: 'tigrinya', url: 'https://feeds.bbci.co.uk/tigrinya/rss.xml' },
    'yoruba': { title: 'yoruba', url: 'https://feeds.bbci.co.uk/yoruba/rss.xml' },
    'kyrgyz': { title: 'kyrgyz', url: 'https://feeds.bbci.co.uk/kyrgyz/rss.xml' },
    'uzbek': { title: 'uzbek', url: 'https://feeds.bbci.co.uk/uzbek/rss.xml' },
    'burmese': { title: 'burmese', url: 'https://feeds.bbci.co.uk/burmese/rss.xml' },
    'zhongwen-simp': { title: 'zhongwen', url: 'https://feeds.bbci.co.uk/zhongwen/simp/rss.xml' },
    'zhongwen-trad': { title: 'zhongwen', url: 'https://feeds.bbci.co.uk/zhongwen/trad/rss.xml' },
    'indonesia': { title: 'indonesia', url: 'https://feeds.bbci.co.uk/indonesia/rss.xml' },
    'japanese': { title: 'japanese', url: 'https://feeds.bbci.co.uk/japanese/rss.xml' },
    'korean': { title: 'korean', url: 'https://feeds.bbci.co.uk/korean/rss.xml' },
    'thai': { title: 'thai', url: 'https://feeds.bbci.co.uk/thai/rss.xml' },
    'vietnamese': { title: 'vietnamese', url: 'https://feeds.bbci.co.uk/vietnamese/rss.xml' },
    'bengali': { title: 'bengali', url: 'https://feeds.bbci.co.uk/bengali/rss.xml' },
    'gujarati': { title: 'gujarati', url: 'https://feeds.bbci.co.uk/gujarati/rss.xml' },
    'hindi': { title: 'hindi', url: 'https://feeds.bbci.co.uk/hindi/rss.xml' },
    'marathi': { title: 'marathi', url: 'https://feeds.bbci.co.uk/marathi/rss.xml' },
    'nepali': { title: 'nepali', url: 'https://feeds.bbci.co.uk/nepali/rss.xml' },
    'pashto': { title: 'pashto', url: 'https://feeds.bbci.co.uk/pashto/rss.xml' },
    'punjabi': { title: 'punjabi', url: 'https://feeds.bbci.co.uk/punjabi/rss.xml' },
    'sinhala': { title: 'sinhala', url: 'https://feeds.bbci.co.uk/sinhala/rss.xml' },
    'tamil': { title: 'tamil', url: 'https://feeds.bbci.co.uk/tamil/rss.xml' },
    'telugu': { title: 'telugu', url: 'https://feeds.bbci.co.uk/telugu/rss.xml' },
    'urdu': { title: 'urdu', url: 'https://feeds.bbci.co.uk/urdu/rss.xml' },
    'azeri': { title: 'azeri', url: 'https://feeds.bbci.co.uk/azeri/rss.xml' },
    'russian': { title: 'russian', url: 'https://feeds.bbci.co.uk/russian/rss.xml' },
    'serbian-lat': { title: 'serbian', url: 'https://feeds.bbci.co.uk/serbian/lat/rss.xml' },
    'serbian-cyr': { title: 'serbian', url: 'https://feeds.bbci.co.uk/serbian/cyr/rss.xml' },
    'turkce': { title: 'turkce', url: 'https://feeds.bbci.co.uk/turkce/rss.xml' },
    'ukrainian': { title: 'ukrainian', url: 'https://feeds.bbci.co.uk/ukrainian/rss.xml' },
    'portuguese': { title: 'portuguese', url: 'https://feeds.bbci.co.uk/portuguese/rss.xml' },
    'mundo': { title: 'mundo', url: 'https://feeds.bbci.co.uk/mundo/rss.xml' },
    'arabic': { title: 'arabic', url: 'https://feeds.bbci.co.uk/arabic/rss.xml' },
    'persian': { title: 'persian', url: 'https://feeds.bbci.co.uk/persian/rss.xml' },
};


let parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediathumbnail'],
    ]
  }
});

Object.keys(feeds).forEach((service, i) => {
    setTimeout( () => {
        (async () => {
          const url = feeds[service].url;
          console.log(`fetching ${url}`);
          let feed = await parser.parseURL(url);
          let md_contents = `# ${feed.title}\r\r`;

          feed.items.forEach(item => {
            md_contents += `## [${item.title}](${item.link})\r![${item.title}](${item.mediathumbnail.$.url})\r\r${item.contentSnippet}\r\r\r`;
          });
          console.log(`writing ${service}`);
          fs.writeFileSync(`./${service}.md`, md_contents);
        })()
    }, 500 * i)
});