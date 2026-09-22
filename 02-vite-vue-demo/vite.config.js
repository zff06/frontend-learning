import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
})
