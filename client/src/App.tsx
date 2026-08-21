import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { useBootstrapAuth } from "./features/auth/BootstrapAuth";
import { Toaster } from "@/components/ui/sonner";


 function App(){
    useBootstrapAuth();
   return (
     <>
       <RouterProvider router = {router}/>
       <Toaster />
     </>
   );
      
 }

 export default App;