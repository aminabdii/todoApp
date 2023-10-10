import "./App.css";
import AppLayout from "./components/AppLayout/AppLayout";
import { Provider } from "react-redux";
import { store } from "./features/store";

function App() {
  return (
    <Provider store={store}>
      <AppLayout />;
    </Provider>
  );
}

export default App;
