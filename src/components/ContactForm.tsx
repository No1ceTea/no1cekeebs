import { useRef, useState } from "react";
import api from "@utils/api";
import ReCaptchaV3 from "@components/ReCaptchaV3";

export default function ContactForm() {
  const captchaRef = useRef(null);

  const [isDisabled, setIsDisabled] = useState(false);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    token: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    token: "",
  });

  const [success, setSuccess] = useState({
    message: "",
  });

  function errorsCopy(value: string, name: string, errorMessage: string) {
    const errorsCopy: { [index: string]: any } = { ...errors };
    if (value === "") {
      errorsCopy[name] = errorMessage;
    } else {
      errorsCopy[name] = "";
    }
    return errorsCopy as {
      name: string;
      email: string;
      subject: string;
      message: string;
      token: string;
    };
  }

  const handleChange = (e: { target: { name: string; value: string } }) => {
    const { name, value } = e.target;

    setFormState({ ...formState, [name]: value });
    setSuccess({ message: "" });
    setErrors(errorsCopy(value, name, `${name} est vide`));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    setIsDisabled(true);
    e.preventDefault();

    const emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailFormat.test(formState.email)) {
      setErrors(
        errorsCopy(
          formState.email,
          "email",
          `Invalid email address format.`
        )
      );
      return;
    }

    if (formState.message.length > 500) {
      setErrors(errorsCopy(formState.message, "message", `Message too long`));
      return;
    }

    if (captchaRef === null) {
      setErrors(errorsCopy(formState.token, "token", `Invalid recaptcha`));
      return;
    }

    formState["token"] = window.grecaptcha.getResponse();

    if (formState["token"].length === 0) {
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
        token: "Please validate the captcha.",
      });
      return;
    }

    const result = await api.postContactForm(formState);

    if (result?.data.accepted?.length > 0) {
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
        token: "",
      });
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
        token: "",
      });
      setSuccess({
        message: "Your message has been successfully sent.",
      });
    } else {
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: "",
        token: result.data,
      });
    }
    setIsDisabled(false);
  };

  return (
    <div className="form-contact mx-auto my-10 w-full max-w-xs">
      <form
        className="bg-bglight dark:bg-bgdark text-bgdark dark:text-bglight mb-4 rounded px-8 pb-8 pt-6 shadow-md dark:shadow-inner"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="mb-2 block text-sm font-bold" htmlFor="name">
            Name:
            <input
              className="w-full rounded border px-3 py-2"
              type="text"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="email">
            Email:
            <input
              className="w-full rounded border px-3 py-2"
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="email">
            Subject:
            <input
              className="w-full rounded border px-3 py-2"
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <label className="mb-2 block text-sm font-bold" htmlFor="message">
            Message:
            <textarea
              className="w-full rounded border px-3 py-2"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="mb-6">
          <ReCaptchaV3 />
        </div>
        <div className="mb-6 flex justify-center">
          <button
            className="rounded px-3 py-2 outline-offset-2 focus-visible:outline-double lg:text-xl"
            type="submit"
            disabled={isDisabled}
          >
            {isDisabled ? "Sending in progress..." : "Contact me"}
          </button>
        </div>
        <div className="mb-6">
          {Object.keys(errors).map((error: string, index) => {
            const key = error as keyof typeof errors;
            return (
              <span key={index} className="error">
                {errors[key] !== "" ? errors[key] : ""}
              </span>
            );
          })}
          {success.message !== "" && (
            <span className="success">{success.message}</span>
          )}
        </div>
      </form>
    </div>
  );
}