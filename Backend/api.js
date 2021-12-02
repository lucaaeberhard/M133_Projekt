'use strict'
import {Router} from "https://deno.land/x/oak@v6.3.1/mod.ts";
import { v4 } from "https://deno.land/std@0.76.0/uuid/mod.ts";

let cards = [
    {id: v4.generate(), beschreibung: "One"},
    {id: v4.generate(), beschreibung: "Two"}
]

const router = new Router();

router  
    .get("/api/cards", context => context.response.body = cards);

export const apiRoutes = router.routes();