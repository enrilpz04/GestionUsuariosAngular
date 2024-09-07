import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css',
})
export class UsercardComponent {
  // Input property to receive the student object
  @Input() student: any;

  // Inject the StudentsService
  studentsService = inject(StudentsService);

  // Method to delete a user
  deleteUser() {
    // Show a confirmation dialog with SweetAlert2
    Swal.fire({
      title:
        '¿Estás seguro de eliminar al usuario ' + this.student.first_name + '?',
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
          .delete(this.student._id)
          .then((response) => {
            // If the user is deleted successfully then show a success message
            if (response._id) {
              Swal.fire({
                title: 'Usuario eliminado con éxito',
                text: `El usuario ${this.student.first_name} ${this.student.last_name} ha sido eliminado.`,
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
