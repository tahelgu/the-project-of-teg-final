import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { toast } from "react-toastify";

const Register = () => {
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
    role: "user",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .matches(/[A-Z]/, "At least one uppercase letter")
      .matches(/[a-z]/, "At least one lowercase letter")
      .matches(/\d/, "At least one number")
      .matches(/[!@#$%^&*]/, "At least one special character")
      .required("Password is required"),
    role: Yup.string().oneOf(["user", "business", "admin"]),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      login({ email: values.email, role: values.role });
      toast.success("Registered successfully!");
      navigate("/");
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <label htmlFor="email">Email:</label>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <label htmlFor="password">Password:</label>
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <label htmlFor="role">Role:</label>
            <Field as="select" name="role">
              <option value="user">User</option>
              <option value="business">Business</option>
              <option value="admin">Admin</option>
            </Field>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
