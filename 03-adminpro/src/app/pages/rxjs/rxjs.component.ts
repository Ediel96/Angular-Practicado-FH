import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent {

  constructor() {

    this.retornarObservable().pipe(
      retry()
    ).subscribe(
      valor => console.log('Sub : ', valor),
      (err) => console.warn('Error : ' , err),
      ()=> console.info('obs terminado')
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
