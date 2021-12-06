<template>
    <input 
        :value="modelValue"
        @input="updateInput"
        class="input"
        type='text'
    />
</template>

<script>
export default {
    name: "my-input",
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value);
        }
    }
}
</script>

<style lang="css">
    .input {
        width: 100%;
        border: solid 1px teal;
        padding: 10px 15px;
        margin-top: 15px;
        border-radius: 5px;
    }
</style>