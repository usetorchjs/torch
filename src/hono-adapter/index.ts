import { Hono } from "hono";
import type { Layout } from "../classes/TorchLayout";
import type { Page } from "../classes";

function toHono(routes: Array<{ path: string; component: any; layout?: any }>, hono = new Hono()) {
  for (const route of routes) {
    hono.get(route.path, async (c) => {
      const page = new route.component();
      const pageData = await page.load?.(c) || {};
      let html = page.render(pageData, c);

      // Check if route has layout
      if (route.layout) {
        const layout = new route.layout();
        const layoutData = await layout.load?.(c) || {};
        html = layout.render(layoutData, html, c);
      }

      return c.html(html);
    });
  }

  return hono;
}

export { toHono };
