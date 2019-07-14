<template>
    <div class="list-controls">
        <div class="view">
            View
            <span class="list-view" v-on:click="$emit('viewChange', 'list')">
                <font-awesome-icon :icon="['fas', 'list']"></font-awesome-icon>
            </span>
            <span class="grid-view" v-on:click="$emit('viewChange', 'grid')">
                <font-awesome-icon :icon="['fas', 'th']"></font-awesome-icon>
            </span>
        </div>

        <div class="sorting">
            Sort by
            <custom-select className="sorting-select" :options="options"></custom-select>
        </div>
    </div>
</template>

<script lang="ts">
    import  Vue  from "vue";
    import {Component} from "vue-property-decorator"
    import CustomSelect from "@/components/CustomSelect/CustomSelect.vue";

    @Component({
        components: {
            "custom-select": CustomSelect
        }
    })
    export default class Sorting extends Vue {
        options: any[] = [{
            value: "rating.lowest",
            title: "Rating: lowers first"
        },{
            value: "rating.highest",
            title: "Rating: highest first"
        }]
    }
</script>

<style lang="stylus">

    @import "../../vars.styl"
    .list-controls
        display flex
        justify-content space-between
    .list-view
    .grid-view
        margin-right 5px
        cursor pointer
</style>
