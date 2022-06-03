import Alert from "react-bootstrap/Alert";

function ArticleAlert({
  message,
  type = "success",
}: {
  message: string;
  type?: string;
}) {
  return (
    <>
      <Alert variant={type}> {message}</Alert>
    </>
  );
}

export default ArticleAlert;
