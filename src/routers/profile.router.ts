import { Router } from 'express';
const profileRoutes = Router();
import { Profile } from "../schemas/Profile.model";
import multer from 'multer';
const upload = multer();
import token from '../controllers/user.controller'



// profileRoutes.get('/create', (req, res) => {
//     res.render("createProfile");
// });
//
// profileRoutes.post('/create', upload.none(), async (req, res) => {
//     try {
//         const profileNew = new Profile(req.body);
//         const profile = await profileNew.save();
//         if (profile) {
//             res.render("success", {profile})
//         } else {
//             res.render("error");
//         }
//     } catch (err) {
//         res.render("error");
//     }
// });


profileRoutes.get('/update/:id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.params.id });
        console.log(profile, 'profile')
        if (profile) {
            res.render("updateProfile", {profile: profile})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});

profileRoutes.post('/update', upload.none(), async (req, res) => {
    try {
        const profile = await Profile.findOne({ _id: req.body.id });
        profile.fullname = req.body.fullname;
        profile.age = req.body.age;
        profile.address = req.body.address;
        profile.phone = req.body.phone;

        await profile.save();
        if (profile) {
            res.render("update",{profile})
        } else {
            res.render("error");
        }
    } catch (err) {
        res.render("error");
    }
});


profileRoutes.get('/', async (req, res) => {
    let idUser = token.getIdUser(req, res);
    console.log(idUser)
    // try {
    //     console.log(req.query)
    //     let limit: number;
    //     let offset: number;
    //     if(!req.query.offset || !req.query.limit) {
    //         limit = 3;
    //         offset = 0;
    //     } else {
    //         limit = Number(req.query.limit as string);
    //         offset = Number(req.query.offset as string);
    //     }
    //     const profiles = await Profile.find().limit(limit).skip(offset);
    //     res.render("listProfile", { profiles: profiles });
    // } catch {
    //     res.render("error");
    // }
});
//
// profileRoutes.get('/delete/:id', async (req, res) => {
//     try {
//         console.log(req.params.id)
//         const profile = await Profile.findOneAndDelete({ _id: req.params.id });
//         if (profile) {
//             res.redirect("/profiles/list?offset=0&limit=3")
//         } else {
//             res.render("error");
//         }
//     } catch (err) {
//         res.render("error");
//     }
// });
//


export default profileRoutes;