import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
   const { children, value, index, ...other } = props;

   return (
      <div
         role="tabpanel"
         hidden={value !== index}
         id={`simple-tabpanel-${index}`}
         aria-labelledby={`simple-tab-${index}`}
         {...other}
      >
         {value === index && (
            <Box sx={{ p: 1 }}>
               <div>{children}</div>
            </Box>
         )}
      </div>
   );
}

CustomTabPanel.propTypes = {
   children: PropTypes.node,
   index: PropTypes.number.isRequired,
   value: PropTypes.number.isRequired,
};

function a11yProps(index) {
   return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
   };
}

export default function BasicTabs({ tab1, tab2, tab3 }) {
   const [value, setValue] = React.useState(0);

   const handleChange = (event, newValue) => {
      setValue(newValue);
   };

   return (
      <Box sx={{ width: '100%' }}>
         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
               value={value}
               onChange={handleChange}
               aria-label="basic tabs example"
               variant="fullWidth"
            >
               <Tab label={tab1.label} {...a11yProps(0)} />
               <Tab label={tab2.label} {...a11yProps(1)} />
               <Tab label={tab3.label} {...a11yProps(2)} />
            </Tabs>
         </Box>
         <CustomTabPanel value={value} index={0}>
            {tab1.content}
         </CustomTabPanel>
         <CustomTabPanel value={value} index={1}>
            {tab2.content}
         </CustomTabPanel>
         <CustomTabPanel value={value} index={2}>
            {tab3.content}
         </CustomTabPanel>
      </Box>
   );
}