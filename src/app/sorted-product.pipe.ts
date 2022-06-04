import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortedProduct'
})
export class SortedProductPipe implements PipeTransform {

  transform(value: any, sortBy:string): any {
    if(sortBy == "name"){
      value.sort((a,b)=>{
        return a.nom.toUpperCase().localeCompare(b.nom.toUpperCase()) 
      })
      return value
    }
    else if(sortBy == "price"){
       value.sort((a,b)=>{
        return a.currentPrice - b.currentPrice 
      })
      return value
    }
    else{
      return value
    }
  }


}
