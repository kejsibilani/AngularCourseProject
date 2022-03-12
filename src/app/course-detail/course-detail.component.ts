import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../courses/course';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { CourseService } from '../course.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  courseService: any;
 
  constructor(
    private route: ActivatedRoute,
    private heroService: CourseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }
  
  getCourse(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.courseService.getCourse(id)
      .subscribe((course: Course | undefined) => this.course = course);
  }
  goBack(): void {
    this.location.back();
  }
  save(): void {
    if (this.course) {
      this.courseService.updateCourse(this.course)
        .subscribe(() => this.goBack());
    }
  }
  
}
