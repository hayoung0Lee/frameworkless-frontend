const ROUTE_PARAMETER_REGEXP = /:(\w+)/g;
const URL_FRAGMENT_REGEXP = "([^\\/]+)";

const rrouter = () => {
  const routes = [];
  let notFound = () => {};

  const router = {};

  const extractUrlParams = (route, windowHash) => {
    if (route.params.length === 0) {
      return {};
    }
    const params = {};

    const matches = windowHash.match(route.testRegExp);

    matches.shift();

    matches.forEach((paramValue, index) => {
      const paramName = route.params[index];
      params[paramName] = paramValue;
    });

    return params;
  };

  const checkRoutes = () => {
    const { hash } = window.location;
    const currentRoute = routes.find((route) => {
      const { testRegExp } = route;

      return testRegExp.test(hash);
    });

    if (!currentRoute) {
      notFound();
      return;
    }

    const urlParams = extractUrlParams(currentRoute, window.location.hash);

    currentRoute.component(urlParams);
  };

  router.addRoute = (fragment, component) => {
    const params = [];

    const parsedFragment = fragment.replace(
      ROUTE_PARAMETER_REGEXP,
      (match, paramName) => {
        params.push(paramName);
        return URL_FRAGMENT_REGEXP;
      }
    );

    routes.push({
      testRegExp: new RegExp(`^${parsedFragment}$`),
      component,
      params,
    });

    return router;
  };

  router.setNotFound = (cb) => {
    notFound = cb;
    return router;
  };

  router.navigate = (fragment) => {
    window.location.hash = fragment;
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
