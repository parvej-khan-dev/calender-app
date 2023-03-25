



const { Router } = require('express');
const router = Router(); 
const User = require('../model/User') 

// Get all users
router.get('/', async(req, res) => {
    try {
        const users = await User.find()
        res.send(users)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Create a new user
router.post('/users', async(req, res) => {
    try {
        let user = new User(req.body)
        user.password = bycrpt.hashsys
        user = await user.save()
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get user By ID
router.get('/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update user By ID
router.put('/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {
            key:value
        },{new: true})
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete user By ID
router.delete('/:id', async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router