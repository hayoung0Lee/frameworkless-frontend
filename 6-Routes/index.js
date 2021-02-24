import createRouter from "./router";
import createPages from "./pages";

const container = document.querySelector("main");

const pages = createPages(container);

const router = createRouter();

router
  .addRoute("#/", pages.home)
  .addRoute("#/list", pages.list)
  .setNotFound(pages.notFound)
  .start();
