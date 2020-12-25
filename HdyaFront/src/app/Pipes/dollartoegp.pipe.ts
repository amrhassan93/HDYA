import { Pipe, PipeTransform } from '@angular/core';
// import { ENGINE_METHOD_PKEY_ASN1_METHS } from 'constants';

@Pipe({
  name: 'dollartoegp'
})
export class DollartoegpPipe implements PipeTransform {

  transform(value:number,changeRate:number=15.70): string {
    let result = value*changeRate
    return `${result} EGP`;

  }
}