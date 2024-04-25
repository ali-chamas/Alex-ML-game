const fs = require("fs");

const uploadFile = (imageData, path) => {
  const nameArray = imageData.name.split(".");
  const extension = nameArray[nameArray.length - 1];
  const fileName = `file-${new Date().getTime()}.${extension}`;
  fs.writeFileSync(`public/${path}/${fileName}`, imageData.data);
  return fileName;
};
module.exports = uploadFile;
