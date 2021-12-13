
export default function useChangeTaskCompleted(tasks) {

    const changeTaskCompleted = (id) => {
        const ind = tasks.value.findIndex(el => el.id === id);
        tasks.value[ind].completed = !tasks.value[ind].completed;
    }

    return {
        changeTaskCompleted
    };

}

