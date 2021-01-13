import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';

import StyledBreadcrumb from './styles'
import { Link } from "react-router-dom";


export default function CustomizedBreadcrumbs({ nextLinks, finalLink=null }) {
  return (
    <Breadcrumbs aria-label="breadcrumb">
      <Link exac='true' to='/app/dashboard' style={{ textDecoration: 'none' }}>
        <StyledBreadcrumb
          component="p"
          label="Trang chủ"
          icon={<HomeIcon fontSize="small" style={{ color: "white" }} />}
          onClick={() => { }}
        />
      </Link>

      {nextLinks.map((link, index) => {
        return (
          <Link exac='true' to= {link.path} style={{ textDecoration: 'none' }} key={index}>
            <StyledBreadcrumb component="p"  label={link.label} onClick={() => { }}  />
          </Link>
        )
      })}
      {
        finalLink?<StyledBreadcrumb
        href="#"
        label={finalLink.label}
        onClick={() => { }}
      />:null
      }
      
    </Breadcrumbs>
  );
}
