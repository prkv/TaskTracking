import { TaskComponent } from '../app/components/task.component'
import { TaskService } from '../app/service/task.service'
import { ITask } from '../app/models/task'
import { Observable } from 'rxjs/Observable';

import { TestBed, inject } from '@angular/core/testing';

describe('Tests for Task Component', () => {
    

    beforeEach(() => {

        TestBed.configureTestingModule({
            providers: [
                { provide: TaskService, useClass: MockTaskService }
            ]
        });

    });

    it('should return an Observable<Array<Task>>',
        inject([TaskService], (taskService) => {
            
            taskService.get().subscribe((tasks) => {
                expect(tasks.length).toBe(5);
                expect(tasks[0].Title).toEqual('Task 1');
                expect(tasks[1].Title).toEqual('Task 2');
                expect(tasks[2].Title).toEqual('Task 3');
                expect(tasks[3].Title).toEqual('Task 4');
                expect(tasks[4].Title).toEqual('Task 5');
            });

        }));

});

class MockTaskService extends TaskService {
    public get(url: string): Observable<ITask[]> {

        let tasks: ITask[] = [
            { Id: 1, Title: 'Task 1', Description: 'Desc 1', State: 1, StateDesc: 'Active', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 2, Title: 'Task 2', Description: 'Desc 2', State: 2, StateDesc: 'Completed', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 3, Title: 'Task 3', Description: 'Desc 3', State: 3, StateDesc: 'Archived', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 4, Title: 'Task 4', Description: 'Desc 4', State: 1, StateDesc: 'Active', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 5, Title: 'Task 5', Description: 'Desc 5', State: 2, StateDesc: 'Completed', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") }

        ];

        return Observable.of(tasks);
    }

}