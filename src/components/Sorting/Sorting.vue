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
            <custom-select className="sorting-select" v-on:change="handleSortTypeChange" :options="options"></custom-select>
        </div>
    </div>
</template>

<script lang="ts">
    import  Vue  from "vue";
    import {Component} from "vue-property-decorator"
    import CustomSelect from "@/components/CustomSelect/CustomSelect.vue";
    import {Catalogue} from "../../interfaces";
    import ISorting = Catalogue.ISorting;

    @Component({
        components: {
            "custom-select": CustomSelect
        }
    })
    export default class Sorting extends Vue {
        options: ISorting[] = [{
            value: "rating.lowest",
            title: "Rating: lowers first"
        },
        {
            value: "rating.highest",
            title: "Rating: highest first"
        },
        {
            value: "price.highest",
            title: "Price: highest first"
        },
        {
            value: "price.lowest",
            title: "Price: lowest first"
        }];

        handleSortTypeChange(sortType: string) {
            this.$emit('sortTypeChange', sortType)
        }
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
