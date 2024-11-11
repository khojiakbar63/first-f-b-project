import { createRoot } from "react-dom/client";
import AppRouter  from "./router/index.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(<AppRouter />);
