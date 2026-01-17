const routeRegistry = new Map<Function, string>();

/**
 * Decorator to set the route path of a TorchPage component
 * @param routeName - name of the route (e.g. "/about", "/users/:id")
 */
function Route(routeName: string) {
  return (construct: Function) => {
    construct.prototype.route = routeName;
    routeRegistry.set(construct, routeName);
  };
}
/**
 * class to hold all routes
 */
class TorchAllRoutes {
  private routesArray: Array<{ path: string; component: Function }> = [];

  /**
   * loads all routes into the internal array
   */
  discoverDecorated(): this {
    this.routesArray = Array.from(routeRegistry.entries()).map(([component, path]) => ({
      path,
      component,
    }));
    return this;
  }

  /**
   * allows for adding custom routes to the internal array
   * @example .register(MyCustomComponent, "/custom")
   */
  register(component: Function, path: string): this {
    this.routesArray.push({ path, component });
    return this;
  }

  /**
   * returns the internal Array
   */
  getRoutes(): Array<{ path: string; component: Function }> {
    return [...this.routesArray];
  }

  /**
   * For convenience - Gives you all in one call
   */
  all(): Array<{ path: string; component: Function }> {
    return this.discoverDecorated().getRoutes();
  }
}

// singleton because better apperantly
const torchRoutes = new TorchAllRoutes();

export {
  Route,
  torchRoutes,
  TorchAllRoutes,
};

