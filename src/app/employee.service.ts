import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiBaseurl = 'http://localhost:8080/employees';
  

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiBaseurl}/all`);
  }
  public addEmployee(employee:Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiBaseurl}/add`,employee);
  }

  public updateEmployee(employee:Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiBaseurl}/update`,employee);
  }
  public deleteEmployee(employeeId:number): Observable<void> {
    return this.http.delete<void>(`${this.apiBaseurl}/delete/${employeeId}`);
  }

}