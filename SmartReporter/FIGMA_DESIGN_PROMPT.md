# SmartReporter - Comprehensive Figma Design System Prompt

## Project Overview
**SmartReporter** is a modern, intuitive crowdsourced civic issue resolution platform. The application empowers citizens to report local problems (roads, waste, water, streetlights) with visual evidence and automatic AI categorization, while admins can manage, prioritize, and resolve issues efficiently.

---

## 📐 Design System Foundation

### Color Palette
```
Primary Brand:
- Primary Blue: #1E40AF (Main CTA, active states)
- Primary Dark: #0F172A (Headers, text)
- Primary Light: #DBEAFE (Hover states, backgrounds)

Secondary:
- Success Green: #16A34A (Resolved status, positive actions)
- Warning Yellow: #EAB308 (In Progress, caution states)
- Danger Red: #DC2626 (Pending, errors, critical)
- Info Purple: #7C3AED (Admin actions, special features)

Neutral:
- Dark Gray: #1F2937 (Primary text)
- Medium Gray: #6B7280 (Secondary text)
- Light Gray: #F3F4F6 (Backgrounds)
- White: #FFFFFF (Cards, modals)
- Border Gray: #E5E7EB

Accent:
- Orange: #EA580C (Highlights, AI predictions)
- Teal: #0D9488 (Reviews, ratings)
```

### Typography
```
Font Family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

Type Scale:
- Display Large: 48px / 700 weight / Line height 56px
- Display: 36px / 700 weight / Line height 44px
- Heading 1: 32px / 700 weight / Line height 40px
- Heading 2: 24px / 700 weight / Line height 32px
- Heading 3: 20px / 600 weight / Line height 28px
- Heading 4: 18px / 600 weight / Line height 26px
- Body Large: 16px / 400 weight / Line height 24px
- Body: 14px / 400 weight / Line height 22px
- Small: 12px / 400 weight / Line height 18px
- Tiny: 11px / 300 weight / Line height 16px
```

### Spacing System
```
4px grid system:
- xs: 4px
- sm: 8px
- md: 12px
- lg: 16px
- xl: 24px
- 2xl: 32px
- 3xl: 48px
- 4xl: 64px
```

### Borders & Shadows
```
Radius:
- xs: 2px
- sm: 4px
- md: 8px
- lg: 12px
- xl: 16px
- full: 9999px

Shadows:
- Subtle: 0 1px 2px 0 rgba(0,0,0,0.05)
- Small: 0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)
- Medium: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)
- Large: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)
- XLarge: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)
```

---

## 🎨 UI Components Library

### Buttons
**Primary Button**
- Background: Primary Blue (#1E40AF)
- Text color: White
- Padding: 12px 24px
- Border radius: 8px
- Font weight: 600
- States: Default, Hover (darker blue), Active, Disabled (opacity 50%)
- Icon support: Icon + Text with 8px gap

**Secondary Button**
- Background: Light Gray (#F3F4F6)
- Text color: Dark Gray (#1F2937)
- Border: 1px solid Border Gray (#E5E7EB)
- Same padding & radius as Primary

**Danger Button**
- Background: Danger Red (#DC2626)
- Text color: White
- Used for: Delete actions, warnings

**Ghost Button**
- Background: Transparent
- Text color: Primary Blue
- Underline on hover
- No border

### Input Fields
**Text Input**
- Height: 44px
- Padding: 12px 16px
- Border: 1px solid Border Gray
- Border radius: 8px
- Focus: Blue border, box-shadow with blue opacity
- Placeholder: Medium Gray text, 400 weight
- Icons: Support left & right positioned icons

**Select Dropdown**
- Same sizing as text input
- Dropdown arrow on right
- Open state: Border becomes Primary Blue, arrow rotates 180°

**Textarea**
- Minimum height: 120px
- Can be resized (default: both)
- Same border & focus styles as text input
- Rows: 4-6 typical

**Checkbox & Radio**
- Size: 20px × 20px
- Checked: Background Primary Blue with white checkmark
- Radio: Filled circle when selected
- Label: 14px text, clickable

### Cards
**Default Card**
- Background: White
- Border: 1px solid Border Gray
- Border radius: 8px
- Shadow: Medium
- Padding: 16px-24px
- Hover: Shadow increases to Large

**Complaint Card**
- Image section: 16:9 ratio, rounded-lg, can have badge overlay
- Content section:
  - Title (Heading 4)
  - Category badge (small, colored)
  - Status badge (small, colored)
  - Rating/upvotes section
  - Description (Body, 2 lines truncated)
  - Meta info: location, date, category
  - CTA buttons (Edit, Delete, View)

### Badges & Tags
**Status Badge**
- Small background chip: 20px height, 8px-12px padding
- Resolved: Green background, green text (dark variant)
- In Progress: Yellow background, yellow text (dark variant)
- Pending: Red background, red text (dark variant)

**Category Badge**
- Similar to status, but with category-specific colors
- Road: Orange
- Garbage: Brown
- Water: Blue
- Streetlight: Purple
- Other: Gray

**Priority Indicator (Dot)**
- Size: 12px circle
- High: Red
- Medium: Yellow
- Low: Green
- Displayed inline with text

### Navigation
**Top Navigation Bar**
- Background: White
- Border-bottom: 1px Border Gray
- Height: 64px (including padding)
- Items: Logo (left), Menu items (center), User profile (right)
- Sticky: Yes
- Logo: 24px height, left margin 24px
- Menu items: Body text, 16px spacing between
- User dropdown: Circular avatar or initials (40px), creates dropdown menu on click

**Sidebar Navigation (Admin)**
- Width: 256px (collapsible to 64px)
- Background: Dark Navy (#0F172A)
- Text: White
- Icons: 24px, left-aligned
- Items: Dashboard, Complaints, Users, Map, Settings
- Active item: Background Primary Blue, rounded 8px
- Collapse/expand button: Top-right of sidebar
- Sticky: Yes

**Breadcrumb Navigation**
- Text: 12px, Medium Gray
- Separator: "/" or ">"
- Last item: Bold, Primary Blue
- Links: Hover underline
- Padding: 12px top/bottom

### Forms
**Form Section**
- Label: Heading 4, 600 weight, 16px
- Description text: 12px, Medium Gray (if needed)
- Input: Standard sizing with 12px gap below
- Error message: 12px, Danger Red, appears below input
- Required indicator: Red asterisk after label

**Multi-step Form**
- Progress indicator: Stepper with circles & connecting lines
- Active step: Blue background circle with number
- Completed step: Green circle, white checkmark
- Inactive step: Light gray circle with number
- Navigation: Previous/Next buttons at bottom
- Step title & description below stepper

### Modals
**Modal Structure**
- Overlay: Dark gray, 50% opacity
- Card: White background, shadow XLarge
- Border radius: 12px
- Padding: 32px
- Header: Heading 2, close button (X) top-right
- Body: Content with 24px top/bottom margin
- Footer: Action buttons right-aligned, 12px gap

**Sizes:**
- Small: 400px width
- Medium: 600px width
- Large: 800px width
- Max-height: 90vh with scroll

### Tables
**Data Table**
- Header row: Dark Gray background, 600 weight text, 16px
- Data rows: White, 1px bottom border (except last)
- Striped rows: Alternate Light Gray background for readability
- Minimum row height: 48px
- Cell padding: 12px 16px
- Sortable columns: Arrow icon appears on hover, changes direction when sorted
- Selectable rows: Checkbox on left, blue highlight when selected
- Actions column: 3-dot menu or inline actions
- Pagination: Bottom-right, "1-10 of 100" + next/previous buttons

### Map Component
**Interactive Map View**
- Background: Light gray
- Complaints: Pins with icons (colored by category)
- Hover: Pin expands showing complaint preview
- Click: Opens complaint detail modal
- Zoom: +/- buttons, scroll to zoom
- Center: "Reset to center" button
- Filter: Category filter overlay (top-right)
- Legend: Category color key (bottom-left)
- Heat map option: Color intensity shows complaint density

---

## 📱 Page Designs

### 1. **Home Page** (Landing/Dashboard)
**Hero Section**
- Full-width gradient background (Blue to lighter blue)
- Headline: Display Large, white text, bold
- Subheadline: Body Large, light blue text
- CTA Button: Primary Blue "Get Started" or "Report Issue"
- Background image/pattern: Subtle geometric pattern or overlaid shapes
- Height: 60vh minimum

**Features Section**
- 3-column grid (responsive to 1 column mobile)
- Card style: Semi-transparent white with border
- Icon: 48px, Primary Blue
- Title: Heading 3
- Description: Body text
- Features: Image Upload, Location Tracking, AI Classification

**Call-to-Action Section**
- 2-column layout: Text on left, image on right
- Heading: Heading 2
- Description: Body text
- Button: Primary CTA
- Image: Relevant screenshot or illustration

**Footer**
- Dark background (#0F172A)
- 4 columns: Company, Product, Support, Social
- Links: 14px, white, hover underline
- Copyright: 12px text, bottom
- Social icons: 24px, clickable links

---

### 2. **Authentication Pages**

**Login Page**
- Centered layout, max-width 400px
- Logo: 32px height, centered top
- Heading: "Welcome Back", Heading 2
- Form fields:
  - Email input
  - Password input with show/hide toggle
  - Checkbox: "Remember me"
- Primary button: "Login" (full width)
- Links: "Forgot password?" (left), "Sign up" (right) below button
- Error message: Red text if login fails
- Loading state: Button shows spinner

**Sign Up Page**
- Same layout as login
- Form fields:
  - Full name input
  - Email input
  - Password input (with requirements indicator)
  - Confirm password input
- Requirements indicator: Checklist showing:
  - At least 8 characters
  - Contains uppercase
  - Contains lowercase
  - Contains number
  - Contains special character
- Checkbox: "I agree to terms"
- Primary button: "Create Account"
- Link: "Already have account? Login"

**Forgot Password Page**
- Centered, max-width 400px
- Heading: "Reset Password"
- Email input field
- Primary button: "Send Reset Link"
- Message: "Check your email for reset instructions"
- Link: "Back to login"

**Reset Password Page**
- OTP/Token input (auto-focus, auto-submit after filled)
- New password input
- Confirm password input
- Password requirements: Same as signup
- Primary button: "Reset Password"
- Success message (green): "Password reset successful"

**Admin Login Page**
- Same structure as user login
- Add: "Admin Portal" label under logo
- Button text: "Admin Login"
- Different color accent: Slight purple/red tint optional

---

### 3. **Complaint Submission Page**

**Page Layout**
- Max-width: 800px
- Left sidebar (optional responsive): Form steps indicator
- Main content: Form fields

**Form Section: Issue Details**
- Heading: "Report an Issue"
- Form fields:
  - Description textarea (placeholder: "Describe the issue...")
  - Category dropdown (with icons for each category)
  - Category suggestion badge: "AI suggests: [category]" (orange accent)

**Form Section: Image Upload**
- Heading: "Upload Evidence"
- Two tabs: "Camera" | "Upload Photo"
- Camera tab:
  - Video preview area (16:9 aspect)
  - Button: "Take Photo" (Primary)
  - Button: "Retake" (Secondary, if photo taken)
  - Button: "Use Photo" (Primary, if photo taken)
  - Preview: Thumbnail after capture
- Upload tab:
  - Drag-and-drop zone (dashed border, light blue background)
  - Text: "Drag photos here or click to browse"
  - File input (hidden)
  - Preview: Thumbnail after upload
- Multiple images: Gallery view with remove button on each

**Form Section: Location**
- Heading: "Location"
- Two options: Auto-detect or Manual entry
- Auto-detect button: "Get Current Location" (Primary Blue)
- Manual entry fields:
  - Latitude input (number, 6 decimals)
  - Longitude input (number, 6 decimals)
  - Map preview: Small embedded map showing pinned location
- Current location display: "Location: [City, Country]"
- Error message: If location access denied

**Submit Section**
- Full-width Primary button: "Submit Complaint" (24px, bottom margin)
- Secondary button: "Save as Draft"
- Loading state: Spinner + "Submitting..."
- Success state: Checkmark + "Complaint submitted successfully!"

---

### 4. **My Complaints Page** (User Dashboard)

**Page Header**
- Title: "My Complaints"
- Stats row: 3 cards showing:
  - Total: [count]
  - Pending: [count] (red)
  - Resolved: [count] (green)

**Filters Section**
- Horizontal filter bar:
  - Status dropdown (All, Pending, In Progress, Resolved)
  - Category dropdown (All, Road, Garbage, etc.)
  - Date range picker (optional)
  - Clear filters button
- Active filters shown as chips below

**Complaint List/Grid**
- Default: Card layout (2-column grid)
- List view toggle (icon button, top-right)
- Empty state: Icon + "No complaints found" text + "Report Issue" button

**Complaint Card**
- Image: 240x160px, 4:3 ratio
- Status badge: Top-right corner
- Content:
  - Category pill (small)
  - Title/Description (2 lines, truncated)
  - Location: Pin icon + "Lat, Long" text
  - Date: Calendar icon + "DD/MM/YYYY"
  - Upvotes: Thumbs up icon + count
- Action buttons:
  - Edit (blue pencil icon) - appears if Pending
  - Delete (red trash icon)
  - View details (expand icon)
- Hover: Card shadow increases, buttons become visible

**Pagination**
- Bottom center
- Layout: "Page [1] of [5]" + Previous button + Next button

---

### 5. **Complaints List Page** (Public View)

**Page Header**
- Title: "All Complaints"
- Subtitle: "[count] issues reported"

**Filters & Sort**
- Horizontal filter bar:
  - Category dropdown
  - Status dropdown
  - Priority dropdown
  - Search bar (search description/address)
- Sort dropdown: Latest, Popular (upvotes), Priority

**Map Toggle**
- Small icon button (map icon) to switch to map view
- Currently showing: "List View"

**Complaint Cards Grid**
- 2-column layout (responsive 1-column mobile)
- Card design (as described above)
- Action: Only "Upvote" button visible (no edit/delete)

**Upvote Button**
- Icon + count: "👍 [count]"
- Primary Blue background
- On hover: Slightly darker
- On click: Count increases, button changes to filled state
- Tooltip: "Upvote to increase priority"

**Pagination**
- Same as My Complaints page

---

### 6. **Complaint Details Modal**

**Modal Header**
- Title: Category name (Heading 2)
- Close button: X (top-right)
- Status badge: Top-left

**Modal Content**
- 2 columns: Image (left, 60%), Details (right, 40%)

**Image Section**
- Full-width image carousel (if multiple images)
- Navigation arrows: Left/Right
- Image counter: "1 of 3"
- ML Analysis toggle button: Shows AI-processed image overlay

**Details Section**
- Description: Full text (Body)
- Category: Colored badge + text
- Status: Colored badge + text
- Priority: Colored dot + text
- Location: Pin icon + clickable coordinates
- Date submitted: Calendar icon + date
- Submitted by: User avatar (32px) + name + "Verified" badge (if applicable)
- Upvotes: Thumbs icon + count
- Resolution note (if resolved): Green box with text "Resolved on [date]"
- Action buttons:
  - Edit (if your complaint & pending)
  - Delete (if your complaint)
  - Upvote (if not your complaint)

**ML Analysis Section (Expandable)**
- Heading: "AI Analysis"
- ML Image: Processed image with bounding boxes
- Detected objects: List showing confidence percentages
- Suggested category: With confidence score (0-100%)

---

### 7. **Edit Complaint Modal**

**Structure**
- Same as submission form
- Pre-filled with existing data
- Disabled fields: Image (can add more), Location (can change)
- Button: "Update Complaint" (instead of Submit)
- Success: "Changes saved successfully"

---

### 8. **Admin Dashboard**

**Dashboard Header**
- Welcome message: "Welcome back, [Admin Name]"
- Date/Time display
- Notifications bell (red dot if unread)
- Admin settings icon

**Stats Grid** (4 columns, responsive)
- Card 1: Total Complaints
  - Large number (50+)
  - Icon: Bar chart
  - Trend: +12% (green)
- Card 2: Pending
  - Large number
  - Icon: Clock
  - Trend: -5% (green)
- Card 3: In Progress
  - Large number
  - Icon: Hourglass
  - Trend: +8% (orange)
- Card 4: Resolved
  - Large number
  - Icon: Checkmark
  - Trend: +23% (green)

**Recent Complaints Section**
- Heading: "Recent Complaints"
- Sort button dropdown: "Sort Complaints" (High Upvotes, Recent, Oldest)
- Data table:
  - Columns: ID | Category | Status | Priority | User | Upvotes | Action
  - Rows: 10 per page
  - Sortable columns (click header)
  - Selectable rows (checkbox)
- Table actions (top-right):
  - Bulk delete button
  - Bulk status update
- Row actions:
  - Update button
  - Images button (shows modal with image gallery)
  - Location button (shows map modal)
  - Delete button

**Category Breakdown Chart** (optional, bottom-left)
- Pie chart showing complaints by category
- Legend: Category colors + counts
- Clickable: Filter table by category

**Priority Heat Map** (optional, bottom-right)
- Stacked bar chart showing high/medium/low priority
- Color coded: Red, Yellow, Green

---

### 9. **User Management Page** (Admin)

**Page Header**
- Title: "User Management"
- Add user button: "New Admin" (Primary Blue)
- Search bar: Search by name/email

**User Table**
- Columns: Avatar | Name | Email | Role | Status | Actions
- Sortable columns
- Rows: 25 per page
- Row actions (3-dot menu):
  - View profile
  - Edit role
  - Ban user
  - Suspend user (24hr)
  - Unsuspend user
  - Delete user
  - Send message

**Bulk Actions**
- Select multiple users
- Dropdown: Ban selected | Suspend selected | Change role

**Status Indicators**
- Green dot: Active
- Orange dot: Suspended
- Red X: Banned

---

### 10. **Admin Map View**

**Full-screen map**
- Interactive map with complaint pins
- Pin colors by category:
  - Orange: Road
  - Brown: Garbage
  - Blue: Water
  - Purple: Streetlight
  - Gray: Other
- Pin size by priority:
  - Large: High
  - Medium: Medium
  - Small: Low
- Pin opacity by status:
  - Solid: Pending
  - Semi-transparent: In Progress
  - Faded: Resolved

**Click pin:**
- Details popup:
  - Category + description (2 lines)
  - Status badge
  - Upvotes
  - "View details" button

**Controls (top-right)**
- Zoom in/out buttons
- Reset center button
- Fullscreen toggle

**Sidebar (left)**
- Filter section:
  - Category checkboxes (with eye icon to toggle visibility)
  - Status checkboxes
  - Date range picker
- Legend: Color meanings

**Info panel (bottom)**
- Statistics:
  - Total pins visible
  - By status breakdown
  - By category breakdown

---

## 🔄 Interactive Elements & Animations

### Transitions
- Page load: Fade in + slight slide up (300ms, ease-out)
- Button hover: Scale 1.02 + color change (150ms)
- Card hover: Shadow increase + slight lift (200ms)
- Modal open: Fade overlay + scale up from center (300ms)
- Toast notification: Slide in from top-right (300ms)

### Loading States
- Spinner: Rotating blue circle (32px)
- Progress bar: Linear bar at top of page
- Skeleton loaders: Gray placeholders matching content shape
- Pulse animation: Subtle opacity pulse for disabled states

### Micro-interactions
- Checkbox: Scale + checkmark animation (150ms)
- Upvote button: Count number animation (number slides up)
- Status change: Color transition (200ms)
- Form submission: Button text to checkmark (400ms)
- Delete confirmation: Shake animation if mistake warning

---

## 📐 Responsive Design

### Breakpoints
```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Large: 1440px+
```

### Mobile Adaptations
- Single column layout
- Bottom navigation bar (fixed)
- Navigation drawer (hamburger menu)
- Full-width inputs
- Larger touch targets (48px minimum)
- Swipe gestures for navigation
- Vertical card stack
- Simplified modals (full-screen)

### Tablet
- 2-column layouts
- Sidebar navigation (collapsible)
- Optimized spacing

---

## 🎯 Key Design Principles

1. **Clarity**: Every element has a clear purpose
2. **Accessibility**: WCAG 2.1 AA compliance
   - Minimum font size: 12px
   - Color contrast: 4.5:1 for text
   - Touch targets: 48px minimum
3. **Consistency**: Uniform spacing, colors, typography
4. **Feedback**: Every action provides visual feedback
5. **Efficiency**: Minimize clicks to complete tasks
6. **Trust**: Clear status indicators, honest error messages
7. **Delight**: Smooth transitions, thoughtful micro-interactions

---

## 📝 Content Guidelines

### Tone of Voice
- Friendly and professional
- Clear and concise
- Action-oriented button text
- Empathetic error messages

### Button Copy Examples
- "Report Issue" (not "Submit complaint")
- "Get Location" (not "Detect GPS")
- "Confirm" (not "OK")
- "Go back" (not "Return")

### Error Messages
- Format: "[Icon] What went wrong + How to fix it"
- Example: "❌ Email not found. Please check and try again."
- Position: Below field or as inline alert

### Success Messages
- Format: "[Icon] Action confirmed + Next step"
- Example: "✓ Complaint submitted! Track it in My Complaints."
- Duration: Auto-dismiss after 5 seconds

---

## 🔐 Admin-Specific Design Notes

- Admin sections: Slightly different color accent (purple/dark blue)
- Admin toolbar: Dark background, white icons
- Critical actions (delete): Require confirmation with red warning icon
- Data tables: Striped rows, hover highlighting for better readability
- Dashboard: Information hierarchy: Stats > Recent items > Detailed view

---

## Export & Handoff

This design system should be organized in Figma as:
```
SmartReporter Design System
├── Colors
├── Typography
├── Components
│   ├── Buttons
│   ├── Inputs
│   ├── Cards
│   ├── Badges
│   └── Navigation
├── Layouts
│   ├── Mobile
│   ├── Tablet
│   └── Desktop
├── Pages
│   ├── User Pages
│   ├── Admin Pages
│   └── Authentication
└── Prototypes
    ├── User Flow
    └── Admin Flow
```

**Deliverables:**
- ✅ Complete component library with variants
- ✅ 10+ page designs (all responsive)
- ✅ Interactive prototype with flows
- ✅ Design hand-off specs (fonts, sizes, colors)
- ✅ Animation specifications
- ✅ Mobile & tablet variations
