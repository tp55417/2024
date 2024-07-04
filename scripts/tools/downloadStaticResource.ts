import downloadCommunityImage from './downloadCommunityImg'
import downloadSponsorImage from './downloadSponsorImg'

async function main () {
  const task = [downloadCommunityImage(), downloadSponsorImage()]

  return await Promise.all(task)
}

main().then(() => process.exit())
