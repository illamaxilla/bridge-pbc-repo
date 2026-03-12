import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Global error tracking: unhandled promise rejections
window.addEventListener("unhandledrejection", (event: PromiseRejectionEvent) => {
  console.error(
    "[Unhandled Promise Rejection]",
    event.reason instanceof Error ? event.reason.message : event.reason,
    event.reason instanceof Error ? event.reason.stack : ""
  );
});

// Global error tracking: uncaught errors
window.addEventListener("error", (event: ErrorEvent) => {
  console.error(
    "[Uncaught Error]",
    event.message,
    `at ${event.filename}:${event.lineno}:${event.colno}`,
    event.error?.stack ?? ""
  );
});

createRoot(document.getElementById("root")!).render(<App />);
