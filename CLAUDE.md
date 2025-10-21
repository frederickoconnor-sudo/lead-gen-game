# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Next.js-based lead generation game for SmartBear's B2B marketing. Players hunt for JavaScript code errors and programming bugs to generate qualified leads.

**Game Concept**: Code bug hunting game inspired by Bugsnag's error tracking. Players identify JavaScript errors (SyntaxError, TypeError, ReferenceError) in code snippets. Score 80+ points to unlock free SmartBear swag and qualify as a marketing lead.

**Repository**: https://github.com/frederickoconnor-sudo/lead-gen-game
**Deployment**: Vercel (connected to main branch)

## Architecture

### Tech Stack
- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS for responsive design
- **Deployment**: Vercel
- **Lead Management**: Form submission to marketing automation platform
- **Game Engine**: React-based interactive components

### Core Components
- `CodeEditor` - Interactive code snippet display with syntax highlighting
- `BugHunter` - Click-to-identify error detection logic
- `ScoreTracker` - Real-time scoring system with error type breakdown
- `LeadForm` - Conditional lead capture (score >= 80)
- `SwagRedemption` - Prize fulfillment interface

## Development Commands

```bash
# Setup
npm install
npm run dev        # Start development server (localhost:3000)

# Build and Deploy
npm run build      # Production build
npm run start      # Production server
npm run lint       # ESLint check
npm run type-check # TypeScript validation

# Testing
npm test           # Run test suite
npm run test:watch # Watch mode
```

## Game Mechanics

### Scoring System
- **SyntaxError** (Easy): 5-10 points - Missing brackets, quotes, typos
- **ReferenceError** (Medium): 15-25 points - Undefined variables, scope issues
- **TypeError** (Hard): 30-50 points - Wrong data types, null/undefined access
- **RangeError** (Medium): 15-25 points - Invalid array lengths, out-of-bounds
- **Logic Bugs** (Hard): 30-50 points - Infinite loops, incorrect conditions
- Target score: 80+ for lead qualification

### JavaScript Error Types (Based on Bugsnag)
- **SyntaxError**: Missing closing parentheses, mismatched quotes, punctuation errors
- **ReferenceError**: Accessing undeclared variables, typos in variable names, scope violations
- **TypeError**: Calling non-functions, accessing properties on null/undefined, wrong data type operations
- **RangeError**: Invalid array lengths, out-of-bounds array access
- **Logic Errors**: Infinite loops, incorrect conditional logic, async/await issues

### Lead Generation Flow
1. Player completes game
2. Score >= 80 triggers lead form
3. Collect: name, email, company, role
4. Integrate with SmartBear marketing automation
5. Trigger swag fulfillment process

## Deployment

### Vercel Setup
- Connect GitHub repository
- Auto-deploy from main branch
- Environment variables for lead management APIs
- Custom domain configuration

### Environment Variables
```
NEXT_PUBLIC_GAME_API_URL=
LEAD_MANAGEMENT_API_KEY=
SMARTBEAR_SWAG_API_URL=
```

## Marketing Integration

### Lead Qualification Criteria
- Minimum score: 80 points
- Valid business email required
- Company information collected
- Opt-in for marketing communications

### Analytics Tracking
- Game completion rates
- Score distributions
- Lead conversion metrics
- Swag redemption tracking

## Code Style

- TypeScript strict mode enabled
- ESLint + Prettier for formatting
- Component-based architecture
- Responsive-first design
- Accessibility compliance (WCAG 2.1)

## Testing Strategy

- Unit tests for game logic
- Integration tests for lead flow
- E2E tests for complete user journey
- Performance testing for mobile devices