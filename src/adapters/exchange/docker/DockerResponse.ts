import {AbstractEvent} from '@typexs/base';

export class DockerResponse extends AbstractEvent {
  apiMethod: string;

  params: any;

  data: any;
}
