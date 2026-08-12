/**
 * Smoke-test entry. Renders the whole app to a string so component-body
 * runtime errors surface in CI rather than in a browser console.
 */
import { renderToString } from "react-dom/server";

import App from "../src/App.jsx";

export function render() {
  return renderToString(<App />);
}
