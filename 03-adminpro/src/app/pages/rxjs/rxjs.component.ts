import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, interval, pipe, Subscription } from 'rxjs';
import { map, retry ,take, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSub: Subscription | undefined;

  constructor() {

    // this.retornarObservable().pipe(
    //   retry()
    // ).subscribe(
    //   valor => console.log('Sub : ', valor),
    //   (err) => console.warn('Error : ' , err),
    //   ()=> console.info('obs terminado')
    // );

  this.intervalSub = this.retornalIntervalo()
    .subscribe(console.log);
  }

  ngOnDestroy(): void {
    this.intervalSub?.unsubscribe();
  }


  retornalIntervalo() : Observable<number> {
    return  interval(100)
    .pipe(
      map( valor => valor + 1),
      // filter( valor => (valor % 2 === 0 ? true : false) ),
      // take(4)
    );
  }

  retornarObservable(): Observable<number> {
    let i = -1;
    return new Observable<number>( observe => {

      const intevalo = setInterval(() =>{
        i++;
        observe.next(i)

        if(i === 4){
          clearInterval(intevalo);
          observe.complete();
        }

        if( i == 2){
          console.log('i = 2');
          observe.error('i llego a 2');
        }

      },1000)
    })

  }

}
