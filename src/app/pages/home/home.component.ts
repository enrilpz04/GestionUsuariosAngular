import { Component, inject } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';
import { UsercardComponent } from '../../components/usercard/usercard.component';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsercardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  // Array to store the students
  arrStudents: IStudent[] = [];

  // Inject the StudentsService
  studentsService = inject(StudentsService);

  async ngOnInit() {
    try {
      // Call the getAll method from the StudentsService
      const response = await this.studentsService.getAll();

      // Store the response in the arrStudents array
      this.arrStudents = response;
    } catch (error) {
      console.error(error);
    }
  }
}
