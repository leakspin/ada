import GenericHandler from './GenericHandler';
import MeneameHandler from './MeneameHandler';
import NoDescriptionHandler from './NoDescriptionHandler';

class HandlerManager {
  constructor() {
    this.handlers = {
      hackernews: new GenericHandler(),
      magnet: new NoDescriptionHandler(),
      vidaextra: new NoDescriptionHandler(),
      xataka: new NoDescriptionHandler(),
      meneame: new MeneameHandler(),
    };
  }

  get(name) {
    return name in this.handlers ? this.handlers[name] : null;
  }
}

export default HandlerManager;
