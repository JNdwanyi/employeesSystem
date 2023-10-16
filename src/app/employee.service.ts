import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerurl = 'http://localhost:8080/';
  

  constructor(private http: HttpClient) { }

  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerurl}employees/all`);
  }
  public addEmployee(employee:Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.apiServerurl}employees/add`,employee);
  }

  public updateEmployee(employee:Employee): Observable<Employee> {
   
    return this.http.put<Employee>(`${this.apiServerurl}employees/update`,employee);
    
  }
  public deleteEmployee(employeeId:number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerurl}employees/delete/${employeeId}`);
  }
  
}