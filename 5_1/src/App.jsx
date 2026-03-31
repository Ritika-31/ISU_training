import { Suspense } from "react";
import Users from "./Users";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>User Directory</h1>

      <Suspense fallback={<div className="loader">Loading users...</div>}>
        <Users />
      </Suspense>
    </div>
  );
}

export default App;