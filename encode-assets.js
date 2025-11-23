const path = require('path')
const fs = require('fs')

const assetsDir = path.resolve(__dirname, "data", "assets")
const assetsFile = path.resolve(__dirname, "data", "assets.json")

const assets = {}

const mimeTypes = {
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml'
}

// Check if assets directory exists
if (!fs.existsSync(assetsDir)) {
  console.log(`ℹ No assets folder found at ${assetsDir}`)
  fs.writeFileSync(assetsFile, JSON.stringify(assets, null, 2))
  console.log(`✓ Created empty assets.json`)
  process.exit(0)
}

// Read all files in assets directory
const files = fs.readdirSync(assetsDir)

files.forEach(filename => {
  const filePath = path.resolve(assetsDir, filename)
  const stat = fs.statSync(filePath)

  // Skip directories
  if (stat.isDirectory()) return

  const ext = path.extname(filename).slice(1).toLowerCase()

  // Only process jpg, png, and svg
  if (!mimeTypes[ext]) return

  const buffer = fs.readFileSync(filePath)
  const mimeType = mimeTypes[ext]
  const base64 = buffer.toString('base64')
  const assetName = path.basename(filename, path.extname(filename))

  assets[assetName] = `data:${mimeType};base64,${base64}`
  console.log(`✓ Encoded ${filename} as ${assetName}`)
})

// Write assets.json
fs.writeFileSync(assetsFile, JSON.stringify(assets, null, 2))
console.log(`✓ Saved to ${assetsFile}`)
