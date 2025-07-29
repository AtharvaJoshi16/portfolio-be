import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import dotenv from "dotenv";
dotenv.config();
export const verifyAccessKey = async (event: any) => {
  try {
    const body = JSON.parse(event?.body ?? "{}");
    if (!body?.accessKey)
      throw new Error("Request body parameter {accessKey} is required");
    const ssm = new SSMClient();
    const command = new GetParameterCommand({
      Name: process.env.SECRET_ACCESS_KEY_PATH,
    });
    const response = await ssm.send(command);
    const accessKey = body?.accessKey;
    if (accessKey === response?.Parameter?.Value) {
      return {
        statusCode: 200,
        body: JSON.stringify({ verified: true }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ error: "Invalid access key" }),
      };
    }
  } catch (e: any) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: e?.message ?? "Internal server error" }),
    };
  }
};
