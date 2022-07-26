import { ElementRef, Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Pagination } from './pagination-utility';

@Injectable({ providedIn: 'root' })
export class FunctionUtility {
  constructor() { }

  getToday(): string {
    const date = new Date();
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  getDateFormat(date: Date): string {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
  }

  getFullYearAndMonthToString(date: Date) {
    return `${date.getFullYear()}${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)}`;
  }

  getMonthInCharacter(month: string) {
    const months = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'];
    return months[Number(month) - 1];
  }

  checkCreateFolder(folderName: string) {
    const charCheck = /[\\/,:*?"|<>]+/;
    return charCheck.test(folderName);
  }

  getFirstDateOfCurrentMonth() {
    const today = new Date();
    return new Date(today.getFullYear() + '/' + (today.getMonth() + 1) + '/' + '01');
  }

  returnDayNotTime(date: Date) {
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0));
  }

  returnDayNotTime2(date: string) {
    var a = new Date(date.substr(0, 4) + '/' + date.substr(5, 2) + '/' + date.substr(8, 2));
    return new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), 0, 0, 0));
  }

  getNewUTCDate() {
    let d = new Date();
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds()));
  }

  getUTCDate(d?: Date) {
    let date = d ? d : new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
  }

  dateIFFinMonths(d1: Date, d2: Date) {
    var d1Y = d1.getFullYear();
    var d2Y = d2.getFullYear();
    var d1M = d1.getMonth();
    var d2M = d2.getMonth();

    return (d1M + 12 * d1Y) - (d2M + 12 * d2Y);
  }

  appendScript(src: string, elementRef: ElementRef) {
    let script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = src;
    elementRef.nativeElement.appendChild(script);
  }

  appendMultipleScript(srcs: string[], elementRef: ElementRef) {
    srcs.forEach(src => {
      let script = document.createElement("script");
      script.async = true;
      script.type = "text/javascript";
      script.src = src;
      elementRef.nativeElement.appendChild(script);
    });
  }

  toFormData(formValue: any) {
    const formData = new FormData();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      formData.append(key, value);
    }
    return formData;
  }

  toParams(formValue: any) {
    let params = new HttpParams();
    for (const key of Object.keys(formValue)) {
      const value = formValue[key];
      params = params.append(key, value);
    }
    return params;
  }

  calculatePagination(pagination: Pagination) {
    if (pagination.pageNumber === pagination.totalPage && pagination.pageNumber !== 1) {
      const currentItemQty = pagination.totalCount - (pagination.pageNumber - 1) * pagination.pageSize;
      if (currentItemQty === 1) {
        pagination.pageNumber--;
      }
    }
  }

  getParentUrl(url: string, backLevel: number = 1): string {
    const routes: string[] = url.split('/');
    return routes.slice(0, routes.length - backLevel).join('/');
  }

  nextID(): string {
    return Math.random().toString(36).substring(2, 9);
  };
}
