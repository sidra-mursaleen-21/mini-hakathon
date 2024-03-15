import { ChakraProvider } from "@chakra-ui/react";
import Router from "./config/router";
import "./index.css";
import theme from "./theme";

function App() {
  return (
    <>
      <ChakraProvider theme={theme}>
        <Router />
      </ChakraProvider>
    </>
  );
}

export default App;
