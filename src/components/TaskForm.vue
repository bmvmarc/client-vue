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
            @click="checkAndAddTask">
                Add 
        </my-button>
    
        <div v-show="wrongData">
            <h3 class="warning"> Please fill the task field </h3>
        </div>    

    </form>
</template>

<script>

export default {
    name: "task-form",
    emits: ["create-task"],
    data() {
        return {
            title: '',
            date: '',
            wrongData: false
        }
    },

    methods: {
        checkAndAddTask() {
            
            if (this.title == '') {
                this.wrongData = true;
            } else {
                this.wrongData = false;
                this.$emit('create-task', {'title': this.title, 
                                            'date': this.date});
            }
        }
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

    .btn {
        align-self: flex-end;
        margin-top: 15px;
    }
    
    .warning {
        color: red;
        text-align: center;        
    }    

</style>