"use server";

export const getTomatoDiseasePrediction = async (formData: FormData) => {
  try {
    const imageFile = formData.get("image") as File;

    if (!imageFile) {
      return {
        error: true,
        message: "No image provided",
      };
    }

    // Create a new FormData object to send to the API
    const apiFormData = new FormData();
    apiFormData.append("file", imageFile);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/predict`, {
      method: "POST",
      body: apiFormData,
    });

    if (!response.ok) {
      return {
        error: true,
        message: "Failed to fetch disease prediction",
      };
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    console.error("Error predicting tomato disease:", error);
    return {
      error: true,
      message: "An error occurred during prediction",
    };
  }
};
