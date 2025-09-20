
# SPF Checker

A simple, single-page React application that allows users to check the Sender Policy Framework (SPF) records of any domain. This tool helps verify which mail servers are authorized to send emails on behalf of a domain, aiding in email security and anti-spoofing measures.

## Features

- **Domain Input**: Enter a domain name to check its SPF records.
- **SPF Record Display**: View all `v=spf1` records associated with the domain.
- **Highlight Mechanisms**: `include:` and `redirect=` mechanisms are highlighted for clarity.
- **Expandable Includes**: Click on `include:` mechanisms to fetch and display the SPF records of the included domain.
- **Loading Indicator**: Visual feedback while fetching DNS records.
- **Error Handling**: Graceful handling of invalid domains or domains without SPF records.

## Technologies Used

- **Frontend**: React.js
- **Styling**: Tailwind CSS
- **DNS Lookup**: Google's DNS-over-HTTPS API
- **State Management**: React Hooks (`useState`, `useEffect`)

## Setup and Installation

To run the SPF Checker locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/spf-checker.git
   cd spf-checker
   ```
Install dependencies:
```bash
npm install
```
Start the development server:
```bash
npm run dev
```
Open your browser and navigate to http://localhost:5173.

Usage
Enter a domain name (e.g., example.com) into the input field.

Click the "Check SPF" button or press Enter.

View the SPF records displayed below the input field.

Click on any include: mechanism to view the SPF records of the included domain.

Validation
Invalid Domains: If no DNS TXT records are found, an error message is displayed: "No DNS TXT records found for this domain."

No SPF Records: If no v=spf1 records are found, an error message is displayed: "No SPF record found."

Empty Input: Clicking "Check SPF" without entering a domain does nothing; no error is thrown.

Design
The application features a clean and responsive design:

Input Field: Centered at the top with placeholder text guiding the user.

Button: Positioned next to the input field, changing text based on loading state.

Results Area: Displays SPF records in cards, with mechanisms like include: and redirect= highlighted.

Responsive Layout: Adapts to different screen sizes using Tailwind CSS classes.