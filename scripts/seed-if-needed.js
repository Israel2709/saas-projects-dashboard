const { execSync } = require("child_process");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.project.count();
  if (count > 0) {
    console.log("✅ Seed not needed.");
    return;
  }

  console.log("🌱 Running initial seed...");
  execSync("pnpm exec tsx prisma/seed.ts", { stdio: "inherit" });
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error("❌ Seed execution failed:", e);
    process.exit(1);
  });
