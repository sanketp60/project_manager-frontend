const project_discrete={template:`
<div>
    <button type="button"
    class="btn btn-light mr-1"
    @click="backClick()">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    Back
    </button>
    <h3>Project ID: {{ project.ProjectID }} </h3> 
    <h2>Project Name: {{ project.ProjectName }} </h2>

    <h2 v-if="project.ProjectAvatar">Project Avatar: <br> <img width="250px" height="250px" :src="project.ProjectAvatar"/> </h2>
    <h2 v-if="!project.ProjectAvatar">Project Avatar: <br> <img width="250px" height="250px" src="/static/default_avatar.png"/> </h2>
    <h2>Project Description: <pre>{{ project.ProjectDescription }}</pre></h2>
    <h2>Project Duration: {{ project.ProjectDuration }} month(s)</h2>
    <button type="button"
    class="btn btn-secondary mr-1"
    @click="showtasksClick()">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
    </svg>
    View Tasks
    </button>
    <hr>
    <button type="button"
    class="btn btn-primary mr-1"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    @click="editClick(project)">
    Edit Project
    </button>
    <button type="button"
    class="btn btn-primary mr-1"
    @click="deleteClick()">
    Delete Project
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
                        <span class="input-group-text">Project Name</span>
                        <input type="text" class="form-control" v-model="ProjectName">
                    </div> 
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Description</span>
                        <textarea class="form-control" v-model="ProjectDescription"></textarea> 
                    </div>  
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Duration (in months)</span>
                        <input type="number" min="1" class="form-control" v-model="ProjectDuration">
                    </div>  
                    <div class="input-group mb-3">
                        <span class="input-group-text">Project Avatar</span>
                        <input type="file" id="file" ref="file" v-on:change="handleFileUpload()"/>
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
            project:[],
            modalTitle:"",
            ProjectName:"",
            ProjectDescription:"",
            ProjectDuration:"",
            ProjectAvatar:"",
            file:''
        }
    },
    methods:{
        refreshData(){
            axios.get(variables.API_URL+"projectdetail/"+this.$route.params.id)
            .then((response)=>{
                this.project=response.data;
            }).catch(function (error) {
                alert("ProjectID not found!");
                router.push('/project/');
              })
        },
        editClick(project){
            this.modalTitle="Edit Project";
            this.ProjectID=project.ProjectID;
            this.ProjectName=project.ProjectName;
            this.ProjectDescription=project.ProjectDescription;
            this.ProjectDuration=project.ProjectDuration;
        },
        backClick(){
            this.$router.push('/project/'); 
        },
        showtasksClick(){
            this.$router.push('/project/'+this.$route.params.id+'/task/'); 
        },
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
        },
        updateClick(){
            let formData = new FormData();
            formData.append('ProjectName', this.ProjectName);
            formData.append('ProjectDescription', this.ProjectDescription);
            formData.append('ProjectDuration', this.ProjectDuration);
            formData.append('ProjectAvatar', this.file);
            axios.put(variables.API_URL+"projectdetail/"+this.$route.params.id,
            formData,
        {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
      })
            .then((response)=>{
                this.refreshData();
                alert("Project updated");
            })
        },
        deleteClick(){
            if(!confirm("Are you sure?")){
                return;
            }
            axios.delete(variables.API_URL+"projectdetail/"+this.$route.params.id)
            .then((response)=>{
                alert("Project deleted");
                this.$router.push('/project/');
            })
        }
    },
    mounted:function(){
        this.refreshData();
    }
    }
  