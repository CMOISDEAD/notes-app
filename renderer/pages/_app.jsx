import "../styles/modal.css";
import "../styles/globals.css";
import "../styles/dropdown.css";
import "../styles/markdown.css";
import "../styles/markdown.scss";
import "../styles/contexmenu.css";
import "../styles/popover.css";
import { Provider } from "react-redux";
import { store } from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
