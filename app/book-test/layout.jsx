import { Metadata } from 'next';

export const metadata = {
  title: 'Book a Test - Sukaii',
  description: 'Book your health test with Sukaii. Choose from our wide range of diagnostic tests and health packages with convenient home sample collection.',
  openGraph: {
    title: 'Book a Test - Sukaii',
    description: 'Book your health test with Sukaii. Choose from our wide range of diagnostic tests and health packages with convenient home sample collection.',
    images: [
      {
        url: '/public/reports-upload/report-banner.jpg',
      },
    ],
  },
  keywords: 'health test booking, diagnostic tests, home sample collection, Sukaii health tests, medical tests booking',
};

export default function BookTestLayout({ children }) {
  return children;
}
