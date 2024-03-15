import { ChakraProvider } from "@chakra-ui/react";
import Router from "./config/router";

function App() {
  return (
    <>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </>
  );
}

export default App;
