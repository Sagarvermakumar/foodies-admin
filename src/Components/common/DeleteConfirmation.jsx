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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onDelete,
  entityLabel,   // Example: "user", "order", "outlet", "menu"
  entityName     // Example: username, orderNo, outletName, menuName
}) => {
  const [enteredName, setEnteredName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setEnteredName("");
      setError("");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (enteredName.trim() === entityName) {
      onDelete();
      setEnteredName("");
      setError("");
      onClose();
    } else {
      setError(
        `Entered ${entityLabel} does not match. Please type the exact ${entityLabel} name to confirm.`
      );
    }
  };

  const handleClose = () => {
    setEnteredName("");
    setError("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent
        bg="transparent"
        color="white"
        p={4}
        backdropFilter="blur(4px)"
        boxShadow="0 0 20px 4px rgba(255, 255, 255, 0.2)"
        border="1px solid rgba(255, 255, 255, 0.1)"
      >
        <ModalHeader color="red.600">
          Confirm {entityLabel.charAt(0).toUpperCase() + entityLabel.slice(1)} Deletion
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text mb={2}>
            To delete this {entityLabel}, type the {entityLabel}'s name:{" "}
            <b
              style={{
                color: "#f20",
                fontWeight: 500,
                fontFamily: "sans-serif"
              }}
            >
              {entityName}
            </b>
          </Text>
          <Input
            my={4}
            placeholder={`Type "${entityName}" to confirm`}
            value={enteredName}
            onChange={(e) => setEnteredName(e.target.value)}
            borderColor={error ? "red.500" : "gray.600"}
          />
          {error && (
            <Text mt={2} color="red.400" fontSize="sm">
              {error}
            </Text>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="red" mr={3} onClick={handleSubmit}>
            Delete
          </Button>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteConfirmationModal;
