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
          gradeLevel: 'Preschool',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Submitted,
          notes: 'Note',
        },
        {
          firstName: 'Ahmad',
          lastName: 'Yousaf',
          gradeLevel: 'Pre-k',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Scheduled,
          notes: 'Note',
        },
        {
          firstName: 'Rose',
          lastName: 'Charara',
          gradeLevel: 'Kindergarten',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Approved,
          notes: 'Note',
        },
        {
          firstName: 'Ali',
          lastName: 'Hassan',
          gradeLevel: 'Grade 3',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Attended,
          notes: 'Note',
        },
        {
          firstName: 'Lina',
          lastName: 'Khalil',
          gradeLevel: 'Grade 1',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Ahmad',
          lastName: 'Yousaf',
          gradeLevel: 'Grade 7',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Pending,
          notes: 'Note',
        },
        {
          firstName: 'Lara',
          lastName: 'Yousaf',
          gradeLevel: 'Grade 2',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Approved,
          notes: 'Note',
        },
        {
          firstName: 'Sally',
          lastName: 'Merhi',
          gradeLevel: 'Grade 4',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.ContractSent,
          notes: 'Note',
        },
        {
          firstName: 'Sarah',
          lastName: 'Mehdi',
          gradeLevel: 'Grade 12',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Enrolled,
          notes: 'Note',
        },
        {
          firstName: 'Lina',
          lastName: 'Nassereddine',
          gradeLevel: 'Grade 5',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.PackageSent,
          notes: 'Note',
        },
        {
          firstName: 'Omar',
          lastName: 'Fakhoury',
          gradeLevel: 'Grade 9',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Oussama',
          lastName: 'Hijazi',
          gradeLevel: 'Grade 7',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Ali',
          lastName: 'Charara',
          gradeLevel: 'Grade 10',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Void,
          notes: 'Note',
        },
        {
          firstName: 'Maya',
          lastName: 'Saad',
          gradeLevel: 'Grade 6',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.Rejected,
          notes: 'Note',
        },
        {
          firstName: 'Zeinab',
          lastName: 'Abdallah',
          gradeLevel: 'Grade 8',
          previousSchool: 'Cedar Elementary',
          admissionStatus: AdmissionStatus.Submitted,
          notes: 'Note',
        },
        {
          firstName: 'Karim',
          lastName: 'Nassar',
          gradeLevel: 'Grade 11',
          previousSchool: 'International Academy',
          admissionStatus: AdmissionStatus.Attended,
          notes: 'Note',
        },
        {
          firstName: 'Nour',
          lastName: 'Khoury',
          gradeLevel: 'Kindergarten',
          previousSchool: 'Little Stars Daycare',
          admissionStatus: AdmissionStatus.Approved,
          notes: 'Note',
        },
        {
          firstName: 'Rami',
          lastName: 'Abboud',
          gradeLevel: 'Grade 5',
          previousSchool: 'Oakwood Elementary',
          admissionStatus: AdmissionStatus.ContractSent,
          notes: 'Note',
        },
        {
          firstName: 'Yasmine',
          lastName: 'Hayek',
          gradeLevel: 'Pre-k',
          previousSchool: 'None',
          admissionStatus: AdmissionStatus.Scheduled,
          notes: 'Note',
        },
        {
          firstName: 'Ibrahim',
          lastName: 'Mansour',
          gradeLevel: 'Grade 9',
          previousSchool: 'Valley Middle School',
          admissionStatus: AdmissionStatus.PackageSent,
          notes: 'Note',
        },
        {
          firstName: 'Dalia',
          lastName: 'Hammoud',
          gradeLevel: 'Grade 2',
          previousSchool: 'Sunshine Elementary',
          admissionStatus: AdmissionStatus.Pending,
          notes: 'Note',
        },
        {
          firstName: 'Sami',
          lastName: 'Farhat',
          gradeLevel: 'Grade 12',
          previousSchool: 'International School of Beirut',
          admissionStatus: AdmissionStatus.Enrolled,
          notes: 'Note',
        },
        {
          firstName: 'Leila',
          lastName: 'Darwish',
          gradeLevel: 'Grade 4',
          previousSchool: 'Pinecrest Academy',
          admissionStatus: AdmissionStatus.Rescheduled,
          notes: 'Note',
        },
        {
          firstName: 'Fadi',
          lastName: 'Ayoub',
          gradeLevel: 'Grade 10',
          previousSchool: 'Highland High',
          admissionStatus: AdmissionStatus.Rejected,
          notes: 'Note',
        },
        {
          firstName: 'Hala',
          lastName: 'Zakhour',
          gradeLevel: 'Grade 1',
          previousSchool: 'Montessori Academy',
          admissionStatus: AdmissionStatus.Void,
          notes: 'Note',
        },
        {
          firstName: 'Tarek',
          lastName: 'Saleh',
          gradeLevel: 'Grade 6',
          previousSchool: 'Riverdale Elementary',
          admissionStatus: AdmissionStatus.Attended,
          notes: 'Note',
        },
        {
          firstName: 'Mariam',
          lastName: 'Kassem',
          gradeLevel: 'Grade 3',
          previousSchool: 'Previous School',
          admissionStatus: AdmissionStatus.ContractSent,
          notes: 'Note',
        },
        {
          firstName: 'Hassan',
          lastName: 'Sleiman',
          gradeLevel: 'Preschool',
          previousSchool: 'Little Explorers',
          admissionStatus: AdmissionStatus.Submitted,
          notes: 'Note',
        },
        {
          firstName: 'Rana',
          lastName: 'Hariri',
          gradeLevel: 'Grade 11',
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
