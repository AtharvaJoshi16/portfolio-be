import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import multiparser from "lambda-multipart-parser";
export const uploadResume = async (event: any) => {
  try {
    const s3 = new S3Client({ region: process.env.REGION });
    const parsed = await multiparser.parse(event);
    const file = parsed.files[0];
    if (!file || !file.content || !file.filename) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No file uploaded" }),
      };
    }
    const params = {
      Bucket: process.env.BUCKET,
      Key: process.env.RESUME_KEY,
      Body: file.content,
      ContentType: file.contentType,
    };

    await s3.send(new PutObjectCommand(params));

    return {
      statusCode: 204,
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to upload file" }),
    };
  }
};
