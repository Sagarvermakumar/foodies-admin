// components/UpdateOrderStatusDialog.jsx
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ORDER_STATUS } from "../../assets/assets";



const UpdateOrderStatusDialog = ({
  isOpen,
  onClose,
  currentStatus,
  onUpdate,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus || "");
  useEffect(() => {
    setSelectedStatus(currentStatus);
  }, [currentStatus]);

  const handleSubmit = () => {
    if (selectedStatus) {
      onUpdate(selectedStatus);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg="transparent"
        color="white"
        p={4}
        backdropFilter="blur(4px)"
        boxShadow="0 0 20px 4px rgba(255, 255, 255, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <ModalHeader>Update Order Status</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={6} py={8}>
          <Select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            bg="gray.700"
            borderColor="red.600"
            _hover={{
              borderColor: "red.500",
            }}
            _focus={{
              borderColor: "red.500",
              borderWidth: "2px",
              boxShadow: "0 0 0 1px red,",
              bg: "gray.900",
            }}
            _active={{
              borderColor: "red.500",
              boxShadow: "0 0 0 1px red.500",
            }}
            _focusVisible={{
              borderColor: "red.500",
              boxShadow: "0 0 0 1px red.500",
            }}
          >
            {ORDER_STATUS.map((status) => (
              <option
                style={{ backgroundColor: "transparent" }}
                key={status}
                value={status}
              >
                {status.toUpperCase()}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} onClick={handleSubmit}>
            Update
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateOrderStatusDialog;
