import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'empFilter'
})
export class EmpFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {


    return value ? list.filter(item => item.deptName === value) : list;
  }

}
