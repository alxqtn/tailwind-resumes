const path = require('path')
const puppeteer = require('puppeteer')
const pug = require('pug')

const [_1, _2, folder, lng] = process.argv
const fileRoot = path.resolve(__dirname, "data", folder)
const templatePath = path.resolve(fileRoot, "template.pug")

const contentsFile = lng ? `contents.${lng}.json` : "contents.json"
const resultsFile = lng ? `result.${lng}.pdf` : "result.pdf"

const contents = require(path.resolve(fileRoot, contentsFile))
const renderedTemplate = pug.renderFile(templatePath, { ...contents, basedir: fileRoot })

const generatePdf = async () => {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.setContent(renderedTemplate)
  await page.waitFor(1000)

  await page.pdf({
    path: path.resolve(fileRoot, resultsFile),
    printBackground: true
  })

  console.log('Generated')

  await browser.close()
}

generatePdf()
