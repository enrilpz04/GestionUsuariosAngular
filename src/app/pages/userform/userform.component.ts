import { Component, inject } from '@angular/core';
import { StudentsService } from '../../services/students.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IStudent } from '../../interfaces/istudent.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userform',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './userform.component.html',
  styleUrl: './userform.component.css',
})
export class UserformComponent {
  // Inject the StudentsService, Router and ActivatedRoute
  studentsService = inject(StudentsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);

  // Form type and button text
  formType: string = 'NUEVO USUARIO';
  buttonText: string = 'Guardar';

  // Form group for the user form
  studentForm: FormGroup;

  constructor() {
    // Initialize the form group with the form controls and validators
    this.studentForm = new FormGroup(
      {
        firstName: new FormControl(null, [Validators.required]),
        lastName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        imageURL: new FormControl(null, [Validators.required]),
      },
      []
    );
  }

  ngOnInit() {
    // Subscribe to the route params to get the user ID
    this.activatedRoute.params.subscribe(async (params: any) => {
      // If the user ID exists then update the form type, button text and student form
      if (params.id) {
        this.formType = 'ACTUALIZAR USUARIO';
        this.buttonText = 'Actualizar';
        const student: IStudent = await this.studentsService.getById(params.id);
        this.studentForm = new FormGroup(
          {
            _id: new FormControl(student._id, []),
            firstName: new FormControl(student.first_name, [
              Validators.required,
            ]),
            lastName: new FormControl(student.last_name, [Validators.required]),
            email: new FormControl(student.email, [
              Validators.required,
              Validators.email,
            ]),
            imageURL: new FormControl(student.image, [Validators.required]),
          },
          []
        );
      }
    });
  }

  async getDataForm() {
    // If the form has id then update the student, else insert a new student
    if (this.studentForm.value._id) {
      try {
        // Call the update method from the StudentsService
        const response: IStudent = await this.studentsService.update(
          this.studentForm.value
        );
        if (response._id) {
          // If the user is updated successfully then show a success message
          Swal.fire({
            title: 'Se ha actualizado el usuario con éxito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        } else {
          throw new Error('No se ha actualizado el usuario con éxito');
        }
      } catch (error) {
        // If there is an error then show an error message
        Swal.fire({
          title: 'No se ha actualizado el usuario con éxito',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver',
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
    } else {
      try {
        // Call the insert method from the StudentsService
        const response: IStudent = await this.studentsService.insert(
          this.studentForm.value
        );
        if (response.email) {
          // If the user is created successfully then show a success message
          Swal.fire({
            title: 'Se ha creado el usuario con éxito',
            icon: 'success',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'Volver',
          }).then(() => {
            this.router.navigate(['/home']);
          });
        } else {
          throw new Error('No se ha creado el usuario con éxito');
        }
      } catch (error) {
        // If there is an error then show an error message
        Swal.fire({
          title: 'No se ha creado el usuario con éxito',
          icon: 'error',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Volver',
        }).then(() => {
          this.router.navigate(['/home']);
        });
      }
    }
  }

  /**
   * Method to check if a form control has an error
   * @param formControlName
   * @param validador
   * @returns
   */
  checkControl(formControlName: string, validador: string) {
    return (
      this.studentForm.get(formControlName)?.hasError(validador) &&
      this.studentForm.get(formControlName)?.touched
    );
  }
}
