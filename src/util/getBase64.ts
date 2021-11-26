const getBase64 = (file : File) =>
  new Promise<any>((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      reject(error);
    };
  });
export default getBase64;
