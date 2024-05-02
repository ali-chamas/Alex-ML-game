const fs = require("fs");
const path = require("path");

const getAvatars = () => {
  try {
    const files = fs.readdirSync("public/avatars");

    const avatarFiles = files.filter((file) =>
      [".jpg", ".jpeg", ".png", ".gif"].includes(
        path.extname(file).toLowerCase()
      )
    );

    const avatars = avatarFiles.map((file) => `/avatars/${file}`);

    res.status(200).json(avatars);
  } catch (error) {
    console.log(error);
    res.status(500).json({ messae: "no avatars found" });
  }
};
module.exports = getAvatars;
