# Second Brain - Frontend

A beautiful, modern React application for managing your personal knowledge base. Built with React, TypeScript, and Tailwind CSS featuring a stunning blue-purple gradient theme.

## ✨ Features

- **Beautiful UI** - Modern gradient theme with depth and shadows
- **Content Management** - Save and organize YouTube videos, articles, PDFs, documents, and images
- **AI Chat** - Intelligent conversations about your saved content
- **PDF Viewer** - Built-in PDF viewer with page navigation
- **Document Preview** - Thumbnail previews for all content types
- **Tag System** - Organize content with custom tags
- **Profile Management** - Customizable user profiles with avatar upload
- **Content Sharing** - Share your knowledge with others
- **Responsive Design** - Works seamlessly on desktop and mobile

## 🎨 Design Highlights

- **Gradient Background** - Beautiful blue-to-purple gradient (`from-blue-500 via-blue-600 to-purple-600`)
- **Subtle Component Gradients** - Header, sidebar, and cards have unique subtle gradients
- **Shadow System** - 4-level shadow hierarchy for visual depth
- **Interactive Effects** - Cards pop out on hover with scale and shadow animations
- **Consistent Theme** - Purple accents throughout (buttons, hovers, focus states)

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Backend server running (see `secondBrain` folder)

## 🛠️ Installation

1. **Navigate to frontend directory**

   ```bash
   cd d:\project\secondBrainfe
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure backend URL**

   Update `src/config.ts` if needed:

   ```typescript
   export const BACKEND_URL = "http://localhost:3000/api/v1";
   ```

4. **Start development server**

   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
secondBrainfe/
├── src/
│   ├── pages/              # Page components
│   │   ├── Dashboard.tsx
│   │   ├── ContentDetails.tsx
│   │   ├── ProfileSettings.tsx
│   │   ├── SignIn.tsx
│   │   └── SignUp.tsx
│   ├── component/          # Reusable components
│   │   ├── Card.tsx
│   │   ├── Button.tsx
│   │   ├── Sidebar.tsx
│   │   ├── AddContentDia.tsx
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   │   ├── useContent.ts
│   │   ├── useToast.ts
│   │   └── useAuth.ts
│   ├── icons/              # Icon components
│   ├── utils/              # Utility functions
│   ├── config.ts           # Configuration
│   └── App.tsx             # Main app component
├── public/
└── package.json
```

## 🎯 Key Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Tailwind CSS** - Styling
- **Axios** - HTTP client
- **Cloudinary** - Image/PDF hosting

## 🎨 Theme System

### Color Palette

- **Primary Gradient**: `from-blue-500 via-blue-600 to-purple-600`
- **Purple Accent**: `purple-600` (buttons, links)
- **Hover States**: `purple-50` (light purple)

### Shadow Hierarchy

1. **Subtle** (`shadow-sm`) - Buttons, inputs
2. **Elevated** (`shadow-lg`) - Cards, navigation
3. **Floating** (`shadow-xl`) - Modals, dropdowns
4. **Dramatic** (`shadow-2xl`) - Hero sections, forms

### Component Gradients

- **Header**: `from-blue-50 to-purple-50`
- **Sidebar**: `from-purple-50 via-white to-blue-50`
- **Cards**: `from-white via-blue-50 to-purple-50`

## 🔧 Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type check
npx tsc --noEmit
```

## 📱 Pages

### Dashboard

- Grid view of all saved content
- Filter by content type (YouTube, Articles, PDFs, Documents, Images)
- Add new content
- Share brain functionality

### Content Details

- PDF viewer with page navigation
- AI chat interface
- Content metadata

### Profile Settings

- Update name, email, bio
- Upload profile picture
- Beautiful gradient background

### Sign In / Sign Up

- Clean, modern authentication forms
- Gradient backgrounds
- Form validation

## 🎭 Components

### Card

- Displays content preview
- Hover effects (scale + shadow)
- Click to view details
- Share and delete actions

### Button

- Primary and secondary variants
- Purple theme
- Shadow effects
- Loading states

### Dropdown

- Purple hover states
- Smooth animations
- Keyboard accessible

### AddContentDia

- Modal for adding new content
- File upload support
- Tag selection
- Type selection

## 🚀 Building for Production

```bash
# Build the app
npm run build

# The build output will be in the `dist` folder
# Deploy the contents of `dist` to your hosting service
```

## 🌐 Deployment

The app can be deployed to:

- **Vercel** - Recommended for Vite apps
- **Netlify** - Easy deployment with drag-and-drop
- **GitHub Pages** - Free hosting
- **Any static hosting service**

### Environment Variables for Production

Update `BACKEND_URL` in `src/config.ts` to point to your production backend:

```typescript
export const BACKEND_URL = "https://your-backend-url.com/api/v1";
```

## 🎨 Customizing the Theme

To customize colors, update Tailwind classes in components:

```tsx
// Change gradient background
className = "bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600";

// Change button color
className = "bg-purple-600 hover:bg-purple-700";

// Change hover states
className = "hover:bg-purple-50";
```

## 🚨 Troubleshooting

### Build Errors

- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf .vite`

### Backend Connection Issues

- Verify `BACKEND_URL` in `src/config.ts`
- Check CORS settings on backend
- Ensure backend server is running

### Styling Issues

- Clear browser cache
- Check Tailwind CSS configuration
- Verify all Tailwind classes are valid

## 📄 License

MIT

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Made with ❤️ using React + TypeScript + Tailwind CSS**
