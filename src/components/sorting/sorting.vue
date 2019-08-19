<template>
	<div class="list-controls">
		<div class="view">
			View

			<span class="list-view" v-on:click="$emit('viewChange', 'list')">
				<font-awesome-icon :icon="['fas', 'list']" :class="{'active-view': listView === 'list'}"></font-awesome-icon>
			</span>

			<span class="grid-view" v-on:click="$emit('viewChange', 'grid')">
				<font-awesome-icon :icon="['fas', 'th']" :class="{'active-view': listView === 'grid'}"></font-awesome-icon>
			</span>

		</div>

		<div class="sorting">
			Sort by
			<custom-select className="sorting-select" v-on:change="handleSortTypeChange" :options="options"></custom-select>
		</div>

	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import {Component, Prop} from "vue-property-decorator";
	import CustomSelect from "@/components/custom-select/custom-select.vue";
	import {App} from "@/interfaces";
	import ISelect = App.ISelect;

	@Component({
		components: {
			CustomSelect
		}
	})
	export default class Sorting extends Vue {
		@Prop(String) listView!: string;

		options: ISelect[] = [{
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

		/**
		 * emits sot\rt type change event
		 * @param sortType
		 */
		handleSortTypeChange(sortType: string) {
			this.$emit("sortTypeChange", sortType);
		}
	}
</script>

<style lang="stylus" scoped>

	@import "~@/vars"

	.list-controls
		display flex
		max-width 930px
		justify-content space-between
		align-items center
		margin-left -20px
	.list-view
	.grid-view
		margin-right 5px
		cursor pointer
		svg.active-view
			color $lighten-2
</style>
