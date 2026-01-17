import { Hono } from "hono";
import type { Layout } from "../classes/TorchLayout";
import type { Page } from "../classes";

function toHono(routes: Array<{ path: string; component: any }>, hono = new Hono()) {
  const pages = routes.map(r => new r.component());
  const layouts = routes.map(r => r.component.layout ? new r.component.layout() : null);

  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const page = pages[i];
    const layout = layouts[i];

    hono.get(route.path, async (c) => {
      if (layout) {

        const layoutData = layout.load?.(c);
        const pageData = page.load?.(c);
        const slot = page.render(pageData, c);
        return c.html(layout.render(layoutData, slot, c));
      } else {
        const data = page.load?.(c);
        console.log(page.render(data, c))
        return c.html(page.render(data, c));
      }
    });
  }

  return hono;
}

export { toHono };
