import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdmissionStatus } from '@prisma/client';

@Injectable()
export class StudentsService {
  constructor(private prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    return this.prisma.student.create({
      data: createStudentDto,
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.student.count(),
    ]);

    return {
      data: students,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    return this.prisma.student.findUnique({
      where: { id },
    });
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    return this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: string) {
    return this.prisma.student.delete({
      where: { id },
    });
  }

  async updatePreviousSchool(id: string, previousSchool: string) {
    try {
      return await this.prisma.student.update({
        where: { id },
        data: { previousSchool },
      });
    } catch (error) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
  }

  async getAdmissionStatusCounts() {
    const statuses = Object.values(AdmissionStatus);
    const counts = await Promise.all(
      statuses.map(async (status) => {
        const count = await this.prisma.student.count({
          where: { admissionStatus: status },
        });
        return { status, count };
      }),
    );

    return counts;
  }
}
