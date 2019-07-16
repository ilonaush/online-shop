<template functional>
    <label class="custom-input_label">
        {{label}}
        <input v-bind:value="value"
               v-on:input="listeners.input($event.target.value)"
        >
    </label>

</template>

<script lang="ts">
    import  Vue  from "vue";

    export default Vue.extend({
        functional: true,
        props: {
            label: String,
            value: String
        },
    })
</script>

<style lang="stylus">
    .custom-input_label
        display block
        input
            display flex
</style>
