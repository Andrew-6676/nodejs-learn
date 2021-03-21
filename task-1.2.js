import fs from 'fs';
import { pipeline, Transform } from 'stream';
import csv from 'csvtojson';

const csvFilePath = './csv.csv';
const txtFilePath = './txt.txt';

// csv({
//   delimiter: ';',
// }).fromFile(csvFilePath).then((jsonObj) => {
//   const txtData = jsonObj.map((item) => JSON.stringify(item));
//
//   fs.writeFile('txt.txt', txtData.join('\n')+'\n', function (err) {
//     if (err) {
//       return console.log(err);
//     }
//     console.log('Data was saved > txt.txt');
//   });
// });

const myTransform = Transform({
  transform(chunk, encoding, callback) {
    // const result = {};
    // for (entry of Object.entries(JSON.parse(chunk.toString()))) {
    //   result[entry[0].toLowerCase()] = entry[1];
    // }
    // callback(null, JSON.stringify(result) + '\n');
    const result = chunk.toString().replace(/[{,]"([^:]+?)":/g, function (match) {
      return match.toLowerCase();
    });
    callback(null, result);
  },
});

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);

// errHandler = (error) => {
//     console.log(error);
// };
// readStream
//   .on('error', errHandler)
//   .pipe(_csv)
//   .on('error', errHandler)
//   .pipe(myTransform)
//   .on('error', errHandler)
//   .pipe(writeStream)
//   .on('error', errHandler);

pipeline(readStream, csv({ delimiter: ';' }), myTransform, writeStream, (err) => {
  if (err) {
    console.error('Pipeline failed.', err);
  } else {
    console.log('Pipeline succeeded.');
  }
});
