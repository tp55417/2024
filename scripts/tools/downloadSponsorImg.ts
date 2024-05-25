/* eslint-disable camelcase */
import { google, sheets_v4 } from 'googleapis'
import { mkdir, writeFile } from 'fs/promises'
import * as path from 'path'
import get from 'lodash-es/get'
import axios from 'axios'
import dotenv from 'dotenv'
import { join } from 'node:path'

const DIST = path.join(path.resolve('./'), './public/images')

dotenv.config({ path: join(process.cwd(), '.env') })
dotenv.config({ path: join(process.cwd(), '.env.local') })

async function getSpreadsheet (
  sheetRange: string
): Promise<sheets_v4.Schema$Sheet | null> {
  const sheets = google.sheets('v4')
  try {
    const sheetsData = await sheets.spreadsheets.get({
      key: process.env.SPREADSHEET_API_KEY,
      spreadsheetId: process.env.SPREADSHEET_ID,
      includeGridData: true,
      ranges: [sheetRange]
    })
    let imageData = null
    if (sheetsData.data.sheets?.at(0) !== undefined) {
      imageData = sheetsData.data.sheets.at(0)
    }
    return imageData === undefined ? null : imageData
  } catch (err) {
    return null
  }
}

async function collateData (
  imageData: sheets_v4.Schema$Sheet,
  sheetName: string
): Promise<[string, string][] | [string, string][][]> {
  const data = imageData.data?.at(0)?.rowData
  try {
    let image
    if (sheetName === 'Sponsor') {
      image = data
        ?.filter((r) => {
          return (
            get(r, 'values[8].formattedValue') === 'Y' &&
            get(r, 'values[0].formattedValue')?.length !== undefined &&
            get(r, 'values[7].formattedValue')?.length !== undefined
          )
        })
        .map((r) => {
          return [
            get(r, 'values[0].formattedValue'),
            get(r, 'values[7].formattedValue')
          ] as [string, string]
        })
    } else {
      image = data
        ?.filter((r) => {
          return (
            get(r, 'values[7].formattedValue') === 'Y' &&
            get(r, 'values[0].formattedValue')?.length !== undefined &&
            get(r, 'values[1].formattedValue')?.length !== undefined &&
            get(r, 'values[2].formattedValue')?.length !== undefined &&
            get(r, 'values[3].formattedValue')?.length !== undefined
          )
        })
        .map((r) => {
          return [
            [
              `${get(r, 'values[0].formattedValue')}-${get(
                r,
                'values[1].formattedValue'
              )}-horizontal`,
              get(r, 'values[3].formattedValue')
            ] as [string, string],
            [
              `${get(r, 'values[0].formattedValue')}-${get(
                r,
                'values[1].formattedValue'
              )}-vertical`,
              get(r, 'values[2].formattedValue')
            ] as [string, string]
          ]
        })
    }
    image = image === undefined ? [] : image
    return image
  } catch (err) {
    return []
  }
}

function getRawImageUrl (url: string): string {
  if (url.startsWith('https://drive.google.com/file/d/')) {
    return `https://drive.google.com/uc?export=download&id=${
      url.split('/')[5]
    }`
  }
  return url
}

async function downloadImages (
  image: [string, string][] | [string, string][][],
  outputPath: string
) {
  await mkdir(outputPath, { recursive: true })
  if (outputPath.includes('sponsor-news')) {
    for (const data of image as [string, string][][]) {
      for (const entry of data as [string, string][]) {
        const { data: buffer } = await axios.get<Buffer>(
          getRawImageUrl(entry[1]),
          {
            responseType: 'arraybuffer'
          }
        )
        await writeFile(path.join(outputPath, `${entry[0]}.png`), buffer)
      }
    }
  } else {
    for (const entry of image as [string, string][]) {
      const { data: buffer } = await axios.get<Buffer>(
        getRawImageUrl(entry[1]),
        {
          responseType: 'arraybuffer'
        }
      )
      await writeFile(path.join(outputPath, `${entry[0]}.png`), buffer)
    }
  }
}

async function getSponsorImage () {
  const sheetData = await getSpreadsheet('Sponsor')
  if (sheetData === null) {
    console.log('Get Google API Failed')
    return
  }
  const outputPath = path.join(DIST, 'sponsor')
  const imageData = await collateData(sheetData, 'Sponsor')
  await downloadImages(imageData, outputPath)
}

async function getSponsorNewsImage () {
  const sheetData = await getSpreadsheet('SponsorNews')
  if (sheetData === null) {
    console.log('Get Google API Failed')
    return
  }
  const outputPath = path.join(DIST, 'sponsor-news')
  const imageData = await collateData(sheetData, 'SponsorNews')
  await downloadImages(imageData, outputPath)
}

function run () {
  getSponsorImage()
  getSponsorNewsImage()
}

run()
