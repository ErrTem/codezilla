import { Component, HostListener, OnInit } from '@angular/core';
import { BackendPersonInterface } from '@core/interfaces';
import { BackendService } from '@core/services/backend.service';
import { CHUNK_SIZE } from '@shared/constants';

@Component({
  selector: 'app-event-speakers',
  templateUrl: './event-speakers.component.html',
  styleUrls: ['./event-speakers.component.sass'],
})
export class EventSpeakersComponent implements OnInit {
  allPeople: BackendPersonInterface[] = [];
  displayedPeople: BackendPersonInterface[] = [];
  currentChunkIndex = 0;

  constructor(private readonly backendService: BackendService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.backendService.getPeople().subscribe((data) => {
      this.allPeople = data;
      this.loadNextChunk();
    });
  }

  loadNextChunk() {
    const startIndex = this.currentChunkIndex * CHUNK_SIZE;
    const endIndex = startIndex + CHUNK_SIZE;

    if (startIndex < this.allPeople.length) {
      this.displayedPeople = this.displayedPeople.concat(
        this.allPeople.slice(startIndex, endIndex)
      );
      this.currentChunkIndex++;
    }
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || window.pageYOffset;

    if (scrollPosition + windowHeight >= documentHeight - 300) {
      this.loadNextChunk();
    }
  }
}