'use strict'
import {Router} from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { v4 } from "https://deno.land/std@0.76.0/uuid/mod.ts";

let cards = [
    {id: v4.generate(), beschreibung: "One"},
    {id: v4.generate(), beschreibung: "Two"}
]

const router = new Router();

router  
    .get("/api/cards", context => context.response.body = cards)
    .get("/api/id", context => context.response.body = v4.generate())
    .post("/api/cards", async context => {
        const newCard = await context.response.body({type: "json"}).value;
        console.log("requestBody: ", newCard);
        cards = [
            ...cards, newCard
        ];
    })

export const apiRoutes = router.routes();