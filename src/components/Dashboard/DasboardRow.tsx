/**
 * This is a React.js component that will return the
 * dashboard row to the dashbaord when row data is passed as a prop
 *
 * @param {object}  row - The individual bill from the data can be passed as an object to destructure and create a row.
 * @param {string} Title - Title for the dashboard.
 * @returns {JSX.Element} - A JSX element for the dashboard as an individual row for each bill.
 */

import React, { useState } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  updateModal,
  displayModal,
  addFavourite,
  removeFavourite,
  getFavourites,
} from "./DashboardSlice";

type SponsorType = {
  sponsor: {
    as: {
      showAs: string;
    };
    by: {
      showAs: string;
    };
  };
};

type BillDataType = {
  billNo: string;
  billType: string;
  status: string;
  sponsors: SponsorType[]; //needs to be updated to list out the sponsorss list
  longTitleEn: string;
  longTitleGa: string;
};

type FavouriteType = {
  bill: BillDataType;
};

export const DashboardRow = ({ row }: { row: object }) => {
  const { billNo, billType, status, sponsors, longTitleEn, longTitleGa } =
    row as BillDataType;
  const favourites: FavouriteType[] = useSelector(getFavourites);
  const [activeFavourite, setActiveFavourite] = useState<boolean | undefined>(
    () => {
      // check against favourites mocked as if it to see if there is a match in ID
      const match = favourites.find((favourite) => {
        const { billNo: favouriteBillNo }: { billNo?: string } = favourite.bill;
        return favouriteBillNo === billNo;
      });
      // converts the return value "object" | "undefined" to a boolean
      // for state
      return !!match;
    }
  );

  const dispatch = useDispatch();

  const handleClick = (modalText: object) => {
    dispatch(displayModal(true));
    dispatch(updateModal(modalText));
  };

  const handleFavourite = (e: React.SyntheticEvent) => {
    // prevents the clicked star from causing BillModal to trigger as opened
    e.stopPropagation();
    if (!activeFavourite) {
      dispatch(
        addFavourite({
          bill: {
            billNo,
            billType,
            status,
            sponsors,
            longTitleEn,
            longTitleGa,
          },
        })
      );

      // mocked API call
      console.log(
        "API/PUT - Mocked Server Request -- Remove selected bill from favourites"
      );
      setActiveFavourite(true);
    } else {
      // mocked API call
      console.log(
        "API/DELETE - Mocked Server Request -- Remove selected bill from favourites"
      );
      dispatch(removeFavourite(billNo));
      setActiveFavourite(false);
    }
  };
  return (
    <TableRow
      key={billNo}
      sx={{
        "&:last-child td, &:last-child th": {
          border: 0,
        },
        "&:hover": {
          backgroundColor: "#B39841",
        },
      }}
      onClick={() => {
        handleClick({ longTitleEn, longTitleGa });
      }}
    >
      <TableCell>
        <div style={{ display: "flex" }}>
          <StarIcon
            sx={{
              fill: activeFavourite ? "orange" : "grey",
              "&:hover": { fill: "orange" },
            }}
            onClick={(e) => {
              e.stopPropagation();
              handleFavourite(e);
            }}
          />
          <span
            className='billNo-text'
            style={{ paddingTop: "2px", marginLeft: "10px" }}
          >
            {billNo}
          </span>
        </div>
      </TableCell>
      <TableCell align='right'>{billType}</TableCell>
      <TableCell align='right'>{status}</TableCell>
      <TableCell align='right'>
        {sponsors.map((sponsorItem: SponsorType, index: number) => {
          const {
            as: { showAs: title },
            by: { showAs: name },
          } = sponsorItem.sponsor;
          let sponsor = title !== null ? title : name;
          return <div key={index}>{sponsor}</div>;
        })}
      </TableCell>
    </TableRow>
  );
};
