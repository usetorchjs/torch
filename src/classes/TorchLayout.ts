import type { Context } from "hono";
/**
 * Interface for making a Layout
 */
interface TorchLayout {
    /**
     * Load function for getting data when the Layout gets loaded
     * @param ctx hono context
     */
    load?(ctx: Context): Promise<any> | any;
    /**
     * Render function for rendering the layout
     * @param data data which you return in the load function
     * @param slot this will be the html of the page using this layout
     * @param ctx hono context
     */
    render(data: any, slot: string, ctx?: Context): string;
}

export type {
    TorchLayout as Layout
}
