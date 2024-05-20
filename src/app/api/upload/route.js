import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import fs from "node:fs";

// Configurar Cloudinary
cloudinary.config({
  cloud_name: "do8uezira",
  api_key: "553965672227269",
  api_secret: "YFDzf83t3A8F56XJCzd9abifRXM"
});

export async function POST(request) {
  try {
    const data = await request.formData();
    const imagen = data.get("file");

    if (!imagen) {
      return NextResponse.json("No se ha subido ninguna imagen", { status: 400 });
    }

    const bytes = await imagen.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Crear la carpeta tmp si no existe
    const tempDir = path.join(process.cwd(), "tmp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    // Guardar el buffer como un archivo temporal
    const tempFilePath = path.join(tempDir, imagen.name);
    await writeFile(tempFilePath, buffer);

    // Subir el archivo temporal a Cloudinary
    const uploadResult = await cloudinary.uploader.upload(tempFilePath, {
      public_id: path.parse(imagen.name).name
    });

    // Borrar el archivo temporal después de la subida
    await fs.promises.unlink(tempFilePath);

    return NextResponse.json({
      message: "Imagen subida",
      url: uploadResult.secure_url
    }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error al subir la imagen", { status: 500 });
  }
}

export function GET (){
    return NextResponse.json("api okey ")
}