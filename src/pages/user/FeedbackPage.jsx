import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import Header from '../../components/layouts/Header';
import mainAxios from '../../api/mainAxios';
import Cookies from 'js-cookie';
import UserLayout from '../../components/layouts/UserLayout';

const FeedbackPage = () => {
  const [feedbackType, setFeedbackType] = useState('normal');
  const feedbackForm = useForm();

  //on submit has ai generated code so beware
  const onSubmit = async (data) => {
    try {
      switch (feedbackType) {
        case 'normal':
          await mainAxios.post('/feedback', {
            feedbackContent: `Title: ${data.title}\nDescription: ${data.description}`,
            pictureUrl: "https://cdn.prod.website-files.com/64022de562115a8189fe542a/663b9b70ff53a383fc50eea2_Feedback-Culture-Exploring-Its-Purpose-Benefits-And-How-To-Build-One.jpg"
          }, {
            headers: {
              authorization: Cookies.get('token'),
            }
          });
          break;
        case 'bug':
          await mainAxios.post('/bugreport', {
            bugContent: `Title: ${data.title}\nDescription: ${data.description}\nSteps to Reproduce: ${data.stepsToReproduce}`,
            pictureUrl: "https://cdn.prod.website-files.com/64022de562115a8189fe542a/663b9b70ff53a383fc50eea2_Feedback-Culture-Exploring-Its-Purpose-Benefits-And-How-To-Build-One.jpg"
          }, {
            headers: {
              authorization: Cookies.get('token'),
            }
          });
          break;
      }

      alert('Feedback submitted successfully!');
      feedbackForm.reset();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    }
  };

  return (
    <UserLayout>
      <Header>
        <span className="text-2xl"><b>Submit Feedback</b></span>
      </Header>
      <div className="w-full max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <FormProvider {...feedbackForm}>
          <form onSubmit={feedbackForm.handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Feedback Type</label>
              <select
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                value={feedbackType}
                onChange={(e) => setFeedbackType(e.target.value)}
              >
                <option value="normal">General Feedback</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                {...feedbackForm.register("title", { required: "Title is required" })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage errors={feedbackForm.formState.errors} name="title" as="p" className="mt-2 text-sm text-red-600" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                {...feedbackForm.register("description", { required: "Description is required" })}
                rows={4}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <ErrorMessage errors={feedbackForm.formState.errors} name="description" as="p" className="mt-2 text-sm text-red-600" />
            </div>

            {feedbackType === 'bug' && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Steps to Reproduce</label>
                <textarea
                  {...feedbackForm.register("stepsToReproduce", { required: feedbackType === 'bug' ? "Steps to reproduce are required for bug reports" : false })}
                  rows={4}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage errors={feedbackForm.formState.errors} name="stepsToReproduce" as="p" className="mt-2 text-sm text-red-600" />
              </div>
            )}

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </FormProvider>
      </div>
    </UserLayout>
  );
};

export default FeedbackPage;