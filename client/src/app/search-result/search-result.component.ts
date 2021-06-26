import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results:any;
  searchQuery:any;

  private resultsSub;
  private searchQuerySub;

  constructor(private data: MusicDataService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.searchQuerySub = this.route.queryParamMap.subscribe(param=>{
      this.searchQuery = param.get('q');
    })

    this.resultsSub = this.data.searchArtists(this.searchQuery).subscribe(data=>{
      let temp = data.artists.items;
      this.results = temp.filter(el=> el.images.length > 0);
    })
  }

  ngOnDestroy(): void{
    this.resultsSub?.unsubscribe();
    this.searchQuerySub?.unsubscribe();
  }

}
