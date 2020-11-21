import {Component} from '@angular/core';
import {BackendClientService} from '@typexs/ng-base';
import {ContainerInfo, ImageInfo} from 'dockerode';
import {DockerService} from '../../docker.service';


@Component({
  selector: 'containers-list',
  templateUrl: './list.component.html'
})
export class ContainerListComponent {


  containers: ContainerInfo[] = [];

  constructor(private dockerSevice: DockerService) {
  }

  ngOnInit() {
    this.dockerSevice.getContainers().subscribe(x => this.containers = x);
  }

}
