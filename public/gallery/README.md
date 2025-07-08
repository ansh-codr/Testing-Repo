# Gallery Images Directory

This directory structure is for organizing gallery images locally during development. In production, all images are stored in Firebase Storage.

## Directory Structure:

```
public/gallery/
├── facilities/          # School facilities and infrastructure
├── student-life/        # Daily student activities and interactions
├── academics/           # Classroom activities and learning
├── events/             # School events and celebrations
├── sports/             # Sports activities and competitions
├── cultural/           # Cultural programs and performances
└── README.md           # This file
```

## Image Guidelines:

### File Formats:
- **Preferred**: JPG, PNG, WebP
- **Maximum Size**: 5MB per image
- **Recommended Resolution**: 1920x1080 or higher

### Naming Convention:
```
category_YYYYMMDD_description.jpg
```
Examples:
- `facilities_20241201_computer_lab.jpg`
- `events_20241215_annual_sports_day.jpg`
- `student_life_20241220_classroom_activity.jpg`

### Categories:

#### 1. Facilities
- Computer labs
- Science laboratories
- Library and reading rooms
- Sports facilities
- Classrooms
- Administrative offices
- Playground and outdoor areas

#### 2. Student Life
- Students in classrooms
- Group activities
- Break time interactions
- Study sessions
- Collaborative projects

#### 3. Academics
- Teaching sessions
- Presentations
- Science experiments
- Art and craft activities
- Educational trips

#### 4. Events
- Annual functions
- Prize distributions
- Guest lectures
- Workshops
- Seminars

#### 5. Sports
- Sports day events
- Team competitions
- Individual achievements
- Training sessions
- Sports facilities in use

#### 6. Cultural
- Dance performances
- Music programs
- Drama and theater
- Art exhibitions
- Cultural festivals

## Upload Process:

### For Development:
1. Place images in appropriate category folders
2. Follow naming conventions
3. Optimize images for web (compress if needed)

### For Production:
1. Use Admin Gallery Management (`/admin/gallery`)
2. Upload images with proper metadata
3. Images are automatically stored in Firebase Storage
4. Organized by category and timestamped

## Image Metadata:

When uploading through the admin panel, provide:
- **Title**: Descriptive title for the image
- **Description**: Brief description of what's shown
- **Category**: Select appropriate category
- **Tags**: Comma-separated keywords for search
- **Photographer**: Credit for the photographer (optional)
- **Event**: Associated event name (optional)

## Best Practices:

1. **Quality**: Use high-quality, well-lit images
2. **Privacy**: Ensure proper permissions for student photos
3. **Diversity**: Include diverse representation of school life
4. **Relevance**: Keep images current and relevant
5. **Organization**: Use consistent categorization

## Technical Notes:

- Images are automatically resized and optimized
- Thumbnails are generated for faster loading
- All images are served via CDN for optimal performance
- Search functionality works across all metadata fields
- Images can be filtered by category, tags, or search terms

## Security:

- Only authorized admin users can upload/delete images
- All uploads are validated for file type and size
- Images are stored securely in Firebase Storage
- Access is controlled through Firebase security rules