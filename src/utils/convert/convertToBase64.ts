export const convertToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const base64String = event.target?.result?.toString()?.split(',')[1];
      if (base64String) {
        resolve(base64String);
      } else {
        reject(new Error('Failed to read file as Base64.'));
      }
    };

    reader.readAsDataURL(file);
  });
};
