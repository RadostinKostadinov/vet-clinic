export default function generateResponseObject(status, message, data) {
  return {
    status,
    message,
    data
  };
}
