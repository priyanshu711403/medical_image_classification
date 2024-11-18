import { useState, ChangeEvent, FormEvent } from "react";

function ImageUpload({ imageType }: { imageType: string }) {
   const [image, setImage] = useState<File | null>(null);
   const [status, setStatus] = useState<string>("");

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
      formData.append("image", image);

      try {
         const response = await fetch("http://localhost:5000/upload", {
            method: "POST",
            body: formData,
         });

         const result = await response.json();
         setStatus(result.message);
      } catch (error) {
         setStatus("Failed to upload image");
         console.error("Error:", error);
      }
   };

   return (
      <div className="border rounded-md p-4">
         <h2 className="pb-3 text-2xl">Upload a {imageType} image</h2>
         <form onSubmit={handleSubmit} className="grid grid-2 gap-4 ">
            <input
               type="file"
               accept="image/*"
               onChange={handleImageChange}
               className="col-span-1 mx-auto border rounded-lg"
            />
            <button type="submit" className="col-span-1 mx-auto px-4 py-2">
               upload
            </button>
         </form>
         <p>{status}</p>
      </div>
   );
}

export default ImageUpload;
