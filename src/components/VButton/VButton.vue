<template functional>
    <button v-on:click="listeners.click" :class="['btn', props.color, props.btnStyle, props.class]">
        <slot></slot>
    </button>
</template>

<style lang="stylus">

    @import "~@/vars.styl";

    .btn
        align-items center
        border-radius 2px
        display inline-flex
        height 36px
        flex 0 0 auto
        font-size 14px
        font-weight 500
        justify-content center
        margin 6px 8px
        min-width 88px
        outline 0
        text-transform uppercase
        text-decoration none
        transition 0.3s cubic-bezier(0.25, 0.8, 0.5, 1), color 1ms
        position relative
        vertical-align middle
        padding 0 16px
        cursor pointer
        &.primary
            background-color $lighten-4
            border none
        &.outline
            background-color white
            border 2px solid  $lighten-4
</style>
