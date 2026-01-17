# torch
a framework

example:
```ts
import { Context, Hono } from 'hono' // import hono
import * as estrogen from "@usetorch/torch" // import torch
const app2 = new Hono() // create hono (yes i know my commenting and naming is very creative)

class Layout implements estrogen.Layout { // create a new layout using torch
    async load() { // this is the load function, its there to get some information everytime the route is accessed, for this use case it will be replaced with a loadOnStart or similar function
        const response = await fetch("https://matcha.mizu.sh/matcha.lite.css")
        const style = await response.text()
        return {
            style
        }
    }
    render(data: any, slot: string, ctx?: Context): string {
        return `
        <style>${data.style}</style>
        ${slot}` // this is where the code that uses the layout will be inserted
    }
}

@estrogen.Route("/") // here you can define a route
@estrogen.useLayout(Layout) // this decorator sets the layout to be used
class HomePage implements estrogen.Page { // creates a new page using torch
    render(data: any, ctx?: Context): string {
        return `<h1>hi</h1>`
    }
}


const app = estrogen.toHono(estrogen.torchRoutes.all(), app2) // creates an array of all routes and turns that into hono routes
export default app

```
