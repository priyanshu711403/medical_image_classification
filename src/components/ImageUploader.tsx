import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

function ImageUpload({
   imageType,
   onUploadComplete,
   api,
}: {
   imageType: string;
   onUploadComplete: (data: any) => void;
   api: string;
}) {
   const [image, setImage] = useState<File | null>(null);
   const [status, setStatus] = useState<string>("Please select an image to upload.");

   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
         setImage(e.target.files[0]);
      }
   };

   const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
      if (!image) {
         setStatus("Please select an image to upload.");
         return;
      }

      const formData = new FormData();
      formData.append("image", image); // Ensure "image" matches the backend
      formData.append("imageType", imageType);

      try {
         const response = await axios.post(api, formData);
         const resultMessage = response.data; // Assuming the API returns { message: "some result" }
         console.log(resultMessage);
         setStatus("Image uploaded successfully");
         onUploadComplete({ imageType, ...resultMessage });
      } catch (error) {
         // console.log("error after axios");
         const errorMessage = "Failed to upload image.";
         setStatus(errorMessage);
         onUploadComplete({ errorMessage });
         console.error("Error:", error);
      }
   };

   return (
      <div className="border rounded-md p-4">
         <h2 className="pb-3 text-2xl">Upload a {imageType} image</h2>
         <form onSubmit={handleSubmit} className="grid grid-2 gap-4">
            <input
               type="file"
               accept="image/*"
               onChange={handleImageChange}
               className="col-span-1 mx-auto border rounded-lg"
            />
            <p>{status}</p>
            <button type="submit" className="col-span-1 mx-auto px-4 py-2">
               Upload
            </button>
         </form>
      </div>
   );
}

export default ImageUpload;
