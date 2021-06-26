import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {

  albums:{}
  artist:any
  
  private albumsSub;
  private artistSub;

  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    let id = this.route.snapshot.params['id'];
    this.artistSub = this.data.getArtistById(id).subscribe(data=> this.artist = data);

    this.albumsSub = this.data.getAlbumsByArtistId(id).subscribe(data=>{
      const seen = new Set();
      const arr = data.items;

      this.albums = arr.filter(album => {
        const duplicate = seen.has(album.name);
        seen.add(album.name);
        return !duplicate;
      });     
    })
  }

  ngOnDestroy(): void{
    this.albumsSub?.unsubscribe();
    this.artistSub?.unsubscribe();
  }

}
