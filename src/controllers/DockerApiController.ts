import {C_API, C_DEFAULT, ContextGroup} from '@typexs/server';
import {
  _API_CTRL_DOCKER_API_INSTANCES,
  _API_CTRL_DOCKER_LIST_CONTAINERS,
  _API_CTRL_DOCKER_LIST_IMAGES,
  API_CTRL_DOCKER_API
} from '../lib/Constants';
import {Get, JsonController, QueryParam} from 'routing-controllers';
import {Inject} from '@typexs/base';
import {DockerExchange} from '../adapters/exchange/docker/DockerExchange';

@ContextGroup(C_API)
@JsonController(API_CTRL_DOCKER_API)
export class DockerApiController {

  @Inject(() => DockerExchange)
  exchange: DockerExchange;

  @Get(_API_CTRL_DOCKER_API_INSTANCES)
  getInstances(@QueryParam('options') opts: any = {}) {
    return this.exchange.getInstances(opts);
  }

  @Get(_API_CTRL_DOCKER_LIST_IMAGES)
  async getImages(@QueryParam('instance') instance: string = C_DEFAULT, @QueryParam('options') opts: any = {}) {
    return this.exchange.getImages(instance, opts);
  }

  @Get(_API_CTRL_DOCKER_LIST_CONTAINERS)
  getContainers(@QueryParam('instance') instance: string = C_DEFAULT, @QueryParam('options') opts: any = {}) {
    return this.exchange.getContainers(instance, opts);
  }

}
