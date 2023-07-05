export const formatJSONResponse = (
  response: Record<string, unknown> = {},
  statusCode = 200,
) => ({
  statusCode,
  body: JSON.stringify(response),
});
