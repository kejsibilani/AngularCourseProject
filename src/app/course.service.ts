import { Injectable } from '@angular/core';
import { Course } from './courses/course';
// import { COURSES } from './mock-courses';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private coursesUrl = 'api/courses';  // URL to web api

// Constructor
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

//
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

/** GET courses from the server */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(_ => this.log('fetched courses')),
        catchError(this.handleError<Course[]>
    ('getCourses', [])));
  }

/** GET course by id. Will 404 if id not found */
getCourse(id: number): Observable<Course> {
    const url = `${this.coursesUrl}/${id}`;
    return this.http.get<Course>(url).pipe(
      tap(_ => this.log(`fetched course id=${id}`)),
      catchError(this.handleError<Course>(`getCourse id=${id}`))
    );
  }
  

  /** Log a CourseService message with the MessageService */
  private log(message: string) {
  this.messageService.add(`CourseService: ${message}`);
  }
  

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 *
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
  /** PUT: update the course on the server */
updateCourse(course: Course): Observable<any> {
  return this.http.put(this.coursesUrl, course, this.httpOptions).pipe(
    tap(_ => this.log(`updated course id=${course.id}`)),
    catchError(this.handleError<any>('updateCourse'))
  );
}
/** POST: add a new course to the server */
addCourse(course: Course): Observable<Course> {
  return this.http.post<Course>(this.coursesUrl, course, this.httpOptions).pipe(
    tap((newCourse: Course) => this.log(`added course w/ id=${newCourse.id}`)),
    catchError(this.handleError<Course>('addCourse'))
  );
}

/** DELETE: delete the course from the server */
deleteCourse(id: number): Observable<Course> {
  const url = `${this.coursesUrl}/${id}`;

  return this.http.delete<Course>(url, this.httpOptions).pipe(
    tap(_ => this.log(`deleted course id=${id}`)),
    catchError(this.handleError<Course>('deleteCourse'))
  );
}
/* GET courses whose name contains search term */
searchCourses(term: string): Observable<Course[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.http.get<Course[]>(`${this.coursesUrl}/?name=${term}`).pipe(
    tap(x => x.length ?
       this.log(`found courses matching "${term}"`) :
       this.log(`no courses matching "${term}"`)),
    catchError(this.handleError<Course[]>('searchCourses', []))
  );
}
}
