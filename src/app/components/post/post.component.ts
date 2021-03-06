import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  @Input() post: Post = {};
  slideSoloOpts = {
    allowSlideNext: false,
    allowSlidePrev: false,
    allowTouchMove: false
  }
  constructor() { }

  ngOnInit() {}

}
