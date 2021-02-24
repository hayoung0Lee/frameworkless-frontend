const rrouter = () => {
  const routes = [];
  let notFound = () => {};

  const router = {};

  const checkRoutes = () => {
    const currentRoute = routes.find((route) => {
      return route.fragment === window.location.hash;
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    currentRoute.component();
  };

  router.addRoute = (fragment, component) => {
    console.log("add route", fragment);
    routes.push({
      fragment,
      component,
    });

    return router;
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  router.start = () => {
    window.addEventListener("hashchange", checkRoutes);
    console.log(window.location.hash);
    if (!window.location.hash) {
      window.location.hash = `#/`;
    }

    checkRoutes();
  };

  return router;
};

export default rrouter;
