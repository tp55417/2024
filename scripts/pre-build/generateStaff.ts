// Copyright (c) 2020 DevilTea
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import axios from 'axios'
import { saveJSON } from './utils'
import dotenv from 'dotenv'
import { join } from 'node:path'

export default async function run () {
  dotenv.config({ path: join(process.cwd(), '.env') })
  dotenv.config({ path: join(process.cwd(), '.env.local') })

  const { data: { data } } = await axios.get(`https://volunteer.coscup.org/api/members?pid=${process.env.VITE_YEAR}`)
  saveJSON('staff', data)
}
