<template>
    <div 
        class="task" 
        :class="{'completed': task.completed, 
                 'not-completed': task.completed
                }">
        <div class="task-item"> {{ task._id }} </div>
        <div class="date task-item"> {{ task.date || 'no deadline' }} </div>
        <div class="title task-item"> {{ task.title }} </div>
        
        <div class="task-bnts task-item">
            
            <my-button 
                @click="$emit('change-task-completed', task._id)">
                {{task.completed ? '&#10004;' : '&nbsp;'}}
            </my-button> 

            <my-button 
                @click="$emit('remove', task._id)">
                Delete
            </my-button>

            <my-button 
                @click="$router.push(`/tasks/${task._id}`)">
                Show
            </my-button>

        </div>        
    </div>
</template>

<script>

export default {
    emits: ["change-task-completed", "remove"],   
  
    props: {
        task: {
            type: Object,
            required: true
        }
    },
    methods: {

    }
}
</script>

<style scoped>

    .task {
        display: flex;
        border: solid 2px teal;
        margin-top: 15px;
        justify-content: space-between;
        align-items: flex-start;
    }   
    .title {
        white-space: pre-line;
    } 
    .date {
        min-width: 75px;
      } 
    .task-item {
        padding: 15px;
    }

    .completed {
        color: #6e7a71;
    }

    .task-bnts {
        display: flex;
     }

    .checkbox {
        width: 50px;
        height: 50px;
    }

    .task-bnts button {
        margin-left: 5px;
    }

</style>