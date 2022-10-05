import Button from '../Common/Button';
import React from 'react';
import { useHistory } from 'react-router-dom';
import API from '../../api';
import toaster from '../../utils/toaster';
import { useTranslation } from 'react-i18next';

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
    const {t} = useTranslation();
    const i = index + 1;

    const handleNext = async (next) => {
        if (next && props.pathname === '/User/Dashboard/Documents') {
            const user = localStorage.getItem('userData');
            const currentUser = JSON.parse(user);
            currentUser.onboarded = true
            await API('put', `/users/${currentUser._id}`, currentUser).then((res) => {
                localStorage.setItem('newUser', true);
                props.setShowTour(false);
                history.push('/User/Dashboard/ListOfRequests')
            }).catch((err) => {
                toaster('failed', 'Something went wrong');
            })
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

    // style={{ top: i === 2 ? '10.7%' : i === 3 ? '14.3%' : i === 4 && '19.3%' }}

    return (
        <div className={`${i === 1 ? 'user_tour_1' : i === 2 ? 'user_tour_2' : i === 3 ? 'user_tour_3' : 'user_tour_4'} user_tour`}>
            <div className='user_tour_triangle'></div>
            <div className='user_tour_title_container'>
                <div className='user_tour_title'>{t(title)}</div>
                {`${i}/4`}
            </div>
            <div className='user_tour_description'>{t(description)}</div>
            <div className='user_tour_buttons'>
                {i !== 1 && <Button onClick={() => handleNext(false)} className='user_tour_previous' text='Previous' />}
                <Button onClick={() => handleNext(true)} className={`${i === 1 && 'user_tour_show_next'} user_tour_next`} text={i === 4 ? 'To end' : 'Next'} />
            </div>
        </div>
    )
}

export default UserTour