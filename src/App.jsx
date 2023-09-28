import { QueryClient, QueryClientProvider } from "react-query";
import "./App.css";
import UserForm from "./components/user-form";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <UserForm />
      </div>
    </QueryClientProvider>
  );
}

export default App;
