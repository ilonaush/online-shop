<template>
    <form action="">
        <input type="text">
        <input type="text">
        <input type="text">
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";

    const { mapState, mapGetters } = createNamespacedHelpers("cartModule/");

    @Component({
        computed: {
            ...mapState(['items']),
            ...mapGetters(['generalPrice'])
        }
    })
    export default class CheckoutForm extends Vue {

    }
</script>

<style lang="stylus">
</style>
