import { TestBed, inject } from '@angular/core/testing';

import { Global } from '../app/shared/global';
import { TaskService } from '../app/service/task.service'

import {
    HttpModule,
    Http,
    Response,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('TaskService', () => {

    //let taskService: TaskService;
    //let mockBackend: MockBackend;
    
    beforeEach(() => {

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [
                { provide: Global.BASE_TASK_ENDPOINT, useValue: '/api' },
                TaskService,
                { provide: XHRBackend, useClass: MockBackend }
            ]
        });

    });

    it('should return an Observable<Array<Task>>',
        inject([TaskService, XHRBackend], (taskService, mockBackend) => {

            const mockResponse = {
                data: [
                    { Id: 1, Title: 'Task 1', Description: 'Desc 1', State: 1, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                    { Id: 2, Title: 'Task 2', Description: 'Desc 2', State: 2, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                    { Id: 3, Title: 'Task 3', Description: 'Desc 3', State: 3, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00")},
                    { Id: 4, Title: 'Task 4', Description: 'Desc 4', State: 1, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                    { Id: 5, Title: 'Task 5', Description: 'Desc 5', State: 2, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") }

                ]
            };

            mockBackend.connections.subscribe((connection) => {
                connection.mockRespond(new Response(new ResponseOptions({
                    body: JSON.stringify(mockResponse)
                })));
            });

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