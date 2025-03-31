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
router.on('/').renderInertia('landing', { component: 'LandingPage' })
router.on('/plant-quiz').renderInertia('plant_quiz', { component: 'PlantQuiz' })
router.on('/7-day-challenge').renderInertia('seven_day_challenge', { component: 'SevenDayChallenge' })
router.on('/guides').renderInertia('guides', { component: 'Guides' })
