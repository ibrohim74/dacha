export function splitImagePaths(longString) {
  const imageLines = longString.split(/\r?\n/);

  // console.log("image lines", imageLines);

  //   const validExtensions = /^(?:\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;

  //   const imagePaths = [];
  //   for (const line of imageLines) {
  //     if (validExtensions.test(line)) {
  //       const imagePath = line;
  //       imagePaths.push(imagePath);
  //     }
  //   }

  return imageLines;
}
