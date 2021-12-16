import {ref, computed} from 'vue';

export default function useSearchedTasks(tasks) {

    const searchText = ref('');
    const showCompleted = ref(true);

    const searchedTasks = computed(() => {
        return tasks.value.filter(i => {
            
                    return (i.title.toLowerCase().includes(searchText.value.toLowerCase()) || i.date.includes(searchText.value)) 
                            && 
                            ( showCompleted.value || !i.completed )
        
                }
            )
    });

    return {
        searchText, searchedTasks,  showCompleted
    };

}

