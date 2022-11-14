import {
  AfterViewInit,
  Component,
  ElementRef,
  VERSION,
  ViewChild,
} from '@angular/core';
import { debounceTime, fromEvent, map, switchMap, tap } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { UserService } from './user.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  @ViewChild('searchBtn', { read: ElementRef }) searchBtn: ElementRef;
  @ViewChild('userSelect', { read: ElementRef }) userSelect: ElementRef;
  name = 'Angular ' + VERSION.major;

  constructor(private _userService: UserService) {}

  ngAfterViewInit() {
    fromEvent(this.searchBtn.nativeElement, 'click')
      .pipe(
        map((event: any) => {
          return this.userSelect.nativeElement.value;
        }),
        debounceTime(2000),
        distinctUntilChanged(),
        switchMap((val: number) => {
          return this._userService.getUser(val);
        })
      )
      .subscribe({
        next: (prod) => {
          console.log(prod);
        },
      });
  }
}
