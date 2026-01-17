import type { Context } from "hono";
import type { Layout } from "./TorchLayout";
/**
 * Interface for a Torch Page
 */
interface TorchPage {
	route?: string;
    layout?: Layout
	load?(ctx: Context): Promise<any> | any;
	render(data: any, ctx?: Context): string;
}

export type {
    TorchPage as Page
}
