import React, { useState } from "react";
import Icon from "./components/Icon";
import { Card, CardBody, Container, Button, Col, Row } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const itemArray = new Array(9).fill("empty");

const App = () => {
  const [isCross, setIsCross] = useState(false);
  const [winMessage, setWinMessage] = useState("");
  const [winSign, setWinSign] = useState("");

  const reloadGame = () => {
    setIsCross(false);
    setWinMessage("");
    itemArray.fill("empty", 0, 9);
  };

  const checkIsWinner = () => {
    //  checking  winner of the game
    if (
      itemArray[0] === itemArray[1] &&
      itemArray[0] === itemArray[2] &&
      itemArray[0] !== "empty"
    ) {
      setWinMessage(`${itemArray[0]} won`);
      setWinSign(itemArray[0]);
      itemArray[0] = itemArray[1] = itemArray[2] = "winner";
    } else if (
      itemArray[3] !== "empty" &&
      itemArray[3] === itemArray[4] &&
      itemArray[4] === itemArray[5]
    ) {
      setWinMessage(`${itemArray[3]} won`);
      setWinSign(itemArray[3]);
      itemArray[3] = itemArray[4] = itemArray[5] = "winner";
    } else if (
      itemArray[6] !== "empty" &&
      itemArray[6] === itemArray[7] &&
      itemArray[7] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[6]} won`);
      setWinSign(itemArray[6]);
      itemArray[6] = itemArray[7] = itemArray[8] = "winner";
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[3] &&
      itemArray[3] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[0]} won`);
      setWinSign(itemArray[0]);
      itemArray[0] = itemArray[3] = itemArray[6] = "winner";
    } else if (
      itemArray[1] !== "empty" &&
      itemArray[1] === itemArray[4] &&
      itemArray[4] === itemArray[7]
    ) {
      setWinMessage(`${itemArray[1]} won`);
      setWinSign(itemArray[1]);
      itemArray[1] = itemArray[4] = itemArray[7] = "winner";
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[5] &&
      itemArray[5] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[2]} won`);
      setWinSign(itemArray[2]);
      itemArray[2] = itemArray[5] = itemArray[8] = "winner";
    } else if (
      itemArray[0] !== "empty" &&
      itemArray[0] === itemArray[4] &&
      itemArray[4] === itemArray[8]
    ) {
      setWinMessage(`${itemArray[0]} won`);
      setWinSign(itemArray[0]);
      itemArray[0] = itemArray[4] = itemArray[8] = "winner";
    } else if (
      itemArray[2] !== "empty" &&
      itemArray[2] === itemArray[4] &&
      itemArray[4] === itemArray[6]
    ) {
      setWinMessage(`${itemArray[2]} won`);
      setWinSign(itemArray[2]);
      itemArray[2] = itemArray[4] = itemArray[6] = "winner";
    }
  };

  const changeItem = (itemNumber) => {
    if (winMessage) {
      return toast(winMessage, { type: "success" });
    }

    if (itemArray[itemNumber] === "empty") {
      itemArray[itemNumber] = isCross ? "cross" : "circle";
      setIsCross(!isCross);
    } else {
      return toast("already filled", { type: "error" });
    }

    checkIsWinner();
  };

  return (
    <Container className="p-5">
      <ToastContainer position="bottom-center" />
      <Row>
        <Col md={3} className="offset-md-4">
          {winMessage ? (
            <div className="mb-2 mt-2" style={{ marginLeft: "25px" }}>
              <h2 className="text-danger text-capitalize text-center">
                {winMessage}
              </h2>
              <Button className="m-auto mt-4 mb-4" block onClick={reloadGame}>
                Reload game
              </Button>
            </div>
          ) : (
            <h1 className="text-center text-capitalize text-info fs-2 mb-4">
              {!isCross ? "Cross" : "Circle"} turns
            </h1>
          )}
          <div className="grid">
            {itemArray.map((item, index) => (
              <Card
                className={item === "winner" ? "winner-card" : "player-card"}
                onClick={() => changeItem(index)}
              >
                <CardBody className="box">
                  <Icon name={item === "winner" ? winSign : item} />
                </CardBody>
              </Card>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default App;
