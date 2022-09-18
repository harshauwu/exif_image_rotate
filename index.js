const AWS = require('aws-sdk');
const sharp = require('sharp');
const S3 = new AWS.S3();

let bucket_name;
const destination = 'sample';

const checkExIfMetaDataAndRotateImage = async (key) => {
   
    let file = await S3.getObject({ Bucket: bucket_name, Key: key }).promise();
    let hasOrientation = await checkImageOrientation(file.Body);
    if (hasOrientation) {
        let rotatedBufferImage = await rotateImage(file.Body);
        await updateFileInS3(rotatedBufferImage, key);
    }
};

const checkImageOrientation = async (file) => {
    try {
        let hasOrientation = false;
        const metadata = await sharp(file).metadata();
        if (metadata.orientation) {
            hasOrientation = true;
        }
        return hasOrientation;
    } catch (error) {
        console.log(`An error occurred during processing: ${error}`);
    }
}

const rotateImage = async (file) => {
    try {
        return await sharp(file)
            .rotate()
            .toBuffer();
    } catch (error) {
        console.log(error);
    }
}

const updateFileInS3 = async (buffer, key) => {
    let fileName = key.split('/');
    const destinationKey = destination+'/'+fileName;
    await S3.putObject({
        Body: buffer,
        Bucket: bucket_name,
        Key: destinationKey
    }).promise()
}

exports.handler = function (event, context) {
    try {
        bucket_name = event.Records[0].s3.bucket.name;
        console.log('**** bucket_name  ******' + bucket_name);
        const srcKey = event.Records[0].s3.object.key;
        console.log('**** source key ******' + srcKey);
        checkExIfMetaDataAndRotateImage(srcKey);
        
      } catch (error) {
        console.log('error' + error);
        return;
      }
};
