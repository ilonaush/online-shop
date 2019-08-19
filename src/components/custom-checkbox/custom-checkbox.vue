<template>
	<label class="checkbox-holder">
		<div class="input-holder">
			<input
				type="checkbox"
				:checked="isChecked"
				@change="handleCheckboxChange"
			/>
			<span class="checked"></span>
		</div>
		{{label}}
	</label>
</template>

<script lang="ts">
	import Vue from "vue";
	import {Prop, Component} from "vue-property-decorator";

	@Component({
		model: {
			prop: "checked",
			event: "change"
		},
	})
	export default class CustomCheckbox extends Vue {
		@Prop(String) name!: string;
		@Prop([String, Number]) label!: boolean;
		@Prop(Array) checked!: string[];
		@Prop(String) value!: string;

		get isChecked() {
			return this.checked.includes(this.value);
		}

		/**
		 * handle click on checkbox
		 */
		handleCheckboxChange() {
			const checked = this.checked.slice();
			const found = checked.indexOf(this.value);
			if (found !== -1) {
				checked.splice(found, 1);
			} else {
				checked.push(this.value);
			}
			this.$emit("change", checked);
		}
	}
</script>

<style lang="stylus" scoped>

	@import "~@/vars"

	.checkbox-holder
		display flex
		align-items center
		.input-holder
			position relative
			background-color white
			width 20px
			height 20px
			margin 0
			margin-right 5px
			border 1px solid $lighten-2
			border-radius 5px
			cursor pointer
			-webkit-user-select none
			-moz-user-select none
			-ms-user-select none
			user-select: none
			input
				position: absolute
				opacity: 0
				cursor: pointer
				height: 100%
				width: 100%
				&:checked ~ .checked
					display block
			.checked
				display none
				left 6px
				top 2px
				width 5px
				position absolute
				height 10px
				border solid $lighten-4
				border-width 0 3px 3px 0
				transform rotate(45deg)

</style>
