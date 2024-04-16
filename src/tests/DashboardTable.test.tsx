import { screen, fireEvent } from "@testing-library/react";
// Using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import * as legislationMockData from "../../public/dummyData.json";
import DashboardTable from "../components/Dashboard/DashboardTable";

/// Test to see it renders

const mockDashboardData = {
  data: legislationMockData.results,
  favourites: [],
  modal: {
    display: false,
    activeBill: {},
  },
  status: "fulfilled",
  error: null,
};

test("Render correctly with dashboard data", () => {
  renderWithProviders(
    <DashboardTable
      title={"Legislation Dashboard"}
      data={legislationMockData.results}
    />,
    {
      preloadedState: {
        legislation: mockDashboardData,
      },
    }
  );
  expect(screen.queryByTestId("spinner")).not.toBeInTheDocument();
});

test("Render and check rows per page working post render matching value", () => {
  renderWithProviders(
    <DashboardTable
      title={"Legislation Dashboard"}
      data={legislationMockData.results}
    />,
    {
      preloadedState: {
        legislation: mockDashboardData,
      },
    }
  );
  fireEvent.mouseDown(screen.getByRole("combobox"));
  expect(screen.queryAllByRole("option")).toHaveLength(4);
});
