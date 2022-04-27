const express = require("express");
var bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const axios = require('axios').default;
var _ = require('lodash');
var Sugar = require('sugar');
const fileUpload = require('express-fileupload');
var Minio = require('minio')
var crypto = require("crypto");
const cors = require('cors');
const {parse, stringify, toJSON, fromJSON} = require('flatted');
const fs = require('fs')
const util = require('util')
const {writeFileSync, readFileSync} = require("fs");
// const signer = require('node-signpdf')
const PDFDocument = require('pdf-lib').PDFDocument


/*
PDFDocument.load(readFileSync("./pdfTemplateA.pdf")).then(async pdfDoc => {
    // Get the form containing all the fields
    const form = pdfDoc.getForm()

// Get all fields in the PDF by their names
    const field1 = form.getTextField('myfield1')
    const field2 = form.getTextField('myfield2')
    const field3 = form.getTextField('myfield3')

// Fill in the basic info fields
    field1.setText('Mario')
    field2.setText('24 years')
    field3.setText('24 yrs')


    const pdfBytes = await pdfDoc.save()


    fs.writeFile('letter.pdf', pdfBytes, () => {
        console.log('PDF created!')
        /!*const signedPdf = signer.default.sign(
            fs.readFileSync('letter.pdf'),
            fs.readFileSync('client-identity.p12'),
        );*!/
    })
})
*/


var redis = require('redis');
var redisClient = redis.createClient({
    url: `redis://:@${process.env.redis_service_endPoint}:${process.env.redis_service_port}`
});
redisClient.connect();

redisClient.on('connect', async function () {
    console.log('connected');
    await redisClient.set('key', 'value');
    const value = await redisClient.get('key');
    console.log(value);
});

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


app.set('port', process.env.apigateway_port);
const TOKEN_SECRET = '1a2b-3c4d-5e6f-7g8h'

const services = {
    'appeals': process.env.appeals_service_url,
    'users': process.env.users_service_url
}

const config = {
    headers: {
        //Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json'
        }
    }
};

// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// Instantiate the minio client with the endpoint
// and access keys as shown below.
console.log('==============>', process.env.minio_service_endPoint, ' ', process.env.minio_service_port);
var minioClient = new Minio.Client({
    endPoint: process.env.minio_service_endPoint,
    port: 9000,//Number(process.env.minio_service_port),
    useSSL: false,
    accessKey: 'minio-root-user',
    secretKey: 'minio-root-password'
});

// Make a bucket called europetrip.
minioClient.makeBucket('filespace', 'ru-east-1', function (err) {
    if (err) return console.log(err)

    console.log('Bucket created successfully in "ru-east-1".')
});


function generateAccessToken(username) {
    return jwt.sign(username, TOKEN_SECRET, {expiresIn: '1800s'});
}

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) return res.sendStatus(401)

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        console.log(err)

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}

async function verifyTokenAndGetPayload(token) {
    let data = await jwt.verify(token, TOKEN_SECRET);
    return data;
}

async function getTokenPayload(token) {
    let data = await jwt.decode(token, TOKEN_SECRET);
    return data;
}

app.use(express.json())


/*
app.use((req, res, next) => {
    if (req.headers.authorization) {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            tokenKey,
            (err, payload) => {
                if (err) next()
                else if (payload) {
                    for (let user of users) {
                        if (user.id === payload.id) {
                            req.user = user
                            next()
                        }
                    }

                    if (!req.user) next()
                }
            }
        )
    }

    next()
})
*/


// app.get("/token",function (request, response) {
//     response.send("<h1>token</h1>");
//     // response.redirect("about")
// });
//
// app.get("/user", function (request, response) {
//     response.send("<h1>About</h1>");
// });
//
// app.get("/appeal", function (request, response) {
//     response.send("<h1>About</h1>");
// });

app.route('/token')
    .get(async function (req, res) {
        let payload;
        try {
            if (req.query && Object.keys(req.query).length !== 0) {
                console.log(req.query['jwt']) // populated!
                payload = await getTokenPayload(req.query['jwt']);
                data = await redisClient.get(payload.login)
                if (data === req.query['jwt']) {
                    console.log('--->', data, '|||', req.query['jwt'])
                }
            }
        } catch (e) {
            console.log(e);
        }
        res.send(payload);
    })
    .post(async function (req, res) {
        // res.send('Add a token');
        let results = (await axios.get(services.users + "/users")).data
        let user = _.find(results, {login: req.body.loginOrMobile})
        user = _.pick(user, ['id', 'login', 'name', 'patronymic'])
        if (Object.keys(user).length === 0) {
            res.send();
            return;
        }
        console.log(generateAccessToken(user));
        await redisClient.set(user.login, generateAccessToken(user));
        console.log(await redisClient.get(user.login))
        res.send(generateAccessToken(user))
    })
    .put(function (req, res) {
        res.send('Update the token');
    });

app.route('/user/:id')
    .get(async function (req, res) {
        let results;
        var id = req.params.id; //or use req.param('id')
        try {
            if (id === 'pages') {
                var page = req.query['page']; //or use req.param('id')
                var size = req.query['size']; //or use req.param('id')
                results = (await axios.get(services.users + "/users")).data;
                results = {
                    'content': _.take(_.drop(results, page * size), size),
                    'total': (page == 0 ? 1 : Math.floor(results.length / page))
                };

            } else {
                results = (await axios.get(services.users + "/users/" + id)).data
            }
        } catch (e) {
            results = (await axios.get(services.users + "/users")).data //////////!!!!!!!!!!!!!!!!!!!!!!!!!!!
        }

        res.send(results);
    });

app.route('/user')
    .get(async function (req, res) {
        let results = (await axios.get(services.users + "/users")).data

        res.send(results);

    })
    .post(async function (req, res) {
        // res.send('Add a user');
        let s = Sugar.Date.create();
        let k = s.toISOString();
        let newUser = {
            "created_at": "2019-10-03 10:09:21.61",
            "login": req.body.login,
            "name": req.body.name,
            "surname": req.body.surname,
            "patronymic": req.body.patronymic,
            "passwordHash": req.body.passwordHash,
            "mobilenumber": req.body.mobilenumber,
            "role": 1,
            "email": req.body.email
        }

        try {
            let results = await axios.post(services.users + "/users/", newUser)
            results = _.pick(results.data, ['id', 'login', 'name', 'patronymic'])
            console.log(results);

            await redisClient.set(results.login, generateAccessToken(results));
            results['token'] = generateAccessToken(results);
            res.send(results)
        } catch (e) {
            console.log(e);
        }

    })
    .put(function (req, res) {
        res.send('Update the user');
    });

app.route('/userPassword')
    .get(function (req, res) {
        res.send('Get a random userPassword');
    })
    .post(function (req, res) {
        res.send('Add a userPassword');
    })
    .put(function (req, res) {
        res.send('Update the userPassword');
    });


app.route('/getLastCreated/appeal')
    .get(async function (req, res) {
        var id = req.params.id; //or use req.param('id')

        let results;
        try {
            results = (await axios.get(services.appeals + "/appeal")).data
            results = _.orderBy(results, [function (o) {
                return Date.parse(o.createdAt);
            }]);
        } catch (e) {
        }

        res.send(results[0]);
    });


app.route('/appeal/')
    .get(async function (req, res) {

        let results;
        try {
            results = (await axios.get(services.appeals + "/appeal")).data
            for (const res of results) res.comments = _.sortBy(res.comments, 'id')

        } catch (e) {
        }

        res.send(results);
    });

app.route('/appeal/:id')
    .get(async function (req, res) {
        let results;
        var id = req.params.id; //or use req.param('id')
        try {
            if (id === 'pages') {
                var page = req.query['page']; //or use req.param('id')
                var size = req.query['size']; //or use req.param('id')
                results = (await axios.get(services.appeals + "/appeal")).data;

                for (const res of results) {
                    res.comments = _.sortBy(res.comments, 'id')
                    for (const c of res.comments)
                        c.createdBy = (await axios.get(services.users + "/users/" + c.createdBy)).data;
                }

                results = {
                    'content': _.take(_.drop(results, page * size), size),
                    'total': (page == 0 ? 1 : Math.floor(results.length / page))
                };

            } else {


                results = (await axios.get(services.appeals + "/appeal/" + id)).data


                results.comments = _.sortBy(results.comments, 'id')
                for (const c of results.comments)
                    c.createdBy = (await axios.get(services.users + "/users/" + c.createdBy)).data;


            }
        } catch (e) {
        }

        res.send(results);
    });

app.route('/moderator/appeal/close/:id')
    .patch(async (req, res) => {
        let result;
        let appealId = req.params.id; //or use req.param('id')

        try {
            result = await axios.patch(services.appeals + "/appeal/" + appealId, {
                "status": "closed"
            });
        } catch (e) {
            console.log(e);
        }
        res.send(results);
    })

app.route('/moderator/appeal/check/:id')
    .patch(async (req, res) => {
        let result;
        let appealId = req.params.id; //or use req.param('id')

        try {
            result = await axios.patch(services.appeals + "/appeal/" + appealId, {
                "status": "check"
            });
        } catch (e) {
            console.log(e);
        }
        res.send(results);
    })

app.route('/moderator/appeal/accept/:id')
    .patch(async (req, res) => {
        let result;
        let appealId = req.params.id; //or use req.param('id')

        try {
            result = await axios.patch(services.appeals + "/appeal/" + appealId, {
                "status": "accepted"
            });
        } catch (e) {
            console.log(e);
        }
        res.send(results);
    })

app.route('/moderator/appeal/working/:id')
    .patch(async (req, res) => {
        let result;
        let appealId = req.params.id; //or use req.param('id')

        try {
            result = await axios.patch(services.appeals + "/appeal/" + appealId, {
                "status": "working"
            });
        } catch (e) {
            console.log(e);
        }
        res.send(results);
    })

app.route('/moderator/appeal/:id')
    .patch(async (req, res) => {
        let result;
        let appealId = req.params.id; //or use req.param('id')

        try {
            result = (await axios.patch(services.appeals + "/appeal/" + appealId, req.body)).data;
        } catch (e) {
            console.log(e);
        }
        res.send(result);
    })

app.route('/moderator/comment/:id')
    .delete(async (req, res) => {
        let result;
        let commentId = req.params.id; //or use req.param('id')

        try {
            result = (await axios.delete(services.appeals + "/comments/" + commentId)).data;
        } catch (e) {
            console.log(e);
        }
        res.send(result);
    })


app.route('/appeal')
    .get(async function (req, res) {

        let results;
        try {
            results = (await axios.get(services.appeals + "/appeal/")).data
        } catch (e) {

        }

        res.send(results);
    })
    .post(async function (req, res) {
        let payload = await getTokenPayload(req.body['ownerToken']);
        let data = await redisClient.get(payload.login)
        if (data === req.body['ownerToken']) {
            console.log('--->', data, '|||', req.body['ownerToken'])


            let newAppeal = {
                "ownerToken": req.body['ownerToken'],
                "status": req.body.status,
                "title": req.body.title,
                "description": req.body.description,
                "geoPosition": req.body.geoPosition,
                "attachments": req.body.attachments,
                "categoris": req.body.category,
                "authorid": payload.id,
            }

            let results;
            try {
                results = (await axios.post(services.appeals + "/appeal/", newAppeal)).data
                // results = _.pick(results.data, ['id', 'login', 'name', 'patronymic'])
                console.log(results);
            } catch (e) {
                console.log(e);
            }

            res.send(results);
        }
    })
    .put(function (req, res) {
        res.send('Update the appeal');
    });

app.route('/getLastCreated/appeal')
    .get(function (req, res) {
        res.send('Get a random appeal');
    })
    .post(function (req, res) {
        res.send('Add a appeal');
    })
    .put(function (req, res) {
        res.send('Update the appeal');
    });

app.route('/AppealCategory')
    .get(async function (req, res) {
        try {
            let results = (await axios.get(services.appeals + "/AppealCategory", config)).data
            // results = _.pick(results.data, ['id', 'login', 'name', 'patronymic'])
            console.log(results);

            // await redisClient.set(results.login, generateAccessToken(results));
            // results['token'] = generateAccessToken(results);
            res.send(results)
        } catch (e) {
            console.log(e);
        }
    })
    .post(function (req, res) {
        res.send('Add a AppealCategory');
    })
    .put(function (req, res) {
        res.send('Update the AppealCategory');
    });

app.route('/scs')
    .get(function (req, res) {
        res.send('Get a random scs');
    })
    .post(function (req, res) {
        res.send('Add a scs');
    })
    .put(function (req, res) {
        res.send('Update the scs');
    });

app.route('/mask')
    .get(function (req, res) {
        res.send('Get a random mask');
    })
    .post(function (req, res) {
        res.send('Add a mask');
    })
    .put(function (req, res) {
        res.send('Update the mask');
    });

app.route('/comment')
    .get(function (req, res) {
        res.send('Get a random comment');
    })
    .post(async function (req, res) {
        res.send('Add a comment');
        try {
            let newComment = {
                "createdBy": (await getTokenPayload(req.headers["token"])).id,
                "content": req.body['content'],
                "appeal": req.body['appeal'],
            }

            results = (await axios.post(services.appeals + "/comments/", newComment)).data
            // results = _.pick(results.data, ['id', 'login', 'name', 'patronymic'])
            console.log(results);
        } catch (e) {
            console.log(e);
        }


    })
    .put(function (req, res) {
        res.send('Update the comment');
    });

app.get('/file/preview/:id', async function (req, res) {
    var filefakename = req.params.id; //or use req.param('id')

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

        // let obj = (await minioClient.getObject('filespace', '139b533d809f1b527d206b23d8dfa892ef9eacbf')).data;

        // res.writeHead(200, [['Content-Type', obj.MetaData['Mime-Type']]]);
        // res.end(new Buffer(obj.data, 'base64'));

    } catch (e) {

    }
})

app.post('/file', async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            let data = [];

            //loop all files
            _.forEach(_.keysIn(req.files['uploadedFile[]']), (key) => {
                data.push(crypto.randomBytes(20).toString('hex'));
                let photo = req.files['uploadedFile[]'][key];

                var metaData = {
                    'Content-Type': 'application/octet-stream',
                    'Mime-Type': photo.mimetype,
                    'X-Amz-Meta-Testing': 1234,
                    'example': 5678,
                    // 'Source-Name': photo.name,
                }
                // Using fPutObject API upload your file to the bucket europetrip.
                minioClient.putObject('filespace', data.at(data.length - 1), photo.data, photo.data.length, metaData, function (err, etag) {
                    if (err) return console.log(err)
                    console.log('File uploaded successfully.')
                });

                //move photo to uploads directory
                photo.mv('./uploads/' + photo.name);

                //push file details
                data.push({
                    name: photo.name,
                    mimetype: photo.mimetype,
                    size: photo.size
                });

            });

            console.log(data);
            //return response
            res.send({
                status: true,
                message: 'Files are uploaded',
                fileFakeName: data
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});


app.listen(8888);
