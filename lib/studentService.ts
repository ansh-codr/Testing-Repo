import { db, storage } from './firebase';
import { collection, doc, setDoc, getDocs, query, where, orderBy, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import * as XLSX from 'xlsx';

export interface Student {
  id: string;
  name: string;
  class: string;
  section: string;
  rollNo: string;
  dob?: string;
  fatherName?: string;
  motherName?: string;
  phone?: string;
  email?: string;
  address?: string;
  subjects?: string[];
  attendance?: string;
  fees?: string;
  passcode: string;
  createdAt: Date;
  updatedAt: Date;
}

const STUDENTS_COLLECTION = 'students';
const EXCEL_FILES_COLLECTION = 'excel_files';

export class StudentService {
  // Upload Excel file to Firebase Storage and process data
  static async uploadExcelFile(file: File): Promise<{ success: boolean; message: string; recordsCount?: number }> {
    try {
      // Validate file type
      if (!file.name.endsWith('.xlsx')) {
        return { success: false, message: 'Invalid file type. Please upload an Excel (.xlsx) file' };
      }

      // Read and parse Excel file
      const buffer = await file.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet) as any[];

      if (jsonData.length === 0) {
        return { success: false, message: 'Excel file is empty' };
      }

      // Validate required columns
      const requiredColumns = ['id', 'name', 'class', 'section', 'rollNo', 'passcode'];
      const firstRow = jsonData[0];
      const missingColumns = requiredColumns.filter(col => !(col in firstRow));
      
      if (missingColumns.length > 0) {
        return { success: false, message: `Missing required columns: ${missingColumns.join(', ')}` };
      }

      // Upload file to Firebase Storage
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const fileName = `students_${timestamp}.xlsx`;
      const storageRef = ref(storage, `excel-files/${fileName}`);
      await uploadBytes(storageRef, buffer);
      const downloadURL = await getDownloadURL(storageRef);

      // Clear existing student data
      await this.clearAllStudents();

      // Process and save student data to Firestore
      const batch = [];
      const now = new Date();

      for (const row of jsonData) {
        const student: Student = {
          id: row.id,
          name: row.name,
          class: row.class?.toString(),
          section: row.section,
          rollNo: row.rollNo?.toString(),
          dob: row.dob,
          fatherName: row.fatherName,
          motherName: row.motherName,
          phone: row.phone?.toString(),
          email: row.email,
          address: row.address,
          subjects: row.subjects ? row.subjects.split(',').map((s: string) => s.trim()) : [],
          attendance: row.attendance,
          fees: row.fees,
          passcode: row.passcode?.toString(),
          createdAt: now,
          updatedAt: now
        };

        batch.push(setDoc(doc(db, STUDENTS_COLLECTION, student.id), student));
      }

      await Promise.all(batch);

      // Save file metadata
      await setDoc(doc(db, EXCEL_FILES_COLLECTION, fileName), {
        fileName,
        downloadURL,
        uploadedAt: now,
        recordsCount: jsonData.length,
        isActive: true
      });

      return { 
        success: true, 
        message: 'File uploaded and processed successfully', 
        recordsCount: jsonData.length 
      };

    } catch (error) {
      console.error('Upload error:', error);
      return { success: false, message: 'Internal server error during upload' };
    }
  }

  // Clear all existing student data
  static async clearAllStudents(): Promise<void> {
    const studentsRef = collection(db, STUDENTS_COLLECTION);
    const snapshot = await getDocs(studentsRef);
    
    const deletePromises = snapshot.docs.map(doc => deleteDoc(doc.ref));
    await Promise.all(deletePromises);
  }

  // Search students with filters
  static async searchStudents(searchQuery?: string, filter?: string): Promise<Student[]> {
    try {
      const studentsRef = collection(db, STUDENTS_COLLECTION);
      let q = query(studentsRef, orderBy('name'));

      const snapshot = await getDocs(q);
      let students = snapshot.docs.map(doc => ({ ...doc.data() } as Student));

      // Apply search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        students = students.filter(student => {
          const searchableFields = [
            student.name?.toLowerCase() || '',
            student.id?.toLowerCase() || '',
            student.class?.toLowerCase() || '',
            student.section?.toLowerCase() || '',
            student.rollNo?.toLowerCase() || '',
            student.fatherName?.toLowerCase() || '',
            student.motherName?.toLowerCase() || ''
          ];

          if (filter && filter !== 'all') {
            switch (filter) {
              case 'name':
                return student.name?.toLowerCase().includes(query);
              case 'class':
                return student.class?.toLowerCase().includes(query);
              case 'id':
                return student.id?.toLowerCase().includes(query);
              default:
                return searchableFields.some(field => field.includes(query));
            }
          }

          return searchableFields.some(field => field.includes(query));
        });
      }

      // Remove passcode from response for security
      return students.map(student => {
        const { passcode, ...studentWithoutPasscode } = student;
        return studentWithoutPasscode as Student;
      });

    } catch (error) {
      console.error('Search error:', error);
      throw new Error('Failed to search students');
    }
  }

  // Get student by ID and passcode for login
  static async authenticateStudent(studentId: string, passcode: string): Promise<Student | null> {
    try {
      const studentRef = doc(db, STUDENTS_COLLECTION, studentId);
      const studentDoc = await getDocs(query(collection(db, STUDENTS_COLLECTION), where('id', '==', studentId)));
      
      if (studentDoc.empty) {
        return null;
      }

      const student = studentDoc.docs[0].data() as Student;
      
      if (student.passcode === passcode) {
        // Remove passcode from response
        const { passcode: _, ...studentData } = student;
        return studentData as Student;
      }

      return null;
    } catch (error) {
      console.error('Authentication error:', error);
      return null;
    }
  }

  // Get statistics
  static async getStatistics() {
    try {
      const studentsRef = collection(db, STUDENTS_COLLECTION);
      const snapshot = await getDocs(studentsRef);
      const students = snapshot.docs.map(doc => doc.data() as Student);

      const totalStudents = students.length;
      
      const classCounts = students.reduce((acc: any, student) => {
        const className = student.class;
        acc[className] = (acc[className] || 0) + 1;
        return acc;
      }, {});

      const feeStats = students.reduce((acc: any, student) => {
        const feeStatus = student.fees || 'Unknown';
        acc[feeStatus] = (acc[feeStatus] || 0) + 1;
        return acc;
      }, {});

      const attendanceStats = students.reduce((acc: any, student) => {
        const attendance = parseInt(student.attendance?.replace('%', '') || '0');
        if (attendance >= 90) acc.excellent++;
        else if (attendance >= 75) acc.good++;
        else acc.needsImprovement++;
        return acc;
      }, { excellent: 0, good: 0, needsImprovement: 0 });

      return {
        totalStudents,
        classCounts,
        feeStats,
        attendanceStats,
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Statistics error:', error);
      throw new Error('Failed to get statistics');
    }
  }

  // Health check
  static async healthCheck() {
    try {
      // Test Firestore connection
      const testRef = collection(db, 'health_check');
      await getDocs(query(testRef));

      // Check if students collection exists and has data
      const studentsRef = collection(db, STUDENTS_COLLECTION);
      const snapshot = await getDocs(studentsRef);

      return {
        server: 'running',
        database: true,
        studentData: !snapshot.empty,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        server: 'running',
        database: false,
        studentData: false,
        timestamp: new Date().toISOString()
      };
    }
  }
}