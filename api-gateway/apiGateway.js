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




var redis = require('redis');
console.log('redis url === ' + "redis://"+process.env.redis_service_endPoint + ":" + process.env.redis_service_port);
var redisClient = redis.createClient({
	//host: "redis", //process.env.redis_service_endPoint
    //port: 7489, //process.env.redis_service_port
	url: "redis://"+process.env.redis_service_endPoint + ":" + process.env.redis_service_port
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


const TOKEN_SECRET = '1a2b-3c4d-5e6f-7g8h'

const services = {
    'appeals': process.env.appeals_service_url,
    'users': process.env.users_service_url,
    'emailService': process.env.email_service_url
}
 
console.log('services : ', services);

const config = {
    headers: {
        //Authorization: `Bearer ${localStorage.getItem('id_token')}`,
        headers: {
            // Overwrite Axios's automatically set Content-Type
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



async function fillTemplate(fio, description, date) {
    const pdfDoc = await PDFDocument.load(readFileSync("./pdfTemplateA.pdf"));
    const form = pdfDoc.getForm()

    const field1 = form.getTextField('myfield1')
    const field2 = form.getTextField('myfield2')
    const field3 = form.getTextField('myfield3')

    field1.setText(fio)
    field2.setText(description)
    field3.setText(date)


    const pdfBytes = await pdfDoc.save()
    let fileFakeName = crypto.randomBytes(20).toString('hex')

    fs.writeFile(fileFakeName+'.pdf', pdfBytes, async () => {
        console.log('PDF created!')

        var metaData = {
            'Content-Type': 'application/octet-stream',
            'Mime-Type': 'application/pdf',
            'X-Amz-Meta-Testing': 1234,
            'example': 5678,
        }


        await minioClient.fPutObject('filespace', fileFakeName+'.pdf', fileFakeName+'.pdf', metaData);
        console.log('File uploaded successfully.')
        console.log(pdfBytes);

    });
    return fileFakeName+'.pdf';

}

let roleMod, roleGov, roleUser;


axios.get(services.users + "/role/").then(async roles => {
    roles = roles.data;
    roleMod = _.find(roles, {name:'Moderator'});
    roleGov = _.find(roles, {name:'GovMan'});
    roleUser = _.find(roles, {name:'User'});

	console.log('roleMod=', roleMod,' roleGov=',roleGov,' roleUser=',roleUser);

    if(!roleMod){
        roleMod = (await axios.post(services.users + "/role/", {name: 'Moderator'})).data
		console.log('Created roleMode ', roleMod);
	}

    if(!roleGov){
        roleGov = (await axios.post(services.users + "/role/", {name: 'GovMan'})).data
		console.log('Created roleMode ', roleMod);
	}
	
    if(!roleUser){
        roleUser = (await axios.post(services.users + "/role/", {name: 'User'})).data
		console.log('Created roleMode ', roleMod);
	}

    const appealCategorys = [
        {
            name: "Граффити",
            description: "Вандализм",
            imageUrl: "./resources/sample_graffiti.jpg"
        },
        {
            name: "Не убирается мусор в контейнере",
            description: "Недостаток",
            imageUrl: "./resources/sample_trashGarbage.jpg"
        },
        {
            name: "Нелегальная мусорка",
            description: "Нарушение закона",
            imageUrl: "./resources/sample_trash.jpg"
        },
        {
            name: "Ямы на дороге",
            description: "ГГ",
            imageUrl: "./resources/sample_roadHole.jpg"
        },
        {
            name: "Автомобиль припоркован на тратуаре",
            description: "Нарушение закона",
            imageUrl: "./resources/sample_car.jpg"
        },
        {
            name: "Поломана лавочка",
            description: "Вандализм",
            imageUrl: "./resources/sample_benchCrash.jpg"
        },
        {
            name: "Грязный подъезд",
            description: "Вандализм",
            imageUrl: "./resources/sample_dirtyStaircase.jpg"
        },
        {
            name: "Грязный лифт",
            description: "Вандализм",
            imageUrl: "./resources/sample_Dirtyelevator.jpg"
        }
    ]

    if((await axios.get(services.appeals + "/AppealCategory/")).data.length === 0)
        for (const appealCategory of appealCategorys){
            results = (await axios.post(services.appeals + "/AppealCategory/", appealCategory)).data
			console.log('Created appealCategory ', results);
		}
		
		

})

//http://localhost:8083


app.route('/factoryDatabaseReset')
    .get(async function (req, res) {
		console.log('RUN factoryDatabaseReset');
		
		axios.get(services.users + "/role/").then(async roles => {
			
			roles = roles.data;
			console.log('roles === ', roles);
			
			roleMod = _.find(roles, {name:'Moderator'});
			roleGov = _.find(roles, {name:'GovMan'});
			roleUser = _.find(roles, {name:'User'});

			console.log('roleMod=', roleMod,' roleGov=',roleGov,' roleUser=',roleUser);

			if(!roleMod){
				roleMod = (await axios.post(services.users + "/role/", {name: 'Moderator'})).data
				console.log('Created roleMode ', roleMod);
			}

			if(!roleGov){
				roleGov = (await axios.post(services.users + "/role/", {name: 'GovMan'})).data
				console.log('Created roleMode ', roleMod);
			}
			
			if(!roleUser){
				roleUser = (await axios.post(services.users + "/role/", {name: 'User'})).data
				console.log('Created roleMode ', roleMod);
			}

			const appealCategorys = [
				{
					name: "Граффити",
					description: "Вандализм",
					imageUrl: "./resources/sample_graffiti.jpg"
				},
				{
					name: "Не убирается мусор в контейнере",
					description: "Недостаток",
					imageUrl: "./resources/sample_trashGarbage.jpg"
				},
				{
					name: "Нелегальная мусорка",
					description: "Нарушение закона",
					imageUrl: "./resources/sample_trash.jpg"
				},
				{
					name: "Ямы на дороге",
					description: "ГГ",
					imageUrl: "./resources/sample_roadHole.jpg"
				},
				{
					name: "Автомобиль припоркован на тратуаре",
					description: "Нарушение закона",
					imageUrl: "./resources/sample_car.jpg"
				},
				{
					name: "Поломана лавочка",
					description: "Вандализм",
					imageUrl: "./resources/sample_benchCrash.jpg"
				},
				{
					name: "Грязный подъезд",
					description: "Вандализм",
					imageUrl: "./resources/sample_dirtyStaircase.jpg"
				},
				{
					name: "Грязный лифт",
					description: "Вандализм",
					imageUrl: "./resources/sample_Dirtyelevator.jpg"
				}
			]

			if((await axios.get(services.appeals + "/AppealCategory/")).data.length === 0)
				for (const appealCategory of appealCategorys){
					results = (await axios.post(services.appeals + "/AppealCategory/", appealCategory)).data
					console.log('Created appealCategory ', results);
				}
				
				
				
				
				
				
			let results;
			try {

				if((await axios.get(services.users + "/users/")).data.length === 0) {

					let newUser1 = {
						"created_at": "2019-10-03 10:09:21.61",
						"login": "alex-rudenkiy",
						"name": "Александр",
						"surname": "Руденький",
						"patronymic": "Олегович",
						"passwordHash": "qwerty",
						"mobilenumber": "88005553535",
						"role": roleUser.id,
						"email": "alex-rudenkiy@mail.ru"
					}

					let newUser2 = {
						"created_at": "2019-10-03 10:09:21.61",
						"login": "rudenkiy",
						"name": "Олег",
						"surname": "Руденький",
						"patronymic": "Александрович",
						"passwordHash": "abcabc",
						"mobilenumber": "88005553535",
						"role": roleUser.id,
						"email": "rudenkiy@yandex.ru"
					}

					results = (await axios.post(services.users + "/users/", newUser1)).data
					results = (await axios.post(services.users + "/users/", newUser2)).data
				}

			} catch (e) {
				console.log(e);
			}

			res.send(results);
		})
		
		
		

        
    });





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
	
	
app.route('/role')
    .get(async function (req, res) {
        try {
            let results = (await axios.get(services.users + "/role")).data
            console.log(results);

            res.send(results)
        } catch (e) {
            console.log(e);
        }
    });

app.route('/AppealCategory')
    .get(async function (req, res) {
        try {
            let results = (await axios.get(services.appeals + "/AppealCategory", config)).data
            console.log(results);

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







app.route('/user/:id')
    .get(async function (req, res) {
        let results;
        var id = req.params.id; 
        try {
            if (id === 'pages') {
                var page = req.query['page']; 
                var size = req.query['size']; 
                results = (await axios.get(services.users + "/users")).data;
                results = {
                    'content': _.take(_.drop(results, page * size), size),
                    'total': (page == 0 ? 1 : Math.floor(results.length / page)),
                    'page': page
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
            "role": roleUser.id,
            "email": req.body.email
        }
		console.log(newUser);

        try {
            let results = await axios.post(services.users + "/users/", newUser)
            results = _.pick(results.data, ['id', 'login', 'name', 'patronymic'])
            console.log(results);

            await redisClient.set(results.login, generateAccessToken(results));
            results['token'] = generateAccessToken(results);
            res.send(results)
        } catch (e) {
            console.log(e);
            res.status(400).send({
                message: e.response.data.message
            });
        }


    });

app.route('/user/:id').patch(async (req, res)=>{
    let result;
    let userId = req.params.id; //or use req.param('id')
    req.body = _.omit(req.body, ['created_at', 'description'])

    try {
        result = (await axios.patch(services.users + "/users/" + userId, req.body)).data;
    } catch (e) {
        console.log(e);
    }
    res.send(result);
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


app.route('/self/appeals/').get(async function (req, res) {

    let results;
    try {
        results = (await axios.get(services.appeals + "/appeal")).data
        for (const res of results) res.comments = _.sortBy(res.comments, 'id')

    } catch (e) {
    }

    res.send(results);
});

app.route('/appeal/')
    .get(async function (req, res) {
        let results;
        var id = req.params.id;

        try {
            results = (await axios.get(services.appeals + "/appeal")).data
            results = req.query.filter ? _.filter(results, JSON.parse(req.query.filter)) : results;
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
                    res['author'] = (await axios.get(services.users + "/users/" + res.authorid)).data;
                    res.comments = _.sortBy(res.comments, 'id')
                    for (const c of res.comments)
                        c.createdBy = (await axios.get(services.users + "/users/" + c.createdBy)).data;
                }

                results = {
                    'content': _.take(_.drop(results, (page-1) * size), size),
                    'total': (page == 0 ? 1 : Math.floor(results.length / page))
                };

            } else {


                results = (await axios.get(services.appeals + "/appeal/" + id)).data
                results.author = (await axios.get(services.users + "/users/" + results.authorid)).data;

                results.comments = _.sortBy(results.comments, 'id')
                for (const c of results.comments)
                    c.createdBy = (await axios.get(services.users + "/users/" + c.createdBy)).data;

            }
        } catch (e) {
            console.log(e);
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

app.route('/moderator/user/:id')
    .delete(async (req, res) => {
        let result;
        let userId = req.params.id; //or use req.param('id')

        try {
            result = (await axios.delete(services.users + "/users/" + userId)).data;
        } catch (e) {
            console.log(e);
        }
        res.send(result);
    })

app.route('/appeal')
    .post(async function (req, res) {
        let payload = await getTokenPayload(req.body['ownerToken']);
        let data = await redisClient.get(payload.login)
        let author = (await axios.get(services.users + "/users/" + payload.id)).data;

        if (data === req.body['ownerToken']) {
            console.log('--->', data, '|||', req.body['ownerToken'])


            let newAppeal = {
                "ownerToken": req.body['ownerToken'],
                "status": "check",
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

                let pdffilename = await fillTemplate(`${author.name} ${author.surname} ${author.patronymic}`, req.body.description, new Date().toISOString().slice(0, 10));
                await axios.post(services.emailService+'/sendAttachmentEmail', {to:"alex-rudenkiy@mail.ru", subject: "qwert", content: "tyui", attachments:[`http://${process.env.gateway_ip}:${process.env.gateway_port}/file/preview/${pdffilename}`]})


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
        try {
            let newComment = {
                "createdBy": (await getTokenPayload(req.headers["token"])).id,
                "content": req.body['content'],
                "appeal": req.body['appeal'],
            }

            results = (await axios.post(services.appeals + "/comments/", newComment)).data
            console.log(results);
            res.send(results);
        } catch (e) {
            console.log(e);
        }


    })
    .put(function (req, res) {
        res.send('Update the comment');
    });

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

app.post('/file', async (req, res) => {
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
 
app.listen(process.env.gateway_port);
