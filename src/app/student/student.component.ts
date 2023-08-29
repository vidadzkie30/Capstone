import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { studentdata } from './student.model';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
//hide
showadd!: boolean;
showupdate!: boolean;
studentmodelobj:studentdata=new studentdata
formValue!: FormGroup
allstudentdata:any;
  constructor(private formBuilder:FormBuilder, private api:ApiService ) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
    name: ['',Validators.required],
    email: ['',Validators.required],
    mobile: ['',Validators.required],
    class: ['',Validators.required],
    grade: ['',Validators.required],
})
    this.getdata()
}

// To hide on add

add(){
this.showadd=true;
this.showupdate=false;
}

// To hide on edit button

edit(data:any) {
  this.showadd=false;
  this.showupdate=true;
  this.studentmodelobj.id = data.id;
  this.formValue.controls['name'].setValue(data.name)
  this.formValue.controls['email'].setValue(data.email)
  this.formValue.controls['mobile'].setValue(data.mobile)
  this.formValue.controls['class'].setValue(data.class)
  this.formValue.controls['grade'].setValue(data.grade)

}

//update on edit button

update(){
  this.studentmodelobj.name = this.formValue.value.name;
  this.studentmodelobj.email = this.formValue.value.email;
  this.studentmodelobj.mobile = this.formValue.value.mobile;
  this.studentmodelobj.class = this.formValue.value.class;
  this.studentmodelobj.grade = this.formValue.value.grade;

  this.api.updatestudent(this.studentmodelobj, this.studentmodelobj.id).subscribe(res=>{
    this.formValue.reset();
    this.getdata();
    alert("Record updated successfully!");
  },
  err=>{
    alert("Something was wrong!");
  });
}

addstudent(){
  this.studentmodelobj.name = this.formValue.value.name;
  this.studentmodelobj.email = this.formValue.value.email;
  this.studentmodelobj.mobile = this.formValue.value.mobile;
  this.studentmodelobj.class = this.formValue.value.class;
  this.studentmodelobj.grade = this.formValue.value.grade;

  this.api.poststudent(this.studentmodelobj).subscribe(res=>{
    console.log(res);
    this.formValue.reset();
    this.getdata();
    alert("Record added successfully!");
  },
err=>{
  alert("Something went wrong!");
})

  }

  // getdata

  getdata(){
    this.api.getstudent()
    .subscribe(res=>{
      this.allstudentdata=res;
    })
  }

  // Delete

  deletestud(data:any){
    if(confirm(`Are you sure to delete?`))
    this.api.deletestudent(data.id)
    .subscribe(res=>{
      alert("Record deleted successfully!");
    })
  }

}
