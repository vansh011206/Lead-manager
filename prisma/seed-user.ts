import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function seedUser() {
  const email = "admin@forgeweb.in";
  const password = "ForgeWeb@2024";
  const name = "ForgeWeb Admin";

  // Check if user already exists
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    console.log(`✓ User "${email}" already exists. Skipping.`);
    return;
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      role: "admin",
    },
  });

  console.log(`✓ Admin user created successfully!`);
  console.log(`  Email: ${email}`);
  console.log(`  Password: ${password}`);
  console.log(`  Name: ${name}`);
  console.log(`  ID: ${user.id}`);
}

seedUser()
  .catch((e) => {
    console.error("Failed to seed user:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
