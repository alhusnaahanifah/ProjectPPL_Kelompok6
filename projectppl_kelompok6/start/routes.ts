/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

// start/routes.ts
import router from '@adonisjs/core/services/router'

// Benar:
router.on('/').renderInertia('LandingPage')
router.on('/plant-quiz').renderInertia('PlantQuiz')
router.on('/7-day-challenge').renderInertia('SevenDayChallenge')
router.on('/guides').renderInertia('Guides')
router.on('/login').renderInertia('Auth/Login')
// router.on('/signup').renderInertia('AuthPages')
router.on('/dash').renderInertia('Dashboard')

import AuthController from '#controllers/auth_controller'
router.post('/login', [AuthController, 'login'])
// router.get('/login', async ({ inertia }) => {
//   return inertia.render('Auth/Login', {
//     isLogin: true,
//   })
// })

// router.get('/login', async ({ inertia }) => {
//   return inertia.render('Auth/Login') // atau 'Auth/Login' sesuai lokasi file
// })



router.get('/logout', [AuthController, 'logout'])


router.get('/signup', async ({ inertia }) => {
    return inertia.render('Auth/Signup') // gunakan page yang sama (AuthPages.vue)
  })
  
router.post('/signup', [AuthController, 'signup'])


// router.get('/dashboard', async ({ auth, inertia }) => {
//   await auth.use('web').authenticate()
//   return inertia.render('Dashboard') // pastikan file Dashboard.vue ada
// })
import TestController from '#controllers/TestController'
router.get('/test', 'TestController.index')
