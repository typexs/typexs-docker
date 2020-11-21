import {INodeInfo, ISystemApi, SystemApi, UseAPI} from '@typexs/base';
import {Inject} from '@angular/core';
import {DockerApiInstances} from '../lib/DockerApiInstances';
import {C_DOCKER} from '../lib/Constants';

@UseAPI(SystemApi)
export class DockerSystemExtension implements ISystemApi {

  @Inject(DockerApiInstances.NAME)
  instances: DockerApiInstances;


  getNodeInfos(): INodeInfo {
    const nodeTaskContext: INodeInfo = {context: C_DOCKER};
    // nodeTaskContext[C_WORKERS] = infos;
    return nodeTaskContext;
  }


}

