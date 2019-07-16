<template>
    <div class="modal-backdrop">
        <div class="modal">
            <header class="modal-header">
                <slot name="header">
                </slot>
                <button
                        type="button"
                        class="btn-close"
                        @click="closeModal"
                >
                    x
                </button>
            </header>
            <section class="modal-body">
                <slot name="body">
                </slot>
            </section>
            <footer class="modal-footer">
                <slot name="footer">
                </slot>
            </footer>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {closeModal} from "@/views/RouteService";

    export default Vue.extend({
        methods: {
            closeModal: closeModal
        }
    })

</script>

<style lang="stylus">
    .modal-backdrop
        position: fixed
        top: 0
        bottom: 0
        left: 0
        right: 0
        background-color: rgba(0, 0, 0, 0.3)
        display: flex
        justify-content: center
        align-items: center
        z-index 999

    .modal
        background: #FFFFFF
        box-shadow: 2px 2px 20px 1px
        overflow-x: auto
        display: flex
        flex-direction: column
        padding 20px


    .modal-header
    .modal-footer
        padding: 15px
        display: flex


    .modal-header
        border-bottom: 1px solid #eeeeee
        color: #4AAE9B
        justify-content: space-between


    .modal-footer
        border-top: 1px solid #eeeeee
        justify-content: flex-end


    .modal-body
        position: relative
        padding: 15px
        max-height 200px
        overflow-y auto

    .btn-close
        border: none
        font-size: 20px
        cursor: pointer
        font-weight: bold
        color: #4AAE9B
        background: transparent


    .btn-green
        color: white
        background: #4AAE9B
        border: 1px solid #4AAE9B
        border-radius: 2px

</style>
