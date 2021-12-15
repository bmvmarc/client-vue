<template>
    <form @submit.prevent>
       
        <h4>Add a task</h4>
      
        <textarea 
            v-focus
            placeholder="enter"
            v-model="title"
            rows="4"/> 
                
        <my-input
            type="date"
            v-model="date"
            :min="today">
        </my-input>

        <my-button
            type="button"
            class="btn"
            @click="checkAndAddTask">
                Add 
        </my-button>
    
        <div v-show="wrongData">
            <h3 class="warning"> {{ wrongData }} </h3>
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
            wrongData: '',
            today:  ''
        }
    },

    methods: {
        checkAndAddTask() {
            
            const chosen = Date.parse(this.date);
            const today = Date.parse(this.today);

            if (this.title == '') {
                this.wrongData = 'Please fill the task field';

            } else if (chosen < today) {
                this.wrongData = 'Expired date';
            
            } else {
                this.wrongData = '';
                this.$emit('create-task', {'title': this.title, 
                                            'date': this.date});
            }
        }
    },
    mounted() {
        this.today = (new Date()).toISOString().slice(0, 10);
     },
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