import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../service/task.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ITask } from '../models/task';
import { DBOperation } from '../shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';

@Component({
    
templateUrl: 'app/components/task.component.html'

})

export class TaskComponent implements OnInit 
{
    @ViewChild('modal') modal: ModalComponent;
    tasks: ITask[];
    task: ITask;
    msg: string;
    indLoading: boolean = false;
    taskFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _taskService: TaskService) { }

ngOnInit(): void {

        this.taskFrm = this.fb.group({
            Id: [''],
            Title: ['', [Validators.required,Validators.minLength(5),Validators.maxLength(50)]],
            Description: ['', [Validators.maxLength(100)]],
            CreatedDate: ['',[Validators.required]],
            ModifiedDate:['',[Validators.required]],
            State: ['',[Validators.required]]
        });
        
       this.LoadTasks();
    
     }

LoadTasks(): void {
           this.indLoading = true;
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            if(currentUser){
                    this._taskService.get(Global.BASE_TASK_ENDPOINT + "GetUserTasks?username=" + currentUser.username)
                .subscribe(tasks => { this.tasks = tasks; this.indLoading = false; },
                error => this.msg = <any>error);

               }
            } 
           

    
SetControlsState(isEnable: boolean)
{
 isEnable ? this.taskFrm.enable() : this.taskFrm.disable();
}

addTask() {
       this.dbops = DBOperation.create;
       this.SetControlsState(true);
       this.modalTitle = "Add New task";
       this.modalBtnTitle = "Add";
       this.taskFrm.reset();
       
       this.modal.open();
   }

   editTask(id: number) {
       this.dbops = DBOperation.update;
       this.SetControlsState(true);
       this.modalTitle = "Edit task";
       this.modalBtnTitle = "Update";
       this.task = this.tasks.filter(x => x.Id == id)[0];
       this.taskFrm.patchValue(this.task,);

       //this.taskFrm.controls["CreatedDate"].setValue(this.formatDateValue(this.task.CreatedDate));
       //this.taskFrm.controls["ModifiedDate"].setValue(this.formatDateValue(this.task.ModifiedDate));

       this.modal.open();
}

   formatDateValue(dateVal: Date) {
       let dt = new Date(dateVal);
       return dt.toLocaleDateString('en-GB');
   }

   deleteTask(id: number) {
       this.dbops = DBOperation.delete;
       this.SetControlsState(false);
       this.modalTitle = "Confirm to Delete?";
       this.modalBtnTitle = "Delete";
       this.task = this.tasks.filter(x => x.Id == id)[0];
       this.taskFrm.patchValue(this.task);
       this.modal.open();
   }

    onSubmit(formData: any) {
    this.msg = "";
  
    switch (this.dbops) {
        case DBOperation.create:
            var currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this._taskService.post(Global.BASE_TASK_ENDPOINT + "?username=" + currentUser.username, formData._value).subscribe(
          data => {
            if (data.status == 201) //Created
            {
              this.msg = "Task successfully added.";
              this.LoadTasks();
            }
            else
            {
              this.msg = "There is some issue in saving records, please contact to system administrator!"
            }
             
            this.modal.dismiss();
          },
          error => {
           this.msg = error;
          }
        );
        break;
      case DBOperation.update:
        this._taskService.put(Global.BASE_TASK_ENDPOINT, formData._value.Id, formData._value).subscribe(
          data => {

            if (data.status == 200) //OK
            {
              this.msg = "Task successfully updated.";
              this.LoadTasks();
            }
            else {
              this.msg = "There is some issue in saving records, please contact to system administrator!"
            }

            this.modal.dismiss();
          },
          error => {
            this.msg = error;
          }
        );
        break;
      case DBOperation.delete:
        this._taskService.delete(Global.BASE_TASK_ENDPOINT, formData._value.Id).subscribe(
          data => {
            if (data.status == 200) //OK
            {
              this.msg = "Task successfully deleted.";
              this.LoadTasks();
            }
            else {
              this.msg = "There is some issue in saving records, please contact to system administrator!"
            }

            this.modal.dismiss();
          },
          error => {
            this.msg = error;
          }
        );
        break;

    }
  }

}