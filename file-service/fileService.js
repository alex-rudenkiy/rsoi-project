const express = require("express");
var _ = require('lodash');
const fileUpload = require('express-fileupload');
var Minio = require('minio')
var crypto = require("crypto");
const cors = require('cors');



const app = express();

// enable files upload
app.use(fileUpload({
    createParentPath: true
}));

const corsOptions = {
    origin: '*',//[process.env.frontend_service_url],
    credentials: true,
}
app.use(cors(corsOptions))


const config = {
    headers: {
        headers: {
            'Content-Type': 'application/json'
        }
    }
};

console.log('==============>', process.env.minio_service_endPoint, ' ', process.env.minio_service_port);
var minioClient = new Minio.Client({
    endPoint: process.env.minio_service_endPoint,
    port: Number(process.env.minio_service_port),
    useSSL: false,
    accessKey: 'minio-root-user',
    secretKey: 'minio-root-password'
});

minioClient.makeBucket('filespace', 'ru-east-1', function (err) {
    if (err) return console.log(err)

    console.log('Bucket created successfully in "ru-east-1".')
});

app.use(express.json())

app.get('/file/preview/:id', async function (req, res) {
    var filefakename = req.params.id;

    try {
        var size = 0
        var fileBuffer = Buffer.alloc(0);

        let result = await minioClient.statObject('filespace', filefakename);


        minioClient.getObject('filespace', filefakename, function (err, dataStream) {
            if (err) {
                return console.log(err)
            }
            dataStream.on('data', function (chunk) {
                size += chunk.length;
                fileBuffer = Buffer.concat([fileBuffer, chunk]);
            })
            dataStream.on('end', function () {
                console.log('End. Total size = ' + size)
                res.writeHead(200, {'Content-Type': result.metaData['mime-type']});
                res.end(new Buffer(fileBuffer));
            })
            dataStream.on('error', function (err) {
                console.log(err)
            })
        });

    } catch (e) {

    }
})

app.post('/upload_file', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];

            if(req.files['uploadedFile[]'].length) {

                await _.forEach(_.keysIn(req.files['uploadedFile[]']), (key) => {
                    data.push(crypto.randomBytes(20).toString('hex'));
                    let photo = req.files['uploadedFile[]'][key];

                    var metaData = {
                        'Content-Type': 'application/octet-stream',
                        'Mime-Type': photo.mimetype,
                        'X-Amz-Meta-Testing': 1234,
                        'example': 5678,
                    }

                    minioClient.putObject('filespace', data[data.length - 1], photo.data, photo.data.length, metaData, function (err, etag) {
                        if (err) return console.log(err)
                        console.log('File uploaded successfully.')

                        console.log(data);

                    });

                });
                res.send({
                    status: true,
                    message: 'Files are uploaded',
                    fileFakeName: data
                });
            }else{
                data.push(crypto.randomBytes(20).toString('hex'));
                let photo = req.files['uploadedFile[]'];

                var metaData = {
                    'Content-Type': 'application/octet-stream',
                    'Mime-Type': photo.mimetype,
                    'X-Amz-Meta-Testing': 1234,
                    'example': 5678,
                }

                minioClient.putObject('filespace', data[data.length - 1], photo.data, photo.data.length, metaData, function (err, etag) {
                    if (err) return console.log(err)
                    console.log('File uploaded successfully.')

                    console.log(data);
                    res.send({
                        status: true,
                        message: 'Files are uploaded',
                        fileFakeName: data
                    });
                });
            }


        }
    } catch (err) {
        res.status(500).send(err);
    }
});
 
app.listen(19776);
