const { provider } = require('../../chain');
const { sleep, getCur, setCur } = require('./utils');

module.exports = class {
  constructor(interval, batchSize) {
    this.interval = interval || 5000;
    this.batchSize = batchSize || 100;
    this.handles = {};
  }

  sub(mappings) {
    const { interfaces, handles } = mappings;
    for (const name in handles) {
      const topic = interfaces.getEvent(name).topicHash;
      const indexdLength = interfaces.getEvent(name).inputs.filter((param) => param.indexed).length;
      if (!this.handles[topic]) {
        this.handles[topic] = {};
      }
      this.handles[topic][indexdLength] = handles[name];
    }
  }

  async start() {
    this.cur = getCur();
    this.max = await provider.getBlockNumber();
    this.running = true;
    const topics = Object.keys(this.handles);
    while (this.running) {
      if (this.cur > this.max) {
        await sleep(this.interval);
        this.max = await provider.getBlockNumber();
      } else {
        const batchSize = this.cur + this.batchSize > this.max ? this.max - this.cur : this.batchSize - 1;
        const logs = await provider.getLogs({ fromBlock: this.cur, toBlock: this.cur + batchSize, topics: [topics] });
        for (let i = 0; i < logs.length; i++) {
          const handle = this.handles[logs[i].topics[0]][logs[i].topics.length - 1];
          handle && (await handle(logs[i]));
        }
        this.cur += batchSize + 1;
        setCur(this.cur);
      }
    }
  }

  stop() {
    this.running = false;
  }
};
