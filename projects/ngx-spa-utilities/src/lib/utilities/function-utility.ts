import { Injectable } from '@angular/core';
import { HttpParams } from "@angular/common/http";
import { Pagination } from './pagination-utility';

@Injectable({ providedIn: 'root' })
export class FunctionUtility {

  today(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = this.toStringLeadingZeros(today.getMonth() + 1, 2);
    const date = this.toStringLeadingZeros(today.getDate(), 2);
    return `${year}/${month}/${date}`;
  }

  toDate(input: string): Date {
    return new Date(input);
  }

  toUTCDate(input: Date): Date {
    return new Date(Date.UTC(
      input.getFullYear(),
      input.getMonth(),
      input.getDate(),
      input.getHours(),
      input.getMinutes(),
      input.getSeconds(),
      input.getMilliseconds()));
  }

  toStringDate(input: Date): string {
    const year = input.getFullYear();
    const month = this.toStringLeadingZeros(input.getMonth() + 1, 2);
    const date = this.toStringLeadingZeros(input.getDate(), 2);
    return `${year}/${month}/${date}`;
  }

  toStringTime(input: Date): string {
    const hours = this.toStringLeadingZeros(input.getHours(), 2);
    const minutes = this.toStringLeadingZeros(input.getMinutes(), 2);
    const seconds = this.toStringLeadingZeros(input.getSeconds(), 2);
    return `${hours}:${minutes}:${seconds}`;
  }

  toStringDateTime(input: Date): string {
    const year = input.getFullYear();
    const month = this.toStringLeadingZeros(input.getMonth() + 1, 2);
    const date = this.toStringLeadingZeros(input.getDate(), 2);
    const hours = this.toStringLeadingZeros(input.getHours(), 2);
    const minutes = this.toStringLeadingZeros(input.getMinutes(), 2);
    const seconds = this.toStringLeadingZeros(input.getSeconds(), 2);
    return `${year}/${month}/${date} ${hours}:${minutes}:${seconds}`;
  }

  toStringYearMonth(input: Date): string {
    const year = input.getFullYear();
    const month = this.toStringLeadingZeros(input.getMonth() + 1, 2);
    return `${year}/${month}`;
  }

  toFirstDateOfMonth(input: Date): Date {
    return new Date(input.getFullYear(), input.getMonth(), 1);
  }

  toLastDateOfMonth(input: Date): Date {
    return new Date(input.getFullYear(), input.getMonth() + 1, 0);
  }

  toFirstDateOfYear(input: Date): Date {
    return new Date(input.getFullYear(), 0, 1);
  }

  toLastDateOfYear(input: Date): Date {
    return new Date(input.getFullYear(), 11, 31);
  }

  toBeginDate(input: Date): Date {
    input.setHours(0, 0, 0);
    return input;
  }

  toEndDate(input: Date): Date {
    input.setHours(23, 59, 59);
    return input;
  }

  toSeq(input: Date): string {
    const year = input.getFullYear();
    const month = this.toStringLeadingZeros(input.getMonth() + 1, 2);
    const date = this.toStringLeadingZeros(input.getDate(), 2);
    const hours = this.toStringLeadingZeros(input.getHours(), 2);
    const minutes = this.toStringLeadingZeros(input.getMinutes(), 2);
    const seconds = this.toStringLeadingZeros(input.getSeconds(), 2);
    const milliseconds = this.toStringLeadingZeros(input.getMilliseconds(), 3);
    return `${year}${month}${date}${hours}${minutes}${seconds}${milliseconds}`;
  }

  toStringShortMonth(input: Date): string {
    return input.toLocaleString('en-US', { month: 'short' });
  }

  toStringLeadingZeros(input: number, targetLength: number): string {
    return String(input).padStart(targetLength, '0');
  }

  toFormData(obj: any, form?: FormData, namespace?: string) {
    let fd = form || new FormData();
    let formKey: string;

    for (var property in obj) {
      if (obj.hasOwnProperty(property)) {

        // namespaced key property
        if (!isNaN(property as any)) {

          // obj is an array
          formKey = namespace ? `${namespace}[${property}]` : property;
        } else {

          // obj is an object
          formKey = namespace ? `${namespace}.${property}` : property;
        }

        if (obj[property] instanceof Date) {
          // the property is a date, so convert it to a string
          fd.append(formKey, obj[property].toISOString());

        } else if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
          // the property is an object or an array, but not a File, use recursivity
          this.toFormData(obj[property], fd, formKey);

        } else {
          // the property is a string, number or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  }

  toParams(formValue: any): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(formValue))
      params = params.append(key, formValue[key]);
    return params;
  }

  calculatePagination(pagination: Pagination): void {
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
