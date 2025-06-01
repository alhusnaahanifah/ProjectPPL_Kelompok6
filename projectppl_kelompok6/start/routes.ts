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
// import hash from '@adonisjs/core/services/hash'

// Benar:
router.on('/').renderInertia('LandingPage')
// router.on('/plant-quiz').renderInertia('PlantQuiz')
// router.on('/7-step-challenge').renderInertia('SevenStepChallenge')
// router.on('/guides').renderInertia('Guides')
// router.on('/login').renderInertia('Auth/Login')
// router.on('/signup').renderInertia('AuthPages')
// router.on('/dash').renderInertia('Dashboard')

import AuthController from '#controllers/auth_controller'
router.post('/login', [AuthController, 'login'])
// router.get('/login', async ({ inertia }) => {
//   return inertia.render('Auth/Login', {
//     isLogin: true,
//   })
// })

router.get('/login', async ({ inertia }) => {
  return inertia.render('Auth/Login') // atau 'Auth/Login' sesuai lokasi file
})

import QuizController from '#controllers/quiz_controller'

router.get('plant-quiz', [QuizController, 'index']).use(middleware.auth())
router.get('plant-quiz/data', [QuizController, 'getData'])
router.post('plant-quiz/calculate', [QuizController, 'calculateResult'])

router.get('/logout', [AuthController, 'logout'])

router.get('/signup', async ({ inertia }) => {
    return inertia.render('Auth/Signup') // gunakan page yang sama (AuthPages.vue)
  })
  
router.post('/signup', [AuthController, 'signup'])



router.get('/dashboard', async ({ session, inertia, response }) => {
  const user = session.get('user')

  if (!user) {
    return response.redirect('/login')
  }

  return inertia.render('Dashboard', { user })
})


import { middleware } from '#start/kernel'

router.get('/profile', async ({ session, inertia, response }) => {
  const user = session.get('user')

  if (!user) {
    return response.redirect('/login')
  }

  return inertia.render('Profile', {
    user: {
      fullName: user.fullName,
      email: user.email,
    },
  })
})

  .use(middleware.auth())// ✅ ini betul

import ProfileController from '#controllers/profiles_controller'

router.post('/profile/update', [ProfileController, 'update'])

  .use(middleware.auth())

  router.get('/profile/edit', async ({ session, inertia, response }) => {
    const user = session.get('user')
  
    if (!user) {
      return response.redirect('/login')
    }
  
    return inertia.render('ProfileEdit', {
      user: {
        fullName: user.fullName,
        email: user.email,
      },
    })
  })
  
  .middleware([middleware.auth()])

import PlantController from '#controllers/plant_controller'
const GuidesController = () => import('#controllers/guides_controller')

router.get('/info', [GuidesController, 'info']).as('guides.info').use(middleware.auth())

// Community routes - handles experiences (tab 4)
router.get('/guides', [GuidesController, 'index'])

// Community CRUD operations
router.post('/guides', [GuidesController, 'store']).use(middleware.auth())
router.put('/guides/:id', [GuidesController, 'update']).use(middleware.auth())
router.delete('/guides/:id', [GuidesController, 'delete']).use(middleware.auth())

router.post('/guides/:id/edit',[GuidesController, 'edit'])

router.get('/plants', [PlantController, 'index']) 
router.get('/plants/:id', [PlantController, 'show']) 


router.post('/plants/:plantId/steps/:stepId/challenges/:challengeId/complete', [PlantController, 'completeChallenge']).use(middleware.auth());
router.post('/plants/:plantId/steps/:stepId/challenges/:challengeId/note', [PlantController, 'saveNote']).use(middleware.auth());
