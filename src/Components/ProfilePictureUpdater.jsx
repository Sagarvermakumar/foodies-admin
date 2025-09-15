import {
    Avatar,
    Box,
    Button,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spinner,
    Text,
    VStack,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { FaCamera } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { updateAvatar } from "../features/users/UserAction";

const ProfilePictureUpdater = ({ name, avatar }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const inputRef = useRef();
    const [preview, setPreview] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const dispatch = useDispatch();
    const { updateAvatarLoading } = useSelector(state => state.auth);
    // Trigger file input
    const handleIconClick = () => {
        inputRef.current.click();
    };

    // File select and preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check if same image selected again
        if (avatar && preview === null) {
            const reader = new FileReader();
            reader.onloadend = () => {
                if (reader.result === avatar) {
                    toast({
                        status: "error",
                        title: "Image already updated",
                        description: "Please select a different image.",
                        duration: 3000,
                        isClosable: true,
                    });
                    inputRef.current.value = ""; // reset input
                } else {
                    setSelectedFile(file);
                    setPreview(reader.result);
                    onOpen();
                }
            };
            reader.readAsDataURL(file);
        } else {
            // fresh case
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedFile(file);
                setPreview(reader.result);
                onOpen();
            };
            reader.readAsDataURL(file);
        }
    };


    // Upload to Cloudinary + Update Profile
    const handleUpload = async () => {

        const formData = new FormData();
        formData.append("avatar", selectedFile);
      
            await dispatch(updateAvatar(formData)).unwrap();
          
     

    };

    return (
        <Box position="relative" w="fit-content" >
            <Avatar src={avatar } size="2xl" name={name} />

            <IconButton
                display={'flex'}
                justifyContent={'center'}
                icon={<FaCamera />}
                size="sm"
                isRound
                position="absolute"
                bottom={1}
                right={1}
                bg={'transparent'}
                border={'1px solid'}
                borderColor={'whiteAlpha.500'}
                onClick={handleIconClick}
                boxShadow={'base'}
                aria-label="Upload Avatar"
                transition={'all 0.3s'}
                _hover={{
                    transform: "scale(1.09)"
                }}
            />
            <Input
                type="file"
                accept="image/*"
                display="none"
                ref={inputRef}
                onChange={handleFileChange}
            />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent pb={4} bg='blackAlpha.600'
                    backdropFilter='blur(10px) hue-rotate(90deg)'>
                    <ModalHeader>Preview & Update</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            {preview && (
                                <Avatar src={preview} size="2xl" name={name} />
                            )}
                            <Text fontSize="sm" color="gray.500">
                                Looks good? Click update to save your profile picture.
                            </Text>
                        </VStack>
                        {/* Optional overlay loader inside modal only */}
                        
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose} variant="outline" mr={3}>
                            Cancel
                        </Button>
                        <Button w={'fit-content'} onClick={handleUpload}
                            bg={'#f10'} 
                            variant={'solid'}
                            color={'white'}
                            borderRadius="md"
                            
                        >
                           {updateAvatarLoading ? <Spinner /> : "Update"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default ProfilePictureUpdater;
