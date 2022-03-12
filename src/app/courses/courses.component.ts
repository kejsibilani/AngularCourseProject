import { Component, OnInit } from '@angular/core';
import { Course } from './course';
import { COURSES } from '../mock-courses';
import { CourseService } from '../course.service';
import { MessageService } from '../message.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  getCourses(): void {
  this.courseService.getCourses()
    .subscribe(courses => this.courses = courses);
}
  add(name: string): void {
  name = name.trim();
  if (!name) { return; }
  this.courseService.addCourse({ name } as Course)
    .subscribe(course => {
      this.courses.push(course);
    });
}

  delete(course: Course): void {
  this.courses = this.courses.filter(h => h !== course);
  this.courseService.deleteCourse(course.id).subscribe();
}
  constructor(private courseService: CourseService) {  }

  ngOnInit(): void {
    this.getCourses();
  }

}
