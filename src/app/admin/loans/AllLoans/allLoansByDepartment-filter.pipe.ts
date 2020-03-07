import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'allLoansByDepartment'
})
export class AllLoansByDepartmentFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {


    return value ? list.filter(item => item.departmentName === value) : list;
  }

}
