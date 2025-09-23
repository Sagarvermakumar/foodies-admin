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
import { useState } from "react";
import { toast } from "react-toastify";

const AssignOrderModel = ({
  isOpen,
  onClose,
  deliveryPersons,
  handleConfirmAssign,
}) => {
  const [deliveryPersonId, setDeliveryPersonId] = useState("");

  const handleSubmit = () => {
    if (deliveryPersonId) {
      handleConfirmAssign(deliveryPersonId);
      onClose();
    } else {
      toast.error("Select First Delivery Person")
      return
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
        <ModalHeader>Assign order to delivery   </ModalHeader>
        <ModalCloseButton />
        <ModalBody px={6} py={8}>
          <Select
            placeholder="Select delivery person"
            value={deliveryPersonId}
            onChange={(e) => setDeliveryPersonId(e.target.value)}
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
            {deliveryPersons && deliveryPersons.map((person) => (
              <option
                key={person._id}
                value={person._id}
                style={{ backgroundColor: "#1A202C", color: "white" }}
              >
                {person.name}
              </option>
            ))}
          </Select>
        </ModalBody>

        <ModalFooter>
          <Button variant={'solid'} mr={3} onClick={handleSubmit}>
            Assign
          </Button>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AssignOrderModel;
