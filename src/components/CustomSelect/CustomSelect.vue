<template>
    <select :class="className"
            v-on:change="$emit('change', $event.target.value)">
        <option
            v-for="option in options"
            :value="option.value">
            {{option.title}}
        </option>
    </select>
</template>

<script lang="ts">
    import  Vue, {PropType}  from "vue";

    export default Vue.extend({
        props: {
            className: String,
            options: Array as PropType<{title: string, value: string}>,
        }
    })
</script>

<style lang="stylus">

    @import "~@/vars.styl"

    select
        padding 10px 5px
        width 200px
        margin 5px 0

</style>
