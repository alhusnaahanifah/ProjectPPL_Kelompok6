/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import '../css/app.css';
import { createSSRApp, h } from 'vue'
import type { DefineComponent } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: '#5468FF' },

  title: (title) => `${title} - ${appName}`,

  resolve: (name: string) => {
    return resolvePageComponent(
      `../inertia/pages/${name}.vue`,
      import.meta.glob<{ default: DefineComponent }>('../inertia/pages/**/*.vue')
    ).then(module => module.default || module) as Promise<DefineComponent>
  },

  setup({ el, App, props, plugin }) {
    
    createSSRApp({ render: () => h(App, props) })
    
      .use(plugin)
      .mount(el)
  },
})