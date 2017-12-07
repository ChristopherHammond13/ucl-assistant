import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";
import Button from "../../components/Button";
import CenterView from "../CenterView";

storiesOf("Button", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <Button
      onPress={action("clicked-text")}
      disabled={boolean("Disabled", false)}
      loading={boolean("Loading", false)}
    >
      {text("Text", "Hello Button")}
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>😀 😎 👍 💯</Button>
  ))
  .add("with disabled prop", () => (
    <Button disabled onPress={action("clicked-disabled")}>
      Disabled Button
    </Button>
  ));
