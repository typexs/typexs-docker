import * as _ from 'lodash';
import {AbstractExchange, IMessageOptions, Inject} from '@typexs/base';
import {DockerRequest} from './DockerRequest';
import {DockerResponse} from './DockerResponse';
import {DockerApiInstances} from '../../../lib/DockerApiInstances';
import {C_DEFAULT} from '@typexs/server';
import {__NODE_ID__} from '@typexs/base/libs/distributed_storage/Constants';

export class DockerExchange extends AbstractExchange<DockerRequest, DockerResponse> {


  @Inject(DockerApiInstances.NAME)
  dockers: DockerApiInstances;

  constructor() {
    super(DockerRequest, DockerResponse);
  }

  async handleRequest(request: DockerRequest, response: DockerResponse) {
    const method = this[request.apiMethod];
    if (method) {
      const args = _.values(request.params);
      try {
        response.data = await method.apply(this, args);
      } catch (e) {
        response.error = e;
      }
    } else {
      response.error = new Error('Handle request ' + request.apiMethod + ' not found.');
    }
  }


  handleResponse(responses: DockerResponse, err: Error): any {
    return responses.data;
  }

  private _call(method: string, options: IMessageOptions & { flatten?: boolean } = {}, params: any = {}) {
    _.defaults(options, <IMessageOptions & { flatten?: boolean }>{filter: y => !!y, outputMode: 'map', flatten: true});
    const r = new DockerRequest(method, params);
    const msg = this.create(options);
    let s = msg.send(r);
    if (options.outputMode === 'map' && options.flatten) {
      s = s.then(arr => {
        let out: any = [];
        for (const k of _.keys(arr)) {
          if (_.isEmpty(arr[k])) {
            continue;
          }
          const idSplit = k.split(':');
          const def = {};
          def[__NODE_ID__] = idSplit.shift();
          def['__instNr__'] = idSplit.shift();
          // tslint:disable-next-line:no-shadowed-variable

          if (_.isArray(arr[k])) {
            out = _.concat(out, arr[k].map((r: any) => _.assign(r, def)));
          } else {
            out.push(_.assign(arr[k], def));
          }

        }
        return out;
      });
    }
    return s;
  }


  getInstances(options: IMessageOptions = {}) {
    return this._call('getLocalInstances', options);
  }

  getLocalInstances() {
    return this.dockers.getInstances();
  }


  getImages(instance: string = C_DEFAULT, options: IMessageOptions = {}) {
    return this._call('getLocalImages', options, {instance: instance});
  }

  getLocalImages(instance: string = C_DEFAULT) {
    instance = instance.replace(/\"|\'/g, '').trim();
    return this.dockers.getInstance(instance).listImages();
  }


  getContainers(instance: string = C_DEFAULT, options: IMessageOptions = {}) {
    return this._call('getLocalContainers', options, {instance: instance});
  }

  getLocalContainers(instance: string = C_DEFAULT) {
    instance = instance.replace(/\"|\'/g, '').trim();
    return this.dockers.getInstance(instance).listContainers();
  }

}
