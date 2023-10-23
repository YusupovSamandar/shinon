"use client";
import { ReduxProvider } from './redux/provider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


export function AppProviders({ children }) {
   return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
         <ReduxProvider>
            {children}
         </ReduxProvider>
      </LocalizationProvider>
   )
}