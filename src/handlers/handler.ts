import { GetParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

export const healthCheck = async () => {
  const ssm = new SSMClient();
  const command = new GetParameterCommand({
    Name: process.env.AWS_SECRET_ACCESS_KEY!,
  });
  const response = await ssm.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Health Check: OK`,
      accessKey: response?.Parameter?.Value,
    }),
  };
};
