import Button from '../Common/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';

const paths = [
    '/User/Dashboard/ListOfRequests',
    '/User/Dashboard/Providers',
    '/User/Dashboard/AddressBook',
    '/User/Dashboard/Documents'
]

const UserTour = (props) => {
    const { title, description } = props.tour;
    const { index, pathname } = props;
    const history = useHistory();
    const i = index + 1;

    const handleNext = (next) => {
        if (props.pathname === '/User/Dashboard/Documents') {
            localStorage.setItem('newUser', false);
            props.setShowTour(false);
        }
        else {
            let routeIndex = next ? paths.indexOf(pathname) + 1 : paths.indexOf(pathname) - 1;
            if (routeIndex === 0 && !next) {
                history.push(paths[0]);
            }
            else if (routeIndex) {
                const findItem = paths.find((a, fi) => fi === routeIndex);
                history.push(findItem);
            }
        }
    }

    return (
        <div className="user_tour" style={{ top: i === 2 ? '9%' : i === 3 ? '13%' : i === 4 && '16%' }}>
            <div className='user_tour_title_container'>
                <div className='user_tour_title'>{title}</div>
                {`${i}/4`}
            </div>
            <div className='user_tour_description'>{description}</div>
            <div className='user_tour_buttons'>
                {i !== 1 && <Button onClick={() => handleNext(false)} className='user_tour_previous' text='Previous' />}
                <Button onClick={() => handleNext(true)} className={`${i === 1 && 'user_tour_show_next'} user_tour_next`} text={i === 4 ? 'To end' : 'Next'} />
            </div>
        </div>
    )
}

export default UserTour