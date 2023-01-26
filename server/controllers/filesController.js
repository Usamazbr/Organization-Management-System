const { S3 } = require("aws-sdk");
const Upload = require("../models/uploadfileModel");
const s3 = new S3({
  accessKeyId: process.env.AWS_ID,
  secretAccessKey: process.env.AWS_SECRET,
  region: "ap-northeast-1",
});

// files documents

const createFileObj = async ({ files, user }, res) => {
  try {
    const s3UploadFunc = async ({ buffer, originalname }) => {
      const data = await Upload.create({
        user_id: user._id,
        filename: originalname,
      });
      data.save();

      const fileData = {
        Body: buffer,
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: originalname,
      };

      return s3.upload(fileData).promise();
    };

    const result = await Promise.all(files.map((file) => s3UploadFunc(file)));

    console.log(result);

    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: err });
  }
};

//? download file from S3

const getFileController = async ({ params }, res) => {
  console.log(params);
  const { filename } = JSON.parse(params.obj);

  console.log(process.env.AWS_BUCKET_NAME);
  try {
    const data = await s3
      .getObject({
        Key: filename,
        Bucket: process.env.AWS_BUCKET_NAME,
      })
      .promise();
    res.status(200).attachment(filename);
    res.status(200).type(data.ContentType);
    res.status(200).send(data.Body);
  } catch (err) {
    console.log(`Huh? ` + err);
    res.status(404).json({ err: err });
  }
};

//delete files
const delFiles = async ({ params }, res) => {
  const { files } = JSON.parse(params.filearr);
  console.log(files);
  try {
    const s3DelFunc = async ({ filename, id }) => {
      const objParam = {
        Key: filename,
        Bucket: process.env.AWS_BUCKET_NAME,
      };

      s3.deleteObject(objParam, (err, data) => {
        if (err) {
          console.log(err, err.stack);
          throw Error(`Error: ${err}`);
        } else console.log(`Deleted in S3`); //?done
      });
      Upload.findByIdAndDelete(id, (err, docs) => {
        if (err) {
          console.log(err);
        } else {
          console.log(`Deleted in MongoDb`);
        }
      });
      //TODO something in return?
      // console.log(data);
    };
    const result = await Promise.all(
      files.map(({ filename, id }) => s3DelFunc({ filename, id }))
    );
    console.log(result);
    res.status(200).send(result);
  } catch (err) {
    console.log(`Outer error: ` + err);
    res.status(404).json({ err: err });
  }
};

// file names from MongoDb
const getFileNames = async ({ user: { _id } }, res) => {
  try {
    const data = await Upload.find({ user_id: _id });
    console.log(`Total files: ` + data.length);
    res.status(200).send({ data });
  } catch ({ message }) {
    res.status(400).json({ err: message });
  }
};

module.exports = {
  createFileObj,
  getFileNames,
  getFileController,
  delFiles,
};
