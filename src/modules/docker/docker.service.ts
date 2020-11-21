import {BackendClientService} from '@typexs/ng-base';
import {Injectable} from '@angular/core';
import {
  API_CTRL_DOCKER_API_INSTANCES,
  API_CTRL_DOCKER_LIST_CONTAINERS,
  API_CTRL_DOCKER_LIST_IMAGES
} from '../../lib/Constants';
import {ContainerInfo, DockerOptions, ImageInfo} from 'dockerode';

@Injectable()
export class DockerService {
  constructor(private backend: BackendClientService) {
  }


  getInstance() {
    return this.backend.callApi<{ [k: string]: DockerOptions }>(API_CTRL_DOCKER_API_INSTANCES);
  }

  getImages(instance: string = 'default') {
    return this.backend.callApi<ImageInfo[]>(API_CTRL_DOCKER_LIST_IMAGES, {query: {instance: instance}});
  }

  getContainers(instance: string = 'default') {
    return this.backend.callApi<ContainerInfo[]>(API_CTRL_DOCKER_LIST_CONTAINERS, {query: {instance: instance}});
  }

}
