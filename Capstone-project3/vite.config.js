import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
            react()],
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import dotenv from 'dotenv'

// dotenv.config()


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [
//             react()],
//               env: {
//                 VITE_SUPABASE_URL: JSON.stringify(process.env.VITE_SUPABASE_URL),
//                 VITE_SUPABASE_ANON_KEY: JSON.stringify(process.env.VITE_SUPABASE_ANON_KEY),
//               }
//             }
// )