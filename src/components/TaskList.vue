<template>
   
    <div v-if="tasks.length > 0">

        <h3>Tasks list</h3>

        <transition-group name="list">
           
            <task-item 
                v-for="task in tasks"
                :key="task._id"
                :task="task"
                @change-task="(task) => $emit('change-task', task)"
                @remove="$emit('remove', task._id)">
            </task-item>
      
        </transition-group>

    </div>

    <h2 v-else>There are no tasks</h2>

</template>

<script>
import TaskItem from './TaskItem.vue';

export default {

    components: {
        TaskItem
    },

    emits: ["change-task", "remove"],

    props: {
        tasks: {
            type: Array,
            required: true
        }
    },

    data() {
        return {

        }
    }
}
</script>

<style scoped>

    .list-item {
        display: inline-block;
        margin-right: 10px;
    }
    .list-enter-active, 
    .list-leave-active {
        transition: all 0.4s ease;
    }
    .list-enter-from, 
    .list-leave-to {
        opacity: 0;
        transform: translateX(130px);
    }
    .list-move {
        transition: transform 1s;
    }

</style>