import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Course } from '../model/course';
import { CourseService } from '../services/course.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {
  // Array to save the fetched data in
  courseList: Course[] = [];
  // Numbers to be able to toggle the sorting
  sortNumName: number = 0;
  sortNumCode: number = 0;
  sortNumProg: number = 0;
  // Propery for searching
  searchInput: string = '';
  // Array for storing original data
  originalCourseList: Course[] = [];

  constructor(private courseservice: CourseService) { }

  ngOnInit() {
    this.courseservice.getCourses().subscribe(data => {
      this.courseList = data;
      this.originalCourseList = data;
    })
  }

  sortName():void {
    // Add one for every click in the component
    this.sortNumName = this.sortNumName + 1;
    // If it's a odd number it will sort descending, else ascending
    if (this.sortNumName % 2 != 0) {
      this.courseList.sort((a, b) => a.coursename.localeCompare(b.coursename));
    } else {
      this.courseList.sort((a, b) => b.coursename.localeCompare(a.coursename));
    }
  }

  sortCode():void {
    // Add one for every click in the component
    this.sortNumCode = this.sortNumCode + 1;
    if (this.sortNumCode % 2 != 0) {
      this.courseList.sort((a, b) => ( a.code > b.code) ? 1 : -1);
    } else {
      this.courseList.sort((a, b) => ( b.code > a.code) ? 1 : -1);
    }
  }

  sortProg():void {
    // Add one for every click in the component
    this.sortNumProg = this.sortNumProg + 1;
    if (this.sortNumProg % 2 != 0) {
      this.courseList.sort((a, b) => ( a.progression > b.progression) ? 1 : -1);
    } else {
      this.courseList.sort((a, b) => ( b.progression > a.progression) ? 1 : -1);
    }
  }

  searchTable():void {
    // If search-input is not a empty string
    if (this.searchInput.trim() !== '') {
      // Check if coursename or code contains the searched phrase
      this.courseList = this.originalCourseList.filter( course => 
        course.coursename.toLowerCase().includes(this.searchInput.toLowerCase()) || course.code.toLowerCase().includes(this.searchInput.toLowerCase()))
    } else {
      // If the searchinput is empty, "reset" the array
      this.courseList = this.originalCourseList;
    }
  }
}
