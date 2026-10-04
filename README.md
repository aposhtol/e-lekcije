# e-lekcije
![Logo](https://e-lekcije.online/social.png)

## Description / Opis

**Engleski:**

  e-lekcije is a web application aimed at facilitating navigation through numerous video lessons published on the YouTube channel "i-nastava".
During the period between 2020 and 2022, the coronavirus pandemic required that teaching in Croatia be conducted remotely in some critical periods. The first video lessons with the purpose of distance learning were created as part of the curriculum reform project "Škola za život" in the school year 2019/2020. These video lessons were published on YouTube under the same name channel. For the school year 2020/2021, the competent Ministry started the project "i-nastava" under the same channel for subject teaching in primary and secondary schools (grammar school program), while the primary school program was published on the channel "Škola na Trećem". The video lessons received another iteration for the school year 2021/2022. This aggregator currently includes video lessons from the "i-nastava" channel for the school year 2020/2021 (subject cards that are not marked with the school year) and the school year 2021/2022. All video materials in this web application are produced by the Ministry of Science and Education of the Republic of Croatia.

This is a demo app to showcase my current coding skills.


**Croatian:**

  e-lekcije je web aplikacija kojoj je namjera lakše snalaženje s mnogobrojnim video lekcijama objavljenim na YouTube kanalu "i-nastava". U razdoblju između 2020. i 2022. tijek pandemije koronavirusa je zahtijevao da se nastava u RH u nekim kritičnim razdobljima odvija na daljinu. Prve video lekcije sa svrhom nastave na daljinu nastale su u sklopu projekta kurikularne reforme "Škola za život" u šk. god. 2019./2020. Ove video lekcije objavljene su na YouTube-u pod istoimenim kanalom. Za šk. god. 2020./2021. nadležno Ministarstvo započinje projekt "i-nastava" pod istoimenim kanalom za predmetnu nastavu osnovne škole i srednju školu (gimnazijski program), dok je program razredne nastave objavljivan na kanalu "Škola na Trećem". Video lekcije dobile su još jednu iteraciju za šk. god. 2021./2022. Ovaj agregator za sada obuhvaća video lekcije kanala "i-nastava" za šk. god. 2020./2021. (kartice predmeta koje nisu označene školskom godinom) i šk. god. 2021./2022. Sav video materijal u ovoj web aplikaciji je produciran od strane Ministarstva znanosti i obrazovanja Republike Hrvatske.

  Ovo je demo aplikacija koja pokazuje moje trenutne vještine kodiranja.

## Tech Stack

**Client:** React, Redux, Styled Components

**Server:** Vite, Node, Express

**Database:** MongoDB

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. See `.env.example` for a complete list.

```env
MONGODB_URI=mongodb://localhost:27017/e-lekcije
SECRET=your-secret-jwt-key
PORT=3000
NODE_ENV=development
VITE_YOUTUBE_API_KEY=your-youtube-api-key
```

## Run Locally

Clone the project

```bash
  git clone https://github.com/aposhtol/e-lekcije
```

Go to the project directory

```bash
  cd e-lekcije
```

Install dependencies

```bash
  npm install
```

Build static site

```bash
  npm run build
```

Start the server

```bash
  npm start
```

## Available Scripts

### Development
```bash
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm start            # Start production server
```

### Testing
```bash
npm test             # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Code Quality
```bash
npm run lint         # Check code for linting errors
npm run lint:fix     # Fix linting errors automatically
npm run format       # Format code with Prettier
```

## 🚀 Features

- Browse video lessons by school type (Elementary/Secondary)
- Filter lessons by grade level
- User authentication with JWT
- Personal favorites system
- Comment and reply system with likes
- Progressive Web App (PWA) support
- Offline capability
- Responsive design

## 🔒 Security Features

### Implemented Security Measures

1. **Input Sanitization**: All user-generated content (comments, replies) is sanitized to prevent XSS attacks
2. **Rate Limiting**: 
   - Authentication endpoints: 5 attempts per 15 minutes
   - General API endpoints: 100 requests per 15 minutes
3. **Security Headers**: Helmet middleware for secure HTTP headers
4. **Password Validation**: Strong password requirements (8+ chars, uppercase, lowercase, number)
5. **JWT Authentication**: Secure token-based authentication
6. **Database Indexing**: Optimized queries with proper indexes

## 📚 API Endpoints

### Authentication
- `POST /api/register` - Create new user account
- `POST /api/login` - User login

### Playlists
- `GET /api/playlists` - Get all playlists (supports pagination)
  - Query params: `page`, `limit`, `type`, `grade`

### Comments
- `GET /api/comments?video=:id` - Get comments for a video (supports pagination)
  - Query params: `page`, `limit`
- `POST /api/comments` - Create a comment (requires auth)
- `PUT /api/comments/:id` - Like/unlike a comment (requires auth)
- `DELETE /api/comments/:id` - Delete own comment (requires auth)

### Replies
- `POST /api/replies` - Create a reply (requires auth)
- `PUT /api/replies/:id` - Like/unlike a reply (requires auth)
- `DELETE /api/replies/:id` - Delete own reply (requires auth)

### User
- `PUT /api/user/:id` - Update user favorites (requires auth)

## 🔄 Recent Improvements (2026)

### Security Enhancements
- ✅ Added input sanitization for all user-generated content
- ✅ Implemented rate limiting on authentication and API endpoints
- ✅ Added Helmet for security headers
- ✅ Improved password validation with strength requirements
- ✅ Username validation (alphanumeric only)

### Code Quality
- ✅ Added ESLint configuration with React and accessibility plugins
- ✅ Configured Prettier for code formatting
- ✅ Set up Git hooks with Husky and lint-staged
- ✅ Fixed deprecated Mongoose methods (`findByIdAndRemove` → `findByIdAndDelete`)
- ✅ Fixed missing imports
- ✅ Added React Error Boundary for better error handling

### Testing Infrastructure
- ✅ Added Jest and React Testing Library
- ✅ Created example tests for authentication and comments
- ✅ Configured test coverage reporting
- ✅ Supertest for API testing

### Performance Optimizations
- ✅ Added pagination for comments and playlists
- ✅ Created database indexes for frequently queried fields
- ✅ Optimized query performance with proper indexing

### Developer Experience
- ✅ Added `.env.example` for easy environment setup
- ✅ Comprehensive documentation
- ✅ Improved error messages and logging
- ✅ Pre-commit hooks for code quality

## Screenshots

![App Screenshot](https://e-lekcije.online//screenshot.jpg)
