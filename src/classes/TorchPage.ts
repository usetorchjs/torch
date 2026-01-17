import type { Context } from "hono";
/**
 * Interface for a Torch Page
 */
interface TorchPage {
	route?: string;
	load?(ctx: Context): Promise<any> | any;
	render(data: any, ctx?: Context): string;
	hydrate?(): void;
	meta?(data: any): { title?: string; description?: string };
}

export type {
    TorchPage
}
