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
import { middleware } from '#start/kernel'
import AuthController from '#controllers/auth_controller'
import QuizController from '#controllers/quiz_controller'
import ProfileController from '#controllers/profiles_controller'
import ExperienceController from '#controllers/experience_controller'
import PlantController from '#controllers/plant_controller'

// landing pages
router.on('/').renderInertia('LandingPage')

// login page
router.post('/login', [AuthController, 'login'])
router.get('/login', async ({ inertia }) => {
  return inertia.render('Auth/Login') 
})

router.get('/logout', [AuthController, 'logout'])

//sign up page
router.get('/signup', async ({ inertia }) => {
    return inertia.render('Auth/Signup') 
  })
  
router.post('/signup', [AuthController, 'signup'])

//dashboard user biasa 
router.get('/dashboard', async ({ session, inertia }) => {
  const user = session.get('user')
  return inertia.render('Dashboard', { user })
}).use([
  middleware.auth(),
  middleware.role(['user']) // hanya untuk role 'user'
])


// dashboard admin
router.get('/DashboardAdmin', async ({ session, inertia }) => {
  const user = session.get('user')
  return inertia.render('DashboardAdmin', { user })
}).use([
  middleware.auth(),
  middleware.role(['admin']) // hanya untuk role 'admin'
])

// Plant Quiz page
router.get('plant-quiz', [QuizController, 'index']).use([middleware.auth(), middleware.role(['user'])])
router.get('plant-quiz/data', [QuizController, 'getData'])
router.post('plant-quiz/calculate', [QuizController, 'calculateResult'])


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
}).use([middleware.auth(), middleware.role(['user'])])


router.post('/profile/update', [ProfileController, 'update']).use([middleware.auth(), middleware.role(['user'])])

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
}).use([middleware.auth(), middleware.role(['user'])])

router.get('/guides', [ExperienceController, 'index']).use([middleware.auth(), middleware.role(['user'])])
// POST guides (harus login dulu)
router.post('/guides', [ExperienceController, 'store']).use([middleware.auth(), middleware.role(['user'])])

// DELETE guides/:id (harus login dulu)
router.delete('/guides/:id', [ExperienceController, 'delete']).use([middleware.auth(), middleware.role(['user'])])
router.post('/guides/:id/edit',[ExperienceController, 'edit']).use([middleware.auth(), middleware.role(['user'])]) 
router.put('/guides/:id', [ExperienceController, 'update']) .use([middleware.auth(), middleware.role(['user'])])

router.get('/plants', [PlantController, 'index']).use([middleware.auth(), middleware.role(['user'])]) 
router.get('/plants/:id', [PlantController, 'show']).use([middleware.auth(), middleware.role(['user'])]) 


router.post('/plants/:plantId/steps/:stepId/challenges/:challengeId/complete', [PlantController, 'completeChallenge']).use([middleware.auth(), middleware.role(['user'])])
router.post('/plants/:plantId/steps/:stepId/challenges/:challengeId/note', [PlantController, 'saveNote']).use([middleware.auth(), middleware.role(['user'])])