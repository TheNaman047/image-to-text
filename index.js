// Imports the Google Cloud client library
const vision = require("@google-cloud/vision");
const fs = require("fs");

async function setEndpoint() {

  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs text detection on the image file
  const bucketName = "test-data-pqwknlanx";
  const fileNames = new Array(100)
    .fill("", 0, 100)
    .map((val, index) => `img${index + 303}.jpg`);

  const results = await Promise.all(
    fileNames.map((fileName) =>
      client.textDetection(`gs://${bucketName}/${fileName}`)
    )
  );
  const finalText = results
    .map((result) => result[0].fullTextAnnotation.text.replace(/\n/g, " "))
    .join("\n\n\n");
  fs.writeFileSync("covid_19_project.txt", finalText);
}
setEndpoint();
