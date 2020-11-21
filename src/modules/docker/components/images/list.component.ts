import {Component, OnInit} from '@angular/core';
import {DockerService} from '../../docker.service';
import {DockerOptions, ImageInfo} from 'dockerode';


@Component({
  selector: 'images-list',
  templateUrl: './list.component.html'
})
export class ImagesListComponent implements OnInit {

  images: ImageInfo[] = [];

  constructor(private dockerSevice: DockerService) {
  }

  ngOnInit() {
    this.dockerSevice.getImages().subscribe(x => this.images = x);
  }

}
