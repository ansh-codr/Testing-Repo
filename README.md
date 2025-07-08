# Dhruv Public School Aring - Complete Deployment Guide

## 🚀 Firebase + Netlify Deployment Setup

This project is now fully configured for cloud deployment with Firebase as the backend and Netlify for hosting.

### 📋 Prerequisites

1. **Firebase Project**: Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. **Netlify Account**: Sign up at [Netlify](https://netlify.com)
3. **Domain**: Your custom domain ready for configuration

### 🔧 Firebase Setup

#### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project"
3. Name it: `dhruv-public-school` (or your preferred name)
4. Enable Google Analytics (optional)

#### Step 2: Enable Services
1. **Firestore Database**:
   - Go to Firestore Database
   - Click "Create database"
   - Choose "Start in production mode"
   - Select your region

2. **Storage**:
   - Go to Storage
   - Click "Get started"
   - Choose "Start in production mode"

#### Step 3: Get Configuration
1. Go to Project Settings (gear icon)
2. Scroll to "Your apps"
3. Click "Web app" icon
4. Register your app: `DPS Aring Website`
5. Copy the config object

#### Step 4: Set Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to students collection
    match /students/{document} {
      allow read, write: if true;
    }
    
    // Allow read/write access to excel_files collection
    match /excel_files/{document} {
      allow read, write: if true;
    }
    
    // Allow read access to health_check
    match /health_check/{document} {
      allow read: if true;
    }
  }
}
```

#### Step 5: Set Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /excel-files/{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

### 🌐 Netlify Deployment

#### Step 1: Environment Variables
Create `.env.local` file with your Firebase config:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

#### Step 2: Deploy to Netlify
1. **Connect Repository**:
   - Push your code to GitHub
   - Connect GitHub repo to Netlify

2. **Build Settings**:
   - Build command: `npm run build`
   - Publish directory: `out`

3. **Environment Variables**:
   - Add all Firebase config variables in Netlify dashboard
   - Site Settings → Environment Variables

#### Step 3: Custom Domain
1. Go to Domain Settings in Netlify
2. Add your custom domain
3. Configure DNS records as instructed

### 📊 Excel File Management

#### How to Upload Student Data:
1. **Access Admin Panel**: `https://yourdomain.com/admin/upload`
2. **Download Template**: Get the correct Excel format
3. **Prepare Data**: Fill in student information
4. **Upload**: Drag & drop your `.xlsx` file
5. **Automatic Processing**: Data is stored in Firebase Firestore

#### Excel File Structure:
```
id | name | class | section | rollNo | dob | fatherName | motherName | phone | email | address | subjects | attendance | fees | passcode
```

#### Data Flow:
1. **Upload**: Excel file → Firebase Storage
2. **Process**: Parse Excel → Store in Firestore
3. **Access**: Students login with ID + passcode
4. **Search**: Admin can search/filter all students

### 🔐 Security Features

- **Firebase Security Rules**: Controlled access to data
- **Passcode Authentication**: Students login securely
- **Data Validation**: Server-side validation of uploads
- **Automatic Backups**: Excel files stored in Firebase Storage

### 📱 Features Available

#### For Students (`/portal/login`):
- Login with Student ID + Passcode
- View personal information
- Check attendance and fee status
- See enrolled subjects

#### For Admins (`/admin/dashboard`):
- Upload new Excel files
- Search and filter students
- View statistics and analytics
- Monitor system health

#### Public Pages:
- School information and about
- Photo gallery
- Achievements showcase
- Contact information

### 🚀 Deployment Commands

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Netlify (automatic via GitHub)
git push origin main
```

### 📞 Support

- **Made by**: Havoc_Erebus
- **Contact**: 9997783484
- **Email**: dhruv.public.school.adeeng@gmail.com
- **School**: Dhruv Public School Aring, Mathura

### 🔄 Updating Student Data

To update student data:
1. Prepare new Excel file with updated information
2. Go to `/admin/upload`
3. Upload new file (automatically replaces old data)
4. Students can immediately login with new credentials

The system is now fully cloud-based and ready for production deployment!