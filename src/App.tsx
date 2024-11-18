import "./App.css";

import ImageUpload from "./components/ImageUploader";
function App() {
   return (
      <div className="flex gap-4">
         <ImageUpload imageType="MRI" />
         <ImageUpload imageType="PET" />
         <ImageUpload imageType="X-RAY" />
      </div>
   );
}

export default App;
