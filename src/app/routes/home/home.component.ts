import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { PostService } from '../../services/post.services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { PostType } from '../../models/post.model';
import { MatDialog } from '@angular/material/dialog';
import { CreatePostModalComponent } from '../../components/create-post-modal/create-post-modal.component';

@Component({
  selector: 'app-home',
  imports: [CardComponent, HttpClientModule, CommonModule],
  templateUrl: './home.component.html',
  providers: [PostService],
  styleUrl: './home.component.css',
})
export class HomeComponent {
  posts!: PostType[];

  constructor(private PostService: PostService, private dialog: MatDialog) {}

  ngOnInit() {
    this.PostService.getPosts().subscribe(
      (data: PostType[]) => {
        this.posts = data;
      },
      (error) => {
        console.error('There was an error getting the albums.', error);
      }
    );
  }
  
  openCreatePostModal() {
    const dialogRef = this.dialog.open(CreatePostModalComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {        
        this.posts.unshift(result);
      }
    });
  }

}
