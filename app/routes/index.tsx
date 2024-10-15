import { json, useLoaderData } from '@remix-run/react'
import { db } from '~/utils/db.server'

export async function loader() {
  const issues = await db.issue.count()
  return json({
    issues,
  })
}

export default function Index() {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="grid h-screen place-items-center">
      <h1>Current issues {data.issues}</h1>
    </div>
  )
}
