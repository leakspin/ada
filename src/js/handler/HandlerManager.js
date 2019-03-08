import GenericHandler from './GenericHandler';
import MeneameHandler from './MeneameHandler';

class HandlerManager {
  constructor() {
    this.handlers = {
      hackernews: new GenericHandler(),
      meneame: new MeneameHandler(),
    };
  }

  get(name) {
    return name in this.handlers ? this.handlers[name] : null;
  }
}

export default HandlerManager;
