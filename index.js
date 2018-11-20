const fs = require('fs');
const path = require('path');

class CopyHostJson {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.provider = this.serverless.getProvider('azure');

    this.hooks = {
      'deploy:deploy': this.onDeploy.bind(this)
    };
  }

  onDeploy() {
    const json = this.serverless.service.custom['host-json'] || 'host.json';
    const name = this.options.function || this.serverless.service.getAllFunctions()[0] || '';

    if (name.length > 0) {
      const src = path.join(name, json);
      const dest = 'host.json';
      const cmd = `mv ${src} ${dest}`;
      const sync = () => this.provider.syncTriggers();
      return this.provider.runKuduCommand(cmd).then(sync);
    }
  }
}

module.exports = CopyHostJson;
