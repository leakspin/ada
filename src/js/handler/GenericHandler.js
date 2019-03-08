const moment = require('moment');

class GenericHandler {
  static returnData(item) {
    return {
      thumbnail: 'thumbnail' in item && item.thumbnail !== '' ? item.thumbnail : 'static/dino.png',
      title: 'title' in item ? item.title : '-',
      link: 'link' in item ? item.link : '#',
      source: 'source' in item ? item.source : '-',
      date: 'pubDate' in item ? moment(item.pubDate, 'YYYY-MM-DD hh:mm:ss').fromNow() : '',
      description: 'description' in item && item.description !== '' ? item.description : '',
    };
  }
}

export default GenericHandler;
