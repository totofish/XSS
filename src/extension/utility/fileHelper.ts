import { Base64 } from 'js-base64';

export default function fileHelper<T>(acceptedFiles: Array<File>): Promise<T> {
  return new Promise((resolve, reject) => {
    const file = acceptedFiles[0];
    if (file && /.json$/i.test(file.name)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result !== 'string') return;
        const importData = Base64.decode(reader.result.replace('data:application/json;base64,', ''));
        try {
          resolve(JSON.parse(importData));
        } catch (e) {
          reject(e);
        }
      };
      reader.readAsDataURL(file);
    }
  });
}
