import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Container } from '@mui/material'; // Import Grid and Button from MUI

import './menu.scss';
import { menu } from '../../data';

const Menu = () => {
  return (
    <div className="menu">
      {menu.map((section) => (
        <div className="item" key={section.id}>
          <span className="title">{section.title}</span>
          {section.listItems.map((listItem) => (
            <Link to={listItem.url} className="listItem" key={listItem.id}>
              <i className={listItem.icon} aria-hidden="true"></i>
              <span className="listItemTitle">{listItem.title}</span>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Menu;
