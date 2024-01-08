import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import MotionWrapper from '../../components/navigation/Motion';
import { NewPost } from '../../../services/post/postService';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/ReactToastify.min.css"
import { useNavigate } from 'react-router-dom';
import { User } from '../../../utils/constants';


interface NewPost {
  title: string;
  content: string;
  author: string;
  img: string;
  creatorId: number;
}

const validationSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  author: Yup.string().required('Author is required'),
  img: Yup.string().url('Invalid URL').required('Image URL is required'),
});

type InputFieldType = {
  label: string;
  name: keyof NewPost; 
  type: 'text' | 'textarea'; 
};

const inputFields: InputFieldType[] = [
  { label: 'Title', name: 'title', type: 'text' },
  { label: 'Content', name: 'content', type: 'textarea' },
  { label: 'Author', name: 'author', type: 'text' },
  { label: 'Image URL', name: 'img', type: 'text' },
];

const NewPostPage: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const navigate = useNavigate();

  const initialNewPost: NewPost = {
    title: '',
    content: '',
    author: '',
    img: '',
    creatorId: (User._id)
  };

  const handleSubmit = async (values: NewPost, { resetForm }) => {
    // Handle submission logic, e.g., sending data to an API
    console.log(values);
    await NewPost(values, setSuccess);
    setPostTitle(values.title); 
  };

useEffect(() => {
  if (success) {
    toast.success("Post created successfully!!");
    navigate("/post/" + postTitle);
  }
}, [navigate, postTitle, success]);



  return (
    <MotionWrapper>

      <ToastContainer theme='light' autoClose={1500} position='top-right' closeOnClick/>


      <div className="w-full max-w-xl mx-auto p-4 sm:p-8">
        <h2 className="text-4xl font-bold mb-4 text-center">New Quote Post</h2>
        <Formik
          initialValues={initialNewPost}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          {({ errors, touched }) => (
            <Form>
              {inputFields.map((field) => (
                <div key={field.name} className="mb-4">
                <label className='text-lg'>{field.label}</label>
                  {field.type === 'textarea' ? (
                    <Field
                      as="textarea"
                      name={field.name}
                      className={`w-full border ${errors[field.name] && touched[field.name] ? 'border-red-500' : 'border-black'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2 resize-none`}
                      rows={4}
                    />
                  ) : (
                    <Field
                      type="text"
                      name={field.name}
                      className={`w-full border ${errors[field.name] && touched[field.name] ? 'border-red-500' : 'border-black'} rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 px-3 py-2`}
                    />
                  )}
                  <ErrorMessage name={field.name} component="div" className="text-red-500 text-sm" />
                </div>
              ))}
              <button
                type="submit"
                className="bg-indigo-700 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300 w-full"
              >
                Create Post
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </MotionWrapper>
  );
};

export default NewPostPage;
