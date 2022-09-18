# Exif-orientation

### What is Exif

Exif (exchangeable image file format) data contains information about the image's parameters (e.g., shutter speed, date, time, orientation value, etc.). This information is stored in the image file.

When an image is viewed on page, Exif orientation value and auto-rotates the image to present it in the way it was viewed, regardless of camera rotation.

### Exif Orientation Flag
![exifimageorientation](https://user-images.githubusercontent.com/16146189/190893392-b0164112-0e3e-4e02-9e4c-93415ebf9b88.png)


### Architecture

When we upload images to s3 bucket and automatically trigger exif-imag-lambda function. On this lambda check that image has orientation value.Ff it has orientation value it will be rotated and upload to another folder

![ImageRotation drawio](https://user-images.githubusercontent.com/16146189/190892979-9ac29ed2-bc67-4389-bea8-33743028164e.png)
