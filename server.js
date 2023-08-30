const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const path = require("path");
const app = express();
const port = 3000;
const { mergePDF } = require("./merge");
const { Console } = require("console");
app.use("/static", express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "templates/index.html"));
});
console.log("yes");

app.post(
  "/merge",
  upload.fields([
    { name: "pdf1", maxCount: 1 },
    { name: "pdf2", maxCount: 1 },
  ]),
  async (req, res, next) => {
    console.log("eys");
    const uploadedFiles = req.files["pdf1"];
    const uploadedFiles2 = req.files["pdf2"];

    const fileInfos = [];
    if (uploadedFiles && uploadedFiles.length > 0) {
      if (uploadedFiles2 && uploadedFiles2.length > 0) {
        const uploadedFiles2 = req.files["pdf2"];
        let d = await mergePDF(
          path.join(__dirname, uploadedFiles[0].path),
          path.join(__dirname, uploadedFiles2[0].path)
        );
        res.redirect(`http://localhost:3000/static/${d}.pdf`);
      } else {
        res.status(400).send("2nd files not uploaded.");
      }
    } else {
      res.status(400).send("1st files not uploaded.");
    }
  }
);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
