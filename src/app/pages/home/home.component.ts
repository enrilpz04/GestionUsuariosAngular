import { Component, inject } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';
import { UsercardComponent } from '../../components/usercard/usercard.component';
import { StudentsService } from '../../services/students.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UsercardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
  arrStudents: IStudent[] = []
  studentsService = inject(StudentsService)

  async ngOnInit() {
    try {
      const response = await this.studentsService.getAll()
      this.arrStudents = response
      console.log(this.arrStudents)
    } catch (error) {
      console.error(error)
    }
  }
}
