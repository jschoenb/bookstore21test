import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, filter, distinctUntilChanged, switchMap, tap} from 'rxjs/operators';
import {Book} from '../shared/book';
import {BookStoreService} from '../shared/book-store.service';

@Component({
 selector: 'bs-search',
 templateUrl: './search.component.html',
 styles: []
})
export class SearchComponent implements OnInit {

 foundBooks: Book[] = [];
 isLoading = false;
 keyup = new EventEmitter<string>();
 @Output() bookSelected = new EventEmitter<Book>();


 constructor(private bs: BookStoreService){}

 ngOnInit() {
  this.keyup.pipe(filter(term => term!=""))
   .pipe(debounceTime(500))
   .pipe(distinctUntilChanged())
   .pipe(tap(() => this.isLoading = true))
   .pipe(switchMap(searchTerm =>  this.bs.getAllSearch(searchTerm)))
   .pipe(tap(() => this.isLoading = false))
   .subscribe(books => this.foundBooks = books);
 }
}