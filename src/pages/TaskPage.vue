<template>
    <div>

        <h1>To do</h1>

        <div v-show="$store.state.isAuth">

            <div v-if="!(tasksLoading || errorTasksLoading)">
                    <my-button 
                        v-focus
                        @click="showAddTaskForm = true">
                        Add task
                    </my-button>              

                    <my-input
                        type="text" 
                        v-model="searchText"
                        placeholder="search...">
                    </my-input>

                    <my-select 
                        :options="sortOptions"
                        v-model="sortField">
                    </my-select>

                <my-dialog 
                    v-model:show="showAddTaskForm"
                    :class="{'wait': isLoading}">

                    <task-form 
                        @create-task="addNewTask">
                    </task-form>
                    
                    <div v-show="isError" class='error-text'>
                        <h3>Sorry, we have been unable to add the task.</h3>
                    </div> 

                </my-dialog>
                
                <task-list 
                    :tasks="searchedTasks"
                    @change-task="changeTask"
                    @remove="removeTask">
                </task-list>
            </div>  

            <div v-else-if="tasksLoading">
                Loading...
            </div>

            <div v-else>
                Loading error
            </div>

            <div class="observer" v-intersection="fetchTasksIfNeed">  </div>

        </div>

        <div v-show="!$store.state.isAuth">
            Tasks are available only to authorized users
        </div>

    </div>
</template>


<script>                    
import TaskForm from '../components/TaskForm.vue';
import TaskList from '../components/TaskList.vue';
import {ref} from 'vue';
import useTasks from '../hooks/tasks/useTasks.js';
import useSortedTasks from '../hooks/tasks/useSortedTasks.js';
import useSearchedTasks from '../hooks/tasks/useSearchedTasks.js';
import useRemoveTask from '../hooks/tasks/useRemoveTask.js';
import useChangeTask from '../hooks/tasks/useChangeTask.js';
import useAddTask from '../hooks/tasks/useAddTask.js';


export default {
    
    components: { TaskForm, TaskList },

    data() {
        return {
            showAddTaskForm: false,
            sortOptions: [
                            {val: 'title', name: 'Title'}, 
                            {val: 'date',  name: 'Date'}
                         ]
        }
    },

    methods: {
        async addNewTask(taskData) {
            await this.addTask(taskData);
            if (!this.isError) {
                this.showAddTaskForm = false;
                this.curNumber = 0;
                this.tasks = [];
                this.fetchTasks();
            }
        },

        async fetchTasksIfNeed() {
            if (!this.allTasksLoaded) {
                await this.fetchTasks();
            }
        }
        
    },

    setup(props) {
        const { tasks, tasksLoading, errorTasksLoading, fetchTasks, 
                allTasksLoaded, curNumber} = useTasks();
        const { sortField, sortedTasks } = useSortedTasks( tasks );
        const { searchText, searchedTasks } = useSearchedTasks( sortedTasks );
        const { addTask, isError, isLoading } = useAddTask();
        const { removeTask,  isRemoveError } = useRemoveTask( tasks );
        const { changeTask } = useChangeTask( tasks );


        return {
            tasks, tasksLoading, errorTasksLoading, fetchTasks, allTasksLoaded, curNumber,
            sortField, sortedTasks,
            searchText, searchedTasks, 
            removeTask, isRemoveError,
            changeTask, 
            addTask, isError, isLoading
        }
    }
    
}
</script>

<style scoped>

    .app-btns {
        display: flex;
        justify-content: space-between;
        margin: 15px 0;        
    }

    .error-text {
        margin: 15px;
        border: 2px solid red;
        border-radius: 5px;
    }

    .wait {
        cursor: wait;
    }

</style>