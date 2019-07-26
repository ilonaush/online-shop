"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var bodyParser = require("body-parser");
var fs = require("fs");
var path = require("path");
var server = express_1["default"]();
var util = require("util");
// const sqlite3 = require("sqlite3").verbose();
var readFile = util.promisify(fs.readFile);
var writeFile = util.promisify(fs.writeFile);
var delay = function (time) { return new Promise(function (res) { return setTimeout(res, time); }); };
server.use(bodyParser.json());
/**
 * handler for cross origin requesting
 * @param req request
 * @param res response
 * @param next next request
 */
var crossOrigin = function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.header("Allow", "PUT, POST, GET, PATCH, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.status(200).send("OK");
    }
    else {
        next();
    }
};
var port = 5000;
server.use(crossOrigin);
/**
 * handler for get food request; gives all food
 */
server.get("/", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, readDataFromJson("items")];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                res.status(500).send({ success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.get("/filters", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var data, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, readDataFromJson("filters")];
            case 1:
                data = _a.sent();
                res.send(data);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.status(500).send({ success: false });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.get("/reviews", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var productId, reviews, averageMark, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productId = req.query.productId;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, readDataFromJson("reviews")];
            case 2:
                reviews = _a.sent();
                console.log(reviews.length);
                reviews = reviews.filter(function (review) { return review.productId === +productId; });
                averageMark = (reviews.reduce(function (currentReview, nextReview) {
                    console.log(currentReview);
                    return (currentReview || {}).mark || 0 + nextReview.mark;
                }, 0) / reviews.length).toFixed(0);
                console.log(averageMark);
                res.send({ reviews: reviews, averageMark: averageMark });
                return [3 /*break*/, 4];
            case 3:
                e_3 = _a.sent();
                console.log(e_3);
                res.status(500).send({ success: false });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
/**
 * handler for post request for adding new worker
 */
server.post("/add-review", function (req, res) { return __awaiter(_this, void 0, void 0, function () {
    var review, reviews, response, e_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                review = req.body;
                console.log(review);
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, readDataFromJson("reviews")];
            case 2:
                reviews = _a.sent();
                reviews.push(review);
                return [4 /*yield*/, saveDataToJson(reviews, "reviews")];
            case 3:
                response = _a.sent();
                if (response) {
                    res.send({ status: true, reviews: reviews });
                }
                return [3 /*break*/, 5];
            case 4:
                e_4 = _a.sent();
                res.status(500).send({ status: false });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
server.listen(port, function () {
    console.log("listening on port " + port + "!");
});
/**
 * saves modified json file with workers
 * @param data
 * @param type
 * @returns {Promise<boolean>}
 */
function saveDataToJson(data, type) {
    return __awaiter(this, void 0, void 0, function () {
        var err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, writeFile(path.resolve(__dirname, "data/" + type + ".json"), JSON.stringify(data, null, 4))];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, delay(1000)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    err_1 = _a.sent();
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * gets data from json
 * @param type
 * @returns {Promise<any>}
 */
function readDataFromJson(type) {
    return __awaiter(this, void 0, void 0, function () {
        var data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!fs.existsSync(path.resolve(__dirname, "data/" + type + ".json"))) {
                        writeFile(path.resolve(__dirname, "data/" + type + ".json"), "[]");
                    }
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, readFile(path.resolve(__dirname, "data/" + type + ".json"), { encoding: "utf8", flag: "a+" })];
                case 2:
                    data = _a.sent();
                    return [4 /*yield*/, delay(1000)];
                case 3:
                    _a.sent();
                    return [2 /*return*/, JSON.parse(data)];
                case 4:
                    err_2 = _a.sent();
                    throw err_2;
                case 5: return [2 /*return*/];
            }
        });
    });
}
