const express = require('express');
const Photo = require('../models/photo');
// const path = require('path');
// const fs = require('fs');
const router = express.Router();
// Fetch and display all photos
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find().sort({ _id: -1 });
        res.render('index', { photos });
    } catch (err) {
        console.error('Failed to fetch photos', err);
        res.status(500).send('Server Error');
    }
});
// // Route to handle photo deletion
// router.post('/delete/:id', async (req, res) => {
//     try {
//         const photo = await Photo.findById(req.params.id);

//         if (!photo) {
//             return res.status(404).send('Photo not found');
//         }

//         // Delete the image file from the filesystem
//         const filepath = path.join(__dirname, '../public', photo.imageUrl);
//         fs.unlink(filepath, (err) => {
//             if (err) {
//                 console.error('Failed to delete file', err);
//             }
//         });

//         // Delete the photo document from the database
//         await Photo.findByIdAndRemove(req.params.id);

//         res.redirect('/');
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });


module.exports = router;