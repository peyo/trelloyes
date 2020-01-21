import React from "react";
import ReactDOM from "react-dom";
import Card from "./Card";
import renderer from "react-test-renderer";

describe("Card component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Card />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const card = {
      id: "a",
      title: "First card",
      content: "lorem ipsum"
    };
    const tree = renderer
      .create(<Card key={card.id} title={card.title} content={card.content} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
