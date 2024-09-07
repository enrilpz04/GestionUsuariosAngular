import { Component, inject } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { StudentsService } from '../../services/students.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-userprofile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.css',
})
export class UserprofileComponent {
  // Student object
  student: IStudent | null = null;

  // Inject the ActivatedRoute and StudentsService
  activatedRoute = inject(ActivatedRoute);
  studentsService = inject(StudentsService);

  ngOnInit() {
    // Subscribe to the route params to get the user ID
    this.activatedRoute.params.subscribe(async (params: any) => {
      let id = params.id;
      // Get the student by ID from the API
      this.student = await this.studentsService.getById(id);
    });
  }

  deleteUser() {
    // Show a confirmation dialog with SweetAlert2
    Swal.fire({
      title:
        '¿Estás seguro de eliminar al usuario ' +
        this.student?.first_name +
        '?',
      text: 'No podrás revertir esto',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      // If the user confirms the action then delete request is sent to the API
      if (result.isConfirmed) {
        this.studentsService
          .delete(this.student?._id!)
          .then((response) => {
            if (response._id) {
              Swal.fire({
                title: 'Usuario eliminado con éxito',
                text: `El usuario ${this.student?.first_name} ${this.student?.last_name} ha sido eliminado.`,
                icon: 'success',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Volver',
              });
            } else {
              throw new Error('Error al eliminar el usuario');
            }
          })
          .catch((error) => {
            // If there is an error then show an error message
            Swal.fire({
              title: 'Error al eliminar el usuario',
              text: 'No se pudo eliminar el usuario. Por favor, intenta nuevamente.',
              icon: 'error',
              confirmButtonColor: '#3085d6',
              confirmButtonText: 'Volver',
            });
          });
      }
    });
  }
}
