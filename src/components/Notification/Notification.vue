<template>
    <div v-if="isNotificationShown" class="notification">
        {{message}}
        <u-i-button @click.native="openCartModal" class="go-cart-btn" color="primary">Go to cart</u-i-button>
    </div>
</template>

<script lang="ts">
    import {Component, Vue, Watch} from "vue-property-decorator";
    import {createNamespacedHelpers} from "vuex";
    import UIButton from "@/components/Button/Button.vue";

    const { mapMutations } = createNamespacedHelpers("cartModule/");

    interface INotification {
        deleteFirstNotification: () => void;
    }

    @Component({
        components: {
            UIButton
        },
        methods: {
            ...mapMutations(["deleteFirstNotification"])
        },
    })
    export default class Notification extends Vue implements INotification {
        message: string = "";
        timer: number = 0;
        deleteFirstNotification!: () => void;
        isNotificationShown: boolean = false;

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

        hideNotification(message: string) {
            this.isNotificationShown = false;
            this.deleteFirstNotification();
            clearTimeout(this.timer);

        }

        showNotification() {
            this.isNotificationShown = true;
            this.timer = setTimeout(() => this.hideNotification(this.message), 5000)
        }


        openCartModal() {
            this.$store.commit('toggleModal', true);
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

