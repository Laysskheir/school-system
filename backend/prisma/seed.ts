import { AdmissionStatus, PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  // Seed users
  console.log('Seeding users...');

  // Check if admin user already exists
  const adminExists = await prisma.user.findUnique({
    where: { email: 'admin@gmail.com' },
  });

  if (!adminExists) {
    // Create admin user
    const hashedPassword = await bcrypt.hash('admin', 10);
    await prisma.user.create({
      data: {
        email: 'admin@gmail.com',
        password: hashedPassword,
        name: 'Admin User',
        role: Role.ADMIN,
      },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  // Seed students
  console.log('Seeding students...');

  // Check if students already exist
  const studentCount = await prisma.student.count();

  if (studentCount === 0) {
    // Create sample students
    await prisma.student.createMany({
      data: [
        {
          firstName: 'Haydar',
          lastName: 'Mehdi',
          gradeLevel: 1,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Submitted,
          notes: 'Note',
        },
        {
          firstName: 'Ahmad',
          lastName: 'Yousaf',
          gradeLevel: 2,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Scheduled,
          notes: 'Note',
        },
        {
          firstName: 'Rose',
          lastName: 'Charara',
          gradeLevel: 3,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Approved,
          notes: 'Note',
        },
        {
          firstName: 'Ali',
          lastName: 'Hassan',
          gradeLevel: 4,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Attended,
          notes: 'Note',
        },
        {
          firstName: 'Lina',
          lastName: 'Khalil',
          gradeLevel: 5,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Ahmad',
          lastName: 'Yousaf',
          gradeLevel: 7,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Pending,
          notes: 'Note',
        },
        {
          firstName: 'Lara',
          lastName: 'Yousaf',
          gradeLevel: 2,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Approved,
          notes: 'Note',
        },
        {
          firstName: 'Sally',
          lastName: 'Merhi',
          gradeLevel: 4,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.ContractSent,
          notes: 'Note',
        },
        {
          firstName: 'Sarah',
          lastName: 'Mehdi',
          gradeLevel: 12,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Enrolled,
          notes: 'Note',
        },
        {
          firstName: 'Lina',
          lastName: 'Nassereddine',
          gradeLevel: 5,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.PackageSent,
          notes: 'Note',
        },
        {
          firstName: 'Omar',
          lastName: 'Fakhoury',
          gradeLevel: 9,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Oussama',
          lastName: 'Hijazi',
          gradeLevel: 7,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Ali',
          lastName: 'Charara',
          gradeLevel: 10,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Void,
          notes: 'Note',
        },
        {
          firstName: 'Maya',
          lastName: 'Saad',
          gradeLevel: 6,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rejected,
          notes: 'Note',
        },
        {
          firstName: 'Zeinab',
          lastName: 'Abdallah',
          gradeLevel: 8,
          previousSchool: 'Cedar Elementary',
          admissionStatus: AdmissionStatus.Submitted,
          notes: 'Note',
        },
        {
          firstName: 'Karim',
          lastName: 'Nassar',
          gradeLevel: 11,
          previousSchool: 'International Academy',
          admissionStatus: AdmissionStatus.Attended,
          notes: 'Note',
        },
        {
          firstName: 'Nour',
          lastName: 'Khoury',
          gradeLevel: 1,
          previousSchool: 'Little Stars Daycare',
          admissionStatus: AdmissionStatus.Approved,
          notes: 'Note',
        },
        {
          firstName: 'Rami',
          lastName: 'Abboud',
          gradeLevel: 5,
          previousSchool: 'Oakwood Elementary',
          admissionStatus: AdmissionStatus.ContractSent,
          notes: 'Note',
        },
        {
          firstName: 'Yasmine',
          lastName: 'Hayek',
          gradeLevel: 2,
          previousSchool: 'None',
          admissionStatus: AdmissionStatus.Scheduled,
          notes: 'Note',
        },
        {
          firstName: 'Ibrahim',
          lastName: 'Mansour',
          gradeLevel: 9,
          previousSchool: 'Valley Middle School',
          admissionStatus: AdmissionStatus.PackageSent,
          notes: 'Note',
        },
        {
          firstName: 'Dalia',
          lastName: 'Hammoud',
          gradeLevel: 2,
          previousSchool: 'Sunshine Elementary',
          admissionStatus: AdmissionStatus.Pending,
          notes: 'Note',
        },
        {
          firstName: 'Sami',
          lastName: 'Farhat',
          gradeLevel: 12,
          previousSchool: 'International School of Beirut',
          admissionStatus: AdmissionStatus.Enrolled,
          notes: 'Note',
        },
        {
          firstName: 'Leila',
          lastName: 'Darwish',
          gradeLevel: 4,
          previousSchool: 'Pinecrest Academy',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Fadi',
          lastName: 'Ayoub',
          gradeLevel: 10,
          previousSchool: 'Highland High',
          admissionStatus: AdmissionStatus.Rejected,
          notes: 'Note',
        },
        {
          firstName: 'Hala',
          lastName: 'Zakhour',
          gradeLevel: 1,
          previousSchool: 'Montessori Academy',
          admissionStatus: AdmissionStatus.Void,
          notes: 'Note',
        },
        {
          firstName: 'Tarek',
          lastName: 'Saleh',
          gradeLevel: 6,
          previousSchool: 'Riverdale Elementary',
          admissionStatus: AdmissionStatus.Attended,
          notes: 'Note',
        },
        {
          firstName: 'Mariam',
          lastName: 'Kassem',
          gradeLevel: 3,
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.ContractSent,
          notes: 'Note',
        },
        {
          firstName: 'Hassan',
          lastName: 'Sleiman',
          gradeLevel: 1,
          previousSchool: 'Little Explorers',
          admissionStatus: AdmissionStatus.Submitted,
          notes: 'Note',
        },
        {
          firstName: 'Rana',
          lastName: 'Hariri',
          gradeLevel: 11,
          previousSchool: 'Cedar High School',
          admissionStatus: AdmissionStatus.PackageSent,
          notes: 'Note',
        },
      ],
    });
    console.log('Students seeded successfully');
  } else {
    console.log(`${studentCount} students already exist in the database`);
  }

  console.log('All seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
