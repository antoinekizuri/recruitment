import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ApplySenior = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    toast.success("Application submitted successfully!");
    reset();
    setTimeout(() => navigate('/success'), 2000);
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Normal Application Form</h2>
      <form onSubmit={handleSubmit(onSubmit)}>

        <label>Full Name</label>
        <input {...register("fullName", { required: true })} className="form-input" />

        <label>Email Address</label>
        <input type="email" {...register("email", { required: true })} className="form-input" />

        <label>ID Number</label>
        <input {...register("idNumber", { required: true })} className="form-input" />

        <label>Upload CV (PDF only)</label>
        <input type="file" accept=".pdf" {...register("cv", { required: true })} className="form-input" />

        <label>
          <input type="checkbox" {...register("declaration", { required: true })} />
          I confirm that the information provided is accurate.
        </label>

        <button type="submit" style={{ marginTop: '1rem' }}>Submit Application</button>
      </form>
    </div>
  );
};

export default ApplySenior;
