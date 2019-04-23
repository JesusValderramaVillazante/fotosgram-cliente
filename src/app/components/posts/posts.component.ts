import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit() {}

}
