const express = require('express');
const { body, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Photo = require('../models/photo');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// Render the upload form
router.get('/', (req, res) => {
    res.render('upload', {
        title: '',
        description: '',
        errors: []
    });
});

router.post(
    '/',
    upload.single('photo'),
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('description').notEmpty().withMessage('Description is required'),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('upload', {
                errors: errors.array(),
                title: req.body.title || '',
                description: req.body.description || '',
            });
        }

        const filename = req.file.filename;
        const filepath = `/images/${filename}`;

        try {
            const newPhoto = new Photo({
                title: req.body.title,
                description: req.body.description,
                imageUrl: filepath,
            });

            await newPhoto.save();
            res.redirect('/');
        } catch (err) {
            console.error('Failed to save photo', err);
            res.status(500).send('Server Error');
        }
    }
);

module.exports = router;
