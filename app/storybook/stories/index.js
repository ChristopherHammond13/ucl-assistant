import React from "react";
import { Text } from "react-native";

import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { withKnobs, boolean, text } from "@storybook/addon-knobs";

import Button from "../../components/Button";
import CenterView from "./CenterView";
import Welcome from "./Welcome";

storiesOf("Welcome", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Button", module)
  .addDecorator(getStory => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add("with text", () => (
    <Button
      onPress={action("clicked-text")}
      disabled={boolean("Disabled", false)}
    >
      <Text>{text("Text", "Hello Button")}</Text>
    </Button>
  ))
  .add("with some emoji", () => (
    <Button onPress={action("clicked-emoji")}>
      <Text>😀 😎 👍 💯</Text>
    </Button>
  ))
  .add("with disabled prop", () => (
    <Button disabled onPress={action("clicked-disabled")}>
      <Text>Disabled Button</Text>
    </Button>
  ));
