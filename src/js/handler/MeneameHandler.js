const moment = require('moment');

class MeneameHandler {
  static returnData(item) {
    const id = MeneameHandler.getId(item);
    return {
      thumbnail: 'thumbnail' in item && item.thumbnail !== '' ? item.thumbnail : 'static/dino.png',
      title: 'title' in item ? item.title : '-',
      link: `http://www.meneame.net/go?id=${id}`,
      source: 'source' in item ? item.source : '-',
      date: 'pubDate' in item ? moment(item.pubDate, 'YYYY-MM-DD hh:mm:ss').fromNow() : '',
      description: `<a href="${item.link}">Comments</a>`,
    };
  }

  static getId(item) {
    const result = /media_thumb-link-(\d+)/.exec(item.description);
    return result ? result[1] : null;
  }
}

export default MeneameHandler;
