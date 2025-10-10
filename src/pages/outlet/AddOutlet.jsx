import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OutletCreateForm from "../../Components/form/outlet/OutletCreateForm";
import { createOutlet, updateOutlet } from "../../features/outlet/action";
import { selectOutletError } from "../../features/outlet/selector";
const OutletCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()


  const error = useSelector(selectOutletError)
  const handleCreateOutlet = async (value) => {
    try {
      const res = await dispatch(createOutlet(value)).unwrap();
      toast.success(res?.message || "Created")
    } catch (error) {
      toast.error(error || "Failed to create!")
    }
  };
  const handleUpdateOutlet = (id, value) => {
    dispatch(updateOutlet({ id, value }));
    if (error == null) {
      setTimeout(() => {
        navigate('/outlet')
      }, 1000);
    }
  };

  return (
    <Box
      maxW={{ base: "full", md: "6xl" }}
      w="full"
      p={{ base: 4, lg: 6 }}
      mt={4}
      mx="auto"
      bg={"whiteAlpha.200"}
      borderRadius="xl"
      boxShadow="0 8px 32px rgba(0, 0, 0, 0.15)"
    >

      <OutletCreateForm
        onSubmitCreate={(value, action) => handleCreateOutlet(value, action)}
        onSubmitUpdate={(value, action) => handleUpdateOutlet(value, action)}
      />

    </Box>
  );
};

export default OutletCreate;
