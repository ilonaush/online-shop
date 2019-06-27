
import express, {Request, Response, NextFunction} from "express";
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const server = express();
const util = require("util");

const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const delay = (time: number) => new Promise((res) => setTimeout(res, time));

server.use(bodyParser.json());

/**
 * handler for cross origin requesting
 * @param req request
 * @param res response
 * @param next next request
 */
const crossOrigin = (req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS");
    res.header("Allow", "PUT, POST, GET, PATCH, DELETE, OPTIONS");
    if (req.method === "OPTIONS") {
        res.status(200).send("OK")
    } else {
        next();
    }
};

const port = 5000;

server.use(crossOrigin);

/**
 * handler for get food request; gives all food
 */
server.get("/food", async (req, res) => {
    try {
        const data = await readDataFromJson("food");
        console.log(data);
        res.send(data);
    } catch (e) {
        res.status(500).send({success: false});
    }
});

server.get("/filters", async (req, res) => {
    try {
        const data = await readDataFromJson("filters");
        console.log(data);
        res.send(data);
    } catch (e) {
        res.status(500).send({success: false});
    }
});

/**
 * handler for post request for adding new worker
 */
server.post("/add-cat", async (req, res) => {
    const cat = req.body;
    try {
        const cats = await readDataFromJson("currentCats");
        cats.push(cat);
        const response = await saveDataToJson(cats, "currentCats");
        if (response) {
            res.send({status: true, cats});
        }
    } catch (e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for patch request for firing a worker
 */
server.patch("/issue-cat", async (req, res) => {
    const {id, address, family, date} = req.body;
    let issuedCat;
    try {
        let cats  = await readDataFromJson("currentCats");

        cats = cats.filter((cat: {id: number}) => {
            if (cat.id === parseInt(id)) {
                issuedCat = {...cat, address, family, date};
            }
            return cat.id !== parseInt(id);
        });

        await saveDataToJson(cats, "currentCats");

        const history = await readDataFromJson("history");
        if (issuedCat) {
            history.push(issuedCat);
        }
        await saveDataToJson(history, "history");
        res.send({status: true, cats});

    } catch(e) {
        res.status(500).send({status: false});
    }
});


/**
 * handler for patch request for changing time of either arriving or leaving of a worker
 */
server.patch("/feed-cat", async  (req, res) => {
    const cat = req.body;
    try {
        let cats = await readDataFromJson("currentCats");
        cats = cats.map((item: {id: number}) => {
            if (item.id === cat.id) {
                return cat;
            } else {
                return item;
            }
        });
        await saveDataToJson(cats, "currentCats");
        res.send({status: true, cats});
    } catch (e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for patch request for changing time of either arriving or leaving of a worker
 */
server.patch("/hug-cat", async (req, res) => {
    const cat = req.body;
    try {
        let cats = await readDataFromJson("currentCats");
        cats = cats.map((item: {id: number}) => {
            if (item.id === cat.id) {
                return cat;
            } else {
                return item;
            }
        });
        await saveDataToJson(cats, "currentCats");
        res.send({status: true, cats});
    } catch (e) {
        res.status(500).send({status: false});
    }
});

/**
 * handler for patch request for changing time of either arriving or leaving of a worker
 */
server.patch("/wash-cat", async function (req, res) {
    const cat = req.body;
    try {
        let cats = await readDataFromJson("currentCats");
        cats = cats.map((item: {id: number}) => {
            if (item.id === cat.id) {
                return cat;
            } else {
                return item;
            }
        });
        await saveDataToJson(cats, "currentCats");
        res.send({status: true, cats});
    } catch (e) {
        res.status(500).send({status: false});
    }
});

server.listen(port,  () => {
    console.log(`listening on port ${port}!`);
});

/**
 * saves modified json file with workers
 * @param data
 * @param type
 * @returns {Promise<boolean>}
 */
async function saveDataToJson(data: any[], type: string) {
    try {
        await writeFile(path.resolve(__dirname, `data/${type}.json`), JSON.stringify(data, null, 4));
        await delay(1000);
        return true;
    } catch (err) {
        throw err;
    }
}

/**
 * gets data from json
 * @param type
 * @returns {Promise<any>}
 */
async function readDataFromJson(type: string) {
    if (!fs.existsSync(path.resolve(__dirname, `data/${type}.json`))) {
        writeFile(path.resolve(__dirname, `data/${type}.json`), "[]")
    }
    try {
        const data = await readFile(path.resolve(__dirname, `data/${type}.json`), {encoding: "utf8", flag: "a+"});
        await delay(1000);
        return JSON.parse(data);
    } catch (err) {
        throw err;
    }
}



