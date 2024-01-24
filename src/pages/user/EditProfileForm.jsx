// EditProfileForm.js

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { UpdateUser } from '../../../services/user/userService';
import { User } from '../../../utils/constants';
import "react-toastify/ReactToastify.min.css";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import MotionWrapper from '../../components/navigation/Motion';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  bio: Yup.string().required('Bio is required'),
  age: Yup.string().required('Age is required'),
  profilePicture: Yup.string().required('Profile Picture is required'),
  username: Yup.string().required('Username is required'),
});

const inputFields = [
  { label: 'Email', name: 'email', type: 'text', customCss: '', placeholder: "Enter email" },
  { label: 'Username', name: 'username', type: 'text', customCss: '',placeholder: "Enter username" },
  { label: 'Bio', name: 'bio', type: 'textarea', customCss: '',placeholder: "Enter bio" },
  { label: 'ProfilePic', name: 'profilePicture', type: 'textarea', customCss: 'h-[180px] text-black',placeholder: "Enter profile picture url" }, 
  { label: 'Age', name: 'age', type: 'number', customCss: '',placeholder: "Enter age" },
];

const EditProfileForm = () => {
  const [editedInfo, setEditedInfo] = useState({
    email: '' || User.email,
    bio: '' || User.bio,
    username: '' || User.username,
    profilePicture: '' || User.profilePicture,
    age: '' || User.age,
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async () => {
    await UpdateUser(editedInfo); 

    toast.info(`${editedInfo.username}'s info has been updated`);

      navigate('/u/profile/edit-success')

  };


  return (
    <MotionWrapper className="max-w-lg mx-auto p-6">
      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick />

      <h2 className="text-3xl font-semibold mb-4">Edit Information</h2>
      <Formik
        initialValues={editedInfo}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {({ errors, touched }) => (
          <Form>
            {inputFields.map((field) => (
              <div key={field.name} className="mb-4">
                <label className="text-lg">{field.label}</label>
                {field.type === 'textarea' ? (
                  <Field
                    
                    as="textarea"
                    name={field.name}
                    placeholder={field.placeholder}
                    onChange={handleInputChange}
                    value={editedInfo[field.name]}
                    className={`w-full border ${
                      errors[field.name] && touched[field.name]
                        ? 'border-red-500'
                        : 'border-black'
                    } rounded-none-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 resize-none ${field.customCss}`}
                    rows={4}
                  />
                ) : (
                  <Field
                    type="text"
                    name={field.name}
                    onChange={handleInputChange}
                    value={editedInfo[field.name]}
                    className={`w-full border ${
                      errors[field.name] && touched[field.name]
                        ? 'border-red-500'
                        : 'border-black'
                    } rounded-none-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 ${field.customCss}`}
                  />
                )}
                <ErrorMessage
                  name={field.name}
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>
            ))}
            <div className="flex gap-5">
              <button
                type="submit"
                className="bg-indigo-700 text-white py-2 px-4 rounded-none-md hover:bg-indigo-600 transition duration-300 w-full"
              >
                Save Changes
              </button>
               <button
                onClick={() => navigate("/")}
                className="bg-red-700 text-white py-2 px-4 rounded-none-md hover:bg-red-600 transition duration-300 w-full"
              >
                Cancel
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </MotionWrapper>
  );
};

export default EditProfileForm;