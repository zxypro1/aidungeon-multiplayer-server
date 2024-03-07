"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tools_1 = __importDefault(require("@colyseus/tools"));
const monitor_1 = require("@colyseus/monitor");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
/**
 * Import your Room files
 */
const DNDRoom_1 = require("./rooms/DNDRoom");
exports.default = (0, tools_1.default)({
    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('dnd_room', DNDRoom_1.DNDRoom);
    },
    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         * Read more: https://expressjs.com/en/starter/basic-routing.html
         */
        app.get("/hello_world", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });
        /**
         * Use @colyseus/playground
         * (It is not recommended to expose this route in a production environment)
         */
        // Use index.html in /static
        console.log(process.env.NODE_ENV);
        if (process.env.NODE_ENV == "production") {
            app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
        }
        if (process.env.NODE_ENV !== "production") {
            app.use(express_1.default.static(path_1.default.join(__dirname, 'static')));
        }
        /**
         * Use @colyseus/monitor
         * It is recommended to protect this route with a password
         * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
         */
        app.use("/colyseus", (0, monitor_1.monitor)());
        // app.use(cors())
    },
    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
