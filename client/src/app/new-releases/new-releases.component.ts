import { Component, Input, OnInit } from '@angular/core';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases = {};
  private releaseSub;

  constructor(private data: MusicDataService) { }

  ngOnInit(): void {
    this.releaseSub = this.data.getNewReleases().subscribe(data=>{
        this.releases = data.albums.items;
    })
  }

  ngOnDestroy(): void{
      this.releaseSub?.unsubscribe();
  }

}
