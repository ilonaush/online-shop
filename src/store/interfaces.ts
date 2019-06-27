interface IStore extends IFiltersModule, IProductsModule{
}

interface IFiltersModule {
    filters: object[];
}

interface IProductsModule {
    foodProducts: object[];
}
