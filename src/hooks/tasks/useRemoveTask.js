
export default function useRemoveTask(tasks) {

    const removeTask = (id) => {
        tasks.value = tasks.value.filter(el => el.id != id);
    }

    return {
        removeTask
    };

}

