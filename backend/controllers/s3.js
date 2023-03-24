const aws = require("aws-sdk");
const dotenv = require("dotenv").config();
const crypto = require("crypto");
const util = require("util");

const randomBytes = util.promisify(crypto.randomBytes);

const region = "eu-west-3";
const bucketName = "todonapp-upload-images";
const accessKeyId = process.env.ACCESS_S3_KEY;
const secretAccessKey = process.env.ACCESS_SECRET_KEY_S3;

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

module.exports.generateUploadURL = async () => {
  const rawBytes = await randomBytes(16);
  const key = rawBytes.toString("hex");
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const uploadURL = await s3.getSignedUrlPromise("putObject", params);
  return uploadURL;
};
