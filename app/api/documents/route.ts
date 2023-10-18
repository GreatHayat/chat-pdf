import { writeFile, unlink } from "fs/promises";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { HuggingFaceTransformersEmbeddings } from "langchain/embeddings/hf_transformers";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { supabaseClient } from "@/lib/supabase";

export async function POST(request: NextRequest) {
  const data = await request.formData();
  const file: File | null = data.get("file") as unknown as File;
  const isPrivate: boolean | string = data.get("isPrivate") as string;

  if (!file) {
    return NextResponse.json(
      { error: true, message: "File is required." },
      { status: 400, statusText: "File Not Provided" }
    );
  }

  if (file.type !== "application/pdf") {
    return NextResponse.json(
      {
        error: true,
        message: "Only PDF files are allowed to upload.",
      },
      { status: 400 }
    );
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // With the file data in the buffer, you can do whatever you want with it.
  // For this, we'll just write it to the filesystem in a new location
  const path = `uploads/${file.name}`;
  await writeFile(path, buffer);

  const supabase = createRouteHandlerClient({ cookies });
  const requestedUserId = (await supabase.auth.getUser()).data.user?.id;

  const payload = {
    user_id: requestedUserId,
    file_name: file.name,
    is_private: isPrivate,
  };

  const { data: fileUploadResponse, error } = await supabaseClient
    .from("files")
    .insert(payload)
    .select("id")
    .single();

  if (error) {
    await unlink(path);
    return NextResponse.json(
      { error: true, message: error.message },
      { status: 400 }
    );
  }

  const loader = new PDFLoader(path);
  const docs = await loader.load();

  docs.forEach((doc) => {
    doc.metadata = {
      ...doc.metadata,
      fileId: fileUploadResponse.id,
      userId: requestedUserId,
    };
  });
  const embedding = new HuggingFaceTransformersEmbeddings({
    modelName: "Supabase/gte-small",
  });
  await SupabaseVectorStore.fromDocuments(docs, embedding, {
    client: supabaseClient,
    tableName: "documents",
    queryName: "match_documents",
  });

  // Delete file from path after reading
  await unlink(path);
  return NextResponse.json({
    success: true,
    message: "File Uploaded Successfully",
  });
}
