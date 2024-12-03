const express = require('express')
const router = express.Router()
const usersRoutes = require('./usersRoutes')
const studentsRoutes = require('./studentsRoutes')
const teachersRoutes = require('./teachersRoutes')
const appointmentRoutes = require('./appointmentRoutes')

router.use(express.json())
router.use('/api/users', usersRoutes)
router.use('/api/appointment', appointmentRoutes)
router.use('/api/students', studentsRoutes)
router.use('/api/teachers', teachersRoutes)


module.exports = router

