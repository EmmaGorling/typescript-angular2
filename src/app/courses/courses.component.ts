import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  // Array to save the fetched data in
  courseList: Course[] = [];
  // A number property to use in sortName, to sort from a-z and z-a
  sortingNum: number = 0;
  
  constructor(private courseservice: CourseService) { }

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courseList = data;
    })
  }

  sortName() {
    // Add one for every click in the component
    this.sortingNum = this.sortingNum + 1;
    // If it's a odd number it will sort descending, else ascending
    if(this.sortingNum % 2 != 0) {
      this.courseList.sort((a, b) => a.coursename.localeCompare(b.coursename));
    } else {
      this.courseList.sort((a, b) => b.coursename.localeCompare(a.coursename));
    }
  }

  sortCode() {

  }
}
