/* eslint-disable no-param-reassign */
import HandlerManager from './handler/HandlerManager';
import config from './config.json';

class Rss {
  constructor() {
    this.handler = new HandlerManager();
    this.config = config;
  }

  refresh() {
    const frag = document.createDocumentFragment();
    const { urls } = config;
    let hasBegun = true;
    Promise.all(Object.keys(urls).map(async (source) => {
      let url = '';
      const apikey = this.config['rss2json-api-key'];
      try {
        url = new URL(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(urls[source].url)}&count=100&api_key=${apikey}`);
      } catch (e) {
        throw new DOMException('URL invalid');
      }

      const resp = await fetch(url, {
        mode: 'cors',
      });
      const json = await resp.json();
      if (json.status === 'error') {
        throw new DOMException(json.message);
      } else {
        json.items.forEach((item) => {
          item.source = source;
        });
        return json.items;
      }
    })).then((texts) => {
      const items = [];

      texts.forEach((text) => {
        items.push(...text);
      });

      items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

      items.forEach((item) => {
        try {
          const temp = document.importNode(document.querySelector('template').content, true);
          const t = temp.querySelector.bind(temp);
          const handler = this.handler.get(item.source);
          if (handler) {
            const finalData = handler.constructor.returnData(item);
            t('.image img').src = finalData.thumbnail;
            t('a.link').textContent = finalData.title;
            t('a.link').href = finalData.link;
            t('.source').textContent = finalData.source;
            t('.time').textContent = finalData.date;
            t('.description').innerHTML = finalData.description;
            frag.appendChild(temp);

            if (hasBegun) {
              document.querySelector('output').textContent = '';
              hasBegun = false;
            }
            document.querySelector('output').appendChild(frag);
          }
        } catch (e) {
          throw e;
        }
      });
    });
  }
}

export default Rss;
