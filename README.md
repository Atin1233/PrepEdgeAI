# PrepEdge AI - SAT Prep Platform

A modern, AI-powered SAT preparation platform that adapts to each student's learning needs. Built with Next.js 15, TypeScript, and a focus on clean, professional design.

## 🎯 Features

### Core Features
- **AI-Personalized Learning**: Diagnostic tests and adaptive study plans
- **Adaptive Analytics**: Score trajectory predictions and topic mastery tracking
- **Realistic Practice**: Human-verified AI-generated questions in authentic SAT style
- **Smart Hints & Explanations**: In-problem coaching with step-by-step reasoning
- **Stable & Fast UI**: Clean, academic interface without gamified bloat

### Technical Features
- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Secure session-based auth
- **Payments**: Stripe integration for subscriptions
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- Stripe account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-starter
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file with:
   ```env
   POSTGRES_URL=your_postgres_connection_string
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   JWT_SECRET=your_jwt_secret
   ```

4. **Set up the database**
   ```bash
   # Generate migrations
   npx drizzle-kit generate
   
   # Run migrations
   npx drizzle-kit migrate
   
   # Seed the database (optional)
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
saas-starter/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard routes
│   ├── (login)/          # Authentication routes
│   ├── api/              # API routes
│   └── globals.css       # Global styles
├── components/           # Reusable UI components
├── lib/                  # Utility libraries
│   ├── auth/            # Authentication logic
│   ├── db/              # Database configuration
│   └── payments/        # Stripe integration
└── public/              # Static assets
```

## 🎨 Design System

### Color Palette
- **Deep Navy** (#0A2540) - Trust, focus, authority
- **Bright Cyan** (#3AC7F3) - Technology, clarity
- **Accent Green** (#3AE374) - Growth, progress
- **Clean White** - Simplicity, focus

### Typography
- **Font**: Inter (Google Fonts)
- **Clean, academic feel** without gamified elements

## 💰 Pricing

- **Free Trial**: 3 days all-access
- **Monthly**: $49/month
- **Quarterly**: $129 ($43/month)
- **Annual**: $399 ($33/month)
- **Premium**: $699/year (includes priority AI tutoring)

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:seed` - Seed database with sample data

### Database Schema
The platform uses a comprehensive schema designed for SAT prep:
- **Users**: Student profiles and progress tracking
- **Questions**: AI-generated and verified SAT-style questions
- **Practice Sessions**: Track study sessions and performance
- **User Progress**: Topic mastery and learning analytics
- **Study Plans**: Personalized learning paths
- **AI Tutoring Sessions**: Chat history with AI tutor
- **Subscriptions**: Payment and plan management

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Railway
- Netlify
- AWS
- DigitalOcean

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@prepedge.ai or join our Discord community.

---

**PrepEdge AI** - Smarter prep. Sharper scores.
