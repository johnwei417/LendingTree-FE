import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'pendingLoansByDepartment'
})
export class PendingLoansByDepartmentFilterPipe implements PipeTransform {

  transform(list: any[], value: string) {


    return value ? list.filter(item => item.departmentName === value) : list;
  }

}
