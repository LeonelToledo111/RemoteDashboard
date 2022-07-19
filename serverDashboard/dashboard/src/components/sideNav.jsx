import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from "@material-ui/core/Divider";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import Collapse from "@material-ui/core/Collapse";
import {useSelector, useDispatch} from 'react-redux';
import {setValue} from './../actions';

function SidebarItem({ depthStep = 10, depth = 0, expanded, item, ...rest }) {
    const [collapsed, setCollapsed] = React.useState(true);
    const { label, items, Icon, onClick: onClickProp } = item;
    const dispatch = useDispatch();
  
    var module =-1;

    function toggleCollapse() {
      setCollapsed(prevValue => !prevValue);
    }

    function setModule(item){
      if(item.name==="meteorological"){
        dispatch(setValue(0));
      }
      if(item.name==="crop"){
        dispatch(setValue(1));
      }
      if(item.name==="indices"){
        dispatch(setValue(2));
      }
      if(item.name==="policy"){
        dispatch(setValue(3));
      }
      if(item.name==="climate"){
        dispatch(setValue(4));
      }
      if(item.name==="losses"){
        dispatch(setValue(5));
      }
      if(item.name==="payout"){
        dispatch(setValue(6));
      } 
      
      if(item.name==="metClone1"){
        dispatch(setValue(7));
      }  

      if(item.name==="metClone2"){
        dispatch(setValue(8));
      }  

      if(item.name==="Visualization"){
        dispatch(setValue(9));
      } 

    }
  
    function onClick(e) {
      if (Array.isArray(items)) {
        dispatch(setValue(-1));
        toggleCollapse();
      }
      if (onClickProp) {
        onClickProp(e, item);
        setModule(item);
        
      }
    }
  
    let expandIcon;
  
    if (Array.isArray(items) && items.length) {
      expandIcon = !collapsed ? (
        <ExpandLessIcon
          className={
            "sidebar-item-expand-arrow" + " sidebar-item-expand-arrow-expanded"
          }
        />
      ) : (
        <ExpandMoreIcon className="sidebar-item-expand-arrow" />
      );
    }
  
    return (
      <>
        <ListItem
          className="sidebar-item"
         // onClick={()=>dispatch(setValue())}
          onClick={onClick}
          button
          dense
          {...rest}
        >
          <div
            style={{ paddingLeft: depth * depthStep }}
            className="sidebar-item-content"
          >
            {Icon && <Icon className="sidebar-item-icon" fontSize="small" />}
            <div className="sidebar-item-text">{label}</div>
          </div>
          {expandIcon}
        </ListItem>
        <Collapse in={!collapsed} timeout="auto" unmountOnExit>
          {Array.isArray(items) ? (
            <List disablePadding dense>
              {items.map((subItem, index) => (
                <React.Fragment key={`${subItem.name}${index}`}>
                  {subItem === "divider" ? (
                    <Divider style={{ margin: "6px 0" }} />
                  ) : (
                    <SidebarItem
                      depth={depth + 1}
                      depthStep={depthStep}
                      item={subItem}
                    />
                  )}
                </React.Fragment>
              ))}
            </List>
          ) : null}
        </Collapse>
      </>
    );
  }

  function Sidebar({ items, depthStep, depth, expanded }) {
    return (
      <div className="sidebar">
        <List disablePadding dense>
          {items.map((sidebarItem, index) => (
            <React.Fragment key={`${sidebarItem.name}${index}`}>
              {sidebarItem === "divider" ? (
                <Divider style={{ margin: "6px 0" }} />
              ) : (
                <SidebarItem
                  depthStep={depthStep}
                  depth={depth}
                  expanded={expanded}
                  item={sidebarItem}
                />
              )}
            </React.Fragment>
          ))}
        </List>
      </div>
    );
  }

export default Sidebar;
