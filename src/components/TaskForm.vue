<template>
    <form @submit.prevent>
       
        <h4>Add a task</h4>
      
        <textarea 
            placeholder="enter"
            v-model="title"
            rows="4"/>
                
        <my-input
            type="date"
            v-model="date">
        </my-input>

        <my-button
            v-focus
            type="button"
            class="btn"
            @click="addTask">
                Add 
        </my-button>

        <div v-show="wrongData">
            <h3 class="warning center"> Please fill the task field </h3>
        </div>

        <div v-show="isError" class='error-text'>
            <h3>Sorry, we have been unable to add the task.</h3>
        </div>        
        
    </form>
</template>

<script>
import useAddTask from '../hooks/tasks/useAddTask.js';


export default {
    name: "task-form",

    setup(props) {
        const {title, date, wrongData, addTask, isError, 
               message} = useAddTask();

        return {title, date, wrongData, addTask, isError, message};

    }
}
</script>

<style scoped>

    form {
        display: flex;
        flex-direction: column;
    }

    textarea {
        white-space: pre-wrap;
        border: solid 1px teal;
        padding: 15px;
        margin-bottom: 15px;
    }

    .error-text, h4 {
        margin: 15px;
    }

    .btn {
        align-self: flex-end;
        margin-top: 15px;
    }
    
    .error-text {
        border: 2px solid red;
        border-radius: 5px;
    }

</style>