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
         <h1 className="-mt-25 font-semibold text-blue-950">Medical Image Classification</h1>
         <div className="flex gap-4 mx-auto mt-10 ">
            <ImageUpload
               imageType="Brain MRI Scan"
               onUploadComplete={handleResult}
               api="http://127.0.0.1:8000/predict/mri"
            />
            <ImageUpload imageType="Lungs CT Scan" onUploadComplete={handleResult} api="http://127.0.0.1:8000/predict/ct" />
            <ImageUpload
               imageType="Chest X-Ray Image"
               onUploadComplete={handleResult}
               api="http://127.0.0.1:8000/predict/xray"
            />
         </div>
         <div className="items-start mt-6 border-t border-blue-700 pt-4 text-left">
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
