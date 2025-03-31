
import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'
import { createSSRApp, h, type DefineComponent } from 'vue'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name: string) => {
      const pages = import.meta.glob<{ default: DefineComponent }>('../inertia/pages/**/*.vue', { eager: true })
      const path = `../inertia/pages/${name}.vue` // Pastikan path ini match
      
      console.log('Mencari komponen di path:', path) // Debugging
      console.log('Daftar komponen tersedia:', Object.keys(pages)) // Debugging
      
      if (!pages[path]) {
        throw new Error(
          `Komponen ${name} tidak ditemukan!\n` +
          `Pastikan:\n` +
          `1. File ada di: inertia/pages/${name}.vue\n` +
          `2. Nama komponen di export default match dengan nama file`
        )
      }
      
      return pages[path].default
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}