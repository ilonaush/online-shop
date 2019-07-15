<template>
    <select v-on:change="$emit('change', $event.target.value)" :class="className">
        <option v-for="option in options":value="option.value">{{option.title}}</option>
    </select>
</template>

<script lang="ts">
    import  Vue  from "vue";
    import {Component, Prop} from "vue-property-decorator";

    export default Vue.extend({
        props: {
            className: String,
            options: Array,
        },
    })
</script>

<style lang="stylus">

    @import "../../vars.styl"

    select
        padding 10px 5px
        width 200px
        margin 5px 0

</style>
