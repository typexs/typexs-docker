import {IActivator, Injector} from '@typexs/base';
import {IPermissionDef, IPermissions} from '@typexs/roles-api';
import {DockerApiInstances} from './lib/DockerApiInstances';


export class Activator implements IActivator, IPermissions {

  async startup() {
    const docker = Injector.get(DockerApiInstances);
    await docker.prepare();
    Injector.set(DockerApiInstances.NAME, docker);
  }

  permissions(): Promise<IPermissionDef[]> | IPermissionDef[] {
    return [];
  }
}
