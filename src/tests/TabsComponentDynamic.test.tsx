import { screen, render, act } from "@testing-library/react";
// Using our own custom render function and not RTL's render.
import TabsComponent from "../components/Tabs/TabsComponentDynamic";

test("Check tab renders with title and content", () => {
  testRender();
  expect(screen.getByText("Test Tab")).toBeInTheDocument();
  expect(screen.getByText("Test content")).toBeInTheDocument();
});

test("click event that content has been updated", () => {
  //Renders out the items without need to repeat
  testRender();

  // trigger a click to the element to update text content
  act(() => {
    screen.getByRole("tab", { selected: false }).click();
  });
  // select the second tab and check content has updated
  expect(screen.getByText("Test content 2")).toBeInTheDocument();
});

function testRender() {
  render(
    <TabsComponent
      tabTitles={["Test Tab", "Test Tab 2"]}
      tabContent={["Test content", "Test content 2"]}
    />
  );
}
