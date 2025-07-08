# Student Data Directory

This directory contains the Excel files with student information.

## File Structure:
- `students.xlsx` - Main student database file
- `backup/` - Backup files (optional)

## Excel File Format:
Your Excel file should have these columns (in this exact order):

| Column | Description | Example |
|--------|-------------|---------|
| id | Student ID | DPS001 |
| name | Full Name | John Doe |
| class | Class Number | 10 |
| section | Section Letter | A |
| rollNo | Roll Number | 15 |
| dob | Date of Birth | 2008-03-15 |
| fatherName | Father's Name | Robert Doe |
| motherName | Mother's Name | Jane Doe |
| phone | Contact Number | 9876543210 |
| email | Email Address | john.doe@email.com |
| address | Full Address | 123 Main St, Mathura |
| subjects | Subjects (comma-separated) | Math,Science,English,Hindi,Social Science |
| attendance | Attendance Percentage | 95% |
| fees | Fee Status | Paid/Pending |
| passcode | Login Passcode | 1234 |

## How to Upload:
1. Go to `/admin/upload` page
2. Download the template if needed
3. Fill in your data following the format
4. Upload the Excel file
5. System will validate and process the data

## Security Notes:
- Passcodes are used for student login
- Keep the Excel file secure
- Regular backups are recommended