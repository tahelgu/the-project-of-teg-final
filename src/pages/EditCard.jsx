import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";

const EditCard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

  useEffect(() => {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const cardToEdit = cards.find((c) => c.id === id);
    if (cardToEdit) {
      setInitialValues(cardToEdit);
    }
  }, [id]);

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    phone: Yup.string().required("Phone is required"),
    address: Yup.string().required("Address is required"),
    image: Yup.string().url("Must be a valid URL"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    const cards = JSON.parse(localStorage.getItem("cards")) || [];
    const updated = cards.map((c) => (c.id === id ? values : c));
    localStorage.setItem("cards", JSON.stringify(updated));
    toast.success("Card updated!");
    navigate("/my-cards");
    setSubmitting(false);
  };

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: "500px", margin: "2rem auto" }}>
      <h2>Edit Card</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
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
              {isSubmitting ? "Updating..." : "Update Card"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditCard;
