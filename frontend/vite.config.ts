import reactRefresh from '@vitejs/plugin-react-refresh';
import {defineConfig} from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  server:{
    proxy:{
      // '/api':'https://blocksbackend.onrender.com/'
      '/api':'http://localhost:5000/'
    }
  },
  plugins:[react()]
})


// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': 'http://localhost:5000/'
//     }
//   },
//   plugins: [
//     reactRefresh()
//   ]
// });