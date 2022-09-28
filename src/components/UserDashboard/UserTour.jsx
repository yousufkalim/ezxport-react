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
    const {title, description} = props.tour;
    const { index, pathname } = props;
    const history = useHistory();
    const handleNext = () => {
        if(pathname === '/User/Dashboard/ListOfRequests'){
            history.push('/User/Dashboard/Providers')
        } else if(pathname === '/User/Dashboard/Providers'){
            history.push('/User/Dashboard/AddressBook');
        }
        else if(pathname === '/User/Dashboard/AddressBook'){
            history.push('/User/Dashboard/AddressBook');
        }
        else if(pathname === '/User/Dashboard/Providers'){
            history.push('/User/Dashboard/AddressBook');
        }
    }

  return (
    <div className="user_tour">
        <div className='user_tour_title_container'>
            <div className='user_tour_title'>{title}</div>
            {`${index}/4`}
        </div>
        <div className='user_tour_description'>{description}</div>
        <div className='user_tour_buttons'>
            { index !== 1 && <Button className='user_tour_previous' text='Previous' /> }
            <Button onClick={() => handleNext()} className={`${index === 1 && 'user_tour_show_next'} user_tour_next`} text='Next' />
        </div>
    </div>
  )
}

export default UserTour