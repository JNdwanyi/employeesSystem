import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { EmployeeService } from './employee.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title="Employee management";

    public  employees: Employee[]=[];
    public editEmployee!: Employee;
    public deleteEmployee!:Employee;
    
   
  constructor(private employeeService:EmployeeService){}
    ngOnInit(): void {
    this.getEmployees();
   
    }

  public getEmployees():void {this.employeeService.getEmployees().subscribe((employees )=> {
    this.employees=employees;

    }
  
  );
}

public onAddEmployee(addForm:NgForm):void{
  document.getElementById("#add-employee-form")?.click();
  this.employeeService.addEmployee(addForm.value).subscribe(
    (response:Employee)=>{
      console.log(response);
      this.getEmployees();
      addForm.reset();
    },
    
    
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}
public onUpdateEmployee(employee:Employee):void{
  this.employeeService.updateEmployee(employee).subscribe(
    (response:Employee)=>{
      console.log(response);
      this.getEmployees();
    },
    
    
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )


}
public onDeleteEmployee(employeeid:number):void{
  this.employeeService.deleteEmployee(employeeid).subscribe(
    (response:void)=>{
      console.log(response);
      this.getEmployees();
    },
    
    
    (error:HttpErrorResponse)=>{
      alert(error.message);
    }
  )
}
public searchEmployees(key: string):void{
  const results: Employee[]=[];
  console.log(key);
  for(const employee of this.employees){
    if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1 
    
    )
  {
      results.push(employee);
    }
  }
  this.employees = results;
  if(results.length === 0||!key){
    this.getEmployees();
  }
  
}
public onOpenModel(employee:Employee,mode:string): void{
  const container =  document.getElementById("main-container");
  const button = document.createElement("button");
  button.type = "button";
  button.style.display = "none";
  button.setAttribute("data-toggle","modal");
  if(mode==='add'){
    button.setAttribute("data-target","#addEmployeeModel");
  }
  if(mode==='edit'){
    this.editEmployee=employee;
    button.setAttribute("data-target","#updateEmployeeModel");
  }
  if(mode==='delete'){
    this.deleteEmployee = employee;
    button.setAttribute("data-target","#deleteEmployeeModel");
  }
  container?.appendChild(button);
  button.click();
}
}
