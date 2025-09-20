
# SPF Checker

A simple, single-page React application that allows users to check the Sender Policy Framework (SPF) records of any domain. This tool helps verify which mail servers are authorized to send emails on behalf of a domain, aiding in email security and anti-spoofing measures.

## Live Demo

- **Check it live here**: [https://spf-checker.vercel.app/](https://spf-checker.vercel.app/)


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
   git clone https://github.com/Hira703/SPF-checker
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


## Usage

- **Enter Domain**: Type a domain name (e.g., `example.com`) into the input field.
- **Check SPF**: Click the "Check SPF" button or press Enter.
- **View SPF Records**: Displayed below the input field.
- **View Includes**: Click on any `include:` mechanism to see SPF records of included domains.

## Validation

- **Invalid Domains**: "No DNS TXT records found for this domain."
- **No SPF Records**: "No SPF record found."
- **Empty Input**: Clicking "Check SPF" without a domain does nothing.

## Design

- **Input Field**: Centered with placeholder text.
- **Button**: Positioned next to input field; text changes on loading.
- **Results Area**: SPF records displayed in cards; `include:` and `redirect=` highlighted.
- **Responsive Layout**: Adapts to different screen sizes using Tailwind CSS.