const {Router} = require('express')
const router = Router()

router.post('/register', (req, res) => {
  res.json('Login Route')
})
router.post('/login', (req, res) => {
  res.json('Login Route')
})

module.exports = router
