import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const downloadResume = async (event: any) => {
  try {
    const s3 = new S3Client({ region: process.env.REGION });
    const command = new GetObjectCommand({
      Bucket: process.env.BUCKET,
      Key: process.env.RESUME_KEY,
      ResponseContentDisposition: `attachment; filename="${process.env.RESUME_FILENAME}"`,
    });
    const url = await getSignedUrl(s3, command, { expiresIn: 120 });
    return {
      statusCode: 200,
      body: JSON.stringify({ url }),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to get file" }),
    };
  }
};
