import * as _ from 'lodash';
import {suite, test} from '@testdeck/mocha';
import {Config} from 'commons-config';
import {TestHelper} from './TestHelper';
import {Bootstrap, Injector} from '@typexs/base';
import {SpawnHandle} from './SpawnHandle';
import {DockerExchange} from '../../src/adapters/exchange/docker/DockerExchange';
import {TEST_STORAGE_OPTIONS} from './config';
import {expect} from 'chai';

const LOG_EVENT = TestHelper.logEnable(false);

let bootstrap: Bootstrap;
// tslint:disable-next-line:prefer-const
let spawned: SpawnHandle;

@suite('functional/exchange-without-worker')
class MessagingSpec {


  static async before() {
    Bootstrap.reset();
    Config.clear();


    bootstrap = await Bootstrap.setConfigSources([{type: 'system'}])
      .configure({
        app: {name: 'no-worker', nodeId: 'no-worker', path: __dirname},
        logging: {
          enable: LOG_EVENT,
          level: 'debug',
          transports: [{console: {}}],
          loggers: [{name: '*', level: 'debug', transports: [{console: {}}]}]
        },
        storage: {default: TEST_STORAGE_OPTIONS},
        // eventbus: {default: <IEventBusConfiguration>{adapter: 'redis', extra: {host: '127.0.0.1', port: 6379}}},
        // workers: {access: [{name: 'ExchangeMessageWorker', access: 'allow'}]},
        modules: <any>{
          paths: [
            __dirname + '/../..'
          ],
          disableCache: true
        },
        docker: {
          default: {
            socketPath: '/var/run/docker.sock'
          }
        }

      });
    await bootstrap.activateLogger();
    await bootstrap.prepareRuntime();
    await bootstrap.activateStorage();
    await bootstrap.startup();


    // await spawned.started;
    await TestHelper.wait(500);
  }


  static async after() {

    if (spawned) {
      spawned.shutdown();
      await spawned.done;
    }

    if (bootstrap) {
      await bootstrap.shutdown();
    }
  }

  @test
  async 'get instances'() {
    const exchange = Injector.get(DockerExchange);
    const results = await exchange.getInstances();
    expect(_.keys(results)).to.have.length(1);
    expect(_.concat([], ...results.map(x => _.keys(x).filter(y => !/^__/.test(y))))).to.be.deep.eq(['default']);

  }

  @test
  async 'get images'() {
    const exchange = Injector.get(DockerExchange);
    const results = await exchange.getImages();
    expect(results).to.have.length.gte(1);
  }

  @test
  async 'get containers'() {
    const exchange = Injector.get(DockerExchange);
    const results = await exchange.getContainers();
    expect(results).to.have.length.gte(1);
  }

}

