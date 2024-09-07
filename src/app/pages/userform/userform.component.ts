import { Component, inject } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStudent } from '../../interfaces/istudent.interface';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css'
})
export class UserformComponent {

  studentsService = inject(StudentsService)
  router = inject(Router)
  activatedRoute = inject(ActivatedRoute)

  errorForm: any[] = []
  formType: string = 'NUEVO USUARIO'
  studentForm: FormGroup

  constructor() {
    this.studentForm = new FormGroup({
      firstName: new FormControl(null, [
        Validators.required
      ]),
      lastName: new FormControl(null, [
        Validators.required
      ]),
      email: new FormControl(null, [
        Validators.required
      ]),
      imageURL: new FormControl(null, [
        Validators.required
      ])
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.formType = 'ACTUALIZAR USUARIO'
        const student: IStudent = await this.studentsService.getById(params.id)
        this.studentForm = new FormGroup({
          firstName: new FormControl(student.first_name, [
            Validators.required
          ]),
          lastName: new FormControl(student.last_name, [
            Validators.required
          ]),
          email: new FormControl(student.email, [
            Validators.required
          ]),
          imageURL: new FormControl(student.image, [
            Validators.required
          ])
        }, [])
      }
    })
  }

  getDataForm(){

  }
}
