"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var task_service_1 = require("../app/service/task.service");
var Observable_1 = require("rxjs/Observable");
var testing_1 = require("@angular/core/testing");
describe('Tests for Task Component', function () {
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({
            providers: [
                { provide: task_service_1.TaskService, useClass: MockTaskService }
            ]
        });
    });
    it('should return an Observable<Array<Task>>', testing_1.inject([task_service_1.TaskService], function (taskService) {
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
var MockTaskService = (function (_super) {
    __extends(MockTaskService, _super);
    function MockTaskService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MockTaskService.prototype.get = function (url) {
        var tasks = [
            { Id: 1, Title: 'Task 1', Description: 'Desc 1', State: 1, StateDesc: 'Active', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 2, Title: 'Task 2', Description: 'Desc 2', State: 2, StateDesc: 'Completed', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 3, Title: 'Task 3', Description: 'Desc 3', State: 3, StateDesc: 'Archived', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 4, Title: 'Task 4', Description: 'Desc 4', State: 1, StateDesc: 'Active', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") },
            { Id: 5, Title: 'Task 5', Description: 'Desc 5', State: 2, StateDesc: 'Completed', CreatedDate: new Date("February 4, 2017 10:13:00"), ModifiedDate: new Date("March 4, 2017 10:13:00") }
        ];
        return Observable_1.Observable.of(tasks);
    };
    return MockTaskService;
}(task_service_1.TaskService));
//# sourceMappingURL=task.component.spec.js.map