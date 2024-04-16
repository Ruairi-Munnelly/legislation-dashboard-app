import { screen, waitFor, fireEvent } from "@testing-library/react";
// Using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import BillModal from "../components/BillModal/BillModal";
import * as legislationMockData from "../../public/dummyData.json";

const mockDashboardData = {
  data: legislationMockData.results,
  favourites: [],
  modal: {
    display: true,
    activeBill: {
      longTitleEn:
        "<p>Bill entitled an Act to amend the Safety, Health and Welfare at Work Act 2005 to require the Health and Safety Authority to prepare and publish a code of practice under section 60 of that Act in respect of the safe use and disposal of formaldehyde, with particular reference to the embalming process; and to provide for related matters.</p>\n",
      longTitleGa:
        "<p>Bille dá ngairtear Acht do leasú an Achta um Shábháilteacht, Sláinte agus Leas ag an Obair, 2005 chun a cheangal ar an Údarás Sláinte agus Sábháilteachta cód cleachtais a ullmhú agus a fhoilsiú faoi alt 60 den Acht sin maidir le húsáid shábháilte agus diúscairt shábháilte formaildéid, ag tagairt go háirithe do phróiseas an bhalsamaithe; agus do dhéanamh socrú i dtaobh nithe gaolmhara.</p>\n",
    },
  },
  status: "fulfilled",
  error: null,
};

test("bill modal doesn't render without active redux renders", () => {
  renderWithProviders(<BillModal />);
  expect(screen.queryByRole("presentation")).toBeNull();
});

test("bill modal renders with test with test state", async () => {
  renderWithProviders(<BillModal />, {
    preloadedState: {
      legislation: mockDashboardData,
    },
  });

  //Expect element to be in DOM
  expect(screen.getByRole("presentation")).toBeInTheDocument();
});

test("bill modal will render with text in the modal if active object provided data is present", () => {
  renderWithProviders(<BillModal />, {
    preloadedState: {
      legislation: mockDashboardData,
    },
  });

  expect(screen.getByText(/Bill entitled an Act to amend/i)).not.toBeNull();
});

// Test to ensure that when body is clicked it will close the modal

test("bill modal will be closed after escape kewy press", async () => {
  renderWithProviders(<BillModal />, {
    preloadedState: {
      legislation: mockDashboardData,
    },
  });

  fireEvent.keyDown(screen.getByRole("presentation"), {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27,
  });

  await waitFor(() => {
    expect(screen.queryByRole("presentation")).not.toBeInTheDocument();
  });
});
