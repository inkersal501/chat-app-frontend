import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'react-toastify/dist/ReactToastify.css';
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import store from "./redux/store";
import { Provider } from "react-redux";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={2600}
      theme="dark"
      closeButton={false}
      newestOnTop
      pauseOnHover
      toastClassName="convo-toast"
      bodyClassName="convo-toast-body"
      progressClassName="convo-toast-progress"
    />
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)
