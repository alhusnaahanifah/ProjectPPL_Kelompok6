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
import hash from '@adonisjs/core/services/hash'

// Benar:
router.on('/').renderInertia('LandingPage')
router.on('/plant-quiz').renderInertia('PlantQuiz')
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

import ExperienceController from '#controllers/experience_controller'
import PlantController from '#controllers/plant_controller'

router.get('/guides', [ExperienceController, 'index'])
// POST guides (harus login dulu)
router.post('/guides', [ExperienceController, 'store']).use(middleware.auth())

// DELETE guides/:id (harus login dulu)
router.delete('/guides/:id', [ExperienceController, 'delete']).use(middleware.auth())
router.post('/guides/:id/edit',[ExperienceController, 'edit']) 
router.put('/guides/:id', [ExperienceController, 'update']) 

router.get('/plants', [PlantController, 'index']) 
router.get('/plants/:id', [PlantController, 'show']) 



