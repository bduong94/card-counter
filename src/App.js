import { HomePage, SummaryPage } from "./pages";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/summary" element={<SummaryPage />}></Route>
    </Routes>
  );
}

export default App;
