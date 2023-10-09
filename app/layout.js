"use client"
import './globals.css';
import { Inter } from 'next/font/google';
const inter = Inter({ subsets: ['latin'] });
import { ReduxProvider } from './redux/provider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function RootLayout({ children }) {


  return (
    <html lang="en">
      <body className={inter.className}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ReduxProvider>
            {children}
          </ReduxProvider>
        </LocalizationProvider>
      </body>
    </html>
  )
}
