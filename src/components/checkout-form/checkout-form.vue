<template>
    <form action="">
        <custom-input label="Name" v-model="name"></custom-input>
        <custom-input label="Surname" v-model="surname"></custom-input>
        <custom-input label="City" v-model="city"></custom-input>
        <v-button type="submit" v-on:submit="handleCheckoutFormSubmit"></v-button>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import CustomInput from "@/components/custom-input/custom-input.vue";
    import VButton from "@/components/v-button/v-button.vue";
    const { mapState, mapGetters } = createNamespacedHelpers("cartModule/");

    interface ICheckoutFromValues {
        name: string;
        surname: string;
        city: string;
    }

    @Component({
        components: {CustomInput, VButton},
        computed: {
            ...mapState(["items"]),
            ...mapGetters(["generalPrice"])
        }
    })
    export default class CheckoutForm extends Vue {
        name: string = "";
        surname: string = "";
        city: string = "";

        handleCheckoutFormSubmit(values: ICheckoutFromValues) {
            console.log(values);
        }
    }
</script>

<style lang="stylus">
</style>
