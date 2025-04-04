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
router.on('/login').renderInertia('AuthPages')
router.on('/signup').renderInertia('AuthPages')
