# SERAI Project Specification

## Project Rules & Guidelines

### Communication & Response Style Rules
- **No Emojis Rule**: The user prefers that the assistant does not use emojis in responses
- **Follow Exact Instructions Rule**: The user prefers that the assistant follow their exact instructions and not be creative or make unauthorized modifications when given clear direction
- **Deletion Confirmation Rule**: Must not delete unless explicitly asked to do so. The assistant must ask the user 2 times to confirm before any deletion.

### Design & UI Standards
- **Color Scheme Rules**: 
  - Favicons and logos must be the opposite of the page background (dark vs light)
  - Never use hardcoded colors - Always import from the theme system
  - Use semantic color names - Choose colors based on purpose, not appearance
  - Maintain consistency - Use the same color for the same purpose across components
  - Test accessibility - Ensure sufficient contrast ratios (WCAG compliance)

- **Component Design Rules**:
  - All page components should include a consistent banner, following the design of other components
  - Clean, modern design with full-screen hero images
  - Responsive design for all devices (desktop, tablet, mobile)
  - Loading states and error handling for better UX
  - Success feedback and user guidance

### User Experience Rules
- **Navigation Standards**:
  - Back and Next buttons placed at bottom of content space on left and right corners for every page of multi-step processes
  - Breadcrumbs for clear navigation path
  - Section completion status with visual progress tracking
  - Quick jump menu for fast navigation between sections

- **Form Design Standards**:
  - Real-time validation with instant feedback on input errors
  - Field hints with helpful text below form fields
  - Required field indicators for essential fields
  - Input formatting with auto-formatting for common data types
  - Save progress indicators to track saved vs. unsaved changes

### Development Standards
- **TypeScript Configuration Rules**:
  - Strict mode enabled for type safety
  - Force consistent casing in file names (forceConsistentCasingInFileNames: true)
  - No fallthrough cases in switch statements (noFallthroughCasesInSwitch: true)
  - Isolated modules for better tree-shaking (isolatedModules: true)
  - React JSX transform for modern React (jsx: "react-jsx")

- **File Naming Conventions**:
  - Components: PascalCase (e.g., UserSignupPage.tsx, BusinessSignupPage.tsx)
  - Pages: PascalCase with "Page" suffix (e.g., AuthPage.tsx, MortgagePage.tsx)
  - Utilities: camelCase (e.g., advancedCalculations.ts, performance.ts)
  - Types: camelCase with descriptive names (e.g., calculations.ts, database.ts)
  - Constants: UPPER_SNAKE_CASE (e.g., AGENT_ROLES, MORTGAGE_CONSTANTS)

- **Code Organization Rules**:
  - Centralized data management in src/data/ directory
  - External constants for better maintainability
  - Reusable component patterns with proper TypeScript interfaces
  - Comprehensive documentation for all major features
  - Consistent import ordering (React first, then third-party, then local)

### Performance Optimization Rules
- **Icon Loading Standards**:
  - Always use lazy loading for MUI icons with React.lazy()
  - Wrap icons in Suspense with appropriate fallbacks
  - Group related icons in the same lazy import when possible
  - Eliminate barrel imports for MUI icons to improve tree-shaking

- **Bundle Size Management**:
  - Target bundle size: < 2MB initial bundle, < 500KB gzipped
  - Implement lazy loading for components over 500 lines
  - Externalize large arrays and objects to separate data files
  - Use TypeScript constants for better tree-shaking
  - Centralize common data in dedicated directories

- **Code Splitting Rules**:
  - Route-based code splitting for all pages
  - Component-level code splitting for heavy features
  - Dynamic imports for rarely used functionality
  - Progressive loading of UI components

### Security & Validation Rules
- **Input Validation Standards**:
  - All user inputs validated using Zod schemas
  - Type-safe validation with detailed error messages
  - Input sanitization to prevent XSS attacks
  - Range checking for realistic values
  - Server-side validation support

- **Authentication Standards**:
  - Multiple authentication methods (email/password, social login, magic link)
  - Advanced security features (OTP, biometric, 2FA, SSO)
  - Progressive security enhancement
  - Security score tracking

### Data Management Rules
- **Database Standards**:
  - Prisma ORM for type-safe database operations
  - Zod validation for all data schemas
  - Foreign key constraints for data integrity
  - Cascade for user-specific data (profile, preferences, tasks)
  - Restrict for critical business data (transactions, compliance records)
  - SetNull for optional relationships (if the field is nullable)
  - Preserve audit and analytics data for historical analysis
  - Consider soft deletes for important data instead of hard deletes

- **State Management Rules**:
  - Centralized role configuration for user roles
  - Reusable dashboard components
  - Consistent state patterns across components
  - Proper error handling and loading states

### Accessibility Standards
- **Accessibility Requirements**:
  - ARIA labels for proper screen reader support
  - Keyboard navigation with full keyboard accessibility
  - Focus management with clear focus indicators
  - Color contrast meeting WCAG AA standards
  - Screen reader descriptive text and announcements

### Responsive Design Rules
- **Device Support Standards**:
  - Desktop (1200px+): Permanent sidebar for buyer/agent views, full-width for broker/enterprise
  - Tablet (768px - 1199px): Adaptive layouts
  - Mobile (320px - 767px): Drawer becomes temporary overlay, full-width content
  - Touch-friendly interactions for mobile devices

### Testing & Quality Rules
- **Testing Standards**:
  - Unit tests for all utility functions
  - Integration tests for complete workflows
  - Component testing with React Testing Library
  - Performance testing with bundle analysis
  - Accessibility testing for WCAG compliance

- **Performance Monitoring Rules**:
  - Bundle size tracking over time
  - Performance budgets with violation alerts
  - Core Web Vitals monitoring
  - Lighthouse audits for performance validation
  - Regular performance reviews and optimization

### Maintenance & Documentation Rules
- **Documentation Standards**:
  - Comprehensive README files for all major features
  - Code comments for complex logic
  - TypeScript interfaces for all data structures
  - Regular documentation updates with changes
  - Troubleshooting guides for common issues

- **Maintenance Standards**:
  - Regular dependency updates for better tree-shaking
  - Performance audits and optimization reviews
  - Code cleanup and refactoring
  - Security updates and vulnerability patches

### Project-Specific Rules
- **User Role System Rules**:
  - Distinct user roles with specific dashboards and features
  - Role-based UI changes (sidebar visibility, dashboard content)
  - Consistent role switching with smooth transitions
  - Role-specific feature access and permissions

- **Domain Rules**:
  - Professional roles across different categories
  - Comprehensive features
  - Advanced calculation models with specific model, seasonal and market adjustments
  - Risk assessment tools with stress testing and scoring

### Code Style Rules
- Consistent indentation (2 spaces)
- Semicolons at end of statements
- Single quotes for strings
- Trailing commas in objects and arrays
- Explicit return types for functions when complex
- Destructuring for cleaner code
- Arrow functions for event handlers
- Functional components with hooks

### Import Organization Rules
- React imports first
- Third-party library imports second
- Local imports last
- Alphabetical ordering within each group
- Named imports preferred over default imports when possible
