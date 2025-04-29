import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCard = () => {
  const navigate = useNavigate();

  const initialValues = {
    title: "",
    description: "",
    phone: "",
    address: "",
    image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    image: Yup.string().url("Must be a valid URL"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      const cards = JSON.parse(localStorage.getItem("cards")) || [];
      const newCard = {
        ...values,
        id: "id_" + Date.now(),
      };
      cards.push(newCard);
      localStorage.setItem("cards", JSON.stringify(cards));
      toast.success("Card created!");
      navigate("/my-cards");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Create New Card</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="title">Title:</label>
            <Field name="title" />
            <ErrorMessage name="title" component="div" className="error" />

            <label htmlFor="description">Description:</label>
            <Field name="description" />
            <ErrorMessage name="description" component="div" className="error" />

            <label htmlFor="phone">Phone:</label>
            <Field name="phone" />
            <ErrorMessage name="phone" component="div" className="error" />

            <label htmlFor="address">Address:</label>
            <Field name="address" />
            <ErrorMessage name="address" component="div" className="error" />

            <label htmlFor="image">Image URL:</label>
            <Field name="image" />
            <ErrorMessage name="image" component="div" className="error" />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create Card"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateCard;
