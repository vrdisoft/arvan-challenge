import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "../style/newArticle.sass";
import { addArticles, editArticles } from "../../../api/articles";
import { TagType } from "./tag";
import { getSelectedTags } from "../util";
import { Article } from "../../articles/type";
import { useDispatch } from "../../../context/articleDispatcherContext";
import { createArticles } from "../../../stateManager/actionCreator";

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
  const [validated, setValidated] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [body, setBody] = useState<string>("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isNewArticlePage) {
      setTitle(article?.title);
      setDescription(article?.description);
      setBody(article?.body);
    }
  }, [article.title]);

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

  const submitNewArticle = () => {
    const nawArticle = {
      title: title,
      description: description,
      body: body,
      tagList: getSelectedTags(tagList),
    };
    addArticles({ article: nawArticle })
      .then((res) => {
        dispatch(
          createArticles({
            alertMessage: "Well done! Article created successfuly",
          })
        );
        navigate("/articles", { replace: true });
      })
      .catch((err) => {
        console.log(err.data.errors);
      });
  };

  const submitEditArticle = (slug: string) => {
    const editArticle = {
      title: title,
      description: description,
      body: body,
      tagList: getSelectedTags(tagList),
    };
    editArticles(slug, { article: editArticle })
      .then((res) => {
        dispatch(
          createArticles({
            alertMessage: "Well done! Article updated successfuly",
          })
        );
        navigate("/articles", { replace: true });
      })
      .catch((err) => {
        console.log(err.data.errors);
      });
  };

  const handleSubmitArticle = () => {
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
          <Button variant="primary" type="submit" style={{ width: "99px" }}>
            Submit
          </Button>
        </Form>
      </Col>
    </>
  );
}

export default ArticleForm;
