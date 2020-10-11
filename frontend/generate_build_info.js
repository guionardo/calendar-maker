const fs = require('fs')

const isProductionEnv = process.env.NODE_ENV === 'production'
const buildDate = new Date().toISOString()
const publicPath = isProductionEnv ? '/calendar-maker/' : '/'
const buildInfo = `// Automatically build - Do not write on this file

export const environment='${isProductionEnv ? 'PROD' : 'DEV'}'
export const buildDate='${buildDate}'
`
const buildInfoFile = 'build_info.js'

const generateBuildInfo = function () {
    console.log('PublicPath = ', publicPath)

    fs.writeFile(buildInfoFile, buildInfo, 'utf-8', (err) => {
        if (err) return console.log(err)
        console.log(`Saved ${buildInfoFile} : ${buildDate}`)
    })
}

export {
    isProductionEnv, buildDate, publicPath, generateBuildInfo
}