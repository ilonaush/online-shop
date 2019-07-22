
const products = require("./data/items.json");
const reviews = require("./data/reviews.json");
const sqlite3 = require("sqlite3").verbose();


let db: any;

function createDb() {
    db = new sqlite3.Database("./server/db/products.db");
}

function createTable(data: any, tableName: string, columns: string[], primaryKeys: string[]) {
    console.log(tableName);
    db.run(`CREATE TABLE IF NOT EXISTS ${tableName} (${columns})`, () => insertRows(data, tableName, columns));
}

function insertRows(data: any, tableName: string, columns: string[]) {
    console.log(tableName);

    const stmt = db.prepare(`INSERT INTO '${tableName}' (${columns}) VALUES(${columns.map(() => "?")})`);
    for (const item of data) {
        const columnData = [];
        for (const column of columns) {
            let columnItemData = item[column];
            columnData.push(columnItemData);
        }
        stmt.run(...columnData);
    }
    stmt.finalize();
}

function closeDb() {
    db.close();
}



function initDB() {
    createDb();
    createTable(products.items, "products", ["id", "name", "category", "colors", "sizes", "price", "description", "remnants", "images", "rating", "oldPrice"], ["id"]);
    createTable([{flowerName: "lilies"}, {flowerName: "daisies" }, {flowerName: "roses" }, {flowerName: "tulips" }], "flowers", ["flowerName"], ["flowerName"]);
    createTable([
        {flowerName: "lilies", productId: 1 },
        {flowerName: "daisies", productId: 2 },
        {flowerName: "roses", productId: 3 },
        {flowerName: "tulips", productId: 4 },
        {flowerName: "tulips", productId: 5 },
        {flowerName: "tulips", productId: 6 },
        {flowerName: "tulips", productId: 7 },
        {flowerName: "roses", productId: 7 }
        ], "productsFlowers", ["flowerName", "productId"], ["flowerName", "productId"] );
    createTable(reviews.reviews, "reviews", ["productId", "id", "reviewerName", "reviewText", "advantages", "disadvantages", "mark"], ["productId", "id"]);
    closeDb();
}

initDB();