/**
 * This is a simple React.js component that will redner out a model for a clicked element in the dashboard.
 * BillModal will render out the bill name in full with two options of text English and Gaeilge
 * @returns {JSX.Element} - A JSX element from TabsComponent with provided values to render tabbed content within modal.
 */

import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TabsComponent from "../Tabs/TabsComponentDynamic";
import { useDispatch, useSelector } from "react-redux";
import { getActiveBill } from "../Dashboard/DashboardSlice";
import { displayModal, getDisplayModal } from "../Dashboard/DashboardSlice";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type TitleType = {
  longTitleEn: string;
  longTitleGa: string;
};

export default function BillModal() {
  const { longTitleEn: titleEnglish, longTitleGa: titleGaeilge } = useSelector(
    getActiveBill
  ) as TitleType;

  const tabContent: string[] = [titleEnglish, titleGaeilge];

  const dispatch = useDispatch();
  const handleClose = () => dispatch(displayModal(false));

  return (
    <div>
      <Modal
        open={useSelector(getDisplayModal)}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <TabsComponent
            tabTitles={["English", "Gaeilge"]}
            tabContent={tabContent}
          />
        </Box>
      </Modal>
    </div>
  );
}
