<template>
    <select 
        class="select"
        v-bind:value="modelValue"
        @change="updateOption">
            
            <option disabled value="">--Please choose an option--</option>

            <option 
                v-for="opt in options"
                :key="opt.val"
                :value="opt.val"> {{ opt.name }} 
            
            </option>
        
    </select>
</template>


<script>

export default {
    name: 'my-select',
    props: {
        options: {
            type: Array,
            default: () => []
        },
        modelValue: String
    },

    methods: {
        updateOption(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }

}

</script>


<style scoped>
    
    .select {
        border: solid 1px teal;
        margin: 15px 0;
        padding: 10px 15px;
        border-radius: 5px;
    }

</style>