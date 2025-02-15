# Potion Leaderboard

A gamified platform for Solana memecoin traders to compete, showcase performance, and win rewards.

## Features

- **Leaderboard Views**: Daily, Weekly, Monthly, and All-Time rankings
- **Real-time Search & Filtering**: Filter by multiple metrics and search by wallet/name
- **Responsive Design**: Mobile-first approach with optimized layouts
- **Wallet Integration**: Phantom wallet connection for authenticated features
- **Social Integration**: X (Twitter) account linking and verification
- **Performance Metrics**: Comprehensive trading statistics and analytics

## Design Decisions

### 1. Responsive Layout

- Mobile-first approach with breakpoints at:
  - `sm`: 640px (tablet)
  - `lg`: 1024px (desktop)
- Components stack vertically on mobile for better readability
- Borders only visible on larger screens to maintain clean mobile interface

### 2. Component Structure

- **TraderStats**: Grid-based layout showing key metrics

  - Responsive grid layout
  - Real-time data updates
  - Error boundary protection

- **Leaderboard**: Scrollable table with sortable columns

  - Horizontal scroll on mobile for data-heavy tables
  - Fixed header for better navigation
  - Interactive sorting with visual indicators
  - Skeleton loading states
  - Pagination with dynamic page size

- **Filter**: Slide-out drawer design

  - Full-screen overlay on mobile
  - Range-based filtering options
  - Persistent filter count indicator
  - Real-time validation

- **Search**: Responsive search bar
  - Full-width on mobile
  - Compact width on desktop
  - Debounced input handling
  - Loading states

### 3. State Management

- React's useState for local component state
- Custom hooks for data fetching (useTraders)
- Centralized filter state in main component
- Error handling with retry mechanisms
- Automatic error recovery
- Pagination state management

## Technical Implementation

### API Integration

- RESTful API endpoints with proper error handling
- Automatic retry mechanism for failed requests
- Rate limiting protection
- Response validation and type safety
- Caching for improved performance

### Error Handling

- Comprehensive error states for all API calls
- User-friendly error messages
- Automatic retry for transient failures
- Manual retry options in UI
- Error boundary protection

### Performance Optimization

- Debounced search inputs
- Optimized re-renders
- Lazy loading for large datasets
- Efficient state updates
- Memoized callbacks

## Deployment

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Git for version control

### Local Development

```bash
# Clone the repository
git clone https://github.com/your-username/potion-leaderboard.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. User Flows

a. **Wallet Connection**

- Connect wallet using Phantom
- Verify connection status
- Test disconnection
- Check error handling

b. **Social Integration**

- Connect X account
- Verify follower count
- Test disconnection
- Validate profile data

c. **Leaderboard Interaction**

- Test sorting by different columns
- Verify pagination
- Check search functionality
- Test filter combinations

### 3. Error Scenarios

- Test API failure handling
- Verify retry mechanisms
- Check error messages
- Test recovery options

### 4. Performance Testing

- Load testing with large datasets
- Measure response times
- Check memory usage
- Verify caching

### 5. Mobile Testing

- Test on various screen sizes
- Verify touch interactions
- Check responsive layouts
