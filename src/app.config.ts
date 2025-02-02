import config from "@colyseus/tools";
import { monitor } from "@colyseus/monitor";
import { playground } from "@colyseus/playground";
import express from 'express';
import path from 'path';
import cors from 'cors';

/**
 * Import your Room files
 */
import { DNDRoom } from "./rooms/DNDRoom";

export default config({

  initializeGameServer: (gameServer) => {
    /**
     * Define your room handlers:
     */
    gameServer.define('dnd_room', DNDRoom);

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
    console.log(process.env.NODE_ENV)

    if (process.env.NODE_ENV == "production") {
      app.use(express.static(path.join(__dirname, 'static')));
    }

    if (process.env.NODE_ENV !== "production") {
      app.use(express.static(path.join(__dirname, 'static')));
    }

    /**
     * Use @colyseus/monitor
     * It is recommended to protect this route with a password
     * Read more: https://docs.colyseus.io/tools/monitor/#restrict-access-to-the-panel-using-a-password
     */
    app.use("/colyseus", monitor());
    // app.use(cors())
  },


  beforeListen: () => {
    /**
     * Before before gameServer.listen() is called.
     */
  }
});
