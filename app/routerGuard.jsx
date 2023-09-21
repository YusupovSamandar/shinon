"use client"
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateState } from '@/app/redux/features/auth-slice';
import axios from './axiosInstance';
import { API_URL } from './apiConfig';

export const displayForUser = (allowedRoles, currentUserRoles) => {
    if (allowedRoles.includes(currentUserRoles)) {
        return true;
    } else {
        return false;
    }

}

export function CheckUserRole({ children, allowedRoles }) {


    const dispatch = useDispatch();


    // eslint-disable-next-line react-hooks/exhaustive-deps


    const router = useRouter();
    const currentUser = useSelector((state) => state.userAuth);
    const [shouldRenderContent, setShouldRenderContent] = useState(false);

    const fetchCurrUserData = async () => {
        const currUserId = localStorage.getItem('currentUserID');
        if (currUserId) {
            try {
                const { data } = await axios.get(`${API_URL}/api/users/${currUserId}`);
                dispatch(updateState({ value: data, isAuth: true }));
                return data;
            } catch (err) {
                console.log(err);
                return false;
            }
        } else {
            return false
        }
    }

    // Check if the user's role is one of the allowed roles
    useEffect(() => {
        if (!currentUser || !currentUser?.isAuth) {
            (async function () {
                const fetchingResponse = await fetchCurrUserData()
                if (!fetchingResponse) {
                    router.replace('/login');
                }
            })();
        }
        else if (!allowedRoles.includes(currentUser.value.role)) {
            console.log(currentUser.value.role);
            router.replace('/restricted');
        } else {
            setShouldRenderContent(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser, allowedRoles, router])


    return <>{shouldRenderContent ? children : <div style={{ textAlign: "center" }}>loading...</div>}</>
}