const task_discrete={template:`
<div>
    <button type="button"
    class="btn btn-light mr-1"
    @click="backClick()">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    Back
    </button>
    <h3>Task ID: {{ task.TaskID }} </h3> 
    <h2>Tasl Name: {{ task.TaskName }} </h2>
    <h2>Task Description: <pre>{{ task.TaskDescription }}</pre></h2>
    <h2>Task Start Date: {{ task.TaskStartDate }}</h2>
    <h2>Task End Date: {{ task.TaskEndDate }}</h2>
    <hr>
    <button type="button"
    class="btn btn-primary mr-1"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="editClick(task)">
    Edit Task
    </button>
    <button type="button"
    class="btn btn-primary mr-1"
    @click="deleteClick()">
    Delete Task
    </button>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Task Name</span>
                        <input type="text" class="form-control" v-model="TaskName">
                    </div> 
                    <div class="input-group mb-3">
                        <span class="input-group-text">Task Description</span>
                        <textarea class="form-control" v-model="TaskDescription"></textarea> 
                    </div>  
                    <div class="input-group mb-3">
                        <span class="input-group-text">Task Start Date</span>
                        <input type="date" class="form-control" v-model="TaskStartDate">
                    </div>  
                    <div class="input-group mb-3">
                        <span class="input-group-text">Task End Date</span>
                        <input type="date" class="form-control" v-model="TaskEndDate">
                    </div>  
                    <button type="button" @click="updateClick()" class="btn btn-primary">
                    Update
                    </button>
                </div>
            </div>
        </div>    
    </div>   
</div>
    `,
    
    data(){
        return{
            task:[],
            modalTitle:"",
            TaskName:"",
            TaskDescription:"",
            TaskStartDate:"",
            TaskEndDate:""
        }
    },
    methods:{
        refreshData(){
            axios.get(variables.API_URL+"taskdetail/"+this.$route.params.taskid)
            .then((response)=>{
                this.task=response.data;
            })
        },
        editClick(task){
            this.modalTitle="Edit Task";
            this.TaskName=task.TaskName;
            this.TaskDescription=task.TaskDescription;
            this.TaskStartDate=task.TaskStartDate;
            this.TaskEndDate=task.TaskEndDate;
        },
        backClick(){
            this.$router.push('/project/'+this.$route.params.projectid+'/task/'); 
        },
        showtasksClick(){
            this.$router.push('/project/'+this.$route.params.id+'/task/'); 
        },
        updateClick(){
            axios.put(variables.API_URL+"taskdetail/"+this.$route.params.taskid,{
                TaskName:this.TaskName,
                TaskDescription:this.TaskDescription,
                TaskStartDate:this.TaskStartDate,
                TaskEndDate:this.TaskEndDate
            })
            .then((response)=>{
                this.refreshData();
                alert("Task updated");
            })
        },
        deleteClick(){
            if(!confirm("Are you sure?")){
                return;
            }
            axios.delete(variables.API_URL+"taskdetail/"+this.$route.params.taskid)
            .then((response)=>{
                alert("Task deleted");
                this.$router.push('/project/'+this.$route.params.projectid+"/task/");
            })
        }
    },
    mounted:function(){
        this.refreshData();
    }
    }
  