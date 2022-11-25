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
  getPostData,
};
