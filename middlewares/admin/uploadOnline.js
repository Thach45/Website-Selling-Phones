const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

cloudinary.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.cloudKey,
    api_secret: process.env.cloudSecrit
});

module.exports.upload = async (req, res, next) => {
    if (req.files && req.files.length > 0) {
        let uploadPromises = req.files.map(file => {
            return new Promise((resolve, reject) => {
                let stream = cloudinary.uploader.upload_stream((error, result) => {
                    if (result) {
                        resolve(result);
                    } else {
                        reject(error);
                    }
                });
                streamifier.createReadStream(file.buffer).pipe(stream);
            });
        });

        try {
            let results = await Promise.all(uploadPromises);
            req.body.thumbnails = results.map(result => result.url);
            next();
        } catch (error) {
            next(error);
        }
    } else {
        next();
    }
};