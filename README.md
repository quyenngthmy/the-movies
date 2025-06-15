# Movies App

A responsive movies application built with React, TypeScript, and CSS that uses The Movie Database (TMDB) API to display current movies, top-rated films, and detailed movie information.

## Quick Setup

### 1. Clone the repo
git clone https://github.com/quyenngthmy/the-movies

### 2. Navigate into the project directory
cd `the-movies`

### 3. Configure Environment Variable
Create a `.env.local` file in your project root:
```
TMDB_API_KEY=fbe913b803ddcd111a040aab3e35343b
```

### 4. Install dependencies
```
npm install
```

### 5. Start the development server
```
npm run dev
```

### Deployment
This project was deployed using **Vercel**. 

### Required Features ✅
- **Movie List Display**: View movies currently playing in theaters with asynchronous poster image loading
- **Tab Navigation**: Switch between "Now Playing" and "Top Rated" movies using a tab bar
- **Search Functionality**: Search for movies with real-time results
- **Movie Details**: Tap/click on any movie to view detailed information
- **Loading States**: Loading spinners and skeleton screens while waiting for API responses
- **Error Handling**: User-friendly error messages for network failures with retry functionality
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Optional Features ✅
- **View Mode Toggle**: Segmented control to switch between list and grid view layouts
- **Image Fade-in**: All images fade in smoothly when loaded
- **Lazy Loading**: Images load only when they come into viewport for better performance
- **Interactive Effects**: Custom highlight and selection effects on movie cards with hover animations
- **Skeleton Loading**: Enhanced UX with skeleton screens during loading states
- **Enhanced Responsive**: Optimized layouts for all screen sizes with mobile-first approach

### Additional Features ✅
- **Infinite Scroll**: Load more movies automatically as you scroll
- **Advanced Search**: Debounced search with instant results
- **Movie Ratings**: Display movie ratings with star icons
- **Genre Tags**: Show movie genres as styled tags
- **Release Information**: Display release dates, runtime, budget, and revenue
- **Gradient Themes**: Beautiful gradient color schemes throughout the app
- **Accessibility**: Proper ARIA labels and keyboard navigation support
- **Performance Optimized**: Lazy loading, image optimization, and efficient re-renders
- **Error Logging**: Detailed error logging for debugging

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS (no external CSS frameworks)
- **Framework**: Next.js 14 with App Router
- **API**: The Movie Database (TMDB) API v3 (server-side)
- **Image Optimization**: Next.js Image component with lazy loading
- **State Management**: React hooks (useState, useEffect)
- **Security**: Server Actions for API calls

## API Integration

The app integrates with TMDB API v3 endpoints via server-side functions:
- `/movie/now_playing` - Currently playing movies
- `/movie/top_rated` - Top rated movies
- `/search/movie` - Movie search
- `/movie/{id}` - Movie details

## Security Features

- **Server-Side API Calls**: All TMDB API requests are made server-side using Next.js Server Actions
- **Protected API Keys**: API keys are never exposed to the client-side code
- **Environment Variables**: Sensitive data is stored securely in environment variables

## Performance Optimizations

- **Lazy Loading**: Images load only when visible
- **Debounced Search**: Reduces API calls during typing
- **Infinite Scroll**: Loads content progressively
- **Image Optimization**: Next.js automatic image optimization
- **Skeleton Loading**: Improves perceived performance
- **Server-Side Caching**: API responses cached for 5 minutes

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

Copyright [2025] Nguyen Thi My Quyen 

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
