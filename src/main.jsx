import { ChakraProvider } from '@chakra-ui/react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Bounce, ToastContainer } from 'react-toastify'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { persister, store } from './app/store'
import './index.css'
import theme from './theme'
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ChakraProvider theme={theme}>
        <App />

        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={"dark"}
          transition={Bounce}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#6B46C1',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#E53E3E',
                secondary: '#fff',
              },
            },
          }}
        />
      </ChakraProvider>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)
