import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

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
      formData.append("file", image); // Ensure "file" matches the backend
      formData.append("imageType", imageType);

      try {
         const response = await axios.post(api, formData, {
            headers: {
               "Content-Type": "multipart/form-data", // Ensure this is set correctly
            },
         });

         const resultMessage = response.data; // Assuming the API returns { message: "some result" }
         console.log(resultMessage);
         setStatus("Image uploaded successfully");
         onUploadComplete({ imageType, ...resultMessage });
      } catch (error) {
         const errorMessage = "Failed to upload image.";
         setStatus(errorMessage);
         onUploadComplete({ errorMessage });
         console.error("Error:", error);
      }
   };

   return (
      <Card className="bg-gray-50">
         <CardHeader>
            <CardTitle>Upload {imageType} Image</CardTitle>
            {/* <CardDescription>Card Description</CardDescription> */}
         </CardHeader>
         <CardContent>
            <form onSubmit={handleSubmit} className="grid grid-2 gap-4">
               <Input
                  id={imageType}
                  type="file"
                  className="border text-blue-600"
                  accept="image/*"
                  onChange={handleImageChange}
               />
               <p className="mt-3">{status}</p>
               <Button type="submit" className="col-span-1 mx-auto px-4 mt-3 py-2 bg-blue-600">
                  Upload
               </Button>
            </form>
         </CardContent>
      </Card>

      // <div className="border rounded-md p-4 border">
      //    <h2 className="pb-3 text-2xl font-semibold">Upload a {imageType} Image</h2>
      //    <form onSubmit={handleSubmit} className="grid grid-2 gap-4">
      //       {/* <label htmlFor={imageType}>{imageType}</label> */}
      //       <Input id={imageType} type="file" className="border text-blue-600" />
      //       <p>{status}</p>
      //       <Button type="submit" className="col-span-1 mx-auto px-4 py-2">
      //          Upload
      //       </Button>
      //    </form>
      // </div>
   );
}

export default ImageUpload;
