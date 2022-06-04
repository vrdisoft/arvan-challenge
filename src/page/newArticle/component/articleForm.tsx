import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";

import { TagType } from "./tag";
import ErrorModal from "./modal";
import { getSelectedTags } from "../util";
import { Article } from "../../articles/type";
import { addArticles, editArticles } from "../../../api/articles";
import { createArticles } from "../../../stateManager/actionCreator";
import { useDispatch } from "../../../context/articleDispatcherContext";

function ArticleForm({
  tagList,
  isNewArticlePage,
  slue,
  article,
}: {
  tagList: TagType[];
  isNewArticlePage: boolean;
  slue: string;
  article: Article;
}) {
  const [title, setTitle] = useState<string>("");
  const [modalShow, setModalShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [validated, setValidated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [body, setBody] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNewArticlePage) {
      setTitle(article?.title);
      setDescription(article?.description);
      setBody(article?.body);
    }
  }, [article?.title]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    switch ((event as any).target.id) {
      case "formTitle":
        setTitle((event as any).target.value);
        break;
      case "formBody":
        setBody((event as any).target.value);
        break;
      case "formDescription":
        setDescription((event as any).target.value);
        break;
    }
  };

  const getErrorMessage = (error: object) => {
    let messege = "";
    for (const [key, value] of Object.entries(error)) {
      messege += `${key} ${value[0]}\r\n`;
    }
    setErrorMessage(messege);
  };

  const submitNewArticle = async () => {
    const nawArticle = {
      title: title,
      description: description,
      body: body,
      tagList: getSelectedTags(tagList),
    };
    try {
      const respons = await addArticles({ article: nawArticle });
      setLoading(false);
      dispatch(
        createArticles({
          alertMessage: "Well done! Article created successfuly",
        })
      );
      navigate("/articles", { replace: true });
    } catch (err) {
      getErrorMessage((err as any)?.data?.errors);
      setModalShow(true);
      setLoading(false);
    }
  };

  const submitEditArticle = async (slug: string) => {
    const editArticle = {
      title: title,
      description: description,
      body: body,
      tagList: getSelectedTags(tagList),
    };
    try {
      const respons = await editArticles(slug, { article: editArticle });
      setLoading(false);
      dispatch(
        createArticles({
          alertMessage: "Well done! Article updated successfuly",
        })
      );
      navigate("/articles", { replace: true });
    } catch (err) {
      getErrorMessage((err as any)?.data?.errors);
      setModalShow(true);
      setLoading(false);
    }
  };

  const handleSubmitArticle = () => {
    setLoading(true);
    if (isNewArticlePage) {
      submitNewArticle();
    } else {
      submitEditArticle(slue);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      setValidated(false);
      handleSubmitArticle();
    }
    event.stopPropagation();
    event.preventDefault();
  };

  return (
    <>
      <Col md={8} lg={9}>
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label type="invalid" className="text-Style">
              Title
            </Form.Label>
            <Form.Control
              type="text"
              required
              value={title}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-feedback-style"
            >
              Required field
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label className="text-Style">Description</Form.Label>
            <Form.Control
              type="text"
              required
              value={description}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-feedback-style"
            >
              {"Required field"}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBody">
            <Form.Label type="invalid" className="text-Style">
              Body
            </Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              required
              value={body}
              onChange={onChangeInput}
            />
            <Form.Control.Feedback
              type="invalid"
              className="text-feedback-style"
            >
              Required field
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            style={{ width: "99px" }}
            disabled={loading}
          >
            {loading && (
              <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Submit
          </Button>
        </Form>
        <ErrorModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          message={errorMessage}
        />
      </Col>
    </>
  );
}

export default ArticleForm;
