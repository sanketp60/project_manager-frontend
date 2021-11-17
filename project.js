const project={template:`
<div>
    <table class="table table-striped">
        <thead>
        <tr>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Project Details</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="proj in projects">
            <td>{{proj.ProjectID}}</td>
            <td>{{proj.ProjectName}}</td>
            <td><a :href="'/#/project/' + proj.ProjectID">View</a></td>
        </tr>
        </tbody>
    </table>
    <label v-if="!projects.length" class="d-flex justify-content-center">There are no projects to show</label>
    <br>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModelLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{modalTitle}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Name</span>
                        <input type="text" class="form-control" v-model="ProjectName">
                    </div> 
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Description</span>
                        <textarea class="form-control" v-model="ProjectDescription"></textarea>
                    </div>  
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Duration (in months)</span>
                        <input type="text" class="form-control" v-model="ProjectDuration">
                    </div>
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Avatar</span>
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
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
    Add Project
    </button>
</div>
`,

data(){
    return{
        projects:[],
        modalTitle: "",
        ProjectName:"",
        ProjectDescription:"",
        ProjectDuration:"",
        file:''
    }
},
methods:{
    refreshData(){
        axios.get(variables.API_URL+"projectlist/")
        .then((response)=>{
            this.projects=response.data;
        })
    },
    
    addClick(){
        this.modalTitle="Add Project";
        this.ProjectName="";
        this.ProjectDescription="";
        this.ProjectDuration="";
    },
    handleFileUpload(){
        this.file = this.$refs.file.files[0];
      },
    createClick(){
        let formData = new FormData();
        formData.append('ProjectName', this.ProjectName);
        formData.append('ProjectDescription', this.ProjectDescription);
        formData.append('ProjectDuration', this.ProjectDuration);
        formData.append('ProjectAvatar', this.file);
        axios.post(variables.API_URL+"projectlist/", 
        formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
        .then((response)=>{
            this.refreshData();
            alert("Project added");
            this.ProjectName="";
            this.ProjectDescription="";
            this.ProjectDuration="";
        })
        .catch(error => {
            console.log(error.response)
        })
    }
},
mounted:function(){
    this.refreshData();
}
}
