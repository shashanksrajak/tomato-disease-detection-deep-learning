"use client";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { getTomatoDiseasePrediction } from "@/actions/prediction-action";
import { Zap, Upload, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function TomatoDiseaseForm() {
  const [uiState, setUiState] = useState<"form" | "loading" | "success">(
    "form"
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prediction, setPrediction] = useState<{
    disease: string;
    confidence: number;
  } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    try {
      if (!imagePreview) {
        toast.error("Please select an image first");
        return;
      }

      setUiState("loading");

      const response = await getTomatoDiseasePrediction(formData);

      if (response.error) {
        toast.error(response.message || "Failed to get prediction");
        setUiState("form");
        return;
      }

      setPrediction({
        disease: response.data.class,
        confidence: Math.round(response.data.confidence * 100),
      });

      setUiState("success");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
      setUiState("form");
    }
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    // Check if file is too large (e.g., >5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image is too large. Please select an image less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }

  function resetForm() {
    if (formRef.current) {
      formRef.current.reset();
    }
    setImagePreview(null);
    setPrediction(null);
    setUiState("form");
  }

  return (
    <div className="space-y-8">
      {uiState === "success" ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="w-full md:w-1/2">
              {imagePreview && (
                <div className="relative aspect-square w-full rounded-lg overflow-hidden border-2 border-green-500">
                  <Image
                    src={imagePreview}
                    alt="Uploaded tomato leaf"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  Detected Disease:
                </h3>
                <p className="text-xl font-bold text-green-700">
                  {prediction?.disease}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Confidence:</h3>
                <div className="relative pt-1">
                  <div className="overflow-hidden h-4 mb-2 text-xs flex rounded-full bg-gray-200">
                    <div
                      style={{ width: `${prediction?.confidence || 0}%` }}
                      className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                    ></div>
                  </div>
                  <p className="text-right">
                    {prediction?.confidence?.toFixed(1)}%
                  </p>
                </div>
              </div>

              <Button
                className="w-full mt-4"
                onClick={resetForm}
                variant="outline"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Analyze Another Leaf
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Sample Images Section */}
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h3 className="text-lg font-medium mb-4 text-center">
              Sample Leaf Images
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex flex-col items-center">
                <div className="relative h-40 w-full mb-2">
                  <Image
                    src="/samples/healthy.JPG"
                    alt="Healthy tomato leaf"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <span className="font-medium text-green-600">Healthy</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative h-40 w-full mb-2">
                  <Image
                    src="/samples/late_blight.JPG"
                    alt="Late blight disease"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <span className="font-medium text-amber-600">Late Blight</span>
              </div>

              <div className="flex flex-col items-center">
                <div className="relative h-40 w-full mb-2">
                  <Image
                    src="/samples/mosaic_virus.JPG"
                    alt="Mosaic virus disease"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <span className="font-medium text-red-600">Mosaic Virus</span>
              </div>
            </div>
          </div>

          <form
            action={handleSubmit}
            ref={formRef}
            className="bg-white shadow-md rounded-lg p-6"
          >
            <div className="text-center mb-6">
              <p className="text-muted-foreground mt-2">
                Upload a photo of your tomato plant leaf to detect disease
              </p>
            </div>

            <div className="space-y-6">
              <div
                className="border-dashed border-2 border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-green-500 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />

                {imagePreview ? (
                  <div className="relative aspect-square max-h-80 mx-auto">
                    <Image
                      src={imagePreview}
                      alt="Leaf preview"
                      fill
                      className="object-contain rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="py-12">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="mt-2 font-medium text-sm">
                      Click to upload an image or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, JPEG up to 5MB
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={uiState === "loading" || !imagePreview}
              >
                {uiState === "loading" ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">
                      <RefreshCw className="h-4 w-4" />
                    </span>
                    Analyzing...
                  </span>
                ) : (
                  <>
                    Detect Disease <Zap className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}
