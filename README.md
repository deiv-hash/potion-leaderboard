# Potion Leaderboard

## Design Decisions

### 1. Responsive Layout

- Mobile-first approach with breakpoints at:
  - `sm`: 640px (tablet)
  - `lg`: 1024px (desktop)
- Components stack vertically on mobile for better readability
- Borders only visible on larger screens to maintain clean mobile interface
- Overall design is inspired by the Figma design

### 2. Component Structure

- **TraderStats**: Grid-based layout showing key metrics

  - Responsive grid layout

- **Leaderboard**: Scrollable table with sortable columns

  - Horizontal scroll on mobile for data-heavy tables
  - Fixed header for better navigation
  - Interactive sorting with visual indicators

- **Filter**: Slide-out drawer design

  - Full-screen overlay on mobile
  - Range-based filtering options
  - Persistent filter count indicator

- **Search**: Responsive search bar
  - Full-width on mobile
  - Compact width on desktop
  - Immediate feedback on input

### 3. State Management

- React's useState for local component state
- Custom hooks for data fetching (useTraders)
- Centralized filter state in main component
- Pagination state management

## Assumptions

1. **Data Structure**

   - Trader data includes wallet address, name, and performance metrics
   - All numerical values are provided in correct format
   - Images are available at specified URLs

2. **User Behavior**

   - Primary access through mobile devices
   - Need for quick access to key metrics
   - Regular data updates required

3. **Authentication**
   - Wallet connection required for accessing the application
   - Protected pages and features require an active wallet connection
   - Users will be redirected to home page if wallet is disconnected
   - Public read access to basic data

## Testing Instructions

### Prerequisites

```bash
# Install dependencies
npm install
```

### Running Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to view the application.

### Testing Scenarios

1. **Responsive Layout**

   - Test on different devices/screen sizes

2. **Filtering System**

   ```
   a. Open filter drawer
   b. Set range values
   c. Apply filters
   d. Verify filtered results
   ```

3. **Search Functionality**

   ```
   a. Enter wallet address or trader name
   b. Verify real-time search results
   c. Test edge cases (empty string, special characters)
   ```

4. **Sorting**

   ```
   a. Click column headers
   b. Verify sort direction changes
   c. Check sort indicator visibility
   ```

5. **Wallet Integration**

   ```
   a. Test protected actions
   b. Verify wallet connection prompt
   c. Check authenticated state persistence
   ```

6. **Performance Testing**
   ```
   a. Load large datasets
   b. Test filter response time
   c. Verify scroll performance
   ```

### Mobile Testing

1. Test touch interactions
2. Verify drawer behavior
3. Check text readability
