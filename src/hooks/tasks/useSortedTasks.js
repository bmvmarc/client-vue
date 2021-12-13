import {ref, computed} from 'vue';

export default function useSortedTasks(tasks) {

    const sortField = ref('');

    const sortedTasks = computed(() => {
        return [...tasks.value].sort((a, b) => a[sortField.value]?.localeCompare(b[sortField.value]));
    });

    return {
        sortField, sortedTasks
    };

}

