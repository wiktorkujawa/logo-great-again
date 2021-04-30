import React, { FC } from "react";
import { TextInput } from "../styled/TextInput";
import { StartButton } from "../styled/StartButton";
import { ArrowRightAlt } from "@material-ui/icons";
import * as yup from "yup";
import { useFormik } from "formik";
import P from "../styled/P";
import { useStore } from "../../store";
import { observer } from "mobx-react-lite";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
});

export const WelcomeScreen: FC = observer(() => {
  const store = useStore();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      store.setName(values.name);
      store.startGame();
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div>
        <b data-testid="welcome">Hello friend, tell me your name...</b>
        <form autoComplete="off" onSubmit={formik.handleSubmit}>
          <TextInput
            className="mt-5"
            theme={!formik.errors.name}
            placeholder="Your name here"
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          <P color='error' size='small' className="mb-5">{formik.errors.name}</P>
          <StartButton data-testid="submit" type="submit">
            <div className="text-with-icon">
              <span> Let's go</span>

              <ArrowRightAlt />
            </div>
          </StartButton>
        </form>
      </div>
    </div>
  );
});
