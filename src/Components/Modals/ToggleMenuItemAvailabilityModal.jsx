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

const ToggleMenuItemAvailabilityModal = ({
  isOpen,
  onClose,
  currentAvailability,
  onUpdate,
}) => {
  const [selectedAvailability, setSelectedAvailability] = useState(
    currentAvailability || ""
  );

  useEffect(() => {
    setSelectedAvailability(currentAvailability);
  }, [currentAvailability]);

  const handleSubmit = () => {
    if (selectedAvailability) {
      onUpdate(selectedAvailability, onClose);
      // onClose();
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
        <ModalHeader>Mark Item Availability As</ModalHeader>
        <ModalCloseButton />
        <ModalBody px={6} py={4}>
          <Select
            value={selectedAvailability}
            onChange={(e) => setSelectedAvailability(e.target.value)}
            bg="gray.800"
            borderColor="red.600"
            color="white"
            _hover={{ borderColor: "red.500" }}
            _focus={{
              borderColor: "red.500",
              borderWidth: "2px",
              boxShadow: "0 0 0 1px red",
              bg: "gray.900",
            }}
            _active={{ borderColor: "red.500", boxShadow: "0 0 0 1px red.500" }}
            _focusVisible={{
              borderColor: "red.500",
              boxShadow: "0 0 0 1px red.500",
            }}
          >
            <option
              style={{ backgroundColor: "#1A202C", color: "white" }}
              value="available"
            >
              Available
            </option>
            <option
              style={{ backgroundColor: "#1A202C", color: "white" }}
              value="unavailable"
            >
              Unavailable
            </option>
          </Select>
        </ModalBody>

        <ModalFooter gap={4}>
        
          <Button variant="outline"  onClick={onClose}>
            Cancel
          </Button>
            <Button   onClick={handleSubmit}>
            Update
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ToggleMenuItemAvailabilityModal;
