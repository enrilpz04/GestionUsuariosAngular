import { Component, Input } from '@angular/core';
import { IStudent } from '../../interfaces/istudent.interface';

@Component({
  selector: 'app-usercard',
  standalone: true,
  imports: [],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css'
})
export class UsercardComponent {
  @Input() student: any;
}
