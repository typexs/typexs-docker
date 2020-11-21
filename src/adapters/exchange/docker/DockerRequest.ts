import {AbstractEvent} from '@typexs/base';

export class DockerRequest extends AbstractEvent {

  apiMethod: string;

  params: any;

  constructor(apiMethod: string, params: any = {}) {
    super();
    this.apiMethod = apiMethod;
    this.params = params;
  }
}
