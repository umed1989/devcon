const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController')
const request = require('request')
const Profile = require('../models/Profile');
const User = require('../models/User');
const Post = require('../models/Post');


router.get('/me', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({
        user: req.user.id})
    //   }) .populate('user', ['name', 'avatar']);

      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile for this user' });
      }
  
      res.json(profile);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  });

  router.get('/', async (req, res) => {
    try {
        
      const profiles = await Profile.find()
      
      if (!profiles) {
        return res.status(400).json({ msg: 'There are not profiles yet!' });
      }
  
      res.json(profiles);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/:user_id', auth, async (req, res) => {
    try {
      const profile = await Profile.findOne({user: req.params.user_id})

      if (!profile) {
        return res.status(400).json({ msg: 'There is no profile with that id yet!' });
      }
  
      res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post('/', auth, async(req, res) => {
    try {
        console.log('accepted')
        const profile = await Profile.create({user: req.user.id,...req.body})

        res.status(200).json({
            profile
        })
    } catch(error) {
        console.error(error.message);
        res.status(500).json({msg: 'Server error!'})
    }
})

router.delete('/', auth, async(req, res, next) => {
    try {
        //delete profile
        await Profile.findOneAndRemove({user: req.user.id});
        //delete user
        await User.findByIdAndDelete( req.user.id);
        //delete Post
        await Post.deleteMany({user: req.user.id})

        res.send('Success')
    } catch(err){
        console.error(err.message)
        res.status(500).json({msg: 'Server Error!'})
    }
})

router.put('/', auth, async (req, res) => {
    try {
        const updatedProfile = await Profile.findOneAndUpdate({user: req.user.id},  req.body, {new: true})

        if(!updatedProfile) {
            return res.status(404).json({msg: 'There is no profile with this id!'})
        }

        res.status(201).json({
            status: 'success',
            updatedProfile
        })
    } catch(error) {
        console.error(error)
    }
})

router.put('/experience', auth, async (req, res, next) => {
    try {
        console.log(req.body)
        const {title, company, location, from, to, decription, current} = req.body;
        const newExp = {title, company, location, from, to, decription, current};
        let profile = await Profile.findOne({user: req.user.id});
        profile.experience.unshift(newExp);
        
        profile = await profile.save();
        
        res.status(201).json({
            "status": "success",
            profile
        })
    } catch(error) {
        console.log(error)
        res.status(500).json({msg: "Server Error!", err: error.message})
    }
})

router.put('/education', auth, async (req, res, next) => {
    try {
        const {school, degree, fieldOfStudy, from, to, description, current} = req.body;
        const newEdu = {school, degree, fieldOfStudy, from, to, description, current};

        let profile = await Profile.findOne({user: req.user.id});
        profile.education.unshift(newEdu);

        profile = await profile.save();
        res.status(201).json(profile)
    } catch(error) {
        res.status(500).json({msg: "Server Error!"})
        console.error(err.message)
    }
})

router.delete("/education/:edu_id", auth, async(req, res) => {
    try {
        const  profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.education.map(item => item.id).indexOf(req.params.edu_id)
        profile.education.splice(removeIndex, 1)

        await profile.save();
        res.status(201).json({
            status: "success",
            profile
        })
    } catch(err) {
        console.error(err.message)
    }
})

router.delete("/experience/:exp_id", auth, async(req, res) => {
    try {
        const  profile = await Profile.findOne({user: req.user.id});
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id)
        profile.experience.splice(removeIndex, 1)

        await profile.save();
        res.status(201).json({
            status: "success",
            profile
        })
    } catch(err) {
        console.error(err.message)
    }
})

//make http call to github API
router.get('/github/:username', async(req, res) => {
    try {
        const options = {
            uri: `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc&client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`,
            method: "GET",
            headers: {'user-agent': 'node.js'}
        }
        request(options, (error, response) => {
            if(error){
                console.error(error.message)
            }

            if(response.statusCode !== 200) {
                return res.status(404).json({msg: 'Not found!'})
            }
            
            res.json(JSON.parse(response.body))
        })
    } catch(error) {
        console.error(error.message)
    }
})

module.exports = router
