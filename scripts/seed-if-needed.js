const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { execSync } = require("child_process");

async function shouldSeed() {
  try {
    const count = await prisma.project.count();
    return count === 0;
  } catch (error) {
    return true;
  } finally {
    await prisma.$disconnect();
  }
}

shouldSeed().then((runSeed) => {
  if (runSeed) {
    console.log("🌱 Running initial seed...");
    try {
      execSync("pnpm exec tsx prisma/seed.ts", { stdio: "inherit" });
    } catch (err) {
      console.error("❌ Seed execution failed:", err);
      process.exit(1);
    }
  } else {
    console.log("✅ Seed skipped: database already contains data.");
  }
});
