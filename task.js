const task={template:`
<div>
    <button type="button"
    class="btn btn-light mr-1"
    @click="backClick()">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    Back
    </button>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Task ID</th>
            <th>Task Name</th>
            <th>Task Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks">
            <td>{{task.TaskID}}</td>
            <td>{{task.TaskName}}</td>
            <td><a :href="'/#/project/'+$route.params.projectid+'/task/'+task.TaskID">View</a></td>
        </tr>
        </tbody>
    </table>
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
                    <button type="button" @click="createClick()" class="btn btn-primary">
                    Create
                    </button>
                </div>
            </div>
        </div>    
    </div>
    <button type="button"
    class="btn btn-primary m-2"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="addClick()">
    Add Task
    </button>
</div>
`,

data(){
    return{
        tasks:[],
        modalTitle: "",
        TaskName:"",
        TasktDescription:"",
        TaskStartDate:"",
        TaskEndDate:"",
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"tasklist/"+this.$route.params.projectid)
        .then((response)=>{
            this.tasks=response.data;
        })
    },
    backClick(){
        this.$router.push('/project/'+this.$route.params.projectid); 
    },
    addClick(){
        this.modalTitle="Add Task";
        this.TaskName="";
        this.TaskDescription="";
        this.TaskStartDate="";
        this.TaskEndDate="";
    },
    createClick(){
        axios.post(variables.API_URL+"tasklist/"+this.$route.params.projectid, {
            TaskName:this.TaskName,
            TaskDescription:this.TaskDescription,
            TaskStartDate:this.TaskStartDate,
            TaskEndDate:this.TaskEndDate
        })
        .then((response)=>{
            this.refreshData();
            alert("Task added");
            this.TaskName="";
            this.TaskDescription="";
            this.TaskStartDate="";
            this.TaskEndDate="";
        })
    }
},
mounted:function(){
    this.refreshData();
}
}
