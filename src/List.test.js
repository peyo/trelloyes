import React from "react";
import ReactDOM from "react-dom";
import List from "./List";
import renderer from "react-test-renderer";

describe("List component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<List />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const list = {
      id: "2",
      header: "Second list",
      cardIds: ["a", "b", "e", "f", "g", "j", "l", "m"]
    };
    const store = {
      allCards: {
        "a": { id: "a", title: "First card", content: "lorem ipsum" },
        "b": { id: "b", title: "Second card", content: "lorem ipsum" },
        "c": { id: "c", title: "Third card", content: "lorem ipsum" },
        "d": { id: "d", title: "Fourth card", content: "lorem ipsum" },
        "e": { id: "e", title: "Fifth card", content: "lorem ipsum" },
        "f": { id: "f", title: "Sixth card", content: "lorem ipsum" },
        "g": { id: "g", title: "Seventh card", content: "lorem ipsum" },
        "h": { id: "h", title: "Eighth card", content: "lorem ipsum" },
        "i": { id: "i", title: "Ninth card", content: "lorem ipsum" },
        "j": { id: "j", title: "Tenth card", content: "lorem ipsum" },
        "k": { id: "k", title: "Eleventh card", content: "lorem ipsum" },
        "l": { id: "l", title: "Twelfth card", content: "lorem ipsum" },
        "m": { id: "m", title: "Thirteenth card", content: "lorem ipsum" },
      }
    };
    const tree = renderer
      .create(
        <List
          id={list.id}
          header={list.header}
          cards={list.cardIds.map(id => store.allCards[id])}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
