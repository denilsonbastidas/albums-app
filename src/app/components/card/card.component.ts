import { Component, Input } from '@angular/core';
import { PostType } from '../../models/post.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [DatePipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input() post!: PostType;
}
