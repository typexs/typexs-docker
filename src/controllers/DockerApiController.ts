import {C_API, C_DEFAULT, ContextGroup} from '@typexs/server';
import {
  _API_CTRL_DOCKER_API_INSTANCES,
  _API_CTRL_DOCKER_LIST_CONTAINERS,
  _API_CTRL_DOCKER_LIST_IMAGES,
  API_CTRL_DOCKER_API
} from '../lib/Constants';
import {Get, JsonController, QueryParam} from 'routing-controllers';
import {Inject} from '@typexs/base';
import {DockerApiInstances} from '../lib/DockerApiInstances';

@ContextGroup(C_API)
@JsonController(API_CTRL_DOCKER_API)
export class DockerApiController {

  @Inject(DockerApiInstances.NAME)
  dockers: DockerApiInstances;

  @Get(_API_CTRL_DOCKER_API_INSTANCES)
  getInstances() {
    return this.dockers.getInstances();
  }

  @Get(_API_CTRL_DOCKER_LIST_IMAGES)
  async getImages(@QueryParam('instance') instance: string = C_DEFAULT) {
    instance = instance.replace(/\"|\'/g, '').trim();
    return this.dockers.getInstance(instance).listImages();
  }

  @Get(_API_CTRL_DOCKER_LIST_CONTAINERS)
  getContainers(@QueryParam('instance') instance: string = C_DEFAULT) {
    instance = instance.replace(/\"|\'/g, '').trim();
    return this.dockers.getInstance(instance).listContainers();
  }

}
