import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { merge, of } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';
import { data } from './data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'paginator';

  dataSource: any[];
  dataSize: number = data.length;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor() { }

  ngOnInit() {
    this.linkListToPaginator();
  }


  linkListToPaginator() {
    merge(this.paginator.page).pipe(
      startWith({}),
      switchMap(() => {
        return of(data);
      })
    ).subscribe(res => {
      const from = this.paginator.pageIndex * 10;
      const to = from + 10;
      this.dataSource = res.slice(from, to);
    });
  }

}
