import { Box } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import EmptyState from '../Components/common/EmptyState';
import UserDetailsCardSkeleton from '../Components/Skeletons/UserDetailsCardSkeleton';
import UserDetailsCard from '../Components/UserDetailsCard';
import { blockUser, getUserById, unblockUser } from '../features/users/UserAction';
const UserDetails = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getUserById(id));
    }, [dispatch, id]);

    const { userDetails, isLoading, isLoadingChangeUserStatus } = useSelector((state) => state.user);




    const handdleBlockUser = () => {
        if (userDetails.status === 'active') {
            dispatch(blockUser(userDetails._id));
        } else {
            dispatch(unblockUser(userDetails._id));

        }
    };

    return (
        <>
            {isLoading ? (
                <UserDetailsCardSkeleton />
            ) : (
                <>
                    {userDetails ? (

                        <Box p={0}>
                            {/* User Details Card */}
                            <UserDetailsCard user={userDetails} />


                        </Box>


                    ) : (
                        <EmptyState
                            label="User"
                            subLabel="Maybe the User was deleted or does not exist."
                        />
                    )}
                </>
            )}
        </>
    );
};

export default UserDetails;
