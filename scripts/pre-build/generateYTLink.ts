/* eslint-disable camelcase */
import axios from 'axios'
import { getSheetRows, saveJSON } from './utils'
import dotenv from 'dotenv'
import { join } from 'node:path'

import type { GoogleSpreadsheet } from 'google-spreadsheet'

async function fetchRemoteData () {
  const { data } = await axios.get<unknown[]>(`https://coscup.org/${process.env.VITE_YEAR}/json/ytLink.json`)
    .catch((e) => {
      console.log(e)
      return { data: [] as unknown[] }
    })
  return data
}

export default async function run (doc: GoogleSpreadsheet | null) {
  dotenv.config({ path: join(process.cwd(), '.env') })
  dotenv.config({ path: join(process.cwd(), '.env.local') })

  let data: unknown
  if (doc === null) {
    data = await fetchRemoteData()
  } else {
    const rows = await getSheetRows(doc, 'youtube')
    data = Object.fromEntries(rows.map((r) => ([
      r.room,
      /(.*?)(^|\/|v=)([a-z0-9_-]{11})(.*)?/gim.exec(r.link)?.[3] ?? null
    ])))
  }
  saveJSON('ytLink', data)
}
