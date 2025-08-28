import esbuild from 'esbuild'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const mode = process.argv.includes('--mode=prod') ? 'prod' : 'dev'

// UserScript headerを読み込み
const banner = fs.readFileSync(path.join(__dirname, 'src', 'userscript-header.txt'), 'utf8')

// distディレクトリが存在しない場合は作成
const distDir = path.join(__dirname, 'dist')
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

const config = {
  entryPoints: [path.join(__dirname, 'src', 'main.js')],
  bundle: true,
  platform: 'browser',
  target: 'es2017',
  format: 'iife',
  outfile: path.join(__dirname, 'dist', 'main.js'),
  banner: {
    js: banner
  },
  // グローバル変数の設定（TamperMonkey環境用）
  define: {
    'process.env.NODE_ENV': mode === 'prod' ? '"production"' : '"development"'
  }
}

if (mode === 'dev') {
  console.log('🔄 Development mode - watching files...')
  config.sourcemap = true
  config.watch = {
    onRebuild(error, result) {
      if (error) {
        console.error('❌ Build failed:', error)
      } else {
        const stats = fs.statSync(config.outfile)
        const sizeKB = (stats.size / 1024).toFixed(1)
        console.log(`✅ Build succeeded - ${sizeKB} KB`)
      }
    }
  }
} else {
  console.log('🔨 Production mode - building...')
  config.minify = true
  config.treeShaking = true
}

esbuild.build(config)
  .then(() => {
    const stats = fs.statSync(config.outfile)
    const sizeKB = (stats.size / 1024).toFixed(1)
    console.log(`✅ Build completed - ${sizeKB} KB`)
    
    if (sizeKB > 100) {
      console.warn('⚠️  Warning: Bundle size is large (>100KB)')
    }
  })
  .catch((error) => {
    console.error('❌ Build failed:', error)
    process.exit(1)
  })