import * as _ from 'lodash';
import {Config} from '@typexs/base';
import * as Docker from 'dockerode';
import {C_DOCKER} from './Constants';
import {C_DEFAULT} from '@typexs/server';

export class DockerApiInstances {

  static NAME: string = DockerApiInstances.name;

  instances: { [k: string]: Docker } = {};

  async prepare() {
    const cfg = Config.get(C_DOCKER, {});
    for (const k of _.keys(cfg)) {
      this.instances[k] = new Docker(cfg[k]);
    }
  }

  async getInstances() {
    const instances = {};
    for (const k of _.keys(this.instances)) {
      instances[k] = await this.instances[k].info();
    }
    return instances;
  }

  getInstance(instance: string = C_DEFAULT) {
    if (!_.has(this.instances, instance)) {
      throw new Error('instance "' + instance + '" for docker api not found');
    }
    return this.instances[instance];
  }
}
