import { spawnSync } from 'node:child_process'

const MAX_TARBALL_SIZE_BYTES = Number(process.env.ARKTOS_MAX_TARBALL_SIZE_BYTES || 2_500_000)

function formatKilobytes(bytes) {
  return `${(bytes / 1024).toFixed(1)} kB`
}

function extractJsonReport(output) {
  const lines = output.trim().split('\n')

  for (let index = lines.length - 1; index >= 0; index -= 1) {
    const candidate = lines.slice(index).join('\n').trim()

    if (!candidate.startsWith('[') && !candidate.startsWith('{')) {
      continue
    }

    try {
      return JSON.parse(candidate)
    } catch {
      continue
    }
  }

  return null
}

const result = spawnSync('npm', ['pack', '--dry-run', '--json'], {
  cwd: process.cwd(),
  encoding: 'utf8',
})

if (result.status !== 0) {
  process.stderr.write(result.stderr || result.stdout)
  process.exit(result.status ?? 1)
}

const stdout = result.stdout.trim()
const report = extractJsonReport(stdout)
const tarball = Array.isArray(report) ? report[0] : report

if (!tarball || typeof tarball.size !== 'number') {
  console.error('Could not read tarball size from npm pack output.')
  process.exit(1)
}

console.log(
  [
    `Tarball: ${tarball.filename}`,
    `Size: ${formatKilobytes(tarball.size)}`,
    `Unpacked: ${formatKilobytes(tarball.unpackedSize)}`,
    `Files: ${tarball.files?.length ?? 'n/a'}`,
  ].join(' | '),
)

if (tarball.size > MAX_TARBALL_SIZE_BYTES) {
  console.error(
    `Tarball size exceeds limit: ${formatKilobytes(tarball.size)} > ${formatKilobytes(MAX_TARBALL_SIZE_BYTES)}`,
  )
  process.exit(1)
}
