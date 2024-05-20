"use client";

import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload file");
      }

      const data = await response.json();
      setSuccess("File uploaded successfully");
      console.log(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
          />
          <button type="submit">Enviar</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}
      </div>
      {/* biome-ignore lint/a11y/useAltText: <explanation> */}
      <img src="https://res.cloudinary.com/do8uezira/image/upload/v1716168170/Imagen%20de%20WhatsApp%202024-04-26%20a%20las%2020.34.01_f4bfbc3b.jpg"/>
</main>
  );
}
