'use strict';
import {Application, Router, renderFileToString} from "./deps.js";

let shoppingList = [
    {id:0, name:"Brot"},
    {id:1, name:"Milch"},
    {id:2, name:"Bananen"}
];

const app = new Application();
const router = new Router();

let counter = 3;

router.get("/", async (ctx) => {
    ctx.response.body = await renderFileToString(Deno.cwd() + "/index.ejs", {
        title:"Einkaufsliste",
        products: shoppingList
    });
});

router.post("/addProduct", async (ctx) => {

    let formContent = await ctx.request.body({type:'form'}).value; // Input vom Formular wird übergeben
    let nameValue = formContent.get("newProductName"); // newProductName wird ausgelesen

    console.log("Ein addProduct post request erhalten für: " + nameValue);

    if(nameValue){
        shoppingList.push(
            {id:counter++, name:nameValue} // Nimmt die nächsthöhere Nummer
        );
    }

    ctx.response.redirect("/"); // Zur Startseite weiterführen
});

router.post("/deleteProduct", async (ctx) => {
    let formContent = await ctx.request.body({type:'form'}).value; // Input vom Formular wird übergeben
    let deleteProduct = formContent.get("deleteProductId"); // deleteProductId wird ausgelesen

    const index = shoppingList.findIndex(function(shoppinglist, index) {
        if(shoppinglist.id == deleteProduct)
            return true;
    });
    
    shoppingList.splice(index, 1);
    
    console.log("Ein deleteProduct post request erhalten für: " + deleteProduct);

    ctx.response.redirect("/"); // Zur Startseite weiterführen
})


router.post("/updateProduct", async (ctx) => {
    let formContent = await ctx.request.body({type:'form'}).value; // Input vom Formular wird übergeben
    let oldProductId = formContent.get("oldProductId"); // oldProductId wird ausgelesen
    let newProductName = formContent.get("newProductName"); // newProductName wird ausgelesen

    console.log("Ein updateProduct post request erhalten für: " + newProductName);

    if(newProductName){
        let newProduct = {id:oldProductId, name:newProductName}
        
        const index = shoppingList.findIndex(function(shoppinglist, index) {
            if(shoppinglist.id == oldProductId)
                return true;
        });
        
        shoppingList.splice(index, 1, newProduct);
        
    }

    ctx.response.redirect("/"); // Zur Startseite weiterführen
})

app.use(router.routes());
app.use(router.allowedMethods());

app.addEventListener('listen', () => {
    console.log("Server läuft");
});

await app.listen({port:8000});