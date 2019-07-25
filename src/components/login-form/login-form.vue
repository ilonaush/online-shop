<!--<template>-->
    <!--<form @submit="handleLoginFormSubmit">-->
        <!--<custom-input label="email" v-on:blur.native="isSubmitting = false" v-on:focus.native="isSubmitting = true" v-model="email" :error="errors.email"></custom-input>-->
        <!--<custom-input label="password" v-on:blur.native="isSubmitting = false" v-on:focus.native="isSubmitting = true" v-model="password" :error="errors.password"></custom-input>-->
        <!--<v-button :disabled="!isSubmitting && !!Object.keys(errors).length" type="submit">Submit</v-button>-->
    <!--</form>-->
<!--</template>-->

<!--<script lang="ts">-->
    <!--import {Component, Vue} from "vue-property-decorator";-->
    <!--import CustomInput from "@/components/custom-input/custom-input.vue";-->
    <!--import VButton from "@/components/v-button/v-button.vue";-->

    <!--const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;-->

    <!--function validateEmail(email) {-->
        <!--return emailPattern.test(email.trim());-->
    <!--}-->

    <!--interface ILoginFromValues {-->
        <!--email: string;-->
        <!--password: string;-->
    <!--}-->

    <!--@Component({-->
        <!--components: {CustomInput, VButton},-->
    <!--})-->
    <!--export default class LoginForm extends Vue {-->
        <!--email: string = "";-->
        <!--password: string = "";-->
        <!--isSubmitting: boolean = false;-->
        <!--errors: Partial<Record<keyof ILoginFromValues, string>> = {};-->

        <!--validateForm() {-->
            <!--if (this.email && this.password) {-->
                <!--return true;-->
            <!--}-->

            <!--this.errors = {};-->

            <!--if (!this.email) {-->
                <!--this.errors.email = "Поле обязательное для заполнения";-->
            <!--} else if (!validateEmail(this.email)) {-->
                <!--this.errors.email = "Введіть електронну адресу в форматі mail@mail.com";-->
            <!--}-->
            <!--if (!this.password) {-->
                <!--this.errors.password ="Поле обязательное для заполнения";-->
            <!--}-->

        <!--}-->

        <!--handleLoginFormSubmit(e) {-->
            <!--e.preventDefault();-->
            <!--if (this.validateForm()) {-->
                <!--console.log("success");-->
            <!--}-->
        <!--}-->
    <!--}-->
<!--</script>-->

<!--<style lang="stylus">-->
<!--</style>-->
