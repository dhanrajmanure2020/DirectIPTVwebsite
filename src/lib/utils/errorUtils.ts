export function getErrorMessage(error: any, defaultMessage: string = 'An unknown error occurred'): string {
  if (!error) return defaultMessage;
  if (error.response?.data) {
    const dataError = error.response.data.error;
    if (dataError) {
      if (typeof dataError === 'string') return dataError;
      if (dataError.message) return dataError.message;
      try {
        return JSON.stringify(dataError);
      } catch {
        return String(dataError);
      }
    }
    if (error.response.data.message) return error.response.data.message;
  }
  if (error.message) return error.message;
  return defaultMessage;
}
