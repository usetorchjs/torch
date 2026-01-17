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
	hydrate?(): void;
	meta?(data: any): { title?: string; description?: string };
}

export type {
    TorchPage as Page
}
