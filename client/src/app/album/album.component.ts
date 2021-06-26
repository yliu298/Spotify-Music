import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;
  private albumSub;

  constructor(private data: MusicDataService, private route: ActivatedRoute, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.albumSub = this.data.getAlbumById(id).subscribe(data=> this.album = data);
    console.log('album', this.album)
  }

  addToFavourites(trackID){
    
    this.data.addToFavourites(trackID).subscribe(
      (success)=>{
        this.snackBar.open("Adding to Favourites...", "Done", { duration: 1500 });
      },
      (err)=>{
        this.snackBar.open("Unable to add song to Favourites", "Done", { duration: 1500 });
      }
    )
  }

  ngOnDestroy(): void{
    this.albumSub?.unsubscribe();
  }

}
