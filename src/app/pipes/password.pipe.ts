import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'toPassword'
}) 

export class toPasswordPipe implements PipeTransform {
    transform(password: string): string {
        let pass = ''; 
        
        for(let i:number = 0; i < password.length; i++) {
            pass += '*'; 
        }

        return pass;
    }
}