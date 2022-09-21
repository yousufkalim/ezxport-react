import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import API from "../../api/index";
import { toast } from "react-toastify";
import Spinner from "../../components/Common/Spinner";
import { useTranslation, Trans } from "react-i18next";
import toaster from "../../utils/toaster";

const questions = [
  {
    title: "What is your country name?",
  },
  {
    title: "What is your age?",
  },
];

const AskQuestion = () => {
  const [formData, setFormData] = useState({ question: "", request: "", description: "" });
  const user = localStorage.getItem("userData");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const userData = JSON.parse(user);

  const { t, i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    getUserRequest();
  }, []);

  const getUserRequest = async () => {
    setLoading(true);
    try {
      await API("get", `/requests/getByUser/${userData._id}`)
        .then((res) => {
          setRequests(res.data.request);
          setLoading(false);
        })
        .catch((err) => {
          toast.error(t("Something went wrong"));
        });
    } catch (err) {
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ question: "", request: "", description: "" });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { question, request: requestTitle, description: message } = formData;
    const obj = {
      question,
      requestTitle,
      message,
    };

    setSubmitLoading(true);
    await API("post", `/users/sendQuestion/${userData._id}`, obj)
      .then((res) => {
        resetForm();
        setSubmitLoading(false);
        setLoading(false);
        toaster('success', 'We will get back to you quickly', 'The question was asked to the administrator');

      })
      .catch((err) => {
        toast.err(t("Something went wrong"));
        setLoading(false);
        setSubmitLoading(false);
      });
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <>
        <div className="list_main_div">
          <div className="list_second_div">
            {/* list head  */}
            <div className="List_heading_div">
              <h1 className="list_h1">{t("Ask a question")}</h1>
            </div>
            {/* list table   */}
            <div className="question_form">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <label htmlFor="" className="question_label">
                    {t("Your question is related to")}
                  </label>
                  <Select
                    id="demo-simple-select"
                    name="question"
                    value={formData.question}
                    onChange={(e) => handleChange(e)}
                    style={{ paddingTop: "3px" }}
                  >
                    {questions.map(({ title }) => (
                      <MenuItem value={title}>{t(title)}</MenuItem>
                    ))}
                  </Select>
                  <br />
                </FormControl>
                <FormControl fullWidth>
                  <label htmlFor="" className="question_label">
                    {t("Select request")}
                  </label>
                  <Select
                    id="demo-simple-select"
                    name="request"
                    value={formData.request}
                    onChange={(e) => handleChange(e)}
                    style={{ paddingTop: "3px" }}
                  >
                    {requests.map((item) => (
                      <MenuItem value={item.title}>{item.title}</MenuItem>
                    ))}
                  </Select>
                  <br />
                </FormControl>
                <FormControl fullWidth>
                  <label htmlFor="" className="question_label">
                    {t("Description")}
                  </label>
                  <TextareaAutosize
                    onChange={(e) => handleChange(e)}
                    name="description"
                    aria-label="minimum height"
                    minRows={10}
                    value={formData.description}
                    placeholder={t("Description of your request")}
                    style={{ padding: "10px", borderRadius: "7px" }}
                  />
                  <br />
                </FormControl>
                <button
                  disabled={submitLoading}
                  onClick={(e) => submitHandler(e)}
                  className="quiz_btn"
                >
                  {t("Ask the question")}
                </button>
              </Box>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default AskQuestion;
