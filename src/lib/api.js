import axios from "axios";

export const analyzePlant = async (file ,language) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("language", language);

    const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/analyze", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return {
      success: true,
      data: res.data,
    };

  } catch (error) {
    // Server responded with error (4xx / 5xx)
    if (error.response) {
      const status = error.response.status;

      // Client-side issues (bad request, wrong file, not a leaf, etc.)
      if (status >= 400 && status < 500) {
        return {
          success: false,
          type: "client",
          message:
            error.response.data?.message ||
            "Invalid image. Please upload a clear plant leaf image 🌿",
        };
      }

      // Server crash
      if (status >= 500) {
        return {
          success: false,
          type: "server",
          message: "Server error. Please try again later.",
        };
      }
    }

    // No response (network issue)
    return {
      success: false,
      type: "network",
      message: "Network error. Check your connection.",
    };
  }
};
