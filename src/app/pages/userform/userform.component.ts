import { Component, inject } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
      firstName: new FormControl(null, []),
      lastName: new FormControl(null, []),
      email: new FormControl(null, []),
      imageURL: new FormControl(null, [])
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if (params.id) {
        this.formType = 'ACTUALIZAR USUARIO'
        const student: IStudent = await this.studentsService.getById(params.id)
        this.studentForm = new FormGroup({
          firstName: new FormControl(student.first_name, []),
          lastName: new FormControl(student.last_name, []),
          email: new FormControl(student.email, []),
          imageURL: new FormControl(student.image, [])
        }, [])
      }
    })
  }
}
