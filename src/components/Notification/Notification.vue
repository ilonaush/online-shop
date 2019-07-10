<template>
    <div v-if="isNotificationShown" class="notification">
        {{message}}
        <v-button @click="openModal(modalType.cart)" class="go-cart-btn" color="primary">Go to cart</v-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {createNamespacedHelpers, mapMutations} from "vuex";
    import VButton from "@/components/VButton/VButton.vue";
    import {MODAL_TYPE} from "@/store/enums";
    import {Notification} from "@/interfaces";
    import {Notification} from "../../interfaces";
    import INotification = Notification.INotification;

    const { mapMutations: mapCartMutations } = createNamespacedHelpers("cartModule/");

    @Component({
        components: {
            VButton
        },
        methods: {
            ...mapCartMutations(["deleteFirstNotification"]),
            ...mapMutations(["openModal"])
        },
    })
    export default class Notification extends Vue implements INotification {
        message: string = "";
        timer: number = 0;
        deleteFirstNotification!: () => void;
        isNotificationShown: boolean = false;
        modalType = MODAL_TYPE;

        get notifications() {
            return this.$store.state.cartModule.notifications;
        }

        @Watch("notifications", { immediate: true, deep: true })
        toggleNotification(val: string[]) {
            if (val && val.length) {
                this.message = this.notifications[0];
                this.showNotification();
            }
        }

        hideNotification() {
            this.isNotificationShown = false;
            this.deleteFirstNotification();
        }

        showNotification() {
            clearTimeout(this.timer);
            this.isNotificationShown = true;
            this.timer = setTimeout(() => this.hideNotification(), 3000)
        }
    }
</script>

<style lang="stylus">
  .notification
    border 1px solid pink
    background-color white
    position absolute
    bottom 50%
    transform translateY(-50%)
    right 0
    z-index 999
    min-width 300px
    max-width 400px

    .go-cart-btn
        display block
</style>

