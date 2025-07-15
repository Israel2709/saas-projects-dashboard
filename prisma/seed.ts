import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.event.deleteMany()
  await prisma.project.deleteMany()

  for (let i = 1; i <= 3; i++) {
    const project = await prisma.project.create({
      data: {
        name: `Project ${i}`,
        description: `Project description ${i}`,
      },
    })

    const events = Array.from({ length: 20 }).map((_, j) => ({
      type: `event.type.${j + 1}`,
      payload: {
        userId: `user_${i}_${j + 1}`,
        detail: `Event sample ${j + 1} for Project ${i}`,
      },
      projectId: project.id,
    }))

    await prisma.event.createMany({ data: events })
  }

  console.log('✅ Seed completed succesfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
