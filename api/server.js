const file = require('fs');
const express = require('express');
const jsonServer = require('json-server');
const jsonServerAuth = require('json-server-auth');
const formidable = require('formidable');
const { authentication } = require('./auth');
require('dotenv').config();

const middlewares = jsonServer.defaults();

const app = jsonServer.create();
const router = jsonServer.router(process.env.DB);

app.db = router.db;

app.use(middlewares);
app.use(jsonServerAuth);

app.use('/images', express.static('upload'));

app.get('/api/files', authentication, (_req, res) => {
    res.json(router.db.get('attachments'));
});

app.post('/api/files/upload', authentication, (req, res) => {
    const form = formidable({
        multiples: true,
        uploadDir: __dirname + '/upload',
        filename: (fileName) => {
            return fileName + `_${Date.now()}` + '.png';
        },
    });

    form.parse(req, (error, _fields, files) => {
        if (error) {
            res.status(500).json({
                error: error,
            });
            return;
        }
        if (Array.isArray(files.files)) {
            files.files.forEach((file) => {
                router.db
                    .get('attachments')
                    .insert({
                        size: file.size,
                        fileName: file.newFilename,
                        mimetype: file.mimetype,
                    })
                    .write();
            });
        } else {
            router.db
                .get('attachments')
                .insert({
                    size: files.files.size,
                    fileName: files.files.newFilename,
                    mimetype: files.files.mimetype,
                })
                .write();
        }

        res.status(201).json({
            message: 'Success',
            files: files.files,
        });
    });
});

app.delete('/api/files/:id', authentication, (req, res) => {
    const id = Number(req.params.id);
    const record = router.db.get('attachments').find({ id }).value();

    if (!record) {
        res.status(404).json({
            message: 'Không tìm thấy dữ liệu!',
        });
        return;
    } else {
        file.rm(__dirname + '/upload/' + record.fileName, (err) => {
            if (err) {
                res.status(500).json({
                    message: err || err?.message,
                });
            } else {
                router.db
                    .get('attachments')
                    .removeById(Number(req.params.id))
                    .write();

                res.status(200).json({
                    message: 'Success',
                });
            }
        });
    }
});

app.put('/api/terms/update-menu', authentication, (req, res) => {
    req.body.forEach((data) => {
        router.db.get('terms').updateById(data.id, data).write();
    });

    res.json({
        data: req.body,
    });
});

app.use('/api', authentication, router);

app.listen(process.env.PORT, () => {
    console.log('server is running on: http://localhost:' + process.env.PORT);
});
