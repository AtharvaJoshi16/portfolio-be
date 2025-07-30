export const healthCheck = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Health Check: OK`,
    }),
  };
};
