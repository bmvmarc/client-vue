<template>
    <div 
        class="task" 
        :class="{'completed': task.completed, 
                 'expired': !task.completed && Date.parse(task.date) < Date.parse(this.today),
                 'changed': isChanged
                }">
                   
        <div class="head">
        
             <my-input 
                class="top-btn"
                name='done'
                type="checkbox"
                :checked="completed"
                @click="changeCompleted">
            </my-input>  

            <my-button 
                class="top-btn"
                @click="$emit('remove', task._id)">
                &#10060;
            </my-button>

        </div> 

        <my-input
            @input="isChanged = true"
            class="date"
            type="date"
            :disabled="task.completed"
            :min="today"
            v-model="date">
        </my-input>    


        <textarea 
            @input="isChanged = true"
            v-model="title"
            :disabled="task.completed"
            rows="4"/> 

        <div class="error" v-show="dateError">
            The date is expired. Couldn't save
        </div>

        <div 
            class="task-btns"
            v-if="isChanged">          

            <my-button 
                @click="cancelChanges">
                &#128260;
            </my-button>

            <my-button 
                :disabled="task.completed"
                @click="saveChanges">
                &#128190; 
            </my-button>
            
        </div>        
    </div>
</template>

<script>


export default {
    emits: ["change-task", "remove"],   
  
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            today: (new Date()).toISOString().slice(0, 10),
            date: '',
            title: '',
            completed: '',
            dateError: '',
            isChanged: false
        }
    },

    methods: {
        saveChanges() {
            this.dateError = '';
            const chosen = Date.parse(this.date);
            const today = Date.parse(this.today);

            if (chosen < today && !this.completed) {              
                this.dateError = 'expired date';
                return;
            }

            this.$emit('change-task', {'id':        this.task._id, 
                                       'date':      this.date,
                                       "title":     this.title,
                                       "completed": this.completed
                                    });

            this.isChanged = false;
        },

        changeCompleted() {
            this.completed = !this.completed; 
              
            this.$emit('change-task', {'id':        this.task._id, 
                                       'date':      this.date,
                                       "title":     this.title,
                                       "completed": this.completed
                                    });

            this.isChanged = false;
          
        },

        cancelChanges() {
            this.date = this.task.date;
            this.title = this.task.title;
            this.completed = this.task.completed; 
            this.isChanged = false;
            this.dateError = '';
        }
        
    },

    mounted() {
        this.date = this.task.date;
        this.title = this.task.title;
        this.completed = this.task.completed; 
     
    }
}

</script>

<style scoped>

    .task {
        box-shadow: 2px 2px 4px gray;
        display: inline-grid;
        border: solid 2px teal;
        margin: 15px;
        justify-content: space-between;
        align-items: flex-start;
        border-radius: 5px;
        background-color: rgba(200, 200, 230);
        padding: 5px;
    }   

    .changed {
        border: solid 5px teal;
    }

    button {
        font-weight: normal;
        border: none;
    }

    .date {
        margin: 15px 0;
    }

    .completed {
        background-color: rgba(200, 200, 200);
    }

    .expired {
        background-color: rgba(260, 200, 200);
    }

    .title {
        white-space: pre-line;
    }

    textarea {
        white-space: pre-wrap;
        border: solid 1px teal;
        padding: 15px;
        margin-bottom: 15px;
        border-radius: 5px;
    }

    .expired .date {
        color: red;
        font-weight: bold;
    }

    .task-btns {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-column-gap: 5px;
    }

    .error {
        text-align: center;
        color:red;
        margin-bottom: 5px;
        border-radius: 5px;
        background-color: white;
        padding: 3px;
    }

    .head {
        display: grid;
        grid-template-columns: 1fr 20px;  
    }

    .top-btn {
        padding:0;
        margin: 0px;
        width: 20px;
        height: 17px;

    }

</style>