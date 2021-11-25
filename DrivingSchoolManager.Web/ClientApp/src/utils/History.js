import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

export const history = createBrowserHistory({ forceRefresh: true });

export default class History extends BrowserRouter {
  history;
}
