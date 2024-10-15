import { createPassword } from './utils'
import { db } from '~/utils/db.server'

async function seed() {
  const email = 'demo@email.com'

  // cleanup the existing database
  await db.user.delete({ where: { email } }).catch(() => {
    // no worries if it doesn't exist yet
  })

  const user = await db.user.create({
    data: {
      email,
      password: {
        create: createPassword('demopassword'),
      },
    },
  })

  await db.issue.create({
    data: {
      title: 'Support OAuth in our app',
      description:
        'We need to implement user authentication via OAuth in our Remix app',
      userId: user.id,
    },
  })

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await db.$disconnect()
  })
