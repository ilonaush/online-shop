<template>
	<div class="tabs">
		<div>
			<ul class="tabs-menu">
				<li v-for="tab in tabs" :class="{ 'is-active': tab.isActive }">
					<a :href="tab.href" @click="selectTab(tab.href)">{{ tab.name }}</a>
				</li>
			</ul>
		</div>
		<div class="tabs-details">
			<slot></slot>
		</div>
	</div>
</template>

<script lang="ts">
	import {Component, Vue, Watch} from "vue-property-decorator";
	import {Tabs as TabsService} from "@/interfaces";
	import ITabsMenuItem = TabsService.ITabsMenuItem;

	@Component
	export default class Tabs extends Vue {
		tabs: Vue[] = [];

		mounted() {
			this.selectTab(window.location.hash);
		}

		created() {
			this.tabs = this.$children;
		}

		@Watch("$route")
		/**
		 * update tab on route change
		 */
		updateTabs() {
			this.selectTab(window.location.hash);
		}

		/**
		 * handles selecting tab
		 * @param selectedHref
		 */
		selectTab(selectedHref: string) {
			if (!selectedHref) {
				selectedHref = "#";
			}
			this.tabs.forEach((tab: any) => {
				tab["isActive"] = (tab.href === selectedHref);
			});

			if (!this.tabs.find((tab: any) => tab["isActive"])) {
				this.setDefaultTab();
			}

		}

		/**
		 * sets default tab
		 */
		setDefaultTab() {
			this.tabs.forEach((tab: any) => {
				if (tab["defaultSelected"]) {
					tab.isActive = true;
				}
			})
		}
	}
</script>

<style lang="stylus" scoped>
	.tabs-menu
		margin 10px 0
		padding 10px
		background-color whitesmoke
		li
			display inline
			padding-right 10px

</style>

