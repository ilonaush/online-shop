<template>
    <form action="">
        <custom-input label="Name" v-model="name"></custom-input>
        <custom-input label="Surname" v-model="surname"></custom-input>
        <custom-input label="City" v-model="city"></custom-input>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import CustomInput from "@/components/CustomInput/CustomInput";
    const { mapState, mapGetters } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {CustomInput},
        computed: {
            ...mapState(['items']),
            ...mapGetters(['generalPrice'])
        }
    })
    export default class CheckoutForm extends Vue {
        name: string = "";
        surname: string = "";
        city: string = "";
    }
</script>

<style lang="stylus">
</style>
