import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting seeding...')

  // 1. Create the Bean Brothers Chatbot
  // We use 'upsert' so if you run this twice, it won't create duplicates.
  const beanieBot = await prisma.chatbot.upsert({
    where: { id: 'bean-brothers-demo' },
    update: {}, // If it exists, do nothing
    create: {
      id: 'bean-brothers-demo',
      name: 'Bean Brothers Team',
      primaryColor: '#1a1a1a', // The dark background from your design
      accentColor: '#2d2d2d',  // The card color
      greeting: "Hello 👋 I'm Beanie, here to help you with all things coffee! How can I make your coffee experience better today?",
    },
  })

  // 2. Create a Dummy Visitor (for testing)
  const visitor = await prisma.visitor.upsert({
    where: { id: 'demo-visitor' },
    update: {},
    create: {
      id: 'demo-visitor',
      email: 'customer@example.com',
      chatbotId: beanieBot.id,
    },
  })

  // 3. Create a Dummy Message
  await prisma.message.create({
    data: {
      content: 'Hi! Do you have any roasted beans?',
      isBot: false, // Visitor said this
      visitorId: visitor.id,
    },
  })

  console.log(`✅ Seeding finished. Created bot: ${beanieBot.name}`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })