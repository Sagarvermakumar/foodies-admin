import {
    Button,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text
} from '@chakra-ui/react';
import { useState } from 'react';

const DeleteUserProfileModal = ({ isOpen, onClose, onDelete, userName, deleteOfName }) => {
    const [enteredName, setEnteredName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = () => {
        if (enteredName.trim() === userName) {
            onDelete();       // Call delete function
            setEnteredName(''); // Clear input
            setError('');
            onClose();
            // Close modal
        } else {
            setError('Entered name does not match. Please type the exact username to confirm.');
        }


    };

    const handleClose = () => {
        setEnteredName('');
        setError('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered>
            <ModalOverlay backdropFilter="blur(5px)" />
            <ModalContent
                bg="transparent"
                color="white" p={4}
                backdropFilter="blur(4px)"
                boxShadow="0 0 20px 4px rgba(255, 255, 255, 0.2)"
                border="1px solid rgba(255, 255, 255, 0.1)" >
                <ModalHeader color="red.600">Confirm Profile Deletion</ModalHeader>
                <ModalCloseButton />
                <ModalBody  >
                    <Text mb={2}>
                        To delete the profile, type the {deleteOfName}'s name: <b style={{ color: "#f20", fontWeight: 500, fontFamily: "sans-serif" }}>{userName}</b>
                    </Text>
                    <Input
                        my={4}
                        placeholder={`Type "${userName}" to confirm`}
                        value={enteredName}
                        onChange={(e) => setEnteredName(e.target.value)}
                        borderColor={error ? 'red.500' : 'gray.600'}

                    />
                    {error && (
                        <Text mt={2} color="red.400" fontSize="sm">
                            {error}
                        </Text>
                    )}
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme="red" mr={3} onClick={handleSubmit}>
                        Delete Profile
                    </Button>
                    <Button variant="outline" onClick={handleClose}>
                        Cancel
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default DeleteUserProfileModal;
