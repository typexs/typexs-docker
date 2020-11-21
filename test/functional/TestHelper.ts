import * as _ from 'lodash';
import {PlatformUtils} from 'commons-base';

export class TestHelper {

  static async clearCache() {
    if (PlatformUtils.fileExist('/tmp/.txs/cache')) {
      await PlatformUtils.deleteDirectory('/tmp/.txs/cache');
    }
  }

  static wait(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  static logEnable(set?: boolean) {
    return process.env.CI_RUN ? false : _.isBoolean(set) ? set : true;
  }


  static waitFor(fn: Function, ms: number = 50, rep: number = 30) {
    return new Promise((resolve, reject) => {
      const c = 0;
      const i = setInterval(() => {
        if (c >= rep) {
          clearInterval(i);
          reject(new Error('max repeats reached ' + rep));
        }
        try {
          const r = fn();
          if (r) {
            clearInterval(i);
            resolve();
          }
        } catch (err) {
          clearInterval(i);
          reject(err);
        }
      }, ms);
    });
  }
}
