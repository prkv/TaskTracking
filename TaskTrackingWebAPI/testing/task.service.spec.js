"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var global_1 = require("../app/shared/global");
var task_service_1 = require("../app/service/task.service");
var http_1 = require("@angular/http");
var testing_2 = require("@angular/http/testing");
describe('TaskService', function () {
    //let taskService: TaskService;
    //let mockBackend: MockBackend;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            imports: [http_1.HttpModule],
            providers: [
                { provide: global_1.Global.BASE_TASK_ENDPOINT, useValue: '/api' },
                task_service_1.TaskService,
                { provide: http_1.XHRBackend, useClass: testing_2.MockBackend }
            ]
        });
    });
    it('should return an Observable<Array<Task>>', testing_1.inject([task_service_1.TaskService, http_1.XHRBackend], function (taskService, mockBackend) {
        var mockResponse = {
            data: [
                { Id: 1, Title: 'Task 1', Description: 'Desc 1', State: 1, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                { Id: 2, Title: 'Task 2', Description: 'Desc 2', State: 2, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                { Id: 3, Title: 'Task 3', Description: 'Desc 3', State: 3, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                { Id: 4, Title: 'Task 4', Description: 'Desc 4', State: 1, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
                { Id: 5, Title: 'Task 5', Description: 'Desc 5', State: 2, CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") }
            ]
        };
        mockBackend.connections.subscribe(function (connection) {
            connection.mockRespond(new http_1.Response(new http_1.ResponseOptions({
                body: JSON.stringify(mockResponse)
            })));
        });
        taskService.get().subscribe(function (tasks) {
            expect(tasks.length).toBe(5);
            expect(tasks[0].Title).toEqual('Task 1');
            expect(tasks[1].Title).toEqual('Task 2');
            expect(tasks[2].Title).toEqual('Task 3');
            expect(tasks[3].Title).toEqual('Task 4');
            expect(tasks[4].Title).toEqual('Task 5');
        });
    }));
});
//# sourceMappingURL=task.service.spec.js.map