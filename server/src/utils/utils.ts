const fs = require('fs');

function writeDataToFile(filename, content) {
  fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
    if (err) {
      console.log(err);
    }
  });
}

function getPostData(req) {
  return new Promise(
    (resolve: (value: unknown) => void, reject: (reason?: any) => void) => {
      try {
        let body = '';

        req.on('data', (chunk) => {
          body += chunk.toString();
        });

        req.on('end', () => {
          resolve(body);
        });
      } catch (error) {
        reject(error);
      }
    }
  );
}

module.exports = {
  writeDataToFile,
  getPostData,
};
