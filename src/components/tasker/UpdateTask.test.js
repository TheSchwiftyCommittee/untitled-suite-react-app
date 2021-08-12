import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { mount } from "enzyme";

import putData from "../../utils/putData";

import clsx from "clsx";
import {
  Grid,
  Button,
  FilledInput,
  InputLabel,
  FormControl,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import getData from "../../utils/getData";
import { useEffect } from "react";
import { UpdateTask } from "./UpdateTask";

const priorities = ["Critical", "High", "Medium", "Low"];
const completed = [
  {
    value: true,
    label: "Yes",
  },
  {
    value: false,
    label: "No",
  },
];

describe("UpdateTask", () => {
  const fieldProps = {
    listId: 1,
    taskId: 1,
    setOpenPopUp: jest.fn(),
  };
  const Composition = (props) => {
    return <UpdateTask {...fieldProps} />;
  };

  xit("renders a <TextField/> component with expected props", () => {
    const wrapper = mount(<Composition />);
    expect(wrapper.childAt(0).props().placeholder).toEqual("A placeholder");
    expect(wrapper.childAt(0).props().onChange).toBeDefined();
  });
  xit("should trigger onChange on <SearchField/> on key press", () => {
    const wrapper = mount(<Composition />);
    wrapper.find("input").simulate("change");
    expect(fieldProps.onChange).toHaveBeenCalled();
  });
  xit("should render <TextField />", () => {
    const wrapper = mount(<Composition />);
    expect(wrapper.find(TextField)).toHaveLength(1);
    expect(wrapper.find(TextField).props().InputProps.disableUnderline).toBe(
      true
    );
  });
});
