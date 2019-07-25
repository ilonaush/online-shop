<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="login-modal">
        <modal>
            <template v-slot:header>Log in</template>
            <template v-slot:body>
                <login-form></login-form>
            </template>
        </modal>
    </div>
</template>

<script lang="ts">
    import Vue from "vue";
    import {MODAL_TYPE} from "@/store/enums";
    import Modal from "@/components/Modal/modal.vue";
    import LoginForm from "@/components/login-form/login-form.vue";

    export default Vue.extend({
       components: {
           Modal,
           LoginForm
       },
    })
</script>
