import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import slug from 'slug';

Sidebar.propTypes = {
    title: PropTypes.string.isRequired,
    list: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

//create customlink instead of returning navLink in map
function CustomLink ({ to, children }) {
    //use route b/c has built in location checker we'll use to change style of link
    return (
        <Route 
            path={to.pathname}  //to is an object
            children={({ match }) => (
                <li style={{listStyleType: 'none', fontWeight: match ? 'bold' : 'normal'}}>
                    <Link to={to}>{children}</Link>
                </li>  //if location matches it will be bold
            )}
        />
    )
}

export default function Sidebar ({ title, list, loading, location, match }) {
    return loading === true
        ? <h1>LOADING</h1>
        : <div>
            <h3 className='header'>{title}</h3>
            <ul className='sidebar-list'>
                {list.map((item) => (
                    <CustomLink
                        key={item}
                        to={{
                            pathname: `${match.url}/${slug(item)}`,
                            search: location.search,
                        }}
                    >
                        {item.toUpperCase()}
                    </CustomLink>
                ))}
            </ul>
        </div>
}