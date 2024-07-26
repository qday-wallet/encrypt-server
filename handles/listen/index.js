const loop = require('./loop');

(async () => {
  const LOOP = new loop();
  LOOP.sub(require('./privacy'));
  LOOP.start();
})();
