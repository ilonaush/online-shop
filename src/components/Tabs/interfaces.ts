import {Vue} from "vue/types/vue";

export interface ITabsMenuItem extends Vue {
    name: string;
    href: string;
    isActive: boolean;
}
