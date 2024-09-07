import { Component, inject } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IStudent } from '../../interfaces/istudent.interface';
import Swal from 'sweetalert2';

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

  formType: string = 'NUEVO USUARIO'
  buttonText: string = "Guardar"
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
        Validators.required,
        Validators.email
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
        this.buttonText = 'Actualizar'
        const student: IStudent = await this.studentsService.getById(params.id)
        this.studentForm = new FormGroup({
          _id: new FormControl(student._id, []),
          firstName: new FormControl(student.first_name, [
            Validators.required
          ]),
          lastName: new FormControl(student.last_name, [
            Validators.required
          ]),
          email: new FormControl(student.email, [
            Validators.required,
            Validators.email
          ]),
          imageURL: new FormControl(student.image, [
            Validators.required
          ])
        }, [])
      }
    })
  }

  async getDataForm(){
    if(this.studentForm.value._id){
      try {
        const response: IStudent = await this.studentsService.update(this.studentForm.value)
        if(response._id){
          Swal.fire({
            title:
              'Se ha actualizado el usuario con éxito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
          }).then(() => {
            this.router.navigate(['/home'])
          })
        } else {
          throw new Error('No se ha actualizado el usuario con éxito')
        }
      } catch (error) {
        Swal.fire({
          title:
            'No se ha actualizado el usuario con éxito',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver',
        }).then(() => {
          this.router.navigate(['/home'])
        })
      }
    } else {
      try {
        const response: IStudent = await this.studentsService.insert(this.studentForm.value)
        console.log(response)
        if(response.email){
          Swal.fire({
            title:
              'Se ha creado el usuario con éxito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
          }).then(() => {
            this.router.navigate(['/home'])
          })
        } else {
          throw new Error('No se ha creado el usuario con éxito')
        }
      } catch (error) {
        Swal.fire({
          title:
            'No se ha creado el usuario con éxito',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver',
        }).then(() => {
          this.router.navigate(['/home'])
        })
      }
    }
  }

  checkControl(formControlName: string, validador: string) {
    return this.studentForm.get(formControlName)?.hasError(validador) && this.studentForm.get(formControlName)?.touched;
  }
}
