import { screen, waitFor } from "@testing-library/react";
// Using our own custom render function and not RTL's render.
import { renderWithProviders } from "../utils/test-utils";
import App from "../App";
import * as legislationMockData from "../../public/dummyData.json";
import { favouriteMock } from "../components/Dashboard/DashboardSlice";

const mockDashboardData = {
  data: legislationMockData.results,
  favourites: [favouriteMock],
  modal: {
    display: false,
    activeBill: {},
  },
  status: "fulfilled",
  error: null,
};

test("fetches the data for app and renders with spinner if no data provided or found", async () => {
  renderWithProviders(<App />);
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("fetch data from server and render out the dashboard after data returned", async () => {
  renderWithProviders(<App />, {
    preloadedState: {
      legislation: mockDashboardData,
    },
  });

  await waitFor(() => {
    expect(screen.getByText("Legislation Dashboard")).toBeInTheDocument();
  });
});
