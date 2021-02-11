import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toArray'
})

export class ToArrayPipe implements PipeTransform {

  transform(object: {any}): any[] {
    console.log(Object.values(object))
    return Object.values(object); 
  }

}
