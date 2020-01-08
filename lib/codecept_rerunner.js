const fsPath = require('path');
const container = require('./container');
const event = require('./event');
const BaseCodecept = require('./codecept');

class CodeceptRerunner extends BaseCodecept {
  runOnce(test) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      container.createMocha();
      const mocha = container.mocha();
      this.testFiles.forEach((file) => {
        delete require.cache[file];
      });
      mocha.files = this.testFiles;
      if (test) {
        if (!fsPath.isAbsolute(test)) {
          test = fsPath.join(global.codecept_dir, test);
        }
        mocha.files = mocha.files.filter(t => fsPath.basename(t, '.js') === test || t === test);
      }
      try {
        mocha.run((failures) => {
          if (failures === 0) {
            resolve();
          } else {
            reject(new Error(`${failures} tests fail`));
          }
        });
      } catch (e) {
        reject(e);
      }
    });
  }

  async runTests(test) {
    const configRerun = this.config.rerun || {};
    const minSuccess = configRerun.minSuccess || 1;
    const maxReruns = configRerun.maxReruns || 1;
    if (minSuccess > maxReruns) throw new Error('minSuccess must be less then maxReruns');
    if (maxReruns === 1) {
      await this.runOnce(test);
      return;
    }
    let successCounter = 0;
    let rerunsCounter = 0;
    while (rerunsCounter < maxReruns && successCounter < minSuccess) {
      rerunsCounter++;
      try {
        await this.runOnce(test);
        successCounter++;
        console.log(`\nProcess run ${rerunsCounter} of max ${maxReruns}, success runs ${successCounter}/${minSuccess} \n`);
      } catch (e) {
        console.error(e);
        console.log(`\nFail run ${rerunsCounter} of max ${maxReruns}, success runs ${successCounter}/${minSuccess} \n`);
      }
    }
    if (successCounter < minSuccess) {
      throw new Error('Test suite unstable!');
    }
  }

  run(test) {
    const done = () => {
      event.emit(event.all.result, this);
      event.emit(event.all.after, this);
    };
    event.emit(event.all.before, this);
    return this.runTests(test)
      .then(() => {
        this.teardown(done);
      })
      .catch((e) => {
        this.teardown(done);
        throw e;
      });
  }
}

module.exports = CodeceptRerunner;