import ReactDOM from "react-dom/client";
import "./index.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";

import StarPage from "./pages/star";
import RectPage from "./pages/rect";
import BaseLayout from "./components/Layouts/BaseLayout";
import AssetPage from "./pages/asset";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/assets",
    element: <AssetPage></AssetPage>,
  },
  {
    path: "/star",
    element: <StarPage></StarPage>,
  },
  {
    path: "/rect",
    element: <RectPage></RectPage>,
  },
]);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BaseLayout>
      <RouterProvider router={router} />
    </BaseLayout>
  </Provider>
);
