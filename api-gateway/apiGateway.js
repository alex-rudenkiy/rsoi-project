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
const { ServiceBroker } = require("moleculer");
const retry = require('async-await-retry');
var md5 = require('md5');


var FormData = require('form-data');

// const signer = require('node-signpdf')
const PDFDocument = require('pdf-lib').PDFDocument
const setFontAndSize = require('pdf-lib').setFontAndSize


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
    'emailService': process.env.email_service_url,
    'fileService': process.env.file_service_internal_url,
    'fileService_external': process.env.file_service_external_url,
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




/*const broker = new ServiceBroker();

broker.createService({
    name: "safeSender",
    actions: {
        send: {
            retryPolicy: {
                // All Retry policy options can be overwritten from broker options.
                retries: 3,
                delay: 500
            },
            async handler(ctx) {
                // await axios.post(services.appeals + "/appeal/", newAppeal)
                await axios.get(services.appeals + "/appeal")
            }
        },
    }
});
broker.start()
    // Call service
    .then(() => broker.call("safeSender.send", { a: 5, b: 3 }, { retries: 3 }))
    .then(res => console.log(res))
    .catch(err => console.error(`Error occured! ${err.message}`));*/

/*const broker = new ServiceBroker({
    retryPolicy: {
        enabled: true,
        retries: 5,
        delay: 100,
        maxDelay: 2000,
        factor: 2,
        check: err => err && !!err.retryable
    }
});*/




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
    var fill_pdf = require('fill-pdf-utf8');
    let fileFakeName = crypto.randomBytes(20).toString('hex')

    let respromise = await new Promise((resolve, reject) => {

        fill_pdf.generatePdf({fields:{
                    "myfield1" : fio,
                    "myfield2" : description,
                    "myfield3" : date
                }},
            'pdfTemplateA.pdf',{fontSize: 12.0},
            fileFakeName+'.pdf',function (error, stdout, stderr) {
                if(error){
                    reject(error);
                }
                resolve();
            })

    });

    const pdfBytes = fs.readFileSync(fileFakeName+'.pdf');

    //fs.writeFileSync(fileFakeName+'.pdf', pdfBytes);
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




    /*const pdfDoc = await PDFDocument.load(readFileSync("./pdfTemplateA.pdf"));
    const form = pdfDoc.getForm()


    const field1 = form.getTextField('myfield1')
    const field2 = form.getTextField('myfield2')
    const field3 = form.getTextField('myfield3')

    field1.setText(fio)
    field2.setText(description)
    field3.setText(date)



    const pdfBytes = await pdfDoc.save()
    let fileFakeName = crypto.randomBytes(20).toString('hex')

    fs.writeFileSync(fileFakeName+'.pdf', pdfBytes);
    console.log('PDF created!')

    var metaData = {
        'Content-Type': 'application/octet-stream',
        'Mime-Type': 'application/pdf',
        'X-Amz-Meta-Testing': 1234,
        'example': 5678,
    }

    await minioClient.fPutObject('filespace', fileFakeName+'.pdf', fileFakeName+'.pdf', metaData);
    console.log('File uploaded successfully.')
    console.log(pdfBytes);*/

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
						"passwordHash": md5("qwerty"),
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
						"passwordHash": md5("abcabc"),
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
                payload = await verifyTokenAndGetPayload(req.query['jwt']);
                data = await redisClient.get(payload.login)


                if (data === req.query['jwt']) {
                    console.log('--->', data, '|||', req.query['jwt'])
                    res.send(payload);
                }else{
                    res.status(401).send({
                        message: "Недействительный токен."
                    });
                }
            }
        } catch (e) {
            console.log(e)
            res.status(440).send({
                message: "Сеанс клиента истек, и ему необходимо снова войти в систему."
            });
        }
    })
    .post(async function (req, res) {
        let results = (await axios.get(services.users + "/users")).data
        let user = _.find(results, {login: req.body.loginOrMobile})

        if(!req.body.password){
            return res.status(204).send({message: "К сожалению пользователя с таким логином или паролем не существует!"});
        }

        if (Object.keys(user).length === 0 || md5(req.body.password) !== user.passwordHash) {
            return res.status(204).send({message: "К сожалению пользователя с таким логином или паролем не существует!"});
        }

        user = _.pick(user, ['id', 'login', 'name', 'patronymic'])


        const userJWTToken = generateAccessToken(user);
        console.log(userJWTToken);
        await redisClient.set(user.login, userJWTToken);
        console.log(await redisClient.get(user.login))
        res.send(userJWTToken)
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
        let result = (await axios.get(services.users + "/users")).data;


        let s = Sugar.Date.create();
        let k = s.toISOString();
        let newUser = {
            "created_at": "2019-10-03 10:09:21.61",
            "login": req.body.login,
            "name": req.body.name,
            "surname": req.body.surname,
            "patronymic": req.body.patronymic,
            "passwordHash": md5(req.body.passwordHash),
            "mobilenumber": req.body.mobilenumber,
            "role": result.length === 0? roleMod.id : roleUser.id,
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

async function isModerator(jwt) {
    let result = false;
    try {
        let payload = await verifyTokenAndGetPayload(jwt);
        let data = await redisClient.get(payload.login);
        let userinfo = (await axios.get(services.users + "/users/"+payload.id)).data;


        if (data === jwt && _.isEqual(userinfo.role, roleMod)) {
            result = true;
        }
    } catch (e) {
        result = false;
    }
    return result;
}

async function isGovermentor(jwt) {
    let result = false;
    try {
        let payload = await verifyTokenAndGetPayload(jwt);
        let data = await redisClient.get(payload.login);
        let userinfo = (await axios.get(services.users + "/users/"+payload.id)).data;


        if (data === jwt && _.isEqual(userinfo.role, roleGov)) {
            result = true;
        }
    } catch (e) {
        result = false;
    }
    return result;
}

app.route('/user/:id').patch(async (req, res)=>{
    let jwt = req.headers['token'];
    let userId = req.params.id; //or use req.param('id')

    const isModer = await isModerator(jwt);

    let isOwner = false;
    try {
        let payload = await verifyTokenAndGetPayload(jwt);
        isOwner = Number(payload.id) === Number(userId);
    }catch (e) {
    }


    if(!(isModer || isOwner)){
        res.status(403).send({
            message: "У пользователя не хватает прав доступа к запрашиваемому ресурсу."
        });
        return;
    }


    let result;

    req.body = _.omit(req.body, ['created_at', 'description'])

    try {
        result = (await axios.put(services.users + "/users/" + userId, req.body)).data;
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

            for (const res of results) {
                res['author'] = (await axios.get(services.users + "/users/" + res.authorid)).data;
                res.comments = _.sortBy(res.comments, 'id')
                for (const c of res.comments)
                    c.createdBy = (await axios.get(services.users + "/users/" + c.createdBy)).data;
            }

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


        let payload;
        try {
            let jwt = req.headers['token'];
            payload = await verifyTokenAndGetPayload(jwt);
            let changer = (await axios.get(services.users + "/users/" + payload.id)).data;
            let srcAppeal = (await axios.get(services.appeals + "/appeal/" + appealId)).data;
            let author = (await axios.get(services.users + "/users/" + srcAppeal.authorid)).data;

            try {
                result = (await axios.patch(services.appeals + "/appeal/" + appealId, req.body)).data;
            } catch (e) {
                console.log(e);
            }

            /*const isModer = await isModerator(jwt);
                    const isGovner = await isGovermentor(jwt);
                    if(!(isModer || isGovermentor)){
                        res.status(403).send({
                            message: "У пользователя не хватает прав доступа к запрашиваемому ресурсу."
                        });
                        return;
                    }*/

            if(req.body.status && req.body.status === "accepted"){
                let pdffilename = await fillTemplate(
                    `${author.name} ${author.surname} ${author.patronymic}`,
                    req.body.description || srcAppeal.description,
                    new Date().toISOString().slice(0, 10)
                );

                console.log('generated pdf with name ', pdffilename);


                let govmans = (await axios.get(services.users + "/users/")).data;
                govmans =  _.filter(govmans, {role: {id: roleGov.id}});
                for (const govman of govmans) {
                    let res = await axios.post(services.emailService + '/sendAttachmentEmail', {
                        to: govman.email,
                        subject: `Уведомление о новом обращении №${srcAppeal.id}`,
                        content: `Здраствуйте уважаемый ${govman.name} ${govman.surname} ${govman.patronymic}!\n\nПожалуйста отреагируйте пожалуйста на данное обращение с уникальным номером ${srcAppeal.id}. Для того Чтобы отреагировать необходимо зайти на портал, затем перейти в карточку обращения и его перевести его в статус исполнение, и соответственно предпринять все меры по её устранению!\n\nСодержимое обращения:\n${req.body.description || srcAppeal.description}`,
                        attachments: [services.fileService+`/file/preview/${pdffilename}`]
                    })
                    console.log('send mail with body', res);
                }
            }


            res.send(result);
        } catch (e) {
            console.log(e)
            res.status(440).send({
                message: "Сеанс клиента истек, и ему необходимо снова войти в систему."
            });
        }


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


function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}


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

            try {
                const retry = require('async-await-retry');

                try {
                    const result = await retry(async () => {
                        return new Promise((resolve) => {
                            resolve(axios.post(services.appeals + "/appeal/", newAppeal))
                            console.log('The function (related with '+services.appeals+') execution failed!');
                        })
                    }, null, {exponential: true, factor: 3, jitter: 100,
                        onAttemptFail: async (data) => {
                            if (data.currentRetry === 0) {
                                res.status(502).send({
                                    message: "Сервер, действуя как шлюз или прокси, получил неверный ответ от вышестоящего сервера, к которому он обращался, пытаясь выполнить запрос."
                                });
                            }
                            await delay(3000);

                            return true;
                        }
                    })

                    res.send(result.data);



                } catch (err) {
                    console.log('The function execution failed !');

                }


            } catch (e) {
                console.log(e);
            }
        } else {
            res.status(440).send({
                message: "Сеанс клиента истек, и ему необходимо снова войти в систему."
            });
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

app.route('/userPassword')
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
        let results = [];
        try {
            let newComment = {
                "createdBy": (await getTokenPayload(req.headers["token"])).id,
                "content": req.body['content'],
                "appeal": req.body['appeal'],
            }

            results = (await axios.post(services.appeals + "/comments/", newComment)).data
            console.log(results);
        } catch (e) {
            console.log(e);
        }
        res.send(results);


    })
    .put(function (req, res) {
        res.send('Update the comment');
    });

app.get('/file/preview/:id', async function (req, res) {
    var filefakename = req.params.id;
    res.redirect(services.fileService_external+'/file/preview/'+filefakename);
})

app.post('/file', async (req, res) => {
    let collectionFakeFilenames = [];
    var form = new URLSearchParams();
    let result = undefined;

    if (!req.files) {
        res.send({
            status: false,
            message: 'No file uploaded'
        });
        return;
    } else if (req.files['uploadedFile[]'].length) {
        const files = req.files['uploadedFile[]'];
        // for (const file of files) {
        //     formData.append('uploadedFile['+file.name+']', file.data, file.name)
        // }

        for (const file of files) {
            const idx = files.indexOf(file);
            var formData = new FormData();

            formData.append('uploadedFile[]', file.data, file.name);
            // formData.append('uploadedFile['+idx+']', item.data, item.name)

            const t = await axios({
                method: 'post',
                url: services.fileService + '/upload_file',
                data: formData,
                maxContentLength: Infinity,
                maxBodyLength: Infinity,
                headers: {
                    ...formData.getHeaders(),
                    'Content-Type': 'multipart/form-data'
                }
            });
            collectionFakeFilenames.push(t.data.fileFakeName[0]);
        }

        result = {
            status: true,
            message: 'Files are uploaded',
            fileFakeName: collectionFakeFilenames,
        }

        res.send(result);
    } else if(req.files['uploadedFile[]']){
        const file = req.files['uploadedFile[]'];
        var formData = new FormData();
        formData.append('uploadedFile[]', file.data, file.name);

        result = await axios.post(services.fileService+'/upload_file', formData, {
            headers: {
                ...formData.getHeaders(),
                'Content-Type': 'multipart/form-data'
            }
        })

        if(result.status === 200){
            res.send(result.data);
        }
    }




});
 
app.listen(process.env.gateway_port);
