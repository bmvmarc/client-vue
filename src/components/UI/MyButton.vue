<template>
    <button class="btn"> 
        <slot></slot>    
    </button>
</template>
<script>
export default {
    name: "my-button"
}
</script>
<style lang="css">

    .btn {
        padding: 10px 15px;
        background: none;
        border: solid 1px teal;
        border-radius: 5px;
        font-weight: bold;
    } 

    .btn:hover {
        background-color: teal;
    }

</style>