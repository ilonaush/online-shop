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
    import Vue, {PropOptions} from "vue";
    import {App} from "@/interfaces";
    import ISelect = App.ISelect;

    export default Vue.extend({
        props: {
            className: String,
            options: Array as PropOptions<ISelect>,
        }
    });
</script>

<style lang="stylus">

    @import "~@/vars.styl"

    select
        padding 10px 5px
        width 200px
        margin 5px 0

</style>
