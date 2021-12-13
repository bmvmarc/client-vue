import {ref, computed} from 'vue';

export default function useSearchedTasks(tasks) {

    const searchText = ref('');

    const searchedTasks = computed(() => {
        return tasks.value.filter(i => i.title.toLowerCase().includes(searchText.value.toLowerCase())
                                    || i.date.includes(searchText.value));
    });

    return {
        searchText, searchedTasks
    };

}

