import { Component, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites: any;

  private favouritesSub;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.favouritesSub = this.data.getFavourites().subscribe(data=> this.favourites = data.tracks);
  }

  removeFavourite(id){
      this.data.removeFromFavourites(id).subscribe(data=>{
        this.favourites = data.tracks;
      })
  }

}
