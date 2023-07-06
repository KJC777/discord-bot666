const sqlite3 = require("sqlite3").verbose();
const path = require("node:path");
const fs = require("node:fs");

function ValidateDbExists() {
    return fs.existsSync(path.join(__dirname, "mock.db"));
}

function OpenConnection() {
    return new sqlite3.Database(
        path.join(__dirname, "mock.db"),
        sqlite3.OPEN_READWRITE,
        (error) => {
            if (error) {
                return console.error(error);
            }
        },
    );
}

function MigrateJSON() {
    if (!fs.existsSync("players.json")) {
        return console.log("players.json not found, nothing to migrate!");
    }
    const DataToMigrate = fs.readFileSync("players.json");
    const PlayerList = JSON.parse(DataToMigrate);
    const db = OpenConnection();
    for (let i = 0; i < PlayerList.length; i++) {
        const { id, money } = PlayerList[i];
        db.serialize(() => {
            /*
            TODO:
            你還記得我們怎樣才能把資料 INSERT 進資料表嗎？
            完成下面的 INSERT 指令吧！
            */
            let sql = `
            INSERT INTO players(id, money)
            VALUES("${id}", ${money});
            `;
            db.exec(sql, (error) => {
                if (error) console.error(error);
            });
        });
    }
    db.close();
    fs.renameSync("players.json", "ARCHIVED_players.json");
    console.log("Migration completed");
}

function InitDb() {
    return new Promise((resolve) => {
        const db = OpenConnection();
        /*
        TODO:
        我們的資料表需要什麽欄位呢 🤔 (提示: 看看 players.json)
        填 CREATE TABLE 裏面的東西就可以了 ( eg: Name TEXT Primary Key ) 這個只是例子哦
        */
        let sql = `
        CREATE TABLE IF NOT EXISTS players(
            PlayerId TEXT PRIMARY KEY,
            money INT,
            pet_hungry INT,
            pet_fatigue INT,
            age INT,
            foods INT
        );
        `;
        db.serialize(() => {
            db.exec(sql, (error) => {
                db.close();
                if (error) {
                    console.error(error);
                    return resolve(false);
                }
                console.log("DB initialized");
                MigrateJSON();
                return resolve(true);
            });
        });
    });
}


function AddPlayer(PlayerId, money, pet_hungry, pet_fatigue, age, foods){
    return new Promise((resolve) => {
        const db = OpenConnection();
        /*
        TODO:
        應該還記得怎樣 INSERT 資料進去吧 🥺
        */
        let sql = `
        INSERT INTO players(PlayerId, money, pet_hungry, pet_fatigue, age, foods)
        VALUES("${PlayerId}", ${money}, ${pet_hungry}, ${pet_fatigue}, ${age}, ${foods});
        `
        db.exec(sql, (error) => {
            if (error){
                console.error(error);
                return resolve(false);
            }
            return resolve(true);
        })
    })
}


function ListPlayers() {
    return new Promise((resolve) => {
        const db = OpenConnection();
        let sql = `
        SELECT * FROM players;
        `;
        db.all(sql, (error, Results) => {
            db.close();
            if (error) {
                console.error(error);
                return resolve(false);
            }
            return resolve(Results);
        });
    });
}

function SearchPlayer(PlayerId) {
    return new Promise((resolve) => {
        const db = OpenConnection();
        let sql = `
        SELECT * FROM players
        WHERE PlayerId = ${PlayerId};
        `;
        db.all(sql, (error, Results) => {
            db.close();
            if (error) {
                console.error(error);
                return resolve(false);
            }
            return resolve(Results);
        });
    });
}

function PlayerData(PlayerId, type) {
    return new Promise((resolve) => {
        const db = OpenConnection();
        let sql = `SELECT ${type} FROM players WHERE ` + `PlayerId = ${PlayerId};`;
        db.all(sql, (error, Results) => {
            db.close();
            if (error) {
                console.error(error);
                return resolve(false);
            }
            return resolve(Results[0][type]);
        });
    });
}

function UpdatePlayer(PlayerId, type, value) {
    return new Promise((resolve) => {
        const db = OpenConnection();
        /*
        TODO:
        怎樣才能 UPDATE 一個記錄 🤔
        */
        let sql = "UPDATE players SET " + type + ` = ${value} WHERE PlayerId = ${PlayerId};`;
        db.exec(sql, (error) => {
            if (error) {
                console.error(error);
                return resolve(false);
            }
            return resolve(true);
        });
    });
}

module.exports = {
    ValidateDbExists: ValidateDbExists,
    InitDb: InitDb,
    AddPlayer: AddPlayer,
    ListPlayers: ListPlayers,
    SearchPlayer: SearchPlayer,
    UpdatePlayer: UpdatePlayer,
    PlayerData: PlayerData,
};
