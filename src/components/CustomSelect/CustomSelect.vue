<template>
    <select :class="className">
        <option v-for="option in options" :value="option.value" v-on:click="$emit('click', option)">{{option.title}}</option>
    </select>
</template>

<script lang="ts">
    import  Vue  from "vue";
    import {Component, Prop} from "vue-property-decorator";


    @Component
    export default class CustomSelect extends Vue {
        @Prop(String) className!: string;
        @Prop(Array) options!: any[];
    }
</script>

<style lang="stylus">

    @import "../../vars.styl"

    .radiobutton-holder
        display flex
        align-items center
        width auto
        margin-right 5px
        .input-holder
            position relative
            background-color white
            width 20px
            height 20px
            margin 0
            border 1px solid $lighten-2
            border-radius 50%
            cursor pointer
            -webkit-user-select none
            -moz-user-select none
            -ms-user-select none
            user-select: none
            input
                position: absolute
                opacity: 0
                cursor: pointer
                height: 100%
                width: 100%
                &:checked ~ .checked
                    display block
            .checked
                top 3px
                display none
                position absolute
                left 3px
                width 14px
                height 14px
                border-radius 50%
                background $primary

</style>
