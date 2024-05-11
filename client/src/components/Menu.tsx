import React from 'react';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import FirstComponent from './CTA'; // Ensure this import path is correct
import SecondComponent from './InputText'; // Ensure this import path is correct

// Define the props interface
interface MenuProps {
    activeTabIndex: number;
    setActiveTabIndex: (index: number) => void;
  }

export default function Menu({ activeTabIndex, setActiveTabIndex }: MenuProps) {
    return (
        <Tabs isFitted variant='enclosed' index={activeTabIndex} onChange={index => setActiveTabIndex(index)}>
          <TabList mb='1em'>
            <Tab>Welcome</Tab>
            <Tab>Poenostavljanje</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <FirstComponent />
            </TabPanel>
            <TabPanel>
              <SecondComponent />
            </TabPanel>
          </TabPanels>
        </Tabs>
      );
}
