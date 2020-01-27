import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  static defaultProps = {
      card: {},
  }
  
  render() {
    return (
      <div className="Card">
        <button
          type="button"
          onClick={() => this.props.onDeleteCard(this.props.id)}>
          delete
        </button>
        <h3>{this.props.title}</h3>
        <p>{this.props.content}</p>
      </div>
    );
  }
}

export default Card;
