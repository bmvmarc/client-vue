<template>
    <input 
        type="file" 
        @change="onChange">
</template>

<script>
export default {
    name: 'file-upload',
    props: ['modelValue'],
    methods: {
        onChange(event) {
            this.$emit('update:modelValue', event.target.files[0]);
        },
    },
}
</script>

<style scoped>
    
    input {
        
        border: solid 1px teal;
        padding: 10px 15px;
        margin-top: 15px;
        border-radius: 5px;
    }

</style>