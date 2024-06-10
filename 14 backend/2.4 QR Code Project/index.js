/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import inquirer from "inquirer"; // User interaction
import qr from "qr-image"; // QR code generation
import fs from "fs"; // File system access


inquirer
  .prompt([
    {
      message: "Please enter your link to generate a QR code:",
      name: "URL",
    },
  ])
  .then((answers) => {
    var res = answers.URL;
    const qr_image = qr.image(res, { type: "png" });

    qr_image.pipe(fs.createWriteStream("My_qr_code.png"));

    fs.writeFile("My_URL.txt", res, (err) => {
        if (err) throw err;
        console.log("The file has been saved!");
      });

  })

