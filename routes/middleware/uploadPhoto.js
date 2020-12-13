const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const { AWS_ACCESS_KEY, AWS_SECRET_KEY } = require('../../config');

AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'ap-northeast-2'
});

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: 'ap-northeast-2'
});

const uploadPhoto = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'jjack',
    acl: 'public-read-write',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
      cb(null, Object.assign({}, req.body));
    },
    key: function (req, file, cb) {
      cb(null, file.originalname);
    }
  })
});

const getPhotoUrl = files => files.map(photo => photo.location);

// const deletePhoto = async (urlList) => {
//   const array = urlList.map((url) => {
//     const Key = url.split('/')[url.split('/').length - 1];
//     const params = { Bucket: 'ggot-app-photo-storage', Key };

//     return s3.deleteObject(params).promise();
//   });

//   return Promise.all(array);
// };

module.exports = { uploadPhoto, getPhotoUrl };
