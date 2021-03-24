//import React from 'react';
import React, {useState} from 'react';
import HomeIcon from "@material-ui/icons/Home";
import ReceiptIcon from "@material-ui/icons/Receipt";
import NotificationsIcon from "@material-ui/icons/Notifications";
import DesktopWindowsIcon from "@material-ui/icons/DesktopWindows";
import SettingsIcon from "@material-ui/icons/Settings";
import Sidebar from './sideNav'
import './../App.css';



function onClick(e, item) { 
 // window.alert(JSON.stringify(item, null, 2));
}

const items = [
  { name: "home", label: "Home", Icon: HomeIcon },
  {
    name: "modules",
    label: "Modules",
    Icon: ReceiptIcon,
    items: [
      { name: "meteorological", label: "Meteorological Variables", onClick },
      { name: "crop", label: "Crop Modelling", onClick },
      { name: "indices", label: "Meteorological Indices", onClick },
      { name: "policy", label: "Policy Computation", onClick },
      { name: "climate", label: "Climate", onClick },
      { name: "losses", label: "Losses Computation", onClick },
      { name: "payout", label: "Payout Optimization", onClick },
      { name: "metClone1", label: "metClone1", onClick },
      { name: "metClone2", label: "metClone2", onClick }
    ]
  },
  "divider",
  {
    name: "settings",
    label: "Settings",
    Icon: SettingsIcon,
    items: [
      { name: "profile", label: "Profile" },
      { name: "insurance", label: "Insurance", onClick },
      "divider",
      {
        name: "notifications",
        label: "Notifications",
        Icon: NotificationsIcon,
        items: [
          { name: "email", label: "Email", onClick },
          {
            name: "desktop",
            label: "Desktop",
            Icon: DesktopWindowsIcon,
            items: [
              { name: "schedule", label: "Schedule", onClick },
              { name: "frequency", label: "Frequency" }
            ]
          },
          { name: "sms", label: "SMS" }
        ]
      }
    ]
  }
];



function Dashboard() {
  return (
        <div>
            <Sidebar items ={items} />
        </div>
  );
}

export default Dashboard;