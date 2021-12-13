<template>
    <div>

        <h1>To do</h1>

        <div v-show="$store.state.isAuth">

            <div v-if="!(tasksLoading || errorTasksLoading)">
                
                <my-input
                    v-focus
                    type="text" 
                    v-model="searchText"
                    placeholder="search...">
                </my-input>

                <div class="app-btns">
                    
                    <my-button 
                        @click="showAddTaskForm = true">
                        Add task
                    </my-button>

                    <my-select 
                        :options="sortOptions"
                        v-model="sortField"></my-select>

                </div>

                <my-dialog v-model:show="showAddTaskForm">

                    <task-form 
                        @create-task="addNewTask">
                    </task-form>

                </my-dialog>
                
                <task-list 
                    :tasks="searchedTasks"
                    @change-task-completed="changeTaskCompleted"
                    @remove="removeTask">
                </task-list>
            </div>  

            <div v-else-if="tasksLoading">
                Loading...
            </div>

            <div v-else>
                Loading error
            </div>
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
import useChangeTaskCompleted from '../hooks/tasks/useChangeTaskCompleted.js';
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
        addNewTask(title, date) {
            this.addTask({
                id: this.tasks.length + 1, 
                title: title, 
                date: date, 
                completed: false
            });
        
            this.showAddTaskForm = false;   

        }
    },

    setup(props) {
        const { tasks, tasksLoading, errorTasksLoading, fetchTasks} = useTasks();
        const { sortField, sortedTasks } = useSortedTasks(tasks);
        const { searchText, searchedTasks } = useSearchedTasks(sortedTasks);
        const { removeTask } = useRemoveTask(tasks);
        const { changeTaskCompleted } = useChangeTaskCompleted(tasks);
        const { addTask } = useAddTask(tasks);

        return {
            tasks, tasksLoading, errorTasksLoading, fetchTasks, 
            sortField, sortedTasks,
            searchText, searchedTasks, 
            removeTask, changeTaskCompleted, addTask
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

</style>