import { Component, OnDestroy } from '@angular/core';
import {  Router, ActivationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo: string | undefined;
  public tituloSubs$ : Subscription | undefined;


  constructor(private router:Router) {
    this.tituloSubs$ = this.getArgumentoRuta()
    .subscribe(({titulo}) => {
        this.titulo = titulo;
        document.title = `AdminPro - ${titulo}`;
      }
    )
  }

  ngOnDestroy(): void {
    this.tituloSubs$?.unsubscribe;
  }

  getArgumentoRuta(){
    return this.router.events
    .pipe(
      filter( (event) : event is ActivationEnd => event instanceof ActivationEnd),
      filter( (event : ActivationEnd ) => event.snapshot.firstChild === null),
      map((event : ActivationEnd ) => event.snapshot.data)
    )
  }
}
