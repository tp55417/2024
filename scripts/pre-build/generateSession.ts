/* eslint-disable camelcase */
import axios from 'axios'
import md5 from 'js-md5'
import { saveJSON } from './utils'
import { join } from 'path'
import dotenv from 'dotenv'
import CO_WRITE_MAP from './hackmd_url_mappings.json'

const SPEAKER_ZH_NAME_ID = 0
const SPEAKER_ZH_BIO_ID = 0
const SPEAKER_EN_NAME_ID = 0
const SPEAKER_EN_BIO_ID = 174
const SESSION_ZH_DESCRIPTION_ID = 0
const SESSION_EN_TITLE_ID = 173
const SESSION_EN_DESCRIPTION_ID = 175
const SESSION_TAGS_ID = 220
const SESSION_CO_WRITE_ID = 0
const SESSION_QA_ID = 0
const SESSION_SLIDE_ID = 0
const SESSION_RECORD_ID = 2098

const filterUnknownChar = (s: string) => s.replaceAll('\u2028', '\n')

function genResult (talks, rooms, speakers) {
  function getAnswer<T extends { answers: Array<{ question: { id: number }, answer: string }>, [name: string]: string | any }> (
    data: T,
    id: number,
    fallback: string | null
  ): string | null {
    const answer = data.answers.find((a :any) => a.question.id === id)?.answer
    return (!answer || answer === '-') ? fallback : answer
  }

  const resRooms = rooms.results
    .map(r => {
      return {
        id: r.name.en || r.name['zh-tw'],
        zh: {
          name: r.name['zh-tw']
        },
        en: {
          name: r.name.en || r.name['zh-tw']
        }
      }
    })

  const resSpeakers = speakers.results.map(s => {
    const zh_bio = filterUnknownChar(getAnswer(s, SPEAKER_ZH_BIO_ID, s.biography || '-'))
    const en_bio = filterUnknownChar(getAnswer(s, SPEAKER_EN_BIO_ID, s.biography || '-'))

    return {
      id: s.code,
      avatar: s.avatar || `https://www.gravatar.com/avatar/${md5(s.email)}?s=1024&d=identicon&r=g`,
      zh: {
        name: getAnswer(s, SPEAKER_ZH_NAME_ID, s.name),
        bio: zh_bio === '-' ? en_bio : zh_bio
      },
      en: {
        name: getAnswer(s, SPEAKER_EN_NAME_ID, s.name),
        bio: en_bio === '-' ? zh_bio : en_bio
      }
    }
  })

  const tracks = talks.results.map(s => s.track).filter((t, i, s) => i === s.findIndex(tt => tt?.['zh-tw'] === t?.['zh-tw'] && tt?.en === t?.en))
  const resSessionTypes = tracks
    .map(t => {
      return {
        id: Math.random().toString(36).substring(2, 8),
        zh: {
          name: t?.['zh-tw'] || t?.en || 'main'
        },
        en: {
          name: t?.en || t?.['zh-tw'] || 'main'
        }
      }
    })

  const resTags = [
    {
      id: 'Prime',
      zh: {
        name: 'Prime session'
      },
      en: {
        name: 'Prime session'
      }
    },
    {
      id: 'Elementary',
      zh: {
        name: '入門'
      },
      en: {
        name: 'Elementary'
      }
    },
    {
      id: 'Middle',
      zh: {
        name: '中階'
      },
      en: {
        name: 'Middle'
      }
    },
    {
      id: 'Advance',
      zh: {
        name: '進階'
      },
      en: {
        name: 'Advance'
      }
    },
    {
      id: 'Professional',
      zh: {
        name: '專業'
      },
      en: {
        name: 'Professional'
      }
    },
    {
      id: 'zh-tw',
      zh: {
        name: '中文'
      },
      en: {
        name: 'Chinese'
      }
    },
    {
      id: 'en',
      zh: {
        name: 'English'
      },
      en: {
        name: 'English'
      }
    },
    {
      id: 'ja-JP',
      zh: {
        name: '日本語'
      },
      en: {
        name: 'Japanese'
      }
    },
    {
      id: 'taiwanese',
      zh: {
        name: '台語'
      },
      en: {
        name: 'Taiwanese'
      }
    }
  ]

  const getLanguage = (locale: string) => {
    return resTags.find((t) => t.id === locale)?.zh?.name ?? 'English'
  }

  const getTags = (s) => {
    const answer = s.answers.find((a :any) => a.question.id === 216)?.options[0].answer.en
    const tagsMapping:Record<string, string> = {
      Chinese: 'zh-tw',
      English: 'en',
      Japanese: 'ja-JP',
      日文: 'ja-JP',
      Taiwanese: 'taiwanese'
    }

    let lang:string | string[]| undefined = tagsMapping[answer]
    lang = lang ? [lang] : []

    if (lang.length === 0) console.log(answer)

    return lang
      .concat(s.answers.find(a => a.question.id === SESSION_TAGS_ID) !== undefined ? [s.answers.find(a => a.question.id === SESSION_TAGS_ID).options[0].answer.en] : [])
      .concat(s.tags?.includes('prime session') ? ['Prime'] : [])
  }

  const resSessions = talks.results.map((s :any) => {
    return {
      id: s.code,
      type: resSessionTypes.find((t :any) => s.track?.['zh-tw'] === t.zh.name || s.track?.en === t.en.name)?.id ?? resSessionTypes.find((t :any) => t.zh.name === 'main')?.id,
      room: s.slot.room?.en || s.slot.room?.['zh-tw'],
      start: s.slot.start,
      end: s.slot.end,
      language: getLanguage(s.content_locale),
      zh: {
        title: s.title,
        description: getAnswer(s, SESSION_ZH_DESCRIPTION_ID, s.abstract || '')
      },
      en: {
        title: getAnswer(s, SESSION_EN_TITLE_ID, s.title),
        description: getAnswer(s, SESSION_EN_DESCRIPTION_ID, s.abstract || '')
      },
      speakers: s.speakers.map(ss => ss.code),
      tags: getTags(s).concat(s.submission_type.en === 'prime session' ? ['Prime'] : []),
      // co_write: getAnswer(s, SESSION_CO_WRITE_ID, null),
      co_write: CO_WRITE_MAP?.[s.code as keyof typeof CO_WRITE_MAP]?.URL || null,
      qa: getAnswer(s, SESSION_QA_ID, null),
      slide: getAnswer(s, SESSION_SLIDE_ID, null),
      record: getAnswer(s, SESSION_RECORD_ID, null),
      uri: `https://coscup.org/${process.env.VITE_YEAR}/session/${s.code}`
    }
  })

  return {
    sessions: resSessions,
    speakers: resSpeakers,
    session_types: resSessionTypes,
    rooms: resRooms,
    tags: resTags
  }
}

export default async function run () {
  dotenv.config({ path: join(process.cwd(), '.env') })
  dotenv.config({ path: join(process.cwd(), '.env.local') })

  const pretalxOptions = { headers: { Authorization: `Token ${process.env.PRETALX_TOKEN}` } }
  let data = {}
  try {
    const results = await Promise.all([
      axios.get(`https://pretalx.coscup.org/api/events/coscup-${process.env.VITE_YEAR}/talks/?limit=500`, pretalxOptions),
      axios.get(`https://pretalx.coscup.org/api/events/coscup-${process.env.VITE_YEAR}/rooms/?limit=500`, pretalxOptions),
      axios.get(`https://pretalx.coscup.org/api/events/coscup-${process.env.VITE_YEAR}/speakers/?limit=500`, pretalxOptions)
    ])
    data = genResult(results[0].data, results[1].data, results[2].data)
  } catch (e) {
    console.error(e)
    const { data: d } = await axios.get(`https://coscup.org/${process.env.VITE_YEAR}/json/session.json`)
    data = d
  }
  saveJSON('session', data)
}
