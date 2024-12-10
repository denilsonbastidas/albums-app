import { Component, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { PostType } from '../../models/post.model';
import { PostService } from '../../services/post.services';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-create-post-modal',
  standalone: true,
  imports: [
    MaterialModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatOptionModule,
    MatSnackBarModule,
    HttpClientModule,
    CommonModule,
  ],
  templateUrl: './create-post-modal.component.html',
  styleUrls: ['./create-post-modal.component.css'],
  providers: [PostService],
})
export class CreatePostModalComponent {
  @ViewChild('postForm') postForm!: NgForm;
  genres: string[] = ['Classical', 'Salsa', 'Rock', 'Folk'];
  recordLabels: string[] = [
    'Sony Music',
    'Discos Fuentes',
    'Elektra',
    'Fania Records',
  ];

  post: PostType = {
    name: '',
    cover: 'https://i.pinimg.com/564x/aa/5f/ed/aa5fed7fac61cc8f41d1e79db917a7cd.jpg',
    releaseDate: new Date(),
    description: '',
    genre: '',
    recordLabel: '',
  };

  constructor(
    private dialogRef: MatDialogRef<CreatePostModalComponent>,
    private PostService: PostService,
    private snackBar: MatSnackBar
  ) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];  
  }
  
  
  onSubmit() {
    this.PostService.createPost(this.post).subscribe(
      (newPost: PostType) => {
        this.dialogRef.close(newPost);
        this.snackBar.open('Post creado exitosamente', 'Cerrar', {
          duration: 3000, 
        });
      },
      (error) => {
        this.snackBar.open('Error al crear el post', 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }
}
