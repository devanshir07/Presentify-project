import { Toaster } from "react-hot-toast";
import Siderbar from "./siderbar";

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        
        {/* <Navbar/> */}
        <Toaster position="top-center"/>
        {children}
        <Siderbar/>
      </body>
    </html>
  );
}
