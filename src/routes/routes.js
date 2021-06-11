const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
app.use(require('./routes/routes'));
const router = express.Router();
const app = exress();

const diskstorage = multer.diskStorage({
    destination: path.join(_dirname, '../images'),
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-vareshow-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image');

router.get('/', (req, res) => {
    res.send('Welcome to my image app')
})

router.post('/images/post', fileUpload, (req, res) => {
    req.getConnection((err, conn) => {

        if (err) return res.status(500).send('server error')
        const type = req.file.mimetype;
        const name = req.file.originalname;
        const data = fs.readFileSync(path.join(_dirname,
            '../images/' + req.file.filename))
        conn.query('INSERT INTO image SET ?', [{
            type,
            name,
            data
        }], (err, rows) => {
            res.send('image saved!')
        })
    })
})

router.get('/images/get', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.status(500).send('server error');
        conn.query('SELECT * FROM image', (err, rows) => {
            if (err) return res.status(500).send('server error');
            rows.map(img => {
                fs.writeFileSync(path.join(_dirname, '../imagesdb/' + img.id + '-vareshow.png'), img.data)
            })
            const imagedir = fs.readdirSync(path.join(_dirname, '/imagesdb/'))
            res.json(imagedir);
        })
    })
});

module.exports = router;