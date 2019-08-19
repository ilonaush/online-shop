<template>
	<div class="product-page">
		<tabs>
			<tab className="product-tab" name="Info" :defaultSelected="true">
				<div class="images-holder">
					<div class="images-thumbnails">
						<div class="image-thumbnail"
							 v-for="(image, index) in product.images || []"
							 @click="setSelectedImage(index)">
							<img :src="image" alt="">
						</div>
					</div>
					<div class="selected-image">
						<img :src="selectedImage" alt="">
					</div>
				</div>
				<div class="product-info-holder">
					<div class="product-details">
						<div class="product_name"> {{product.name}}</div>
						<div class="product_price-section">
							<span :class="{'product_price': true, sale: product.oldPrice}">
							{{((product.price) || 0).toFixed(2)}} $
							</span>
							<span v-if="product.oldPrice" class="product_oldPrice">
								{{((product.oldPrice) || 0).toFixed(2)}} $
							</span>
						</div>

						<div class="product_color-section">
							<div class="title">Color</div>
							<div class="colors">
								<div
									:class="['color', ...(selectedColor === color ? ['selected-color'] : [''])]"
									 v-for="color in product.colors"
									 :style="{backgroundColor: color}"
									 v-on:click="setSelectedColor(color)">
								</div>
							</div>
						</div>

						<div class="product_size-section">
							Size
							<div class="sizes-holder">
								<custom-select className="sizes" :options="availableSizes" v-on:change="setSelectedSize"/>
							</div>
						</div>

						<div class="product_flower-section">
							Flower
							<div class="flower-holder">
								<custom-radiobutton
									v-model="selectedFlower"
									v-for="flower in product.availableFlowerType"
									:key="flower"
									name="flower"
									:label="flower"
									:value="flower"
									:checked="flower === selectedFlower"
								/>
							</div>
						</div>
						<v-button color="primary" v-on:click="handleAddToCart">Add to cart</v-button>

						<div class="stars">
							<star-rating :starQuantity="averageMark"/>
							(<router-link to="#reviews">{{reviews.length}} {{'review' | pluralize(reviews.length)}}</router-link>)
						</div>
					</div>
				</div>
			</tab>

			<tab name="Reviews">
				<div class="product-info">
					<reviews :reviews="reviews" :productId="product.id" v-on:reviewAdd="getReviews"/>
				</div>
			</tab>

		</tabs>

		<div class="other-products">
			<h4>OTHER PRODUCTS IN THE SAME CATEGORY</h4>
			<product-list
				:products="$store.state['productsModule'].products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4)"/>
		</div>

	</div>
</template>

<script lang="ts">
	import Vue from "vue";
	import {createNamespacedHelpers} from "vuex";
	import {Component, Watch} from "vue-property-decorator";

	import {App, Cart, Product} from "@/interfaces";
	import RequestService from "../services/RequestService";

	import VButton from "@/components/v-button/v-button.vue";
	import Tabs from "@/components/tabs/tabs.vue";
	import Tab from "@/components/tabs/tab.vue";
	import StarRating from "@/components/star-rating/star-rating.vue";
	import Reviews from "@/components/reviews/reviews.vue";
	import ProductList from "@/components/product-list/product-list.vue";
	import CustomSelect from "@/components/custom-select/custom-select.vue";
	import CustomRadiobutton from "@/components/custom-radiobutton/custom-radiobutton.vue";

	import IReview = Product.IReview;
	import IProduct = Product.IProduct;

	const {mapActions: mapCartActions} = createNamespacedHelpers("cartModule/");

	@Component({
		components: {
			ProductList,
			Reviews,
			StarRating,
			VButton,
			Tabs,
			Tab,
			CustomRadiobutton,
			CustomSelect
		},
		methods: {
			...mapCartActions(["checkItemExistenceInCart"])
		}
	})
	export default class ProductPage extends Vue {
		selectedImage: string = "";
		selectedColor: string = "";
		selectedSize: string = "";
		selectedFlower: string = "";
		checkItemExistenceInCart!: (item: Omit<Cart.ICartItem, "quantity">) => void;
		availableSizes: App.ISelect[] = [];
		reviews: IReview[] = [];
		averageMark: number = 0;

		get product(): IProduct {
			return this.$store.state["productsModule"].products.find((product: IProduct) => {
				return product.id === +this.$route.params["product"];
			}) || {};
		}

		@Watch("product", {immediate: true})
		/**
		 * sets initial product values
		 */
		setInitialProductValues(product: IProduct) {
			if (Object.keys(product).length) {
				this.availableSizes = product.sizes.map((size) => ({title: size, value: size}));
				this.selectedImage = product.images[0];
				this.selectedColor = product.colors[0];
				this.selectedSize = product.sizes[0];
				this.selectedFlower = product.availableFlowerType[0];
				this.getReviews();
			}
		}

		/**
		 * get reviews for the product
		 */
		async getReviews() {
			const {data} = await RequestService.instance.get("/reviews", {productId: this.product.id});
			this.reviews = data.reviews;
			this.averageMark = data.averageMark;
		}

		/**
		 * adds item to the cart
		 */
		handleAddToCart() {
			this.checkItemExistenceInCart({
				id: `${this.product.id}-${this.selectedColor}-${this.selectedFlower}-${this.selectedSize}`,
				name: this.product.name,
				price: this.product.price,
				img: this.product.images[0],
				color: this.selectedColor,
				size: this.selectedSize,
				flower: this.selectedFlower
			});
		}

		/**
		 * set selected image
		 */
		setSelectedImage(index: number) {
			this.selectedImage = this.product.images[index];
		}

		/**
		 * set selected color
		 */
		setSelectedColor(color: string) {
			this.selectedColor = color;
		}

		/**
		 * sets selected size
		 * @param size
		 */
		setSelectedSize(size: string) {
			this.selectedSize = size;
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~@/vars";

	.product-page
		padding $page-padding
		.product-list
			max-width 1100px
			margin 0 auto
			.product-card-holder
				width 24%

	.product_name
		margin-top 30px
		font-weight 500
		text-transform uppercase
		font-size 26px

	.product-tab
		display flex

	.images-holder
		display flex
		height 700px
		width 660px
		.image-thumbnail
			background-color $milk
			width 80px
			height 80px
			text-align center
			margin-bottom 10px
			img
				width 100%
				object-fit cover
		.selected-image
			background-color $milk
			margin-left 20px

	.product-info-holder
		padding 0 30px

	.product_color-section
		margin 20px 0
		.colors
			display flex
			.color
				width 30px
				cursor pointer
				height 30px
				border-radius 50%
				margin 5px 10px
				margin-left 0
				&.selected-color
					border 1px solid black

	.product_flower-section
		margin 20px 0
		.flower-holder
			display flex
			.input-holder
				margin 5px
				&:first-child
					margin-left 0


</style>
