"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var task_service_1 = require("../service/task.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../shared/enum");
var global_1 = require("../shared/global");
var TaskComponent = (function () {
    function TaskComponent(fb, _taskService) {
        this.fb = fb;
        this._taskService = _taskService;
        this.indLoading = false;
    }
    TaskComponent.prototype.ngOnInit = function () {
        this.taskFrm = this.fb.group({
            Id: [''],
            Title: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(50)]],
            Description: ['', [forms_1.Validators.maxLength(100)]],
            CreatedDate: ['', [forms_1.Validators.required]],
            ModifiedDate: ['', [forms_1.Validators.required]],
            State: ['', [forms_1.Validators.required]]
        });
        this.LoadTasks();
    };
    TaskComponent.prototype.LoadTasks = function () {
        var _this = this;
        this.indLoading = true;
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            this._taskService.get(global_1.Global.BASE_TASK_ENDPOINT + "GetUserTasks?username=" + currentUser.username)
                .subscribe(function (tasks) { _this.tasks = tasks; _this.indLoading = false; }, function (error) { return _this.msg = error; });
        }
    };
    TaskComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.taskFrm.enable() : this.taskFrm.disable();
    };
    TaskComponent.prototype.addTask = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New task";
        this.modalBtnTitle = "Add";
        this.taskFrm.reset();
        this.modal.open();
    };
    TaskComponent.prototype.editTask = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit task";
        this.modalBtnTitle = "Update";
        this.task = this.tasks.filter(function (x) { return x.Id == id; })[0];
        this.taskFrm.patchValue(this.task);
        //this.taskFrm.controls["CreatedDate"].setValue(this.formatDateValue(this.task.CreatedDate));
        //this.taskFrm.controls["ModifiedDate"].setValue(this.formatDateValue(this.task.ModifiedDate));
        this.modal.open();
    };
    TaskComponent.prototype.formatDateValue = function (dateVal) {
        var dt = new Date(dateVal);
        return dt.toLocaleDateString('en-GB');
    };
    TaskComponent.prototype.deleteTask = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.task = this.tasks.filter(function (x) { return x.Id == id; })[0];
        this.taskFrm.patchValue(this.task);
        this.modal.open();
    };
    TaskComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                var currentUser = JSON.parse(localStorage.getItem('currentUser'));
                this._taskService.post(global_1.Global.BASE_TASK_ENDPOINT + "?username=" + currentUser.username, formData._value).subscribe(function (data) {
                    if (data.status == 201) {
                        _this.msg = "Task successfully added.";
                        _this.LoadTasks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._taskService.put(global_1.Global.BASE_TASK_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data.status == 200) {
                        _this.msg = "Task successfully updated.";
                        _this.LoadTasks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._taskService.delete(global_1.Global.BASE_TASK_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data.status == 200) {
                        _this.msg = "Task successfully deleted.";
                        _this.LoadTasks();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    return TaskComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], TaskComponent.prototype, "modal", void 0);
TaskComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/components/task.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, task_service_1.TaskService])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map