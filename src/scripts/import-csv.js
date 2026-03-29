import fs from 'node:fs'
import { parse } from 'csv-parse'

const csvPath = new URL('./tasks.csv', import.meta.url)

async function importTasks() {
  const parser = fs.createReadStream(csvPath).pipe(
    parse({
      fromLine: 2,
      trim: true,
      skipEmptyLines: true,
    }),
  )

  for await (const [title, description] of parser) {
    if (!title || !description) {
      continue
    }

    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        description,
      }),
    })
  }
}

importTasks()
  .then(() => {
    console.log('CSV import finished successfully.')
  })
  .catch((error) => {
    console.error('Failed to import CSV tasks.', error)
  })
