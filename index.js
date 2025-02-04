const Parser = require('rss-parser');
const fs = require('fs');

const feeds = {
    'afaanoromoo': { title: 'afaanoromoo', url: 'https://feeds.bbci.co.uk/afaanoromoo/rss.xml', locale: 'om-ET' },
    'amharic': { title: 'amharic', url: 'https://feeds.bbci.co.uk/amharic/rss.xml', locale: 'am-ET' },
    'afrique': { title: 'afrique', url: 'https://feeds.bbci.co.uk/afrique/rss.xml', locale: 'fr' },
    'hausa': { title: 'hausa', url: 'https://feeds.bbci.co.uk/hausa/rss.xml', locale: 'ha-GH' },
    'igbo': { title: 'igbo', url: 'https://feeds.bbci.co.uk/igbo/rss.xml', locale: 'ig' },
    'gahuza': { title: 'gahuza', url: 'https://feeds.bbci.co.uk/gahuza/rss.xml', locale: 'rw-RW' },
    'pidgin': { title: 'pidgin', url: 'https://feeds.bbci.co.uk/pidgin/rss.xml', locale: 'pcm' },
    'somali': { title: 'somali', url: 'https://feeds.bbci.co.uk/somali/rss.xml', locale: 'so-SO' },
    'swahili': { title: 'swahili', url: 'https://feeds.bbci.co.uk/swahili/rss.xml', locale: 'sw-KE' },
    'tigrinya': { title: 'tigrinya', url: 'https://feeds.bbci.co.uk/tigrinya/rss.xml', locale: 'ti-ET' },
    'yoruba': { title: 'yoruba', url: 'https://feeds.bbci.co.uk/yoruba/rss.xml', locale: 'yo' },
    'kyrgyz': { title: 'kyrgyz', url: 'https://feeds.bbci.co.uk/kyrgyz/rss.xml', locale: 'ky-KG' },
    'uzbek': { title: 'uzbek', url: 'https://feeds.bbci.co.uk/uzbek/cyr/rss.xml', locale: 'uz-UZ' },
    'burmese': { title: 'burmese', url: 'https://feeds.bbci.co.uk/burmese/rss.xml', locale: 'my-MM' },
    'zhongwen-trad': { title: 'zhongwen', url: 'https://feeds.bbci.co.uk/zhongwen/trad/rss.xml', locale: 'zh-hant' },
    'indonesia': { title: 'indonesia', url: 'https://feeds.bbci.co.uk/indonesia/rss.xml', locale: 'id-ID' },
    'japanese': { title: 'japanese', url: 'https://feeds.bbci.co.uk/japanese/rss.xml', locale: 'ja-JP' },
    'korean': { title: 'korean', url: 'https://feeds.bbci.co.uk/korean/rss.xml', locale: 'ko-KO' },
    'thai': { title: 'thai', url: 'https://feeds.bbci.co.uk/thai/rss.xml', locale: 'th-TH' },
    'vietnamese': { title: 'vietnamese', url: 'https://feeds.bbci.co.uk/vietnamese/rss.xml', locale: 'vi-VN' },
    'bengali': { title: 'bengali', url: 'https://feeds.bbci.co.uk/bengali/rss.xml', locale: 'bn-BD' },
    'gujarati': { title: 'gujarati', url: 'https://feeds.bbci.co.uk/gujarati/rss.xml', locale: 'gu-IN' },
    'hindi': { title: 'hindi', url: 'https://feeds.bbci.co.uk/hindi/rss.xml', locale: 'hi-IN' },
    'marathi': { title: 'marathi', url: 'https://feeds.bbci.co.uk/marathi/rss.xml', locale: 'mr-IN' },
    'nepali': { title: 'nepali', url: 'https://feeds.bbci.co.uk/nepali/rss.xml', locale: 'ne-NP' },
    'pashto': { title: 'pashto', url: 'https://feeds.bbci.co.uk/pashto/rss.xml', locale: 'ps' },
    'punjabi': { title: 'punjabi', url: 'https://feeds.bbci.co.uk/punjabi/rss.xml', locale: 'pa-IN' },
    'sinhala': { title: 'sinhala', url: 'https://feeds.bbci.co.uk/sinhala/rss.xml', locale: 'si-LK' },
    'tamil': { title: 'tamil', url: 'https://feeds.bbci.co.uk/tamil/rss.xml', locale: 'ta-IN' },
    'telugu': { title: 'telugu', url: 'https://feeds.bbci.co.uk/telugu/rss.xml', locale: 'te-IN' },
    'urdu': { title: 'urdu', url: 'https://feeds.bbci.co.uk/urdu/rss.xml', locale: 'ur' },
    'azeri': { title: 'azeri', url: 'https://feeds.bbci.co.uk/azeri/rss.xml', locale: 'az-AZ' },
    'russian': { title: 'russian', url: 'https://feeds.bbci.co.uk/russian/rss.xml', locale: 'ru-RU' },
    'serbian-lat': { title: 'serbian', url: 'https://feeds.bbci.co.uk/serbian/lat/rss.xml', locale: 'sr-latn' },
    'turkce': { title: 'turkce', url: 'https://feeds.bbci.co.uk/turkce/rss.xml', locale: 'tr-TR' },
    'ukrainian': { title: 'ukrainian', url: 'https://feeds.bbci.co.uk/ukrainian/rss.xml', locale: 'uk-UA' },
    'portuguese': { title: 'portuguese', url: 'https://feeds.bbci.co.uk/portuguese/rss.xml', locale: 'pt-BR' },
    'mundo': { title: 'mundo', url: 'https://feeds.bbci.co.uk/mundo/rss.xml', locale: 'es-005' },
    'arabic': { title: 'arabic', url: 'https://feeds.bbci.co.uk/arabic/rss.xml', locale: 'ar' },
    'persian': { title: 'persian', url: 'https://feeds.bbci.co.uk/persian/rss.xml', locale: 'fa' },
};


let parser = new Parser({
  customFields: {
    item: [
      ['media:thumbnail', 'mediathumbnail'],
    ]
  }
});

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
};

return Object.keys(feeds).forEach(async (service, i) => {
    await setTimeout( () => {
        (async () => {
          const url = feeds[service].url;
          console.log(`fetching ${url}`);
          let feed = await parser.parseURL(url);
          let md_contents = `# ${feed.title}\r\r`;

          feed.items.forEach(item => {
            const dateOriginal = new Date(item.pubDate);
            const mediathumbnail = item.mediathumbnail ? item.mediathumbnail.$.url : '';
            const date = item.pubDate ? dateOriginal.toLocaleDateString(feeds[service].locale, options) : '';
            md_contents += `## [${item.title}](${item.link}?at_campaign=githubrss)\r![${item.title}](${mediathumbnail})\r\r_${date}_\r\r${item.contentSnippet}\r\r\r`;
          });
          console.log(`writing ${service}`);
          return fs.writeFileSync(`./${service}.md`, md_contents);
        })()
    }, 500 * i)
});