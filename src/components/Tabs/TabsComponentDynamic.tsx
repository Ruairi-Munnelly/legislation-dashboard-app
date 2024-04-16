/**
 * This is a simple React.js component used for rendering out a tabs feature and components.
 *
 * @param {string[]} Tab Titles - The names for each of .
 * @param {JSX.Element[] | string[]} TabContent - Returned content within tab component may be passed as string or a JSX element when passed in an array.
 * @returns {JSX.Element} - A JSX element representing the tabs and the subsequent provided components.
 */

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import parse from "html-react-parser";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={"span"}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function TabsComponent({
  tabTitles,
  tabContent,
}: {
  tabTitles: string[];
  tabContent: JSX.Element[] | string[];
}) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          {tabTitles.map((tab: string, index: number) => (
            <Tab key={index} label={tab} {...a11yProps(index)} />
          ))}
        </Tabs>
      </Box>

      {tabContent.map((content: string | JSX.Element, index: number) => (
        <CustomTabPanel key={index} value={value} index={index}>
          {typeof content === "string" ? parse(content) : content}
        </CustomTabPanel>
      ))}
    </Box>
  );
}
