import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'img'
})
export class ImgPipe implements PipeTransform {

  transform(value: unknown, ..._args: unknown[] ): string{
    
    console.log(value)

    const img = value;

    if(img){
      console.log(img)
      return `${base_url}/upload/usuarios/${img}`;
      }else if(!img){
          return `${base_url}/upload/usuarios/no-imagen`;
      }else {
          return `${base_url}/upload/usuarios/no-imagen`;
      }

    return ''
  }

}
