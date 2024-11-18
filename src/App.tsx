import { useState } from "react";
import "./App.css";
import ImageUpload from "./components/ImageUploader";

function App() {
   const [results, setResults] = useState<{ [key: string]: any }>({});

   const handleResult = (data: { [key: string]: any }) => {
      console.log("Received data:", data);
      console.log(data);
      setResults({ ...data }); // Spread to merge keys from the incoming object
      console.log("Updated results:", results);
   };

   return (
      <div>
         <div className="flex gap-4 mx-auto -mt-20">
            <ImageUpload imageType="MRI" onUploadComplete={handleResult} api="http://localhost:3000/upload" />
            <ImageUpload imageType="PET" onUploadComplete={handleResult} api="http://localhost:3000/upload" />
            <ImageUpload imageType="X-RAY" onUploadComplete={handleResult} api="http://localhost:3000/upload" />
         </div>
         <div className="items-start mt-6 border-t pt-4 text-left">
            <h2 className="text-xl font-bold">Results</h2>
            {Object.entries(results).map(([key, value]) => (
               <p key={key}>
                  <strong>{key}:</strong> {value}
               </p>
            ))}
         </div>
      </div>
   );
}

export default App;
