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
import PlantController from '#controllers/plant_controller'
import GuidesController from '#controllers/guides_controller'
import AdminController from '#controllers/admin_controller'
import AdminPanduanController from '#controllers/adminpanduan_controller'
import AdminQuizsController from '#controllers/admin_quizs_controller'

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

router.get('/DashboardAdmin', [AdminController, 'index']).use([middleware.auth(), middleware.role(['admin'])])


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


router.post('/plants/:plantId/steps/:stepId/challenges/:challengeId/complete', [PlantController, 'completeChallenge']).use([middleware.auth(), middleware.role(['user'])])
router.post('/plants/:plantId/steps/:stepId/challenges/:challengeId/note', [PlantController, 'saveNote']).use([middleware.auth(), middleware.role(['user'])])

router.get('/admin/users', [AdminController, 'kelolaUsers']).use([middleware.auth(), middleware.role(['admin'])])

// Routes for plants management
router.get('/admin/plants', [AdminController, 'kelolaTanaman']).as('admin.plants.index').use([middleware.auth(), middleware.role(['admin'])])
router.post('/admin/plants', [AdminController, 'storePlant']).as('admin.plants.store').use([middleware.auth(), middleware.role(['admin'])])
router.get('/admin/plants/:id', [AdminController, 'getPlant']).as('admin.plants.show').use([middleware.auth(), middleware.role(['admin'])])
router.put('/admin/plants/:id', [AdminController, 'updatePlant']).as('admin.plants.update').use([middleware.auth(), middleware.role(['admin'])])
router.delete('/admin/plants/:id', [AdminController, 'deletePlant']).as('admin.plants.destroy').use([middleware.auth(), middleware.role(['admin'])])

// Routes for users managemen
router.delete('/admin/users/:id', [AdminController, 'deleteUser']).as('admin.users.destroy').use([middleware.auth(), middleware.role(['admin'])])


// Admin Panduan (Guides) Management Routes
router.get('/admin/panduan', [AdminPanduanController, 'index']).as('admin.panduan.index').use([middleware.auth(), middleware.role(['admin'])])
router.get('/admin/panduan/statistics', [AdminPanduanController, 'getStatistics']).as('admin.panduan.statistics').use([middleware.auth(), middleware.role(['admin'])])

// Infographic Routes
router.post('/admin/panduan/infographics', [AdminPanduanController, 'storeInfographic']).as('admin.panduan.infographics.store').use([middleware.auth(), middleware.role(['admin'])])
router.put('/admin/panduan/infographics/:id', [AdminPanduanController, 'updateInfographic']).as('admin.panduan.infographics.update').use([middleware.auth(), middleware.role(['admin'])])
router.delete('/admin/panduan/infographics/:id', [AdminPanduanController, 'destroyInfographic']).as('admin.panduan.infographics.destroy').use([middleware.auth(), middleware.role(['admin'])])

// Video Routes
router.post('/admin/panduan/videos', [AdminPanduanController, 'storeVideo']).as('admin.panduan.videos.store').use([middleware.auth(), middleware.role(['admin'])])
router.put('/admin/panduan/videos/:id', [AdminPanduanController, 'updateVideo']).as('admin.panduan.videos.update').use([middleware.auth(), middleware.role(['admin'])])
router.delete('/admin/panduan/videos/:id', [AdminPanduanController, 'destroyVideo']).as('admin.panduan.videos.destroy').use([middleware.auth(), middleware.role(['admin'])])

// FAQ Routes
router.post('/admin/panduan/faqs', [AdminPanduanController, 'storeFaq']).as('admin.panduan.faqs.store').use([middleware.auth(), middleware.role(['admin'])])
router.put('/admin/panduan/faqs/:id', [AdminPanduanController, 'updateFaq']).as('admin.panduan.faqs.update').use([middleware.auth(), middleware.role(['admin'])])
router.delete('/admin/panduan/faqs/:id', [AdminPanduanController, 'destroyFaq']).as('admin.panduan.faqs.destroy').use([middleware.auth(), middleware.role(['admin'])])

// Experience Routes (Admin can only delete community experiences)
router.delete('/admin/panduan/experiences/:id', [AdminPanduanController, 'destroyExperience']).as('admin.panduan.experiences.destroy').use([middleware.auth(), middleware.role(['admin'])])

router.group(() => {
  router.get('/admin/quiz', [AdminQuizsController, 'index'])

  router.post('/admin/quiz/pertanyaan', [AdminQuizsController, 'storePertanyaan'])
  router.put('/admin/quiz/pertanyaan/:id', [AdminQuizsController, 'updatePertanyaan'])
  router.delete('/admin/quiz/pertanyaan/:id', [AdminQuizsController, 'deletePertanyaan'])

  router.post('/admin/quiz/jawaban', [AdminQuizsController, 'storeJawaban'])
  router.get('/admin/quiz/jawaban/:tumbuhan', [AdminQuizsController, 'showJawabanByTumbuhan'])
  router.put('/admin/quiz/jawaban/:tumbuhan', [AdminQuizsController, 'updateJawaban'])
  router.delete('/admin/quiz/jawaban/:tumbuhan', [AdminQuizsController, 'deleteJawaban'])
}).use([middleware.auth(), middleware.role(['admin'])])

