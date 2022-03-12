import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Course } from './courses/course';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const courses = [
      { id: 11, name: 'Biology' },
      { id: 12, name: 'Chemistry' },
      { id: 13, name: 'Math' },
      { id: 14, name: 'Literature' },
      { id: 15, name: 'Geography' },
      { id: 16, name: 'History' },
      { id: 17, name: 'Computer Science' },
      { id: 18, name: 'Algebra' },
      { id: 19, name: 'Physics' },
      { id: 20, name: 'Astronomy' }
    ];
    return {courses};
  }

  // Overrides the genId method to ensure that a course always has an id.
  // If the courses array is empty,
  // the method below returns the initial number (11).
  // if the courses array is not empty, the method below returns the highest
  // courses id + 1.
  genId(courses: Course[]): number {
    return courses.length > 0 ? Math.max(...courses.map(course => course.id)) + 1 : 11;
  }
}