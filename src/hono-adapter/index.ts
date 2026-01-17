import { Hono } from "hono";

function toHono(routes: Array<{ path: string; component: Function }>, hono?: Hono) {
    if (!hono) {
        hono = new Hono()
    }
    for (const i of routes) {
        hono.get(i.path, async (c) => {
            const page = new i.component
            const data = await page.load(c) || {}
            return c.html(page.render(data, c))
        })
    }
    return hono
}

export { toHono }
